import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import {
  DEFAULT_BROADCAST,
  saveStoredAdminBroadcast,
  type AdminBroadcast,
} from "@/data/adminStore";

interface AdminBroadcastTabProps {
  broadcast: AdminBroadcast;
  onBroadcastChange: (data: AdminBroadcast) => void;
  onToast: (msg: string) => void;
  userDept?: string;
}

export default function AdminBroadcastTab({
  broadcast,
  onBroadcastChange,
  onToast,
  userDept,
}: AdminBroadcastTabProps) {
  const [formData, setFormData] = useState<AdminBroadcast>(broadcast);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updated: AdminBroadcast = {
      ...formData,
      updatedAt: new Date().toLocaleDateString("vi-VN"),
      updatedBy: userDept || "Đội SVTN & Ban Truyền thông",
    };
    onBroadcastChange(updated);
    saveStoredAdminBroadcast(updated);
    onToast(
      updated.enabled
        ? "📢 Đã phát thông báo khẩn cấp lên đầu website!"
        : "ℹ️ Đã ẩn thanh thông báo trên website!"
    );
  };

  const handleReset = () => {
    setFormData(DEFAULT_BROADCAST);
    onBroadcastChange(DEFAULT_BROADCAST);
    saveStoredAdminBroadcast(DEFAULT_BROADCAST);
    onToast("Đã khôi phục thông báo mặc định!");
  };

  return (
    <div className="space-y-6">
      {/* Giới thiệu & Thẻ phân quyền */}
      <div className="rounded-2xl border border-flame-200 bg-flame-50/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            📢 Phát Sóng Thông Báo Khẩn Cấp (Hero Banner Broadcast)
          </h4>
          <span className="rounded-full bg-flame-500/15 px-3 py-0.5 text-[11px] font-bold text-flame-700">
            Quản trị: Đội SVTN &amp; Ban Truyền thông
          </span>
        </div>
        <p className="mt-1 text-xs text-cobalt-700/80">
          Thông báo được ghim ở vị trí cao nhất trên website (ngay phía trên thanh điều hướng), thu hút 100% sự chú ý của sinh viên và khách truy cập.
        </p>
      </div>

      {/* Xem trước Live Preview */}
      <div>
        <p className="mb-2 text-xs font-bold text-cobalt-800 uppercase tracking-wider">
          Xem trước hiển thị thực tế:
        </p>
        <div
          className={`flex flex-wrap items-center justify-between gap-3 rounded-2xl p-3.5 sm:px-5 sm:py-3.5 shadow-sm transition-all ${
            formData.type === "emergency"
              ? "bg-red-600 text-white"
              : formData.type === "warning"
              ? "bg-amber-500 text-slate-950 font-medium"
              : formData.type === "success"
              ? "bg-emerald-600 text-white"
              : "bg-cobalt-900 text-white"
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-lg shrink-0">
              {formData.type === "emergency"
                ? "🚨"
                : formData.type === "warning"
                ? "⚠️"
                : formData.type === "success"
                ? "🎉"
                : "📢"}
            </span>
            <div className="min-w-0">
              <span className="font-extrabold text-[12.5px] mr-2">
                {formData.title || "Tiêu đề thông báo..."}
              </span>
              <span className="text-[12px] opacity-90">
                {formData.message || "Nội dung thông báo chi tiết..."}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {formData.actionLabel && (
              <span className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold underline">
                {formData.actionLabel} →
              </span>
            )}
            <span className="text-xs opacity-75">✕</span>
          </div>
        </div>
        {!formData.enabled && (
          <p className="mt-1.5 text-center text-xs font-semibold text-rose-600">
            ⚠️ Thanh thông báo hiện đang ở trạng thái TẮT (Chưa hiển thị ra trang chủ).
          </p>
        )}
      </div>

      {/* Form cấu hình */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-cobalt-100 bg-white p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-cobalt-100 pb-3">
          <div>
            <label className="text-sm font-bold text-cobalt-950">Trạng thái phát sóng</label>
            <p className="text-xs text-cobalt-500">Ghim thông báo lên trang chủ ngay lập tức</p>
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              formData.enabled ? "bg-flame-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                formData.enabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Mức độ thông báo *</label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value as AdminBroadcast["type"],
                })
              }
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            >
              <option value="emergency">🚨 Khẩn cấp (Đỏ - Cứu trợ, hoãn lịch khẩn)</option>
              <option value="warning">⚠️ Chú ý (Vàng/Cam - Nhắc hạn chót, tập huấn)</option>
              <option value="info">📢 Tin tức chung (Xanh đậm TMU - Lịch sinh hoạt)</option>
              <option value="success">🎉 Chúc mừng / Tin vui (Xanh lục - Thành tích, tân SV)</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tiêu đề ngắn gọn *</label>
            <input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="VD: Thông báo lịch sinh hoạt / Đợt tuyển quân K62"
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-cobalt-800">Nội dung chi tiết *</label>
          <textarea
            required
            rows={2}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Nội dung truyền đạt súc tích đến các tình nguyện viên và sinh viên..."
            className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhãn nút hành động (Tùy chọn)</label>
            <input
              value={formData.actionLabel || ""}
              onChange={(e) => setFormData({ ...formData, actionLabel: e.target.value })}
              placeholder="VD: Xem chi tiết, Đăng ký ngay"
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link liên kết nút bấm</label>
            <input
              value={formData.actionLink || ""}
              onChange={(e) => setFormData({ ...formData, actionLink: e.target.value })}
              placeholder="VD: #events, #contact, https://..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-cobalt-100 pt-3">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-cobalt-600 underline hover:text-cobalt-950"
          >
            Khôi phục thông báo mẫu
          </button>
          <Button variant="flame" type="submit">
            💾 Lưu &amp; Cập Nhật Phát Sóng
          </Button>
        </div>
      </form>
    </div>
  );
}
