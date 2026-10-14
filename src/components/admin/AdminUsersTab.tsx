import React from "react";
import { Button } from "@/components/ui";
import { type DbAdmin } from "@/lib/db";

interface AdminUsersTabProps {
  dbAdmins: DbAdmin[];
  newAdminName: string;
  setNewAdminName: (v: string) => void;
  newAdminUsername: string;
  setNewAdminUsername: (v: string) => void;
  newAdminPin: string;
  setNewAdminPin: (v: string) => void;
  newAdminRole: string;
  setNewAdminRole: (v: string) => void;
  newAdminDept: string;
  setNewAdminDept: (v: string) => void;
  newAdminCohort: string;
  setNewAdminCohort: (v: string) => void;
  onCreateAdmin: (e: React.FormEvent) => void;
  onDeleteAdmin: (id: string, name: string) => void;
}

export default function AdminUsersTab({
  dbAdmins,
  newAdminName,
  setNewAdminName,
  newAdminUsername,
  setNewAdminUsername,
  newAdminPin,
  setNewAdminPin,
  newAdminRole,
  setNewAdminRole,
  newAdminDept,
  setNewAdminDept,
  newAdminCohort,
  setNewAdminCohort,
  onCreateAdmin,
  onDeleteAdmin,
}: AdminUsersTabProps) {
  return (
    <div className="space-y-6">
      {/* Form tạo tài khoản admin */}
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            👥 Cấp Quyền &amp; Tạo Tài Khoản Quản Trị Viên Mới
          </h4>
          <span className="rounded-full bg-cobalt-100 px-2.5 py-0.5 text-[10.5px] font-bold text-cobalt-800">
            Neon Database
          </span>
        </div>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Tài khoản được lưu an toàn trên Neon Serverless PostgreSQL. Thành viên có thể đăng nhập bằng mã PIN hoặc Username.
        </p>

        <form onSubmit={onCreateAdmin} className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Tên đầy đủ *</label>
              <input
                required
                value={newAdminName}
                onChange={(e) => setNewAdminName(e.target.value)}
                placeholder="VD: Lê Thị Mai Linh"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Tên đăng nhập (Username) *</label>
              <input
                required
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
                placeholder="VD: mailinh36"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Mã PIN đăng nhập *</label>
              <input
                required
                type="password"
                value={newAdminPin}
                onChange={(e) => setNewAdminPin(e.target.value)}
                placeholder="Tối thiểu 3 ký tự"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chức vụ trong BCH</label>
              <input
                value={newAdminRole}
                onChange={(e) => setNewAdminRole(e.target.value)}
                placeholder="VD: Phó Bí thư / Đội Phó SVTN"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Ban chuyên môn</label>
              <select
                value={newAdminDept}
                onChange={(e) => setNewAdminDept(e.target.value)}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              >
                <option value="Ban Chấp Hành">Ban Chấp Hành</option>
                <option value="Đội SVTN">Đội Sinh Viên Tình Nguyện</option>
                <option value="Ban Truyền thông">Ban Truyền thông</option>
                <option value="Ban Văn hóa – Sự kiện">Ban Văn hóa – Sự kiện</option>
                <option value="Ban Hậu cần">Ban Hậu cần</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Khóa TMU</label>
              <select
                value={newAdminCohort}
                onChange={(e) => setNewAdminCohort(e.target.value)}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              >
                <option value="K61">K61 (Tân sinh viên)</option>
                <option value="K60">K60</option>
                <option value="K59">K59</option>
                <option value="K58">K58</option>
                <option value="K57">K57</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="flame" type="submit">
              ➕ Thêm Quản Trị Viên
            </Button>
          </div>
        </form>
      </div>

      {/* Danh sách Admin */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            Danh Sách Quản Trị Viên ({dbAdmins.length})
          </h4>
          <span className="text-xs text-cobalt-600">Đồng bộ từ Neon PostgreSQL</span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-cobalt-100 bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-cobalt-100 bg-cobalt-50/70 text-[11px] font-bold text-cobalt-700 uppercase">
                <tr>
                  <th className="px-4 py-3">Quản trị viên</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Chức vụ / Ban</th>
                  <th className="px-4 py-3">Khóa</th>
                  <th className="px-4 py-3">Đăng nhập gần nhất</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cobalt-100">
                {dbAdmins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-cobalt-50/40 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flame-100 font-bold text-flame-800 text-xs">
                          {adm.name.slice(0, 1)}
                        </span>
                        <div>
                          <p className="font-bold text-cobalt-950">{adm.name}</p>
                          {adm.id === "admin-root" && (
                            <span className="text-[10px] text-flame-600 font-semibold">Tài khoản gốc</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-cobalt-800">@{adm.username}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-cobalt-900">{adm.role}</p>
                      <p className="text-[10.5px] text-cobalt-600">{adm.department}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-md bg-tmu-100 px-2 py-0.5 font-bold text-tmu-800 text-[10.5px]">
                        {adm.cohort}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-cobalt-600 text-[11px]">
                      {adm.last_login_at
                        ? new Date(adm.last_login_at).toLocaleString("vi-VN")
                        : "Chưa đăng nhập"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {adm.id !== "admin-root" ? (
                        <button
                          type="button"
                          onClick={() => onDeleteAdmin(adm.id, adm.name)}
                          className="rounded-lg border border-red-200 bg-white px-2 py-1 text-[11px] font-bold text-red-600 hover:bg-red-50"
                        >
                          Xóa
                        </button>
                      ) : (
                        <span className="text-[10px] text-cobalt-400 italic">Bảo vệ</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
