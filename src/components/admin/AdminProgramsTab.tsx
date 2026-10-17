import type { FormEvent } from "react";
import { Button } from "@/components/ui";
import { type AdminProgram } from "@/data/adminStore";

interface AdminProgramsTabProps {
  programs: AdminProgram[];
  filteredPrograms: AdminProgram[];
  searchProg: string;
  onSearchChange: (val: string) => void;
  editingProgId: string | null;
  progTitle: string;
  onTitleChange: (val: string) => void;
  progCategory: AdminProgram["category"];
  onCategoryChange: (val: AdminProgram["category"]) => void;
  progStatus: AdminProgram["status"];
  onStatusChange: (val: AdminProgram["status"]) => void;
  progDateLabel: string;
  onDateLabelChange: (val: string) => void;
  progLocation: string;
  onLocationChange: (val: string) => void;
  progExcerpt: string;
  onExcerptChange: (val: string) => void;
  progCover: string;
  onCoverChange: (val: string) => void;
  progDriveLink: string;
  onDriveLinkChange: (val: string) => void;
  onSaveProgram: (e: FormEvent) => void;
  onStartEditProgram: (p: AdminProgram) => void;
  onCancelEditProgram: () => void;
  onDeleteProgram: (id: string) => void;
  onQuickChangeStatus: (id: string, newStatus: AdminProgram["status"]) => void;
  onLoadDefaultPrograms?: () => void;
}

export default function AdminProgramsTab({
  programs,
  filteredPrograms,
  searchProg,
  onSearchChange,
  editingProgId,
  progTitle,
  onTitleChange,
  progCategory,
  onCategoryChange,
  progStatus,
  onStatusChange,
  progDateLabel,
  onDateLabelChange,
  progLocation,
  onLocationChange,
  progExcerpt,
  onExcerptChange,
  progCover,
  onCoverChange,
  progDriveLink,
  onDriveLinkChange,
  onSaveProgram,
  onStartEditProgram,
  onCancelEditProgram,
  onDeleteProgram,
  onQuickChangeStatus,
  onLoadDefaultPrograms,
}: AdminProgramsTabProps) {
  const isGoogleDriveLink = (url: string) => {
    if (!url) return true;
    return url.includes("drive.google.com") || url.includes("photos.app.goo.gl") || url.includes("photos.google.com");
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            {editingProgId ? "✏️ Chỉnh Sửa Chương Trình & Link Drive Ảnh" : "🎯 Cập Nhật Chương Trình / Sự Kiện Mới"}
          </h4>
          {editingProgId && (
            <button
              type="button"
              onClick={onCancelEditProgram}
              className="rounded-lg bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
            >
              Hủy sửa
            </button>
          )}
        </div>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Thêm chiến dịch tình nguyện mới, giải thể thao hoặc ngày hội của Ban liên lạc, đính kèm link kho ảnh Google Drive cho tình nguyện viên.
        </p>

        <form onSubmit={onSaveProgram} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tên chương trình / Sự kiện *</label>
            <input
              required
              value={progTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="VD: Chiến dịch Mùa Hè Xanh 2027 – Hành trình về bản Mường..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chuyên mục</label>
              <select
                value={progCategory}
                onChange={(e) => onCategoryChange(e.target.value as AdminProgram["category"])}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              >
                <option value="Tình nguyện">Tình nguyện</option>
                <option value="Hội đồng hương">Hội đồng hương</option>
                <option value="Chào tân sinh viên">Chào tân sinh viên</option>
                <option value="Chiến dịch Mùa Hè Xanh">Chiến dịch Mùa Hè Xanh</option>
                <option value="Chiến dịch Đông Ấm">Chiến dịch Đông Ấm</option>
                <option value="Âm Vang Xứ Thanh">Âm Vang Xứ Thanh</option>
                <option value="Đào tạo & Gắn kết">Đào tạo &amp; Gắn kết</option>
                <option value="Truyền thông & Đời sống">Truyền thông &amp; Đời sống</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Trạng thái</label>
              <select
                value={progStatus}
                onChange={(e) => onStatusChange(e.target.value as AdminProgram["status"])}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              >
                <option value="Mới đăng">Mới đăng</option>
                <option value="Đang mở đăng ký">Đang mở đăng ký</option>
                <option value="Sắp diễn ra">Sắp diễn ra</option>
                <option value="Đã kết thúc">Đã kết thúc</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Thời gian diễn ra</label>
              <input
                value={progDateLabel}
                onChange={(e) => onDateLabelChange(e.target.value)}
                placeholder="VD: 15/07 – 28/07"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Địa điểm tổ chức</label>
              <input
                value={progLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                placeholder="VD: Huyện Bá Thước, Thanh Hóa"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Link ảnh bìa chương trình</label>
              <input
                value={progCover}
                onChange={(e) => onCoverChange(e.target.value)}
                placeholder="https://images.unsplash.com/... hoặc để trống"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          {/* Ô nhập Link Google Drive */}
          <div className="rounded-xl border border-flame-200 bg-flame-50/50 p-3 sm:p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
              <label className="block text-xs font-extrabold text-flame-900">
                📂 Link Google Drive Ảnh (Kho ảnh kỷ niệm của chương trình)
              </label>
              {progDriveLink && (
                <a
                  href={progDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-flame-600 hover:text-flame-800 underline"
                >
                  🔗 Mở thử link Drive ↗
                </a>
              )}
            </div>
            <input
              value={progDriveLink}
              onChange={(e) => onDriveLinkChange(e.target.value)}
              placeholder="VD: https://drive.google.com/drive/folders/1kZ8TGJfj5... hoặc Google Photos"
              className="w-full rounded-xl border border-flame-300 bg-white px-3 py-2 text-xs font-medium text-cobalt-950 outline-none focus:border-flame-500 focus:ring-2 focus:ring-flame-200"
            />
            {progDriveLink && !isGoogleDriveLink(progDriveLink) && (
              <p className="mt-1 text-[11px] font-bold text-amber-600">
                ⚠️ Cảnh báo: Đường link có vẻ không thuộc Google Drive hoặc Google Photos. Hãy kiểm tra lại.
              </p>
            )}
            <p className="mt-1 text-[11px] text-cobalt-600">
              💡 <strong>Lưu ý quan trọng cho BCH:</strong> Hãy chắc chắn thư mục Drive đã được cấp quyền: <em>"Bất kỳ ai có đường liên kết đều có thể xem" (Anyone with the link can view)</em> để tình nguyện viên có thể tải ảnh.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Mô tả tóm tắt chương trình *</label>
            <textarea
              required
              rows={2}
              value={progExcerpt}
              onChange={(e) => onExcerptChange(e.target.value)}
              placeholder="Mô tả mục tiêu, ý nghĩa và các hoạt động chính trong chương trình..."
              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {editingProgId && (
              <button
                type="button"
                onClick={onCancelEditProgram}
                className="rounded-xl border border-cobalt-200 bg-white px-4 py-2 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
              >
                Hủy sửa
              </button>
            )}
            <Button variant="flame" type="submit">
              {editingProgId ? "💾 Cập nhật chương trình & Drive" : "🎯 Lưu chương trình mới vào web"}
            </Button>
          </div>
        </form>
      </div>

      {/* Danh sách chương trình đã thêm */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <h4 className="font-display text-sm font-bold text-cobalt-900">
              Chương trình trong hệ thống ({programs.length})
            </h4>
            {onLoadDefaultPrograms && (
              <button
                type="button"
                onClick={onLoadDefaultPrograms}
                className="rounded-lg border border-cobalt-200 bg-cobalt-50 px-2 py-1 text-[11px] font-bold text-cobalt-700 hover:bg-cobalt-100 transition"
                title="Nạp các chương trình thường niên chính thức để sửa link Drive"
              >
                📥 Nạp chương trình mẫu
              </button>
            )}
          </div>
          <input
            type="text"
            value={searchProg}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Tìm chương trình..."
            className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-64"
          />
        </div>

        <div className="mt-3 space-y-2.5">
          {filteredPrograms.length === 0 ? (
            <div className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500 space-y-2">
              <p>{searchProg ? "Không tìm thấy chương trình nào phù hợp." : "Chưa có chương trình tùy biến nào được thêm. Hệ thống đang hiển thị các chương trình chính thức từ mã nguồn."}</p>
              {onLoadDefaultPrograms && !searchProg && (
                <button
                  type="button"
                  onClick={onLoadDefaultPrograms}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-flame-500 px-3 py-1.5 text-xs font-bold text-white shadow-soft hover:bg-flame-600 transition"
                >
                  📥 Nạp 4 chương trình chính thức vào để thêm/sửa link Drive ngay
                </button>
              )}
            </div>
          ) : (
            filteredPrograms.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-cobalt-800 px-2 py-0.5 text-[10px] font-bold text-white">
                      {p.category}
                    </span>
                    <select
                      value={p.status}
                      onChange={(e) => onQuickChangeStatus(p.id, e.target.value as AdminProgram["status"])}
                      className="rounded bg-flame-50 border border-flame-200 px-1.5 py-0.5 text-[10px] font-bold text-flame-700 outline-none cursor-pointer"
                    >
                      <option value="Mới đăng">Mới đăng</option>
                      <option value="Đang mở đăng ký">Đang mở đăng ký</option>
                      <option value="Sắp diễn ra">Sắp diễn ra</option>
                      <option value="Đã kết thúc">Đã kết thúc</option>
                    </select>
                    <span className="text-[11px] text-cobalt-500">📍 {p.location}</span>
                    <span className="text-[11px] text-cobalt-400">🕒 {p.dateLabel}</span>
                    {/* Badge Google Drive */}
                    {p.driveLink ? (
                      <a
                        href={p.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100"
                        title="Mở thư mục Google Drive ảnh"
                      >
                        📂 Có Drive ảnh ↗
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                        Chưa có link Drive
                      </span>
                    )}
                  </div>
                  <h5 className="mt-1 font-display text-sm font-bold text-cobalt-950">{p.title}</h5>
                  <p className="text-xs text-cobalt-600 line-clamp-1">{p.excerpt}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onStartEditProgram(p)}
                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                    title="Chỉnh sửa chương trình"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProgram(p.id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100"
                    title="Xóa chương trình"
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
