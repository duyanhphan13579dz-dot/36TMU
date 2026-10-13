import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui";
import { getStoredNotes, saveStoredNotes, type TnvNote } from "@/components/TnvNoteBoard";

export type AdminPost = {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
};

const POSTS_KEY = "bllsv_admin_posts";
const ADMIN_PIN = "36tmu"; // Mật khẩu Admin mặc định

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
  } catch {
    // Ignore storage quota
  }
}

export default function AdminPanel({
  isAdmin,
  onLogin,
  onLogout,
  onToast,
  onPostCreated,
}: {
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
  onToast: (msg: string) => void;
  onPostCreated?: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"create_post" | "manage_notes" | "settings">("create_post");

  // Form đăng bài
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Hoạt động tình nguyện");
  const [postAuthor, setPostAuthor] = useState("Ban Chủ nhiệm BLLSV TMU");
  const [postSummary, setPostSummary] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");

  // Notes
  const [notes, setNotes] = useState<TnvNote[]>([]);

  useEffect(() => {
    if (showModal && isAdmin) {
      setNotes(getStoredNotes());
    }
  }, [showModal, isAdmin]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === ADMIN_PIN) {
      onLogin();
      setPinError(false);
      setPinInput("");
      onToast("Đăng nhập quyền Quản Trị Viên thành công! 🔐");
    } else {
      setPinError(true);
      onToast("Mật khẩu Admin không đúng, vui lòng thử lại!");
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postSummary.trim()) return;

    const newPost: AdminPost = {
      id: "post-" + Date.now(),
      title: postTitle.trim(),
      category: postCategory,
      author: postAuthor.trim(),
      summary: postSummary.trim(),
      content: postContent.trim(),
      imageUrl: postImage.trim() || undefined,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    const currentPosts = getStoredAdminPosts();
    saveStoredAdminPosts([newPost, ...currentPosts]);

    setPostTitle("");
    setPostSummary("");
    setPostContent("");
    setPostImage("");
    onToast("Đã đăng bài viết mới lên website thành công! 🚀");
    onPostCreated?.();
  };

  const handleDeleteNote = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã xóa ghi chú của TNV khỏi hệ thống 🗑️");
  };

  const handleTogglePin = (id: string) => {
    const next = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã cập nhật trạng thái ghim ghi chú 📌");
  };

  return (
    <>
      {/* Nút mở Admin Panel trên thanh bar */}
      <button
        onClick={() => setShowModal(true)}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition shadow-xs",
          isAdmin
            ? "border-red-400 bg-red-600 text-white shadow-soft hover:bg-red-700 animate-pulse"
            : "border-cobalt-200 bg-white text-cobalt-800 hover:border-flame-400 hover:text-flame-600",
        )}
      >
        <span>{isAdmin ? "⚙️" : "🔐"}</span>
        <span>{isAdmin ? "Bản Admin (Đang mở)" : "Quản trị viên"}</span>
      </button>

      {/* Modal Quản Trị / Đăng Nhập */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cobalt-950/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-cobalt-200 bg-white p-6 shadow-lift sm:p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-cobalt-100 text-cobalt-700 hover:bg-cobalt-200"
            >
              ✕
            </button>

            {!isAdmin ? (
              /* MÀN HÌNH ĐĂNG NHẬP ADMIN */
              <div className="text-center">
                <span className="flex h-16 w-16 mx-auto items-center justify-center rounded-3xl bg-flame-100 text-3xl">
                  🔐
                </span>
                <h3 className="mt-3 font-display text-xl font-black text-cobalt-950 sm:text-2xl">
                  Đăng Nhập Bản Quản Trị Viên
                </h3>
                <p className="mt-1 text-xs text-cobalt-600 max-w-sm mx-auto">
                  Dành riêng cho Ban Chủ nhiệm &amp; Đội SVTN để đăng bài, cập nhật thông tin và quản lý ghi chú TNV.
                </p>

                <form onSubmit={handleLoginSubmit} className="mt-6 max-w-xs mx-auto space-y-4">
                  <div>
                    <input
                      type="password"
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="Nhập mật khẩu Admin..."
                      className={cn(
                        "w-full rounded-2xl border px-4 py-2.5 text-center text-sm font-semibold text-cobalt-950 outline-none transition",
                        pinError ? "border-red-500 bg-red-50" : "border-cobalt-300 focus:border-flame-500 focus:ring-2 focus:ring-flame-100",
                      )}
                    />
                    {pinError && (
                      <p className="mt-1 text-[11px] text-red-600 font-bold">
                        Sai mật khẩu! Gợi ý: mật khẩu mặc định là 36tmu
                      </p>
                    )}
                  </div>

                  <Button variant="flame" className="w-full" type="submit">
                    Xác nhận đăng nhập
                  </Button>
                </form>

                <p className="mt-4 text-[11px] text-cobalt-500">
                  Mật khẩu mặc định hệ thống: <strong className="text-cobalt-800 font-mono">36tmu</strong>
                </p>
              </div>
            ) : (
              /* BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN */
              <div>
                <div className="flex items-center justify-between border-b border-cobalt-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-xl text-red-600 font-bold">
                      ⚙️
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-black text-cobalt-950 sm:text-xl">
                        Bảng Quản Trị BLLSV TMU
                      </h3>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                        Đang hoạt động với quyền Admin
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setShowModal(false);
                      onToast("Đã thoát quyền Quản Trị Viên!");
                    }}
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100"
                  >
                    Đăng xuất Admin
                  </button>
                </div>

                {/* Tabs chức năng */}
                <div className="mt-4 flex gap-2 border-b border-cobalt-100 pb-3">
                  <button
                    onClick={() => setActiveTab("create_post")}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                      activeTab === "create_post" ? "bg-cobalt-950 text-white" : "text-cobalt-700 hover:bg-cobalt-50",
                    )}
                  >
                    📝 Đăng bài viết / thông báo mới
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("manage_notes");
                      setNotes(getStoredNotes());
                    }}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-xs font-bold transition",
                      activeTab === "manage_notes" ? "bg-cobalt-950 text-white" : "text-cobalt-700 hover:bg-cobalt-50",
                    )}
                  >
                    📋 Quản lý Note của TNV ({notes.length})
                  </button>
                </div>

                {/* Nội dung Tab 1: Đăng bài */}
                {activeTab === "create_post" && (
                  <form onSubmit={handleCreatePost} className="mt-4 space-y-3.5">
                    <div>
                      <label className="mb-1 block text-xs font-bold text-cobalt-800">
                        Tiêu đề bài viết / thông báo *
                      </label>
                      <input
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="VD: Thông báo lịch sinh hoạt chào đón tân sinh viên K60..."
                        className="w-full rounded-xl border border-cobalt-200 px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-bold text-cobalt-800">
                          Chuyên mục
                        </label>
                        <select
                          value={postCategory}
                          onChange={(e) => setPostCategory(e.target.value)}
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
                        <label className="mb-1 block text-xs font-bold text-cobalt-800">
                          Người đăng bài
                        </label>
                        <input
                          value={postAuthor}
                          onChange={(e) => setPostAuthor(e.target.value)}
                          placeholder="VD: Ban Chủ nhiệm BLLSV TMU"
                          className="w-full rounded-xl border border-cobalt-200 px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-cobalt-800">
                        Tóm tắt ngắn (hiển thị ngoài trang chủ) *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={postSummary}
                        onChange={(e) => setPostSummary(e.target.value)}
                        placeholder="Nội dung tóm tắt ngắn gọn 1-2 câu..."
                        className="w-full resize-none rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-cobalt-800">
                        Nội dung chi tiết bài viết
                      </label>
                      <textarea
                        rows={4}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        placeholder="Nhập nội dung đầy đủ của thông báo hoặc sự kiện..."
                        className="w-full resize-none rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-cobalt-800">
                        Link hình ảnh minh họa (URL ảnh)
                      </label>
                      <input
                        value={postImage}
                        onChange={(e) => setPostImage(e.target.value)}
                        placeholder="https://... hoặc để trống nếu dùng ảnh mặc định"
                        className="w-full rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button variant="flame" type="submit">
                        🚀 Đăng bài viết lên web ngay
                      </Button>
                    </div>
                  </form>
                )}

                {/* Nội dung Tab 2: Quản lý Note của TNV */}
                {activeTab === "manage_notes" && (
                  <div className="mt-4 space-y-3">
                    <p className="text-xs text-cobalt-600 font-medium">
                      Danh sách các ghi chú, lời nhắn do các bạn TNV gửi lên bảng. Bạn có thể xóa hoặc ghim note lên đầu.
                    </p>

                    <div className="max-h-[350px] space-y-2.5 overflow-y-auto pr-1">
                      {notes.length === 0 ? (
                        <p className="py-8 text-center text-xs text-cobalt-500">Chưa có ghi chú nào.</p>
                      ) : (
                        notes.map((n) => (
                          <div
                            key={n.id}
                            className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-cobalt-50/60 p-3 text-xs"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-cobalt-950">{n.author}</span>
                                <span className="rounded bg-cobalt-200 px-1.5 py-0.5 text-[10px] font-semibold text-cobalt-800">
                                  {n.department}
                                </span>
                                {n.pinned && (
                                  <span className="rounded bg-flame-500 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                                    Đã ghim
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-cobalt-800 leading-relaxed">{n.content}</p>
                              <span className="mt-1 block text-[10px] text-cobalt-500">{n.createdAt}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => handleTogglePin(n.id)}
                                title={n.pinned ? "Bỏ ghim" : "Ghim note"}
                                className="rounded-lg border border-cobalt-200 bg-white p-1.5 hover:bg-flame-50"
                              >
                                📌
                              </button>
                              <button
                                onClick={() => handleDeleteNote(n.id)}
                                title="Xóa note"
                                className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
