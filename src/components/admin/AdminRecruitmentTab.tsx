import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import {
  saveStoredRecruitment,
  saveStoredApplications,
  updateApplicationStatus,
  deleteVolunteerApplication,
  type RecruitmentCampaign,
  type VolunteerApplication,
} from "@/data/adminStore";

interface AdminRecruitmentTabProps {
  recruitment: RecruitmentCampaign;
  applications: VolunteerApplication[];
  onRecruitmentChange: (camp: RecruitmentCampaign) => void;
  onApplicationsChange: (apps: VolunteerApplication[]) => void;
  onToast: (msg: string) => void;
  userDept?: string;
}

export default function AdminRecruitmentTab({
  recruitment,
  applications,
  onRecruitmentChange,
  onApplicationsChange,
  onToast,
}: AdminRecruitmentTabProps) {
  const [filterDept, setFilterDept] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);

  // Form cài đặt đợt tuyển
  const [campData, setCampData] = useState<RecruitmentCampaign>(recruitment);

  const handleSaveCampaign = (e: FormEvent) => {
    e.preventDefault();
    const updated = {
      ...campData,
      updatedAt: new Date().toLocaleDateString("vi-VN"),
    };
    onRecruitmentChange(updated);
    saveStoredRecruitment(updated);
    onToast(
      updated.isOpen
        ? "✅ Đã MỞ cổng đăng ký tuyển TNV trên toàn website!"
        : "🔒 Đã ĐÓNG cổng đăng ký tuyển TNV!"
    );
  };

  const handleStatusChange = (id: string, status: VolunteerApplication["status"]) => {
    updateApplicationStatus(id, status);
    const updated = applications.map((a) => (a.id === id ? { ...a, status } : a));
    onApplicationsChange(updated);
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, status });
    }
    onToast("Đã cập nhật trạng thái hồ sơ!");
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa hồ sơ của ứng viên "${name}"?`)) {
      deleteVolunteerApplication(id);
      const updated = applications.filter((a) => a.id !== id);
      onApplicationsChange(updated);
      if (selectedApp?.id === id) setSelectedApp(null);
      onToast("Đã xóa hồ sơ ứng viên!");
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) {
      onToast("Chưa có hồ sơ ứng viên để xuất!");
      return;
    }
    const headers = [
      "ID",
      "Họ và Tên",
      "Số điện thoại",
      "Khóa TMU",
      "Chuyên ngành",
      "Quê quán (Thanh Hóa)",
      "Ban nguyện vọng",
      "Kỹ năng/Thế mạnh",
      "Lý do ứng tuyển",
      "Trạng thái",
      "Thời gian nộp",
    ];

    const rows = applications.map((a) => [
      a.id,
      `"${a.fullName.replace(/"/g, '""')}"`,
      `"${a.phone}"`,
      a.cohort,
      `"${a.major.replace(/"/g, '""')}"`,
      `"${a.hometown.replace(/"/g, '""')}"`,
      `"${a.targetDept}"`,
      `"${a.skills.replace(/"/g, '""')}"`,
      `"${a.reason.replace(/"/g, '""')}"`,
      a.status,
      a.createdAt,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Danh_Sach_Ung_Vien_TNV_36TMU_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onToast("Đã xuất danh sách hồ sơ ứng viên ra file CSV!");
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchDept = filterDept === "all" || app.targetDept === filterDept;
    const matchStatus = filterStatus === "all" || app.status === filterStatus;
    return matchDept && matchStatus;
  });

  // Count by department
  const countMedia = applications.filter((a) => a.targetDept === "Ban Truyền thông").length;
  const countEvents = applications.filter((a) => a.targetDept === "Ban Văn hóa – Sự kiện").length;
  const countLogistics = applications.filter((a) => a.targetDept === "Ban Hậu cần").length;

  return (
    <div className="space-y-6">
      {/* Thẻ quản trị & Bật/Tắt Cổng Tuyển */}
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
              🎯 Cổng Tuyển Quân &amp; Quản Lý Hồ Sơ Tình Nguyện Viên
            </h4>
            <p className="mt-0.5 text-xs text-cobalt-600">
              Quản trị: <strong>Đội SVTN</strong> điều hành chung &amp; <strong>Ban Hậu cần</strong> phụ trách nhân sự tiếp nhận.
            </p>
          </div>
          <span className="rounded-full bg-cobalt-100 px-3 py-1 text-xs font-bold text-cobalt-800">
            Tổng cộng: {applications.length} hồ sơ
          </span>
        </div>

        {/* Cấu hình chiến dịch tuyển quân */}
        <form onSubmit={handleSaveCampaign} className="mt-4 rounded-xl border border-cobalt-200/60 bg-white p-3.5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-cobalt-900 block">Trạng thái Cổng Đăng Ký Tuyển Quân</span>
              <span className="text-[11px] text-cobalt-500">
                {campData.isOpen
                  ? "🟢 ĐANG MỞ — Nút đăng ký sẽ hiển thị trên trang chủ để các bạn sinh viên nộp đơn."
                  : "🔴 ĐANG ĐÓNG — Tạm ngừng nhận đơn mới."}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCampData({ ...campData, isOpen: !campData.isOpen })}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                campData.isOpen ? "bg-emerald-500" : "bg-slate-300"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  campData.isOpen ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Tiêu đề đợt tuyển *</label>
              <input
                required
                value={campData.title}
                onChange={(e) => setCampData({ ...campData, title: e.target.value })}
                placeholder="VD: Tuyển Tình Nguyện Viên Nhà Chung 36 - K61, K62"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Hạn chót nhận đơn</label>
              <input
                value={campData.deadline}
                onChange={(e) => setCampData({ ...campData, deadline: e.target.value })}
                placeholder="VD: 30/11/2026"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="flame" size="sm" type="submit">
              💾 Lưu Cấu Hình Đợt Tuyển
            </Button>
          </div>
        </form>
      </div>

      {/* Thống kê nhanh 3 ban */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3 text-center">
          <p className="text-[11px] font-bold text-sky-800">Ban Truyền thông</p>
          <p className="mt-1 font-display text-lg font-extrabold text-sky-950">{countMedia}</p>
          <p className="text-[10px] text-sky-600">Đơn nguyện vọng</p>
        </div>

        <div className="rounded-xl border border-purple-100 bg-purple-50/70 p-3 text-center">
          <p className="text-[11px] font-bold text-purple-800">Ban Văn hóa – Sự kiện</p>
          <p className="mt-1 font-display text-lg font-extrabold text-purple-950">{countEvents}</p>
          <p className="text-[10px] text-purple-600">Đơn nguyện vọng</p>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-3 text-center">
          <p className="text-[11px] font-bold text-amber-800">Ban Hậu cần</p>
          <p className="mt-1 font-display text-lg font-extrabold text-amber-950">{countLogistics}</p>
          <p className="text-[10px] text-amber-600">Đơn nguyện vọng</p>
        </div>
      </div>

      {/* Bảng hồ sơ & Bộ lọc */}
      <div className="rounded-2xl border border-cobalt-100 bg-white p-4 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
              className="rounded-xl border border-cobalt-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-cobalt-950 outline-none"
            >
              <option value="all">Tất cả 3 Ban</option>
              <option value="Ban Truyền thông">Ban Truyền thông ({countMedia})</option>
              <option value="Ban Văn hóa – Sự kiện">Ban Văn hóa – Sự kiện ({countEvents})</option>
              <option value="Ban Hậu cần">Ban Hậu cần ({countLogistics})</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-cobalt-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-cobalt-950 outline-none"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="pending">⏳ Chờ phỏng vấn</option>
              <option value="interviewed">🗣️ Đã phỏng vấn</option>
              <option value="accepted">✅ Đạt / Chính thức</option>
              <option value="rejected">❌ Từ chối</option>
            </select>
          </div>

          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            📥 Xuất File Excel (CSV)
          </Button>
        </div>

        {/* Danh sách đơn */}
        {filteredApps.length === 0 ? (
          <div className="rounded-xl border border-dashed border-cobalt-200 p-8 text-center text-xs text-cobalt-500">
            Chưa có hồ sơ ứng viên nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          <div className="divide-y divide-cobalt-100 overflow-hidden rounded-xl border border-cobalt-100">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col gap-2 p-3.5 transition hover:bg-cobalt-50/50 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-display text-sm font-bold text-cobalt-950">
                      {app.fullName}
                    </span>
                    <span className="rounded-full bg-cobalt-100 px-2 py-0.5 text-[10.5px] font-bold text-cobalt-700">
                      {app.cohort} • {app.major}
                    </span>
                    <span className="rounded-full bg-flame-100 px-2 py-0.5 text-[10.5px] font-bold text-flame-700">
                      {app.targetDept}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-cobalt-600">
                    📞 <strong>{app.phone}</strong> • Quê quán: <strong>{app.hometown}</strong> • Nộp lúc: {app.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={app.status}
                    onChange={(e) =>
                      handleStatusChange(app.id, e.target.value as VolunteerApplication["status"])
                    }
                    className={`rounded-lg px-2.5 py-1 text-xs font-bold outline-none border ${
                      app.status === "accepted"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : app.status === "interviewed"
                        ? "bg-sky-50 text-sky-700 border-sky-300"
                        : app.status === "rejected"
                        ? "bg-rose-50 text-rose-700 border-rose-300"
                        : "bg-amber-50 text-amber-700 border-amber-300"
                    }`}
                  >
                    <option value="pending">⏳ Chờ duyệt</option>
                    <option value="interviewed">🗣️ Đã phỏng vấn</option>
                    <option value="accepted">✅ Đạt</option>
                    <option value="rejected">❌ Từ chối</option>
                  </select>

                  <button
                    onClick={() => setSelectedApp(app)}
                    className="rounded-lg bg-cobalt-100 px-2.5 py-1 text-xs font-semibold text-cobalt-800 hover:bg-cobalt-200 transition"
                  >
                    Xem chi tiết
                  </button>

                  <button
                    onClick={() => handleDelete(app.id, app.fullName)}
                    className="rounded-lg p-1 text-rose-500 hover:bg-rose-50 transition"
                    title="Xóa hồ sơ"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal xem chi tiết hồ sơ ứng viên */}
      {selectedApp && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-lift space-y-4">
            <div className="flex items-center justify-between border-b border-cobalt-100 pb-3">
              <div>
                <h3 className="font-display text-base font-extrabold text-cobalt-950">
                  {selectedApp.fullName} ({selectedApp.cohort})
                </h3>
                <p className="text-xs text-cobalt-500">{selectedApp.targetDept}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="h-8 w-8 rounded-full bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-cobalt-800">
              <p><strong>Số điện thoại:</strong> {selectedApp.phone}</p>
              <p><strong>Chuyên ngành TMU:</strong> {selectedApp.major}</p>
              <p><strong>Quê quán Thanh Hóa:</strong> {selectedApp.hometown}</p>
              <p><strong>Thời gian nộp đơn:</strong> {selectedApp.createdAt}</p>

              <div className="rounded-xl bg-cobalt-50/70 p-3 mt-2">
                <p className="font-bold text-cobalt-950 mb-1">Kỹ năng &amp; Thế mạnh:</p>
                <p className="whitespace-pre-line text-cobalt-700">{selectedApp.skills || "Không điền"}</p>
              </div>

              <div className="rounded-xl bg-cobalt-50/70 p-3 mt-2">
                <p className="font-bold text-cobalt-950 mb-1">Lý do mong muốn tham gia:</p>
                <p className="whitespace-pre-line text-cobalt-700">{selectedApp.reason || "Không điền"}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-cobalt-100">
              <span className="text-xs font-semibold text-cobalt-500">
                Trạng thái: <strong>{selectedApp.status}</strong>
              </span>
              <Button size="sm" variant="cobalt" onClick={() => setSelectedApp(null)}>
                Đóng
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
