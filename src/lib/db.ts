import { neon } from "@neondatabase/serverless";

// Neon PostgreSQL Connection String (bllsv-36tmu-db)
const DATABASE_URL =
  import.meta.env.VITE_DATABASE_URL ||
  "postgresql://neondb_owner:npg_1FXWYB8eoONf@ep-odd-paper-b5ysht9l-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";

export const sql = neon(DATABASE_URL);

/* ==========================================================================
   TYPES
   ========================================================================== */

export type DbAdmin = {
  id: string;
  username: string;
  pin: string;
  name: string;
  role: string;
  department: string;
  cohort: string;
  avatar_url?: string;
  is_active: boolean;
  last_login_at?: string;
  created_at: string;
};

export type DbAuditLog = {
  id: number;
  admin_id?: string;
  admin_name: string;
  action_type: string;
  target_entity: string;
  target_id?: string;
  summary: string;
  details?: Record<string, unknown>;
  created_at: string;
};

/* ==========================================================================
   1. ADMIN MANAGEMENT (NEON POSTGRESQL + LOCAL FALLBACK)
   ========================================================================== */

const CACHED_LOGS_KEY = "bllsv_cached_audit_logs";

export async function fetchDbAdmins(): Promise<DbAdmin[]> {
  try {
    const rows = await sql`
      SELECT id, username, pin, name, role, department, cohort, avatar_url, is_active, last_login_at, created_at
      FROM admins
      ORDER BY created_at ASC
    `;
    return rows as DbAdmin[];
  } catch (err) {
    console.warn("Neon DB fetch admins offline/failed:", err);
    return [
      {
        id: "admin-root",
        username: "admin36",
        pin: "36tmu",
        name: "Ban Chủ Nhiệm BLLSV TMU",
        role: "Trưởng Ban Điều Hành",
        department: "Ban Chấp Hành",
        cohort: "K60",
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ];
  }
}

export async function authenticateAdmin(
  identifier: string,
  pin: string
): Promise<DbAdmin | null> {
  const trimmed = identifier.trim();
  const trimmedPin = pin.trim();
  try {
    const rows = await sql`
      SELECT id, username, pin, name, role, department, cohort, avatar_url, is_active, last_login_at, created_at
      FROM admins
      WHERE (LOWER(username) = LOWER(${trimmed}) OR pin = ${trimmedPin})
        AND pin = ${trimmedPin}
        AND is_active = TRUE
      LIMIT 1
    `;
    if (rows && rows.length > 0) {
      const admin = rows[0] as DbAdmin;
      // Update last login timestamp asynchronously
      sql`
        UPDATE admins
        SET last_login_at = NOW()
        WHERE id = ${admin.id}
      `.catch(() => {});
      return admin;
    }
    return null;
  } catch (err) {
    console.warn("Neon DB auth offline fallback to local PIN:", err);
    // Fallback: check default or local PIN
    if (trimmedPin === "36tmu" || trimmed === "admin36") {
      return {
        id: "admin-root",
        username: "admin36",
        pin: "36tmu",
        name: "Ban Chủ Nhiệm BLLSV TMU",
        role: "Trưởng Ban Điều Hành",
        department: "Ban Chấp Hành",
        cohort: "K60",
        is_active: true,
        created_at: new Date().toISOString(),
      };
    }
    return null;
  }
}

export async function createDbAdmin(admin: {
  username: string;
  pin: string;
  name: string;
  role?: string;
  department?: string;
  cohort?: string;
}): Promise<boolean> {
  try {
    const id = "admin-" + Date.now();
    await sql`
      INSERT INTO admins (id, username, pin, name, role, department, cohort)
      VALUES (
        ${id},
        ${admin.username.trim().toLowerCase()},
        ${admin.pin.trim()},
        ${admin.name.trim()},
        ${admin.role?.trim() || "Ủy viên BCH BLLSV TMU"},
        ${admin.department?.trim() || "Ban Chấp Hành"},
        ${admin.cohort?.trim() || "K60"}
      )
    `;
    return true;
  } catch (err) {
    console.error("Failed to create admin in Neon:", err);
    return false;
  }
}

export async function updateDbAdminPin(
  adminId: string,
  newPin: string
): Promise<boolean> {
  try {
    await sql`
      UPDATE admins
      SET pin = ${newPin.trim()}
      WHERE id = ${adminId}
    `;
    return true;
  } catch (err) {
    console.error("Failed to update admin pin in Neon:", err);
    return false;
  }
}

export async function deleteDbAdmin(adminId: string): Promise<boolean> {
  if (adminId === "admin-root") return false; // Prevent deleting root
  try {
    await sql`DELETE FROM admins WHERE id = ${adminId}`;
    return true;
  } catch (err) {
    console.error("Failed to delete admin in Neon:", err);
    return false;
  }
}

/* ==========================================================================
   2. AUDIT LOGS (LỊCH SỬ THAY ĐỔI CỦA CÁC ADMIN)
   ========================================================================== */

export async function recordAuditLog(log: {
  adminId?: string;
  adminName: string;
  actionType:
    | "LOGIN"
    | "LOGOUT"
    | "CREATE_POST"
    | "UPDATE_POST"
    | "DELETE_POST"
    | "CREATE_PROGRAM"
    | "UPDATE_PROGRAM"
    | "DELETE_PROGRAM"
    | "CREATE_LEADER"
    | "UPDATE_LEADER"
    | "DELETE_LEADER"
    | "UPDATE_MOTTO"
    | "UPDATE_RULES"
    | "UPDATE_CONTACT"
    | "DELETE_NOTE"
    | "PIN_NOTE"
    | "CHANGE_PIN"
    | "IMPORT_BACKUP"
    | "RESET_DATA";
  targetEntity: string;
  targetId?: string;
  summary: string;
  details?: Record<string, unknown>;
}): Promise<void> {
  // Local cache log for immediate feedback
  try {
    const localLog: DbAuditLog = {
      id: Date.now(),
      admin_id: log.adminId,
      admin_name: log.adminName,
      action_type: log.actionType,
      target_entity: log.targetEntity,
      target_id: log.targetId,
      summary: log.summary,
      details: log.details,
      created_at: new Date().toISOString(),
    };
    const cachedRaw = localStorage.getItem(CACHED_LOGS_KEY);
    const cached: DbAuditLog[] = cachedRaw ? JSON.parse(cachedRaw) : [];
    const nextCached = [localLog, ...cached.slice(0, 49)];
    localStorage.setItem(CACHED_LOGS_KEY, JSON.stringify(nextCached));
  } catch {}

  // Push to Neon DB asynchronously
  try {
    await sql`
      INSERT INTO audit_logs (admin_id, admin_name, action_type, target_entity, target_id, summary, details)
      VALUES (
        ${log.adminId || null},
        ${log.adminName},
        ${log.actionType},
        ${log.targetEntity},
        ${log.targetId || null},
        ${log.summary},
        ${log.details ? JSON.stringify(log.details) : null}
      )
    `;
  } catch (err) {
    console.warn("Neon audit log recording skipped/offline:", err);
  }
}

export async function fetchAuditLogs(limit = 100): Promise<DbAuditLog[]> {
  try {
    const rows = await sql`
      SELECT id, admin_id, admin_name, action_type, target_entity, target_id, summary, details, created_at
      FROM audit_logs
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    if (rows && rows.length > 0) {
      return rows as DbAuditLog[];
    }
  } catch (err) {
    console.warn("Neon DB fetch audit logs failed, reading cache:", err);
  }

  // Fallback to local cache
  try {
    const cachedRaw = localStorage.getItem(CACHED_LOGS_KEY);
    return cachedRaw ? JSON.parse(cachedRaw) : [];
  } catch {
    return [];
  }
}

/* ==========================================================================
   3. SITE DATA CLOUD BACKUP & SYNC (NEON POSTGRESQL)
   ========================================================================== */

export async function syncAllDataToCloud(
  payload: Record<string, unknown>,
  adminName: string
): Promise<boolean> {
  try {
    await sql`
      INSERT INTO site_data (key, data, updated_by, updated_at)
      VALUES ('full_site_payload', ${JSON.stringify(payload)}, ${adminName}, NOW())
      ON CONFLICT (key) DO UPDATE
      SET data = EXCLUDED.data,
          updated_by = EXCLUDED.updated_by,
          updated_at = EXCLUDED.updated_at
    `;
    return true;
  } catch (err) {
    console.error("Neon cloud sync failed:", err);
    return false;
  }
}

export async function fetchAllDataFromCloud(): Promise<Record<string, unknown> | null> {
  try {
    const rows = await sql`
      SELECT data, updated_by, updated_at
      FROM site_data
      WHERE key = 'full_site_payload'
      LIMIT 1
    `;
    if (rows && rows.length > 0) {
      const row = rows[0] as { data: Record<string, unknown> };
      return typeof row.data === "string" ? JSON.parse(row.data) : row.data;
    }
    return null;
  } catch (err) {
    console.error("Neon cloud fetch failed:", err);
    return null;
  }
}
