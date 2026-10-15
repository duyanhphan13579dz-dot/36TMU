import type { FormEvent } from "react";
import { Button } from "@/components/ui";
import { type AdminLeader } from "@/data/adminStore";

interface AdminLeadersTabProps {
  leaders: AdminLeader[];
  filteredLeaders: AdminLeader[];
  searchLead: string;
  onSearchChange: (val: string) => void;
  editingLeadId: string | null;
  leadKhoa: string;
  onKhoaChange: (val: string) => void;
  leadTerm: string;
  onTermChange: (val: string) => void;
  leadName: string;
  onNameChange: (val: string) => void;
  leadDob: string;
  onDobChange: (val: string) => void;
  leadHometown: string;
  onHometownChange: (val: string) => void;
  leadRole: string;
  onRoleChange: (val: string) => void;
  onSaveLeader: (e: FormEvent) => void;
  onStartEditLeader: (l: AdminLeader) => void;
  onCancelEditLeader: () => void;
  onDeleteLeader: (id: string) => void;
}

export default function AdminLeadersTab({
  leaders,
  filteredLeaders,
  searchLead,
  onSearchChange,
  editingLeadId,
  leadKhoa,
  onKhoaChange,
  leadTerm,
  onTermChange,
  leadName,
  onNameChange,
  leadDob,
  onDobChange,
  leadHometown,
  onHometownChange,
  leadRole,
  onRoleChange,
  onSaveLeader,
  onStartEditLeader,
  onCancelEditLeader,
  onDeleteLeader,
}: AdminLeadersTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            {editingLeadId ? "✏️ Chỉnh Sửa Thành Viên BCH" : "👥 Cập Nhật Đội Ngũ Ban Chấp Hành Mới Nhất"}
          </h4>
          {editingLeadId && (
            <button
              type="button"
              onClick={onCancelEditLeader}
              className="rounded-lg bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
            >
              Hủy sửa
            </button>
          )}
        </div>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Thêm hoặc chỉnh sửa thông tin các đồng chí BCH nhiệm kỳ mới (K60, K61...) vào danh sách lịch sử thế hệ giữ lửa.
        </p>

        <form onSubmit={onSaveLeader} className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Khóa sinh viên *</label>
              <input
                required
                value={leadKhoa}
                onChange={(e) => onKhoaChange(e.target.value)}
                placeholder="VD: K60, K61..."
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhiệm kỳ *</label>
              <input
                required
                value={leadTerm}
                onChange={(e) => onTermChange(e.target.value)}
                placeholder="VD: 2026 - 2027, 2027 - 2028..."
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Họ và tên *</label>
              <input
                required
                value={leadName}
                onChange={(e) => onNameChange(e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Ngày tháng năm sinh</label>
              <input
                value={leadDob}
                onChange={(e) => onDobChange(e.target.value)}
                placeholder="VD: 15/08/2006"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Quê quán (huyện/thị)</label>
              <input
                value={leadHometown}
                onChange={(e) => onHometownChange(e.target.value)}
                placeholder="VD: Quảng Xương, Hoằng Hóa..."
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Chức vụ trong BCH / Đội SVTN *</label>
            <input
              required
              value={leadRole}
              onChange={(e) => onRoleChange(e.target.value)}
              placeholder="VD: Trưởng Ban liên lạc, Đội trưởng SVTN, Trưởng Ban Truyền thông..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {editingLeadId && (
              <button
                type="button"
                onClick={onCancelEditLeader}
                className="rounded-xl border border-cobalt-200 bg-white px-4 py-2 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
              >
                Hủy sửa
              </button>
            )}
            <Button variant="flame" type="submit">
              {editingLeadId ? "💾 Cập nhật thành viên" : "👥 Thêm thành viên BCH vào danh sách"}
            </Button>
          </div>
        </form>
      </div>

      {/* Danh sách thành viên BCH bổ sung */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-display text-sm font-bold text-cobalt-900">
            Thành viên BCH mới do Admin bổ sung ({leaders.length})
          </h4>
          <input
            type="text"
            value={searchLead}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Tìm đồng chí theo tên, vai trò..."
            className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-64"
          />
        </div>

        <div className="mt-3 space-y-2.5">
          {filteredLeaders.length === 0 ? (
            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
              {searchLead ? "Không tìm thấy đồng chí nào phù hợp." : "Chưa có thành viên BCH mới nào được thêm riêng. Hệ thống đang hiển thị đầy đủ 16 thế hệ từ K60 đến K44."}
            </p>
          ) : (
            filteredLeaders.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-2xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display text-sm font-black text-cobalt-950">{lead.name}</span>
                    <span className="rounded bg-flame-100 px-1.5 py-0.5 text-[10px] font-bold text-flame-700">
                      {lead.khoa}
                    </span>
                    <span className="text-[11px] text-cobalt-500">{lead.term}</span>
                  </div>
                  <p className="text-xs font-semibold text-tmu-700">{lead.role}</p>
                  <p className="text-[11.5px] text-cobalt-600">📍 {lead.hometown} {lead.dob ? `· Sinh: ${lead.dob}` : ""}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onStartEditLeader(lead)}
                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                    title="Chỉnh sửa thông tin"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteLeader(lead.id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100"
                    title="Xóa thành viên"
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
