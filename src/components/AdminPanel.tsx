import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui";
import { getStoredNotes, saveStoredNotes, type TnvNote } from "@/components/TnvNoteBoard";
import {
  getStoredAdminPosts,
  saveStoredAdminPosts,
  getStoredAdminPrograms,
  saveStoredAdminPrograms,
  getStoredAdminLeaders,
  saveStoredAdminLeaders,
  getStoredAdminMotto,
  saveStoredAdminMotto,
  getStoredAdminRules,
  saveStoredAdminRules,
  DEFAULT_MOTTO,
  DEFAULT_RULES,
  type AdminPost,
  type AdminProgram,
  type AdminLeader,
  type AdminMotto,
  type AdminRule,
} from "@/data/adminStore";

export { getStoredAdminPosts, saveStoredAdminPosts, type AdminPost };

const ADMIN_PIN = "36tmu"; // Mật khẩu Admin mặc định

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

  type TabType = "posts" | "programs" | "leaders" | "motto" | "rules" | "notes";
  const [activeTab, setActiveTab] = useState<TabType>("posts");

  // --- 1. POSTS STATE ---
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Hoạt động tình nguyện");
  const [postAuthor, setPostAuthor] = useState("Ban Chủ nhiệm BLLSV TMU");
  const [postSummary, setPostSummary] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");

  // --- 2. PROGRAMS STATE ---
  const [programs, setPrograms] = useState<AdminProgram[]>([]);
  const [progTitle, setProgTitle] = useState("");
  const [progCategory, setProgCategory] = useState<AdminProgram["category"]>("Chiến dịch Mùa Hè Xanh");
  const [progStatus, setProgStatus] = useState<AdminProgram["status"]>("Mới đăng");
  const [progDateLabel, setProgDateLabel] = useState("");
  const [progLocation, setProgLocation] = useState("Thanh Hóa & TMU");
  const [progExcerpt, setProgExcerpt] = useState("");
  const [progCover, setProgCover] = useState("");

  // --- 3. LEADERS STATE ---
  const [leaders, setLeaders] = useState<AdminLeader[]>([]);
  const [leadKhoa, setLeadKhoa] = useState("K60");
  const [leadTerm, setLeadTerm] = useState("2026 - 2027");
  const [leadName, setLeadName] = useState("");
  const [leadDob, setLeadDob] = useState("");
  const [leadHometown, setLeadHometown] = useState("Thanh Hóa");
  const [leadRole, setLeadRole] = useState("Ủy viên BCH BLLSV TMU");

  // --- 4. MOTTO STATE ---
  const [motto, setMotto] = useState<AdminMotto>(DEFAULT_MOTTO);

  // --- 5. RULES STATE ---
  const [rulesData, setRulesData] = useState<AdminRule>(DEFAULT_RULES);
  const [newRuleItem, setNewRuleItem] = useState("");

  // --- 6. NOTES STATE ---
  const [notes, setNotes] = useState<TnvNote[]>([]);

  // Load state upon modal open
  useEffect(() => {
    if (showModal) {
      setPosts(getStoredAdminPosts());
      setPrograms(getStoredAdminPrograms());
      setLeaders(getStoredAdminLeaders());
      setMotto(getStoredAdminMotto());
      setRulesData(getStoredAdminRules());
      setNotes(getStoredNotes());
    }
  }, [showModal]);

  // Phím tắt bàn phím Ctrl+Shift+A hoặc Alt+A để mở nhanh Admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) || (e.altKey && (e.key === "a" || e.key === "A"))) {
        e.preventDefault();
        setShowModal((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lắng nghe sự kiện mở modal từ banner ngoài
  useEffect(() => {
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener("bllsv_open_admin", handleOpenModal);
    return () => window.removeEventListener("bllsv_open_admin", handleOpenModal);
  }, []);

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

  // 1. Thêm Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postSummary.trim()) return;

    const newPost: AdminPost = {
      id: "post-" + Date.now(),
      title: postTitle.trim(),
      category: postCategory,
      author: postAuthor.trim() || "Ban Chủ nhiệm BLLSV TMU",
      summary: postSummary.trim(),
      content: postContent.trim(),
      imageUrl: postImage.trim() || undefined,
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    const next = [newPost, ...posts];
    setPosts(next);
    saveStoredAdminPosts(next);

    setPostTitle("");
    setPostSummary("");
    setPostContent("");
    setPostImage("");
    onToast("Đã đăng thông báo mới lên website thành công! 📢");
    onPostCreated?.();
  };

  const handleDeletePost = (id: string) => {
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    saveStoredAdminPosts(next);
    onToast("Đã xóa bài viết khỏi website 🗑️");
    onPostCreated?.();
  };

  // 2. Thêm Chương trình
  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim() || !progExcerpt.trim()) return;

    const newProg: AdminProgram = {
      id: "prog-" + Date.now(),
      title: progTitle.trim(),
      category: progCategory,
      status: progStatus,
      month: "MỚI",
      day: "HOT",
      dateLabel: progDateLabel.trim() || "Sắp diễn ra",
      location: progLocation.trim() || "Thanh Hóa / TMU",
      excerpt: progExcerpt.trim(),
      cover: progCover.trim() || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
      schedule: [{ time: "Kế hoạch", title: progTitle.trim(), note: progExcerpt.trim() }],
      fact: [
        { label: "Chuyên mục", value: progCategory },
        { label: "Địa điểm", value: progLocation.trim() || "Thanh Hóa / TMU" },
      ],
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    const next = [newProg, ...programs];
    setPrograms(next);
    saveStoredAdminPrograms(next);

    setProgTitle("");
    setProgExcerpt("");
    setProgDateLabel("");
    setProgCover("");
    onToast("Đã cập nhật chương trình mới vào hệ thống! 🎯");
    onPostCreated?.();
  };

  const handleDeleteProgram = (id: string) => {
    const next = programs.filter((p) => p.id !== id);
    setPrograms(next);
    saveStoredAdminPrograms(next);
    onToast("Đã xóa chương trình khỏi hệ thống 🗑️");
    onPostCreated?.();
  };

  // 3. Thêm BCH
  const handleCreateLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadRole.trim()) return;

    const newLeader: AdminLeader = {
      id: "leader-" + Date.now(),
      khoa: leadKhoa.trim().toUpperCase(),
      term: leadTerm.trim(),
      name: leadName.trim(),
      dob: leadDob.trim(),
      hometown: leadHometown.trim(),
      role: leadRole.trim(),
      createdAt: new Date().toLocaleDateString("vi-VN"),
    };

    const next = [newLeader, ...leaders];
    setLeaders(next);
    saveStoredAdminLeaders(next);

    setLeadName("");
    setLeadDob("");
    onToast(`Đã thêm đồng chí ${newLeader.name} vào đội ngũ BCH! 🤝`);
    onPostCreated?.();
  };

  const handleDeleteLeader = (id: string) => {
    const next = leaders.filter((l) => l.id !== id);
    setLeaders(next);
    saveStoredAdminLeaders(next);
    onToast("Đã xóa thành viên khỏi danh sách BCH mới 🗑️");
    onPostCreated?.();
  };

  // 4. Cập nhật Châm ngôn
  const handleSaveMotto = (e: React.FormEvent) => {
    e.preventDefault();
    const nextMotto: AdminMotto = {
      ...motto,
      updatedAt: new Date().toLocaleDateString("vi-VN"),
    };
    setMotto(nextMotto);
    saveStoredAdminMotto(nextMotto);
    onToast("Đã cập nhật châm ngôn hoạt động mới của BCH! 🔥");
    onPostCreated?.();
  };

  // 5. Cập nhật Nội quy
  const handleAddRuleItem = () => {
    if (!newRuleItem.trim()) return;
    const nextRules = [...rulesData.rules, newRuleItem.trim()];
    const next = { ...rulesData, rules: nextRules, updatedAt: new Date().toLocaleDateString("vi-VN") };
    setRulesData(next);
    saveStoredAdminRules(next);
    setNewRuleItem("");
    onToast("Đã thêm điều khoản nội quy mới! 📜");
    onPostCreated?.();
  };

  const handleDeleteRuleItem = (idx: number) => {
    const nextRules = rulesData.rules.filter((_, i) => i !== idx);
    const next = { ...rulesData, rules: nextRules, updatedAt: new Date().toLocaleDateString("vi-VN") };
    setRulesData(next);
    saveStoredAdminRules(next);
    onToast("Đã xóa điều khoản nội quy 🗑️");
    onPostCreated?.();
  };

  const handleSaveRulesHeader = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { ...rulesData, updatedAt: new Date().toLocaleDateString("vi-VN") };
    saveStoredAdminRules(next);
    onToast("Đã lưu thông báo nội quy mới nhất! 📜");
    onPostCreated?.();
  };

  // 6. Quản lý Notes TNV
  const handleDeleteNote = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã xóa ghi chú của TNV khỏi hệ thống 🗑️");
  };

  const handleTogglePinNote = (id: string) => {
    const next = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã cập nhật trạng thái ghim ghi chú 📌");
  };

  return (
    <>
      {/* =========================================================================
          NÚT QUYỀN ADMIN THU NHỎ KÍN ĐÁO Ở GÓC MÀN HÌNH (GÓC DƯỚI PHẢI)
          Chỉ admin hoặc người biết vị trí mới thấy / click hoặc dùng phím tắt Ctrl+Shift+A
         ========================================================================= */}
      <div className="fixed bottom-3 right-3 z-40 sm:bottom-4 sm:right-4 print:hidden">
        <button
          onClick={() => setShowModal(true)}
          title={isAdmin ? "Bảng Quản Trị Đang Mở (Ctrl+Shift+A)" : "Cổng Quản Trị Viên (Ctrl+Shift+A)"}
          aria-label="Cổng Quản Trị Viên"
          className={cn(
            "group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 shadow-sm backdrop-blur-md focus:outline-none sm:h-9 sm:w-9",
            isAdmin
              ? "border-red-400/80 bg-red-600/90 text-white opacity-90 shadow-soft hover:opacity-100 hover:scale-110"
              : "border-cobalt-200/50 bg-cobalt-950/20 text-cobalt-600 opacity-25 hover:opacity-100 hover:bg-cobalt-900/80 hover:text-white hover:scale-110",
          )}
        >
          {isAdmin ? (
            <span className="text-xs">⚙️</span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 fill-none stroke-current stroke-2 transition-transform duration-200 group-hover:rotate-45"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}

          {/* Dấu chấm trạng thái nhấp nháy khi Admin đang đăng nhập */}
          {isAdmin && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>
          )}

          {/* Tooltip kín đáo khi hover */}
          <span className="pointer-events-none absolute right-full mr-2.5 hidden whitespace-nowrap rounded-lg bg-cobalt-950/90 px-2 py-1 text-[10px] font-semibold text-white shadow-soft backdrop-blur-sm group-hover:block">
            {isAdmin ? "⚙️ Quản trị viên (Ctrl+Shift+A)" : "🔐 Admin (Ctrl+Shift+A)"}
          </span>
        </button>
      </div>

      {/* =========================================================================
          MODAL QUẢN TRỊ VIÊN ĐA CHỨC NĂNG
         ========================================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-cobalt-950/75 p-3 backdrop-blur-md sm:p-4">
          <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-cobalt-200 bg-white shadow-lift">
            {/* Nút đóng góc phải */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-xl bg-cobalt-100 text-cobalt-700 transition hover:bg-red-50 hover:text-red-600"
              title="Đóng bảng quản trị"
            >
              ✕
            </button>

            {!isAdmin ? (
              /* ================== MÀN HÌNH ĐĂNG NHẬP ADMIN ================== */
              <div className="overflow-y-auto p-6 text-center sm:p-10">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-flame-100 text-3xl shadow-soft">
                  🔐
                </span>
                <h3 className="mt-4 font-display text-2xl font-black text-cobalt-950 sm:text-3xl">
                  Bảng Điều Khiển Quản Trị Viên
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-cobalt-600 sm:text-sm">
                  Khu vực dành riêng cho Ban Chủ Nhiệm, Ban Chấp Hành &amp; Đội SVTN BLLSV TMU để cập nhật tin tức, sự kiện, nhân sự và nội quy hoạt động.
                </p>

                <form onSubmit={handleLoginSubmit} className="mx-auto mt-7 max-w-xs space-y-4">
                  <div>
                    <input
                      type="password"
                      autoFocus
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="Nhập mã xác thực Admin..."
                      className={cn(
                        "w-full rounded-2xl border px-4 py-2.5 text-center text-sm font-bold text-cobalt-950 outline-none transition",
                        pinError ? "border-red-500 bg-red-50" : "border-cobalt-300 focus:border-flame-500 focus:ring-2 focus:ring-flame-100",
                      )}
                    />
                    {pinError && (
                      <p className="mt-1.5 text-[11.5px] font-bold text-red-600">
                        Sai mật khẩu! Gợi ý mật khẩu mặc định: <code className="font-mono">36tmu</code>
                      </p>
                    )}
                  </div>

                  <Button variant="flame" className="w-full" type="submit">
                    Xác nhận đăng nhập 🚀
                  </Button>
                </form>

                <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-cobalt-100 bg-cobalt-50/60 p-3 text-[11.5px] text-cobalt-600">
                  💡 <strong>Ghi chú:</strong> Mật khẩu quản trị mặc định là <strong className="font-mono text-cobalt-900">36tmu</strong>. Bạn có thể nhấn <kbd className="rounded bg-white px-1.5 py-0.5 border shadow-2xs">Ctrl+Shift+A</kbd> bất kỳ lúc nào để bật nhanh cửa sổ này.
                </div>
              </div>
            ) : (
              /* ================== GIAO DIỆN QUẢN TRỊ ĐẦY ĐỦ ================== */
              <div className="flex h-full flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-cobalt-100 bg-cobalt-50/60 px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-xl font-bold text-red-600 shadow-2xs">
                      ⚙️
                    </span>
                    <div>
                      <h3 className="font-display text-base font-black text-cobalt-950 sm:text-lg">
                        Bảng Quản Trị BLLSV Thanh Hóa TMU
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          Đang hoạt động (Admin)
                        </span>
                        <span className="text-[11px] text-cobalt-500">Mã PIN: 36tmu</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onLogout();
                      setShowModal(false);
                      onToast("Đã thoát phiên làm việc Quản Trị Viên!");
                    }}
                    className="mr-7 rounded-xl border border-red-200 bg-white px-3 py-1.5 text-xs font-bold text-red-600 shadow-2xs transition hover:bg-red-50 sm:mr-8"
                  >
                    Đăng xuất
                  </button>
                </div>

                {/* Danh sách Tabs chức năng */}
                <div className="scrollbar-none flex snap-x gap-1.5 overflow-x-auto border-b border-cobalt-100 bg-white px-4 py-2.5 sm:px-6">
                  {[
                    { id: "posts", label: "📢 Tin tức & Thông báo", count: posts.length },
                    { id: "programs", label: "🎯 Chương trình mới", count: programs.length },
                    { id: "leaders", label: "👥 Đội ngũ BCH", count: leaders.length },
                    { id: "motto", label: "🔥 Châm ngôn BCH", count: null },
                    { id: "rules", label: "📜 Thông báo nội quy", count: rulesData.rules.length },
                    { id: "notes", label: "📋 Duyệt Note TNV", count: notes.length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={cn(
                        "flex shrink-0 snap-start items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition",
                        activeTab === tab.id
                          ? "bg-cobalt-950 text-white shadow-soft"
                          : "text-cobalt-700 hover:bg-cobalt-50",
                      )}
                    >
                      <span>{tab.label}</span>
                      {tab.count !== null && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.2 text-[10px]",
                            activeTab === tab.id ? "bg-white/20 text-white" : "bg-cobalt-100 text-cobalt-700",
                          )}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Khung nội dung theo từng Tab (có scroll) */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {/* TAB 1: BÀI VIẾT / THÔNG BÁO MỚI NHẤT */}
                  {activeTab === "posts" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                        <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                          Đăng Thông Báo / Tin Tức Mới Lên Trang Chủ
                        </h4>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Bài viết sẽ xuất hiện ngay ở phần Sự kiện &amp; Tin tức của website.
                        </p>

                        <form onSubmit={handleCreatePost} className="mt-4 space-y-3">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tiêu đề thông báo *</label>
                            <input
                              required
                              value={postTitle}
                              onChange={(e) => setPostTitle(e.target.value)}
                              placeholder="VD: Thông báo lịch sinh hoạt chào đón tân sinh viên K60..."
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chuyên mục</label>
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
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Người / Đơn vị phát ngôn</label>
                              <input
                                value={postAuthor}
                                onChange={(e) => setPostAuthor(e.target.value)}
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
                              onChange={(e) => setPostSummary(e.target.value)}
                              placeholder="Tóm tắt ngắn gọn 1-2 câu để người xem nắm được ý chính..."
                              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Nội dung chi tiết</label>
                            <textarea
                              rows={3}
                              value={postContent}
                              onChange={(e) => setPostContent(e.target.value)}
                              placeholder="Chi tiết địa điểm, thời gian, yêu cầu, danh sách tập trung..."
                              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link hình ảnh minh họa (URL)</label>
                            <input
                              value={postImage}
                              onChange={(e) => setPostImage(e.target.value)}
                              placeholder="https://... hoặc để trống nếu dùng ảnh mặc định"
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="flex justify-end pt-2">
                            <Button variant="flame" type="submit">
                              📢 Đăng thông báo lên web ngay
                            </Button>
                          </div>
                        </form>
                      </div>

                      {/* Danh sách thông báo đã đăng */}
                      <div>
                        <h4 className="font-display text-sm font-bold text-cobalt-900">
                          Các bài đăng / thông báo đã phát hành ({posts.length})
                        </h4>
                        <div className="mt-3 space-y-2.5">
                          {posts.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
                              Chưa có bài đăng tùy chỉnh nào từ Admin. Bạn hãy đăng thông báo đầu tiên ở form trên!
                            </p>
                          ) : (
                            posts.map((p) => (
                              <div
                                key={p.id}
                                className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-2xs"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="rounded bg-flame-100 px-2 py-0.5 text-[10px] font-bold text-flame-700">
                                      {p.category}
                                    </span>
                                    <span className="text-[11px] text-cobalt-500">{p.createdAt}</span>
                                    <span className="text-[11px] font-medium text-cobalt-700">bởi {p.author}</span>
                                  </div>
                                  <h5 className="mt-1 font-display text-sm font-bold text-cobalt-950">{p.title}</h5>
                                  <p className="mt-0.5 text-xs text-cobalt-700 line-clamp-2">{p.summary}</p>
                                </div>
                                <button
                                  onClick={() => handleDeletePost(p.id)}
                                  className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100 shrink-0"
                                  title="Xóa bài viết"
                                >
                                  🗑️ Xóa
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: CHƯƠNG TRÌNH MỚI NHẤT */}
                  {activeTab === "programs" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                        <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                          Cập Nhật Chương Trình / Sự Kiện Mới
                        </h4>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Thêm chiến dịch tình nguyện mới, giải thể thao hoặc ngày hội của Ban liên lạc vào danh mục Hoạt động.
                        </p>

                        <form onSubmit={handleCreateProgram} className="mt-4 space-y-3">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tên chương trình / Sự kiện *</label>
                            <input
                              required
                              value={progTitle}
                              onChange={(e) => setProgTitle(e.target.value)}
                              placeholder="VD: Chiến dịch Mùa Hè Xanh 2027 – Hành trình về bản Mường..."
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chuyên mục</label>
                              <select
                                value={progCategory}
                                onChange={(e) => setProgCategory(e.target.value as AdminProgram["category"])}
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
                                onChange={(e) => setProgStatus(e.target.value as AdminProgram["status"])}
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
                                onChange={(e) => setProgDateLabel(e.target.value)}
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
                                onChange={(e) => setProgLocation(e.target.value)}
                                placeholder="VD: Huyện Bá Thước, Thanh Hóa"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Link ảnh bìa chương trình</label>
                              <input
                                value={progCover}
                                onChange={(e) => setProgCover(e.target.value)}
                                placeholder="https://images.unsplash.com/... hoặc để trống"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Mô tả tóm tắt chương trình *</label>
                            <textarea
                              required
                              rows={2}
                              value={progExcerpt}
                              onChange={(e) => setProgExcerpt(e.target.value)}
                              placeholder="Mô tả mục tiêu, ý nghĩa và các hoạt động chính trong chương trình..."
                              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="flex justify-end pt-2">
                            <Button variant="flame" type="submit">
                              🎯 Lưu chương trình mới vào web
                            </Button>
                          </div>
                        </form>
                      </div>

                      {/* Danh sách chương trình đã thêm */}
                      <div>
                        <h4 className="font-display text-sm font-bold text-cobalt-900">
                          Chương trình do Admin thêm mới ({programs.length})
                        </h4>
                        <div className="mt-3 space-y-2.5">
                          {programs.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
                              Chưa có chương trình tùy biến nào được thêm. Hệ thống đang hiển thị các chương trình chính thức.
                            </p>
                          ) : (
                            programs.map((p) => (
                              <div
                                key={p.id}
                                className="flex items-center justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-3.5 shadow-2xs"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="rounded bg-cobalt-800 px-2 py-0.5 text-[10px] font-bold text-white">
                                      {p.category}
                                    </span>
                                    <span className="rounded bg-flame-100 px-2 py-0.5 text-[10px] font-bold text-flame-700">
                                      {p.status}
                                    </span>
                                    <span className="text-[11px] text-cobalt-500">📍 {p.location}</span>
                                  </div>
                                  <h5 className="mt-1 font-display text-sm font-bold text-cobalt-950">{p.title}</h5>
                                  <p className="text-xs text-cobalt-600 line-clamp-1">{p.excerpt}</p>
                                </div>
                                <button
                                  onClick={() => handleDeleteProgram(p.id)}
                                  className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100 shrink-0"
                                >
                                  🗑️ Xóa
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: ĐỘI NGŨ BAN CHẤP HÀNH MỚI NHẤT */}
                  {activeTab === "leaders" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                        <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                          Cập Nhật Đội Ngũ Ban Chấp Hành Mới Nhất
                        </h4>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Thêm thông tin các đồng chí BCH nhiệm kỳ mới (K60, K61...) vào danh sách lịch sử thế hệ giữ lửa.
                        </p>

                        <form onSubmit={handleCreateLeader} className="mt-4 space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Khóa sinh viên *</label>
                              <input
                                required
                                value={leadKhoa}
                                onChange={(e) => setLeadKhoa(e.target.value)}
                                placeholder="VD: K60, K61..."
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhiệm kỳ *</label>
                              <input
                                required
                                value={leadTerm}
                                onChange={(e) => setLeadTerm(e.target.value)}
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
                                onChange={(e) => setLeadName(e.target.value)}
                                placeholder="VD: Nguyễn Văn A"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Ngày tháng năm sinh</label>
                              <input
                                value={leadDob}
                                onChange={(e) => setLeadDob(e.target.value)}
                                placeholder="VD: 15/08/2006"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Quê quán (huyện/thị)</label>
                              <input
                                value={leadHometown}
                                onChange={(e) => setLeadHometown(e.target.value)}
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
                              onChange={(e) => setLeadRole(e.target.value)}
                              placeholder="VD: Trưởng Ban liên lạc, Đội trưởng SVTN, Trưởng Ban Truyền thông..."
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="flex justify-end pt-2">
                            <Button variant="flame" type="submit">
                              👥 Thêm thành viên BCH vào danh sách
                            </Button>
                          </div>
                        </form>
                      </div>

                      {/* Danh sách thành viên BCH bổ sung */}
                      <div>
                        <h4 className="font-display text-sm font-bold text-cobalt-900">
                          Thành viên BCH mới do Admin bổ sung ({leaders.length})
                        </h4>
                        <div className="mt-3 space-y-2.5">
                          {leaders.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
                              Chưa có thành viên BCH mới nào được thêm riêng. Hệ thống đang hiển thị đầy đủ 16 thế hệ từ K44 đến K60.
                            </p>
                          ) : (
                            leaders.map((lead) => (
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
                                <button
                                  onClick={() => handleDeleteLeader(lead.id)}
                                  className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs font-bold text-red-600 hover:bg-red-100 shrink-0"
                                >
                                  🗑️ Xóa
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: CHÂM NGÔN HOẠT ĐỘNG MỚI NHẤT CỦA BCH */}
                  {activeTab === "motto" && (
                    <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                      <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                        Cập Nhật Châm Ngôn Hoạt Động &amp; Slogan Của BCH
                      </h4>
                      <p className="mt-0.5 text-xs text-cobalt-600">
                        Châm ngôn sẽ được cập nhật đồng bộ lên toàn bộ website: dải Divider trang chủ, mục Tinh thần 36 và Footer.
                      </p>

                      <form onSubmit={handleSaveMotto} className="mt-4 space-y-3.5">
                        <div>
                          <label className="mb-1 block text-xs font-bold text-cobalt-800">
                            Châm ngôn / Slogan hoạt động chính thức *
                          </label>
                          <textarea
                            required
                            rows={2}
                            value={motto.slogan}
                            onChange={(e) => setMotto({ ...motto, slogan: e.target.value })}
                            className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-bold text-cobalt-950 outline-none focus:border-flame-500"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhiệm kỳ áp dụng</label>
                            <input
                              value={motto.term}
                              onChange={(e) => setMotto({ ...motto, term: e.target.value })}
                              placeholder="VD: Nhiệm kỳ 2026 – 2027 (K60)"
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Ngày cập nhật gần nhất</label>
                            <input
                              disabled
                              value={motto.updatedAt}
                              className="w-full rounded-xl border border-cobalt-200 bg-cobalt-100/60 px-3 py-2 text-xs text-cobalt-600 outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-cobalt-800">
                            Ý nghĩa &amp; Lời dặn dò của Ban Chấp Hành
                          </label>
                          <textarea
                            rows={3}
                            value={motto.meaning}
                            onChange={(e) => setMotto({ ...motto, meaning: e.target.value })}
                            placeholder="Thông điệp truyền cảm hứng cho các thế hệ tình nguyện viên..."
                            className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                          />
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setMotto(DEFAULT_MOTTO);
                              saveStoredAdminMotto(DEFAULT_MOTTO);
                              onToast("Đã khôi phục châm ngôn truyền thống ban đầu!");
                              onPostCreated?.();
                            }}
                            className="text-xs font-semibold text-cobalt-600 underline hover:text-cobalt-900"
                          >
                            Khôi phục câu truyền thống mặc định
                          </button>

                          <Button variant="flame" type="submit">
                            🔥 Lưu châm ngôn BCH mới
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* TAB 5: THÔNG BÁO NỘI QUY MỚI */}
                  {activeTab === "rules" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                        <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                          Ban Hành &amp; Cập Nhật Thông Báo Nội Quy Mới
                        </h4>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Điều chỉnh nội quy, quy chế sinh hoạt, tác phong và kỷ luật tình nguyện viên của nhà chung.
                        </p>

                        <form onSubmit={handleSaveRulesHeader} className="mt-4 space-y-3">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tiêu đề thông báo nội quy *</label>
                            <input
                              required
                              value={rulesData.title}
                              onChange={(e) => setRulesData({ ...rulesData, title: e.target.value })}
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-bold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Thời gian hiệu lực</label>
                              <input
                                value={rulesData.effectiveDate}
                                onChange={(e) => setRulesData({ ...rulesData, effectiveDate: e.target.value })}
                                placeholder="Áp dụng từ năm học 2026 – 2027"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Cơ quan ban hành</label>
                              <input
                                value={rulesData.issuedBy}
                                onChange={(e) => setRulesData({ ...rulesData, issuedBy: e.target.value })}
                                placeholder="Ban Chấp Hành & Đội Trưởng Đội SVTN"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tóm tắt mục đích &amp; yêu cầu</label>
                            <textarea
                              rows={2}
                              value={rulesData.summary}
                              onChange={(e) => setRulesData({ ...rulesData, summary: e.target.value })}
                              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div className="flex justify-end pt-1">
                            <Button variant="flame" type="submit">
                              💾 Lưu thông tin tiêu đề nội quy
                            </Button>
                          </div>
                        </form>
                      </div>

                      {/* Danh sách các điều khoản nội quy */}
                      <div className="rounded-2xl border border-cobalt-100 bg-white p-4 sm:p-5">
                        <div className="flex items-center justify-between pb-3 border-b border-cobalt-100">
                          <div>
                            <h4 className="font-display text-sm font-bold text-cobalt-900">
                              Các điều khoản nội quy hiện hành ({rulesData.rules.length})
                            </h4>
                            <p className="text-[11.5px] text-cobalt-500">Mỗi điều khoản được hiển thị rõ ràng trên mục Nội Quy Nhà Chung</p>
                          </div>
                        </div>

                        {/* Thêm điều khoản mới */}
                        <div className="mt-4 flex gap-2">
                          <input
                            value={newRuleItem}
                            onChange={(e) => setNewRuleItem(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddRuleItem();
                              }
                            }}
                            placeholder="Nhập nội dung điều khoản mới (VD: Quy định về bảo mật hình ảnh...)"
                            className="flex-1 rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                          />
                          <Button variant="flame" onClick={handleAddRuleItem}>
                            + Thêm điều
                          </Button>
                        </div>

                        <div className="mt-4 space-y-2">
                          {rulesData.rules.map((rule, idx) => (
                            <div
                              key={idx}
                              className="flex items-start justify-between gap-3 rounded-xl border border-cobalt-100 bg-cobalt-50/50 p-3 text-xs"
                            >
                              <div className="flex items-start gap-2.5">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tmu-600 text-[10.5px] font-bold text-white">
                                  {idx + 1}
                                </span>
                                <p className="font-medium text-cobalt-900 leading-relaxed">{rule}</p>
                              </div>
                              <button
                                onClick={() => handleDeleteRuleItem(idx)}
                                className="text-red-500 hover:text-red-700 text-xs shrink-0 font-bold p-1"
                                title="Xóa điều khoản này"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: QUẢN LÝ GHI CHÚ CỦA TNV */}
                  {activeTab === "notes" && (
                    <div className="space-y-3">
                      <p className="text-xs font-medium text-cobalt-600">
                        Danh sách các ghi chú, lời nhắn do các bạn TNV gửi lên bảng. Bạn có thể xóa hoặc ghim note lên đầu.
                      </p>

                      <div className="max-h-[380px] space-y-2.5 overflow-y-auto pr-1">
                        {notes.length === 0 ? (
                          <p className="py-8 text-center text-xs text-cobalt-500">Chưa có ghi chú nào từ TNV.</p>
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
                                <p className="mt-1 leading-relaxed text-cobalt-800">{n.content}</p>
                                <span className="mt-1 block text-[10px] text-cobalt-500">{n.createdAt}</span>
                              </div>

                              <div className="flex shrink-0 items-center gap-1.5">
                                <button
                                  onClick={() => handleTogglePinNote(n.id)}
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
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
