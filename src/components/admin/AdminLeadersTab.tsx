import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { type AdminLeader, isLeadersFullMode } from "@/data/adminStore";
import { LEADERSHIP_HISTORY } from "@/data/content";

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
  leadAvatarUrl?: string;
  onAvatarUrlChange?: (val: string) => void;
  onSaveLeader: (e: FormEvent) => void;
  onStartEditLeader: (l: AdminLeader) => void;
  onCancelEditLeader: () => void;
  onDeleteLeader: (id: string) => void;
  onImportAllLeaders?: () => void;
  onResetLeadersToDefault?: () => void;
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
  leadAvatarUrl = "",
  onAvatarUrlChange,
  onSaveLeader,
  onStartEditLeader,
  onCancelEditLeader,
  onDeleteLeader,
  onImportAllLeaders,
  onResetLeadersToDefault,
}: AdminLeadersTabProps) {
  const [selectedKhoaFilter, setSelectedKhoaFilter] = useState<string>("all");
  const inFullMode = isLeadersFullMode();

  // Extract unique khoas for filtering
  const allKhoas = Array.from(new Set(leaders.map((l) => l.khoa))).sort((a, b) => {
    const numA = parseInt(a.replace(/\D/g, "") || "0", 10);
    const numB = parseInt(b.replace(/\D/g, "") || "0", 10);
    return numB - numA;
  });

  const displayedLeaders = filteredLeaders.filter((l) => {
    if (selectedKhoaFilter === "all") return true;
    return l.khoa.toUpperCase() === selectedKhoaFilter.toUpperCase();
  });

  return (
    <div className="space-y-6">
      {/* BANNER THẨM QUYỀN TOÀN DIỆN VỀ BCH */}
      <div className="rounded-2xl border border-flame-100 bg-gradient-to-r from-flame-50/70 to-amber-50/50 p-4 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-flame-600 text-sm text-white shadow-xs">
                🏛️
              </span>
              <h4 className="font-display text-sm font-bold text-flame-950">
                Thẩm Quyền Quản Trị Nhân Sự Ban Chấp Hành
              </h4>
            </div>
            <p className="mt-1 text-xs text-flame-800">
              {inFullMode
                ? "BCH đang ở chế độ toàn quyền quản trị: Bạn có thể thêm, chỉnh sửa thông tin (họ tên, chức vụ, ảnh chân dung) hoặc xóa bất kỳ ai trong cả 16 thế hệ."
                : `Hệ thống đang hiển thị 16 thế hệ mẫu (${LEADERSHIP_HISTORY.length} anh chị). Bạn có thể nạp toàn bộ vào hệ thống quản lý để toàn quyền chỉnh sửa và xóa.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!inFullMode && onImportAllLeaders && (
              <button
                type="button"
                onClick={onImportAllLeaders}
                className="inline-flex items-center gap-1.5 rounded-xl bg-flame-600 px-3.5 py-2 text-xs font-bold text-white shadow-soft hover:bg-flame-700 transition"
              >
                📥 Nạp toàn bộ 16 khóa BCH vào quản lý
              </button>
            )}
            {inFullMode && onResetLeadersToDefault && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn khôi phục danh sách 16 khóa BCH về mặc định ban đầu?")) {
                    onResetLeadersToDefault();
                  }
                }}
                className="rounded-xl border border-flame-300 bg-white px-3 py-1.5 text-xs font-bold text-flame-800 hover:bg-flame-50 transition"
              >
                🔄 Khôi phục 16 khóa gốc
              </button>
            )}
          </div>
        </div>
      </div>

      {/* FORM THÊM / SỬA THÀNH VIÊN BCH */}
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            {editingLeadId ? "✏️ Chỉnh Sửa Thông Tin Thành Viên BCH" : "👥 Thêm Thành Viên Ban Chấp Hành Mới"}
          </h4>
          {editingLeadId && (
            <button
              type="button"
              onClick={onCancelEditLeader}
              className="rounded-lg bg-cobalt-200 px-2.5 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300 transition"
            >
              Hủy sửa
            </button>
          )}
        </div>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Cập nhật thông tin các đồng chí BCH (K60, K61, K62...) hoặc điều chỉnh dữ liệu các khóa tiền bối.
        </p>

        <form onSubmit={onSaveLeader} className="mt-4 space-y-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Khóa sinh viên *</label>
              <input
                required
                value={leadKhoa}
                onChange={(e) => onKhoaChange(e.target.value)}
                placeholder="VD: K60, K61, K62..."
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

          <div className="grid gap-3 sm:grid-cols-2">
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

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">
                Link ảnh chân dung / Avatar (Tùy chọn)
              </label>
              <input
                value={leadAvatarUrl}
                onChange={(e) => onAvatarUrlChange && onAvatarUrlChange(e.target.value)}
                placeholder="https://images.unsplash.com/... hoặc để trống"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          {/* Live Preview Avatar */}
          {leadAvatarUrl && (
            <div className="flex items-center gap-3 rounded-xl border border-cobalt-100 bg-white p-2.5">
              <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-flame-400">
                <img
                  src={leadAvatarUrl}
                  alt="Avatar preview"
                  className="h-full w-full object-cover"
                  onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                />
              </div>
              <div className="text-xs">
                <span className="font-bold text-cobalt-950">{leadName || "Tên thành viên"}</span>
                <p className="text-[11px] text-cobalt-500">{leadRole || "Chức vụ"} • {leadKhoa || "Khóa"}</p>
              </div>
            </div>
          )}

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
              {editingLeadId ? "💾 Cập nhật thông tin thành viên" : "👥 Thêm thành viên vào danh sách"}
            </Button>
          </div>
        </form>
      </div>

      {/* DANH SÁCH THÀNH VIÊN VÀ BỘ LỌC KHÓA */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-display text-sm font-bold text-cobalt-900">
            Danh sách nhân sự BCH ({leaders.length} đồng chí)
          </h4>
          <input
            type="text"
            value={searchLead}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Tìm đồng chí theo tên, vai trò..."
            className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-64"
          />
        </div>

        {/* Lọc theo khóa */}
        {allKhoas.length > 0 && (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-cobalt-600 mr-1">Lọc theo khóa:</span>
            <button
              type="button"
              onClick={() => setSelectedKhoaFilter("all")}
              className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                selectedKhoaFilter === "all"
                  ? "bg-cobalt-800 text-white shadow-2xs"
                  : "bg-cobalt-100/70 text-cobalt-700 hover:bg-cobalt-200"
              }`}
            >
              Tất cả ({leaders.length})
            </button>
            {allKhoas.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setSelectedKhoaFilter(k)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                  selectedKhoaFilter === k
                    ? "bg-flame-500 text-white shadow-2xs"
                    : "bg-cobalt-100/70 text-cobalt-700 hover:bg-cobalt-200"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        )}

        <div className="mt-3 space-y-2.5">
          {displayedLeaders.length === 0 ? (
            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
              {searchLead || selectedKhoaFilter !== "all"
                ? "Không tìm thấy đồng chí nào phù hợp với bộ lọc."
                : "Chưa có danh sách tùy biến. Hãy nhấn 'Nạp toàn bộ 16 khóa BCH' ở trên để bắt đầu chỉnh sửa và quản lý."}
            </p>
          ) : (
            displayedLeaders.map((lead) => (
              <div
                key={lead.id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-2xs hover:border-flame-200 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar hoặc Initial chữ cái */}
                  {lead.avatarUrl ? (
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-cobalt-200">
                      <img src={lead.avatarUrl} alt={lead.name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-cobalt-800 to-tmu-600 text-xs font-bold text-white shadow-xs">
                      {lead.name.split(" ").pop()?.charAt(0) || "BCH"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm font-black text-cobalt-950">{lead.name}</span>
                      <span className="rounded bg-flame-100 px-1.5 py-0.5 text-[10px] font-bold text-flame-700">
                        {lead.khoa}
                      </span>
                      <span className="text-[11px] text-cobalt-500">{lead.term}</span>
                    </div>
                    <p className="text-xs font-semibold text-tmu-700">{lead.role}</p>
                    <p className="text-[11px] text-cobalt-600">
                      📍 {lead.hometown} {lead.dob ? `· Sinh: ${lead.dob}` : ""}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onStartEditLeader(lead)}
                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50 transition"
                    title="Chỉnh sửa thông tin thành viên"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteLeader(lead.id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                    title="Xóa thành viên khỏi danh sách"
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
