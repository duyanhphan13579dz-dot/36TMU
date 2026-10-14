import type { FormEvent } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui";
import { type AdminPost } from "@/data/adminStore";

interface AdminPostsTabProps {
  posts: AdminPost[];
  filteredPosts: AdminPost[];
  searchPost: string;
  onSearchChange: (val: string) => void;
  editingPostId: string | null;
  postTitle: string;
  onTitleChange: (val: string) => void;
  postCategory: string;
  onCategoryChange: (val: string) => void;
  postAuthor: string;
  onAuthorChange: (val: string) => void;
  postSummary: string;
  onSummaryChange: (val: string) => void;
  postContent: string;
  onContentChange: (val: string) => void;
  postImage: string;
  onImageChange: (val: string) => void;
  onSavePost: (e: FormEvent) => void;
  onStartEditPost: (p: AdminPost) => void;
  onCancelEditPost: () => void;
  onDeletePost: (id: string) => void;
  onTogglePinPost: (id: string) => void;
}

export default function AdminPostsTab({
  posts,
  filteredPosts,
  searchPost,
  onSearchChange,
  editingPostId,
  postTitle,
  onTitleChange,
  postCategory,
  onCategoryChange,
  postAuthor,
  onAuthorChange,
  postSummary,
  onSummaryChange,
  postContent,
  onContentChange,
  postImage,
  onImageChange,
  onSavePost,
  onStartEditPost,
  onCancelEditPost,
  onDeletePost,
  onTogglePinPost,
}: AdminPostsTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
            {editingPostId ? "✏️ Chỉnh Sửa Bài Viết / Thông Báo" : "📢 Đăng Thông Báo / Tin Tức Mới Lên Trang Chủ"}
          </h4>
          {editingPostId && (
            <button
              type="button"
              onClick={onCancelEditPost}
              className="rounded-lg bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
            >
              Hủy sửa
            </button>
          )}
        </div>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Bài viết sẽ xuất hiện ngay ở phần Sự kiện &amp; Tin tức của website.
        </p>

        <form onSubmit={onSavePost} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tiêu đề thông báo *</label>
            <input
              required
              value={postTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="VD: Thông báo lịch sinh hoạt chào đón tân sinh viên K60..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chuyên mục</label>
              <select
                value={postCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              >
                <option value="Thông báo khẩn">Thông báo khẩn</option>
                <option value="Hoạt động tình nguyện">Hoạt động tình nguyện</option>
                <option value="Chiến dịch Mùa Hè Xanh">Chiến dịch Mùa Hè Xanh</option>
                <option value="Chiến dịch Đông Ấm">Chiến dịch Đông Ấm</option>
                <option value="Âm Vang Xứ Thanh">Âm Vang Xứ Thanh</option>
                <option value="Tuyển quân & Đào tạo">Tuyển quân &amp; Đào tạo</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Người / Đơn vị phát ngôn</label>
              <input
                value={postAuthor}
                onChange={(e) => onAuthorChange(e.target.value)}
                placeholder="Ban Chủ nhiệm BLLSV TMU"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tóm tắt thông báo *</label>
            <textarea
              required
              rows={2}
              value={postSummary}
              onChange={(e) => onSummaryChange(e.target.value)}
              placeholder="Tóm tắt ngắn gọn 1-2 câu để người xem nắm được ý chính..."
              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Nội dung chi tiết</label>
            <textarea
              rows={3}
              value={postContent}
              onChange={(e) => onContentChange(e.target.value)}
              placeholder="Chi tiết địa điểm, thời gian, yêu cầu, danh sách tập trung..."
              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link hình ảnh minh họa (URL)</label>
            <input
              value={postImage}
              onChange={(e) => onImageChange(e.target.value)}
              placeholder="https://... hoặc để trống nếu dùng ảnh mặc định"
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {editingPostId && (
              <button
                type="button"
                onClick={onCancelEditPost}
                className="rounded-xl border border-cobalt-200 bg-white px-4 py-2 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
              >
                Hủy sửa
              </button>
            )}
            <Button variant="flame" type="submit">
              {editingPostId ? "💾 Cập nhật bài viết" : "📢 Đăng thông báo lên web ngay"}
            </Button>
          </div>
        </form>
      </div>

      {/* Danh sách thông báo đã đăng */}
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-display text-sm font-bold text-cobalt-900">
            Các bài đăng / thông báo đã phát hành ({posts.length})
          </h4>
          <input
            type="text"
            value={searchPost}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Tìm bài viết theo tiêu đề..."
            className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-64"
          />
        </div>

        <div className="mt-3 space-y-2.5">
          {filteredPosts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
              {searchPost ? "Không tìm thấy bài viết nào phù hợp từ khóa tìm kiếm." : "Chưa có bài đăng tùy chỉnh nào từ Admin."}
            </p>
          ) : (
            filteredPosts.map((p) => (
              <div
                key={p.id}
                className={cn(
                  "flex items-start justify-between gap-3 rounded-2xl border p-3.5 shadow-2xs transition",
                  p.pinned ? "border-amber-300 bg-amber-50/40" : "border-cobalt-100 bg-white"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-flame-100 px-2 py-0.5 text-[10px] font-bold text-flame-700">
                      {p.category}
                    </span>
                    {p.pinned && (
                      <span className="rounded bg-amber-500 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                        📌 Đã ghim
                      </span>
                    )}
                    <span className="text-[11px] text-cobalt-500">{p.createdAt}</span>
                    <span className="text-[11px] font-medium text-cobalt-700">bởi {p.author}</span>
                  </div>
                  <h5 className="mt-1 font-display text-sm font-bold text-cobalt-950">{p.title}</h5>
                  <p className="mt-0.5 text-xs text-cobalt-700 line-clamp-2">{p.summary}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onTogglePinPost(p.id)}
                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs hover:bg-amber-50"
                    title={p.pinned ? "Bỏ ghim" : "Ghim lên đầu"}
                  >
                    📌
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartEditPost(p)}
                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                    title="Chỉnh sửa bài viết"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeletePost(p.id)}
                    className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100"
                    title="Xóa bài viết"
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
