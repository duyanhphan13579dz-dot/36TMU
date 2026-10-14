import { ORG, PROGRAMS, LEADERSHIP_HISTORY, type Program, type EventCategory, type ProgramStatus, type LeaderRecord } from "@/data/content";

/* ==========================================================================
   1. TYPES
   ========================================================================== */

export type AdminPost = {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  pinned?: boolean;
};

export type AdminProgram = {
  id: string;
  title: string;
  category: EventCategory;
  status: ProgramStatus;
  month: string;
  day: string;
  dateLabel: string;
  location: string;
  excerpt: string;
  cover: string;
  schedule: { time: string; title: string; note: string }[];
  fact: { label: string; value: string }[];
  createdAt: string;
};

export type AdminLeader = LeaderRecord & {
  id: string;
  createdAt: string;
};

export type AdminMotto = {
  slogan: string;
  term: string;
  meaning: string;
  updatedAt: string;
};

export type AdminRule = {
  id: string;
  title: string;
  effectiveDate: string;
  issuedBy: string;
  summary: string;
  rules: string[];
  updatedAt: string;
};

export type AdminContact = {
  email: string;
  phone: string;
  address: string;
  fanpage: string;
  group: string;
  tiktok: string;
  scheduleInfo: string;
  updatedAt: string;
};

/* ==========================================================================
   2. STORAGE KEYS & DEFAULTS
   ========================================================================== */

const PIN_KEY = "bllsv_admin_pin";
export const DEFAULT_PIN = "36tmu";

const CONTACT_KEY = "bllsv_admin_contact";
const POSTS_KEY = "bllsv_admin_posts";
const PROGRAMS_KEY = "bllsv_admin_programs";
const LEADERS_KEY = "bllsv_admin_leaders";
const MOTTO_KEY = "bllsv_admin_motto";
const RULES_KEY = "bllsv_admin_rules";

export const DEFAULT_CONTACT: AdminContact = {
  email: ORG.email,
  phone: ORG.phone,
  address: ORG.address,
  fanpage: ORG.fanpage,
  group: ORG.group,
  tiktok: ORG.tiktok,
  scheduleInfo: "19:00 – 21:00 tối thứ Ba hàng tuần",
  updatedAt: "12/04/2026",
};

export const DEFAULT_MOTTO: AdminMotto = {
  slogan: ORG.slogan,
  term: "Nhiệm kỳ 2026 – 2027 (K60)",
  meaning: "Ngọn lửa nhiệt huyết, tình yêu thương và tinh thần cống hiến không ngừng nghỉ vì quê hương Thanh Hóa của tuổi trẻ TMU.",
  updatedAt: "12/04/2026",
};

export const DEFAULT_RULES: AdminRule = {
  id: "rule-official-2026",
  title: "Thông Báo Nội Quy & Quy Chế Hoạt Động TNV Nhà Chung 36",
  effectiveDate: "Áp dụng từ năm học 2026 – 2027",
  issuedBy: "Ban Chấp Hành & Đội Trưởng Đội SVTN",
  summary: "Quy chuẩn đạo đức, tinh thần kỷ luật và trách nhiệm phụng sự dành cho toàn thể thành viên và tình nguyện viên trực thuộc 3 ban chuyên môn.",
  rules: [
    "Trang phục & Tác phong: Mặc áo xanh tình nguyện hoặc áo đồng phục Ban liên lạc đúng quy cách trong tất cả các buổi lễ, sự kiện và chiến dịch.",
    "Kỷ luật thời gian & Chuyên cần: Có mặt đúng giờ sinh hoạt định kỳ tối thứ 3 hàng tuần (19h00 – 21h00). Vắng mặt phải báo phép trước ít nhất 12 giờ.",
    "Văn hóa ứng xử & Tinh thần đoàn kết: Luôn giữ gìn hình ảnh người con xứ Thanh lễ phép, văn minh, khiêm tốn; cấm tuyệt đối hành vi gây chia rẽ bè phái.",
    "Kỷ luật trong chiến dịch Mùa Hè Xanh & Đông Ấm: Chấp hành 100% mệnh lệnh của Ban Chỉ huy chiến dịch và Đội SVTN. Nghiêm cấm tắm sông suối hoặc tự ý rời địa bàn tình nguyện.",
    "Trách nhiệm bảo vệ tài sản chung: Quản lý minh bạch công quỹ, bảo quản cẩn thận đạo cụ, kho đồ và trang thiết bị của nhà chung.",
    "Tinh thần trách nhiệm & Chủ động: Luôn hết mình với công việc được phân công, chủ động hỗ trợ đồng đội với tinh thần 'Một người vì mọi người'.",
  ],
  updatedAt: "12/04/2026",
};

/* ==========================================================================
   3. GETTERS & SETTERS (LOCALSTORAGE)
   ========================================================================== */

// --- POSTS / THÔNG BÁO ---
export function getStoredAdminPosts(): AdminPost[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredAdminPosts(posts: AdminPost[]) {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "posts" } }));
  } catch {}
}

// --- PROGRAMS / CHƯƠNG TRÌNH ---
export function getStoredAdminPrograms(): AdminProgram[] {
  try {
    const raw = localStorage.getItem(PROGRAMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredAdminPrograms(programs: AdminProgram[]) {
  try {
    localStorage.setItem(PROGRAMS_KEY, JSON.stringify(programs));
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "programs" } }));
  } catch {}
}

// Merge programs with defaults
export function getAllPrograms(): Program[] {
  const custom = getStoredAdminPrograms();
  const customMapped: Program[] = custom.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    month: p.month || "MỚI",
    day: p.day || "HOT",
    dateLabel: p.dateLabel,
    location: p.location,
    excerpt: p.excerpt,
    cover: p.cover || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
    gallery: [p.cover || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80"],
    schedule: p.schedule?.length ? p.schedule : [{ time: "Sự kiện", title: p.title, note: p.excerpt }],
    fact: p.fact?.length ? p.fact : [{ label: "Địa điểm", value: p.location }],
  }));
  return [...customMapped, ...PROGRAMS];
}

// --- LEADERS / BAN CHẤP HÀNH ---
export function getStoredAdminLeaders(): AdminLeader[] {
  try {
    const raw = localStorage.getItem(LEADERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredAdminLeaders(leaders: AdminLeader[]) {
  try {
    localStorage.setItem(LEADERS_KEY, JSON.stringify(leaders));
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "leaders" } }));
  } catch {}
}

// Merge leaders with defaults
export function getAllLeaders(): LeaderRecord[] {
  const custom = getStoredAdminLeaders();
  return [...custom, ...LEADERSHIP_HISTORY];
}

// --- MOTTO / CHÂM NGÔN HOẠT ĐỘNG ---
export function getStoredAdminMotto(): AdminMotto {
  try {
    const raw = localStorage.getItem(MOTTO_KEY);
    if (!raw) return DEFAULT_MOTTO;
    const parsed = JSON.parse(raw);
    return parsed?.slogan ? { ...DEFAULT_MOTTO, ...parsed } : DEFAULT_MOTTO;
  } catch {
    return DEFAULT_MOTTO;
  }
}

export function saveStoredAdminMotto(motto: AdminMotto) {
  try {
    localStorage.setItem(MOTTO_KEY, JSON.stringify(motto));
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "motto" } }));
  } catch {}
}

// --- RULES / THÔNG BÁO NỘI QUY ---
export function getStoredAdminRules(): AdminRule {
  try {
    const raw = localStorage.getItem(RULES_KEY);
    if (!raw) return DEFAULT_RULES;
    const parsed = JSON.parse(raw);
    return parsed?.rules?.length ? { ...DEFAULT_RULES, ...parsed } : DEFAULT_RULES;
  } catch {
    return DEFAULT_RULES;
  }
}

export function saveStoredAdminRules(rules: AdminRule) {
  try {
    localStorage.setItem(RULES_KEY, JSON.stringify(rules));
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "rules" } }));
  } catch {}
}

// --- PIN / MẬT KHẨU QUẢN TRỊ ---
export function getStoredAdminPin(): string {
  try {
    return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function saveStoredAdminPin(newPin: string): boolean {
  try {
    const trimmed = newPin.trim();
    if (!trimmed || trimmed.length < 3) return false;
    localStorage.setItem(PIN_KEY, trimmed);
    return true;
  } catch {
    return false;
  }
}

export function resetStoredAdminPin(): void {
  try {
    localStorage.removeItem(PIN_KEY);
  } catch {}
}

// --- CONTACT / THÔNG TIN LIÊN HỆ & KÊNH TRUYỀN THÔNG ---
export function getStoredAdminContact(): AdminContact {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (!raw) return DEFAULT_CONTACT;
    const parsed = JSON.parse(raw);
    return parsed?.email ? { ...DEFAULT_CONTACT, ...parsed } : DEFAULT_CONTACT;
  } catch {
    return DEFAULT_CONTACT;
  }
}

export function saveStoredAdminContact(contact: AdminContact): void {
  try {
    localStorage.setItem(CONTACT_KEY, JSON.stringify(contact));
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "contact" } }));
  } catch {}
}

// --- BACKUP & RESTORE DỮ LIỆU ---
export function exportAllAdminData(): string {
  const data = {
    version: "1.0",
    appName: "BLLSVTMU-Manager",
    exportedAt: new Date().toLocaleString("vi-VN"),
    posts: getStoredAdminPosts(),
    programs: getStoredAdminPrograms(),
    leaders: getStoredAdminLeaders(),
    motto: getStoredAdminMotto(),
    rules: getStoredAdminRules(),
    contact: getStoredAdminContact(),
  };
  return JSON.stringify(data, null, 2);
}

export function importAllAdminData(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (Array.isArray(data.posts)) saveStoredAdminPosts(data.posts);
    if (Array.isArray(data.programs)) saveStoredAdminPrograms(data.programs);
    if (Array.isArray(data.leaders)) saveStoredAdminLeaders(data.leaders);
    if (data.motto?.slogan) saveStoredAdminMotto(data.motto);
    if (data.rules?.rules) saveStoredAdminRules(data.rules);
    if (data.contact?.email) saveStoredAdminContact(data.contact);
    return true;
  } catch {
    return false;
  }
}

export function resetAllAdminDataToDefaults(): void {
  try {
    localStorage.removeItem(POSTS_KEY);
    localStorage.removeItem(PROGRAMS_KEY);
    localStorage.removeItem(LEADERS_KEY);
    localStorage.removeItem(MOTTO_KEY);
    localStorage.removeItem(RULES_KEY);
    localStorage.removeItem(CONTACT_KEY);
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "all" } }));
  } catch {}
}
