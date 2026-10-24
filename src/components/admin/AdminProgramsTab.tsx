import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import { type AdminProgram, PROGRAM_TEASER_PRESETS } from "@/data/adminStore";

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
  onQuickUpdateDrive?: (id: string, newDrive: string) => void;
  onQuickUpdateCover?: (id: string, newCover: string) => void;
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
  onQuickUpdateDrive,
  onQuickUpdateCover,
}: AdminProgramsTabProps) {
  const [driveFilter, setDriveFilter] = useState<"all" | "has_drive" | "no_drive">("all");
  const [quickDriveModalProg, setQuickDriveModalProg] = useState<AdminProgram | null>(null);
  const [quickDriveInput, setQuickDriveInput] = useState("");
  const [quickCoverModalProg, setQuickCoverModalProg] = useState<AdminProgram | null>(null);
  const [quickCoverInput, setQuickCoverInput] = useState("");

  const isGoogleDriveLink = (url: string) => {
    if (!url) return true;
    return (
      url.includes("drive.google.com") ||
      url.includes("photos.app.goo.gl") ||
      url.includes("photos.google.com")
    );
  };

  // Filter programs based on Drive status as well
  const displayedPrograms = filteredPrograms.filter((p) => {
    if (driveFilter === "has_drive") return Boolean(p.driveLink && p.driveLink.trim().length > 0);
    if (driveFilter === "no_drive") return !p.driveLink || p.driveLink.trim().length === 0;
    return true;
  });

  const totalWithDrive = programs.filter((p) => Boolean(p.driveLink && p.driveLink.trim().length > 0)).length;
  const totalWithoutDrive = programs.length - totalWithDrive;

  const handleOpenQuickDrive = (p: AdminProgram) => {
    setQuickDriveModalProg(p);
    setQuickDriveInput(p.driveLink || "");
  };

  const handleSaveQuickDrive = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickDriveModalProg || !onQuickUpdateDrive) return;
    onQuickUpdateDrive(quickDriveModalProg.id, quickDriveInput.trim());
    setQuickDriveModalProg(null);
    setQuickDriveInput("");
  };

  const handleOpenQuickCover = (p: AdminProgram) => {
    setQuickCoverModalProg(p);
    setQuickCoverInput(p.cover || "");
  };

  const handleSaveQuickCover = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickCoverModalProg || !onQuickUpdateCover) return;
    onQuickUpdateCover(quickCoverModalProg.id, quickCoverInput.trim());
    setQuickCoverModalProg(null);
    setQuickCoverInput("");
  };

  return (
    <div className="space-y-6">
      {/* DRIVE PHOTO HUB STRIP */}
      <div className="rounded-2xl border border-sky-100 bg-gradient-to-r from-sky-50/80 to-blue-50/50 p-4 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-600 text-sm text-white shadow-xs">
                📂
              </span>
              <h4 className="font-display text-sm font-bold text-sky-950">
                Drive Photo Hub – Quản Lý Kho Ảnh Chương Trình
              </h4>
            </div>
            <p className="mt-1 text-xs text-sky-800">
              Gắn link Google Drive / Photos cho từng chương trình để tình nguyện viên và sinh viên dễ dàng xem và tải ảnh chất lượng cao.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-xl bg-white px-2.5 py-1 text-xs font-bold text-sky-900 border border-sky-200">
              📊 Tổng: {programs.length}
            </span>
            <span className="inline-flex items-center gap-1 rounded-xl bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
              ✅ Có Drive: {totalWithDrive}
            </span>
            <span className="inline-flex items-center gap-1 rounded-xl bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800 border border-amber-300">
              ⏳ Chưa có: {totalWithoutDrive}
            </span>
          </div>
        </div>
      </div>

      {/* FORM TẠO / SỬA CHƯƠNG TRÌNH */}
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            {editingProgId ? "✏️ Chỉnh Sửa Chương Trình, Teaser & Link Drive" : "🎯 Cập Nhật Chương Trình / Sự Kiện Mới"}
          </h4>
          {editingProgId && (
            <button
              type="button"
              onClick={onCancelEditProgram}
              className="rounded-lg bg-cobalt-200 px-2.5 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300 transition"
            >
              Hủy sửa
            </button>
          )}
        </div>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Ban Chấp Hành có quyền chỉnh sửa toàn diện tên, chuyên mục, ngày giờ, ảnh teaser đại diện và link Drive kho ảnh kỷ niệm.
        </p>

        <form onSubmit={onSaveProgram} className="mt-4 space-y-3.5">
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

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Địa điểm tổ chức</label>
            <input
              value={progLocation}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="VD: Huyện Bá Thước, Thanh Hóa"
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          {/* STUDIO CHỈNH SỬA ẢNH TEASER & PREVIEW */}
          <div className="rounded-xl border border-purple-200 bg-purple-50/40 p-3 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1.5">
              <label className="block text-xs font-extrabold text-purple-950">
                🖼️ Ảnh Teaser / Ảnh Bìa Đại Diện (Tỉ lệ 16:9 sắc nét)
              </label>
              {progCover && (
                <a
                  href={progCover}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-purple-600 hover:text-purple-800 underline"
                >
                  Mở ảnh gốc ↗
                </a>
              )}
            </div>

            <input
              value={progCover}
              onChange={(e) => onCoverChange(e.target.value)}
              placeholder="Dán link ảnh https://images.unsplash.com/... hoặc chọn từ kho mẫu bên dưới"
              className="w-full rounded-xl border border-purple-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            {/* Bộ chọn ảnh mẫu Presets */}
            <div className="mt-2.5">
              <span className="text-[11px] font-bold text-purple-900 block mb-1">
                ⚡ Chọn nhanh ảnh Teaser mẫu chất lượng cao cho phong trào 36:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PROGRAM_TEASER_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => onCoverChange(preset.url)}
                    className="rounded-lg border border-purple-200 bg-white px-2 py-1 text-[10.5px] font-medium text-purple-800 hover:bg-purple-100 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Khung Live Preview Ảnh Teaser */}
            {progCover && (
              <div className="mt-3 flex flex-col sm:flex-row gap-3 items-center rounded-xl border border-purple-100 bg-white p-2.5">
                <div className="relative h-24 w-full sm:w-44 shrink-0 overflow-hidden rounded-lg bg-cobalt-100 shadow-2xs">
                  <img
                    src={progCover}
                    alt="Teaser preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                  <span className="absolute top-1 left-1 rounded bg-black/60 px-1 py-0.5 text-[9px] font-bold text-white">
                    16:9 Preview
                  </span>
                </div>
                <div className="min-w-0 flex-1 text-xs text-cobalt-600 space-y-1">
                  <p className="font-bold text-cobalt-900">Xem trước hiển thị thẻ Teaser</p>
                  <p className="text-[11px] line-clamp-2">
                    {progTitle || "Tiêu đề chương trình..."} • {progCategory}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold">✓ Đã nạp đường dẫn ảnh thành công</p>
                </div>
              </div>
            )}
          </div>

          {/* Ô NHẬP LINK GOOGLE DRIVE KHO ẢNH */}
          <div className="rounded-xl border border-flame-200 bg-flame-50/50 p-3 sm:p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
              <label className="block text-xs font-extrabold text-flame-900">
                📂 Link Google Drive Ảnh (Kho ảnh kỷ niệm của chương trình)
              </label>
              {progDriveLink && (
                <div className="flex items-center gap-2">
                  <a
                    href={progDriveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-flame-600 hover:text-flame-800 underline"
                  >
                    🔗 Mở thử link Drive ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => onDriveLinkChange("")}
                    className="text-[11px] text-red-600 hover:underline font-semibold"
                  >
                    Gỡ link
                  </button>
                </div>
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
              💡 <strong>Lưu ý cho BCH:</strong> Đảm bảo thư mục Drive đã được chọn quyền:{" "}
              <em>"Bất kỳ ai có đường liên kết đều có thể xem" (Anyone with the link can view)</em> để mọi người có thể xem và tải ảnh.
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
              {editingProgId ? "💾 Cập nhật chương trình, Teaser & Drive" : "🎯 Lưu chương trình mới vào web"}
            </Button>
          </div>
        </form>
      </div>

      {/* DANH SÁCH CHƯƠNG TRÌNH VÀ BỘ LỌC LINK DRIVE */}
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

          <div className="flex flex-wrap items-center gap-2">
            {/* Bộ lọc Drive */}
            <div className="flex items-center rounded-xl bg-cobalt-100/70 p-0.5 text-[11px] font-semibold text-cobalt-700">
              <button
                type="button"
                onClick={() => setDriveFilter("all")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  driveFilter === "all" ? "bg-white text-cobalt-950 shadow-2xs font-bold" : "hover:text-cobalt-900"
                }`}
              >
                Tất cả
              </button>
              <button
                type="button"
                onClick={() => setDriveFilter("has_drive")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  driveFilter === "has_drive" ? "bg-emerald-600 text-white shadow-2xs font-bold" : "hover:text-cobalt-900"
                }`}
              >
                Có Drive ({totalWithDrive})
              </button>
              <button
                type="button"
                onClick={() => setDriveFilter("no_drive")}
                className={`rounded-lg px-2.5 py-1 transition ${
                  driveFilter === "no_drive" ? "bg-amber-600 text-white shadow-2xs font-bold" : "hover:text-cobalt-900"
                }`}
              >
                Chưa Drive ({totalWithoutDrive})
              </button>
            </div>

            <input
              type="text"
              value={searchProg}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="🔍 Tìm chương trình..."
              className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-48"
            />
          </div>
        </div>

        <div className="mt-3 space-y-2.5">
          {displayedPrograms.length === 0 ? (
            <div className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500 space-y-2">
              <p>
                {searchProg || driveFilter !== "all"
                  ? "Không tìm thấy chương trình nào phù hợp với bộ lọc hiện tại."
                  : "Chưa có chương trình tùy biến nào được thêm. Hệ thống đang hiển thị các chương trình chính thức từ mã nguồn."}
              </p>
              {onLoadDefaultPrograms && !searchProg && driveFilter === "all" && (
                <button
                  type="button"
                  onClick={onLoadDefaultPrograms}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-flame-500 px-3 py-1.5 text-xs font-bold text-white shadow-soft hover:bg-flame-600 transition"
                >
                  📥 Nạp 4 chương trình chính thức vào để thêm/sửa link Drive &amp; Teaser
                </button>
              )}
            </div>
          ) : (
            displayedPrograms.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-2xs sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Ảnh thumbnail Teaser nhỏ */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-cobalt-100 border border-cobalt-200/80">
                    <img
                      src={p.cover || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&q=80"}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded bg-cobalt-800 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                        {p.category}
                      </span>
                      <select
                        value={p.status}
                        onChange={(e) => onQuickChangeStatus(p.id, e.target.value as AdminProgram["status"])}
                        className="rounded bg-flame-50 border border-flame-200 px-1.5 py-0.5 text-[9.5px] font-bold text-flame-700 outline-none cursor-pointer"
                      >
                        <option value="Mới đăng">Mới đăng</option>
                        <option value="Đang mở đăng ký">Đang mở đăng ký</option>
                        <option value="Sắp diễn ra">Sắp diễn ra</option>
                        <option value="Đã kết thúc">Đã kết thúc</option>
                      </select>
                      <span className="text-[10.5px] text-cobalt-500">📍 {p.location}</span>
                      <span className="text-[10.5px] text-cobalt-400">🕒 {p.dateLabel}</span>

                      {/* Badge Google Drive */}
                      {p.driveLink ? (
                        <a
                          href={p.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-100"
                          title="Mở thư mục Google Drive ảnh"
                        >
                          📂 Mở Drive ↗
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-50 border border-amber-200 px-1.5 py-0.5 text-[9.5px] font-semibold text-amber-700">
                          Chưa có Drive
                        </span>
                      )}
                    </div>
                    <h5 className="mt-0.5 font-display text-sm font-bold text-cobalt-950 line-clamp-1">{p.title}</h5>
                    <p className="text-xs text-cobalt-600 line-clamp-1">{p.excerpt}</p>
                  </div>
                </div>

                {/* Các nút hành động nâng cao cho BCH */}
                <div className="flex shrink-0 flex-wrap items-center gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-cobalt-100">
                  {onQuickUpdateDrive && (
                    <button
                      type="button"
                      onClick={() => handleOpenQuickDrive(p)}
                      className="rounded-lg border border-sky-200 bg-sky-50 px-2 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 transition"
                      title="Chỉnh sửa hoặc thêm link Google Drive nhanh"
                    >
                      📁 Drive
                    </button>
                  )}
                  {onQuickUpdateCover && (
                    <button
                      type="button"
                      onClick={() => handleOpenQuickCover(p)}
                      className="rounded-lg border border-purple-200 bg-purple-50 px-2 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-100 transition"
                      title="Đổi nhanh ảnh Teaser bìa"
                    >
                      🖼️ Teaser
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onStartEditProgram(p)}
                    className="rounded-lg border border-cobalt-200 bg-white px-2 py-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                    title="Chỉnh sửa toàn bộ thông tin"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProgram(p.id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100"
                    title="Xóa chương trình"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* MODAL SỬA NHANH LINK GOOGLE DRIVE */}
      {quickDriveModalProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-cobalt-100">
            <h4 className="font-display text-sm font-black text-cobalt-950">
              📂 Cập Nhật Link Google Drive Ảnh
            </h4>
            <p className="mt-1 text-xs text-cobalt-600">
              Chiến dịch: <strong>{quickDriveModalProg.title}</strong>
            </p>

            <form onSubmit={handleSaveQuickDrive} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-cobalt-800 mb-1">
                  Đường liên kết thư mục Google Drive / Album Google Photos
                </label>
                <input
                  type="url"
                  value={quickDriveInput}
                  onChange={(e) => setQuickDriveInput(e.target.value)}
                  placeholder="https://drive.google.com/drive/folders/..."
                  className="w-full rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-sky-500"
                />
              </div>

              {quickDriveInput && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <a
                    href={quickDriveInput}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-600 hover:underline font-bold text-[11px]"
                  >
                    🔗 Mở thử link Drive ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setQuickDriveInput("")}
                    className="text-red-500 hover:underline text-[11px]"
                  >
                    Gỡ link
                  </button>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuickDriveModalProg(null)}
                  className="rounded-xl border border-cobalt-200 px-3 py-1.5 text-xs font-bold text-cobalt-700"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-sky-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-sky-700"
                >
                  Lưu link Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL ĐỔI NHANH ẢNH TEASER */}
      {quickCoverModalProg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl border border-cobalt-100">
            <h4 className="font-display text-sm font-black text-cobalt-950">
              🖼️ Đổi Nhanh Ảnh Teaser / Bìa Đại Diện
            </h4>
            <p className="mt-1 text-xs text-cobalt-600">
              Chiến dịch: <strong>{quickCoverModalProg.title}</strong>
            </p>

            <form onSubmit={handleSaveQuickCover} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-cobalt-800 mb-1">
                  Đường liên kết ảnh trực tuyến (16:9)
                </label>
                <input
                  type="url"
                  value={quickCoverInput}
                  onChange={(e) => setQuickCoverInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-purple-500"
                />
              </div>

              {quickCoverInput && (
                <div className="h-28 w-full overflow-hidden rounded-xl bg-cobalt-100 border border-cobalt-200">
                  <img
                    src={quickCoverInput}
                    alt="Teaser preview"
                    className="h-full w-full object-cover"
                    onError={(e) => ((e.target as HTMLElement).style.display = "none")}
                  />
                </div>
              )}

              {/* Presets nhanh */}
              <div>
                <span className="text-[11px] font-bold text-cobalt-700 block mb-1">
                  Gợi ý ảnh chủ đề phong trào 36:
                </span>
                <div className="flex flex-wrap gap-1">
                  {PROGRAM_TEASER_PRESETS.slice(0, 4).map((pr) => (
                    <button
                      key={pr.label}
                      type="button"
                      onClick={() => setQuickCoverInput(pr.url)}
                      className="rounded bg-purple-50 border border-purple-200 px-1.5 py-0.5 text-[10px] text-purple-800 hover:bg-purple-100"
                    >
                      {pr.label.split("–")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setQuickCoverModalProg(null)}
                  className="rounded-xl border border-cobalt-200 px-3 py-1.5 text-xs font-bold text-cobalt-700"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-purple-700"
                >
                  Cập nhật ảnh Teaser
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
