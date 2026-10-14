import { useEffect, useState, useMemo, useRef } from "react";
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
  getStoredAdminContact,
  saveStoredAdminContact,
  getStoredAdminPin,
  saveStoredAdminPin,
  resetStoredAdminPin,
  exportAllAdminData,
  importAllAdminData,
  resetAllAdminDataToDefaults,
  DEFAULT_MOTTO,
  DEFAULT_RULES,
  DEFAULT_CONTACT,
  DEFAULT_PIN,
  type AdminPost,
  type AdminProgram,
  type AdminLeader,
  type AdminMotto,
  type AdminRule,
  type AdminContact,
} from "@/data/adminStore";

export { getStoredAdminPosts, saveStoredAdminPosts, type AdminPost };

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
  const [showPassword, setShowPassword] = useState(false);

  type TabType = "posts" | "programs" | "leaders" | "motto" | "rules" | "notes" | "contact" | "settings";
  const [activeTab, setActiveTab] = useState<TabType>("posts");

  // --- 1. POSTS STATE ---
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [searchPost, setSearchPost] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Hoạt động tình nguyện");
  const [postAuthor, setPostAuthor] = useState("Ban Chủ nhiệm BLLSV TMU");
  const [postSummary, setPostSummary] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState("");

  // --- 2. PROGRAMS STATE ---
  const [programs, setPrograms] = useState<AdminProgram[]>([]);
  const [searchProg, setSearchProg] = useState("");
  const [editingProgId, setEditingProgId] = useState<string | null>(null);
  const [progTitle, setProgTitle] = useState("");
  const [progCategory, setProgCategory] = useState<AdminProgram["category"]>("Chiến dịch Mùa Hè Xanh");
  const [progStatus, setProgStatus] = useState<AdminProgram["status"]>("Mới đăng");
  const [progDateLabel, setProgDateLabel] = useState("");
  const [progLocation, setProgLocation] = useState("Thanh Hóa & TMU");
  const [progExcerpt, setProgExcerpt] = useState("");
  const [progCover, setProgCover] = useState("");

  // --- 3. LEADERS STATE ---
  const [leaders, setLeaders] = useState<AdminLeader[]>([]);
  const [searchLead, setSearchLead] = useState("");
  const [editingLeadId, setEditingLeadId] = useState<string | null>(null);
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
  const [editingRuleIndex, setEditingRuleIndex] = useState<number | null>(null);
  const [editingRuleText, setEditingRuleText] = useState("");

  // --- 6. NOTES STATE ---
  const [notes, setNotes] = useState<TnvNote[]>([]);

  // --- 7. CONTACT STATE ---
  const [contactData, setContactData] = useState<AdminContact>(DEFAULT_CONTACT);

  // --- 8. SECURITY / SETTINGS STATE ---
  const [oldPinInput, setOldPinInput] = useState("");
  const [newPinInput, setNewPinInput] = useState("");
  const [confirmPinInput, setConfirmPinInput] = useState("");
  const [showPinSettings, setShowPinSettings] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load state upon modal open
  const reloadAllData = () => {
    setPosts(getStoredAdminPosts());
    setPrograms(getStoredAdminPrograms());
    setLeaders(getStoredAdminLeaders());
    setMotto(getStoredAdminMotto());
    setRulesData(getStoredAdminRules());
    setNotes(getStoredNotes());
    setContactData(getStoredAdminContact());
  };

  useEffect(() => {
    if (showModal) {
      reloadAllData();
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

  // Đăng nhập
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = getStoredAdminPin();
    if (pinInput.trim() === currentPin) {
      onLogin();
      setPinError(false);
      setPinInput("");
      onToast("Đăng nhập quyền Quản Trị Viên thành công! 🔐");
    } else {
      setPinError(true);
      onToast("Mật khẩu Admin không đúng, vui lòng thử lại!");
    }
  };

  const handleResetPinQuick = () => {
    if (window.confirm("Bạn có chắc chắn muốn đặt lại mật khẩu Admin về mặc định (36tmu)?")) {
      resetStoredAdminPin();
      setPinInput("");
      setPinError(false);
      onToast("Đã đặt lại mật khẩu về mặc định: 36tmu ✅");
    }
  };

  // =========================================================================
  // 1. QUẢN LÝ BÀI VIẾT / POSTS
  // =========================================================================
  const handleStartEditPost = (p: AdminPost) => {
    setEditingPostId(p.id);
    setPostTitle(p.title);
    setPostCategory(p.category);
    setPostAuthor(p.author);
    setPostSummary(p.summary);
    setPostContent(p.content);
    setPostImage(p.imageUrl || "");
  };

  const handleCancelEditPost = () => {
    setEditingPostId(null);
    setPostTitle("");
    setPostSummary("");
    setPostContent("");
    setPostImage("");
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postSummary.trim()) return;

    if (editingPostId) {
      // Cập nhật bài viết có sẵn
      const next = posts.map((p) =>
        p.id === editingPostId
          ? {
              ...p,
              title: postTitle.trim(),
              category: postCategory,
              author: postAuthor.trim() || "Ban Chủ nhiệm BLLSV TMU",
              summary: postSummary.trim(),
              content: postContent.trim(),
              imageUrl: postImage.trim() || undefined,
            }
          : p
      );
      setPosts(next);
      saveStoredAdminPosts(next);
      handleCancelEditPost();
      onToast("Đã cập nhật bài viết thành công! ✨");
    } else {
      // Tạo bài viết mới
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
    }
    onPostCreated?.();
  };

  const handleDeletePost = (id: string) => {
    if (editingPostId === id) handleCancelEditPost();
    const next = posts.filter((p) => p.id !== id);
    setPosts(next);
    saveStoredAdminPosts(next);
    onToast("Đã xóa bài viết khỏi website 🗑️");
    onPostCreated?.();
  };

  const handleTogglePinPost = (id: string) => {
    const next = posts.map((p) => (p.id === id ? { ...p, pinned: !p.pinned } : p));
    setPosts(next);
    saveStoredAdminPosts(next);
    onToast("Đã cập nhật ghim bài viết 📌");
    onPostCreated?.();
  };

  // =========================================================================
  // 2. QUẢN LÝ CHƯƠNG TRÌNH / PROGRAMS
  // =========================================================================
  const handleStartEditProgram = (p: AdminProgram) => {
    setEditingProgId(p.id);
    setProgTitle(p.title);
    setProgCategory(p.category);
    setProgStatus(p.status);
    setProgDateLabel(p.dateLabel);
    setProgLocation(p.location);
    setProgExcerpt(p.excerpt);
    setProgCover(p.cover || "");
  };

  const handleCancelEditProgram = () => {
    setEditingProgId(null);
    setProgTitle("");
    setProgExcerpt("");
    setProgCover("");
    setProgDateLabel("");
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim() || !progExcerpt.trim()) return;

    if (editingProgId) {
      // Cập nhật chương trình có sẵn
      const next = programs.map((p) =>
        p.id === editingProgId
          ? {
              ...p,
              title: progTitle.trim(),
              category: progCategory,
              status: progStatus,
              dateLabel: progDateLabel.trim() || p.dateLabel,
              location: progLocation.trim() || p.location,
              excerpt: progExcerpt.trim(),
              cover: progCover.trim() || p.cover,
            }
          : p
      );
      setPrograms(next);
      saveStoredAdminPrograms(next);
      handleCancelEditProgram();
      onToast("Đã cập nhật chương trình thành công! 🎯");
    } else {
      // Thêm chương trình mới
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
      setProgCover("");
      setProgDateLabel("");
      onToast("Đã thêm chương trình mới vào website! 🎯");
    }
    onPostCreated?.();
  };

  const handleQuickChangeProgramStatus = (id: string, newStatus: AdminProgram["status"]) => {
    const next = programs.map((p) => (p.id === id ? { ...p, status: newStatus } : p));
    setPrograms(next);
    saveStoredAdminPrograms(next);
    onToast(`Đã chuyển trạng thái sang "${newStatus}" 🔄`);
    onPostCreated?.();
  };

  const handleDeleteProgram = (id: string) => {
    if (editingProgId === id) handleCancelEditProgram();
    const next = programs.filter((p) => p.id !== id);
    setPrograms(next);
    saveStoredAdminPrograms(next);
    onToast("Đã xóa chương trình khỏi hệ thống 🗑️");
    onPostCreated?.();
  };

  // =========================================================================
  // 3. QUẢN LÝ NHÂN SỰ BAN CHẤP HÀNH
  // =========================================================================
  const handleStartEditLeader = (l: AdminLeader) => {
    setEditingLeadId(l.id);
    setLeadKhoa(l.khoa);
    setLeadTerm(l.term);
    setLeadName(l.name);
    setLeadDob(l.dob || "");
    setLeadHometown(l.hometown);
    setLeadRole(l.role);
  };

  const handleCancelEditLeader = () => {
    setEditingLeadId(null);
    setLeadName("");
    setLeadDob("");
  };

  const handleSaveLeader = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadRole.trim()) return;

    if (editingLeadId) {
      // Cập nhật
      const next = leaders.map((l) =>
        l.id === editingLeadId
          ? {
              ...l,
              khoa: leadKhoa.trim().toUpperCase(),
              term: leadTerm.trim(),
              name: leadName.trim(),
              dob: leadDob.trim(),
              hometown: leadHometown.trim(),
              role: leadRole.trim(),
            }
          : l
      );
      setLeaders(next);
      saveStoredAdminLeaders(next);
      handleCancelEditLeader();
      onToast("Đã cập nhật thông tin thành viên BCH! 🤝");
    } else {
      // Thêm mới
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
    }
    onPostCreated?.();
  };

  const handleDeleteLeader = (id: string) => {
    if (editingLeadId === id) handleCancelEditLeader();
    const next = leaders.filter((l) => l.id !== id);
    setLeaders(next);
    saveStoredAdminLeaders(next);
    onToast("Đã xóa thành viên khỏi danh sách BCH mới 🗑️");
    onPostCreated?.();
  };

  // =========================================================================
  // 4. CHÂM NGÔN & KHẨU HIỆU
  // =========================================================================
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

  // =========================================================================
  // 5. NỘI QUY NHÀ CHUNG
  // =========================================================================
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

  const handleStartEditRule = (idx: number, currentText: string) => {
    setEditingRuleIndex(idx);
    setEditingRuleText(currentText);
  };

  const handleSaveEditRule = () => {
    if (editingRuleIndex === null || !editingRuleText.trim()) return;
    const nextRules = [...rulesData.rules];
    nextRules[editingRuleIndex] = editingRuleText.trim();
    const next = { ...rulesData, rules: nextRules, updatedAt: new Date().toLocaleDateString("vi-VN") };
    setRulesData(next);
    saveStoredAdminRules(next);
    setEditingRuleIndex(null);
    setEditingRuleText("");
    onToast("Đã cập nhật điều khoản nội quy! 📜");
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

  // =========================================================================
  // 6. GHI CHÚ TNV
  // =========================================================================
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

  // =========================================================================
  // 7. THÔNG TIN LIÊN HỆ
  // =========================================================================
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { ...contactData, updatedAt: new Date().toLocaleDateString("vi-VN") };
    setContactData(next);
    saveStoredAdminContact(next);
    onToast("Đã cập nhật thông tin liên hệ & kênh truyền thông! 📞");
    onPostCreated?.();
  };

  // =========================================================================
  // 8. ĐỔI MẬT KHẨU & SAO LƯU DỮ LIỆU
  // =========================================================================
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = getStoredAdminPin();
    if (oldPinInput.trim() !== currentPin) {
      onToast("Mật khẩu hiện tại không chính xác! ❌");
      return;
    }
    if (newPinInput.trim().length < 3) {
      onToast("Mật khẩu mới phải có ít nhất 3 ký tự! ⚠️");
      return;
    }
    if (newPinInput.trim() !== confirmPinInput.trim()) {
      onToast("Mật khẩu mới và xác nhận mật khẩu không khớp! ❌");
      return;
    }

    const ok = saveStoredAdminPin(newPinInput.trim());
    if (ok) {
      setOldPinInput("");
      setNewPinInput("");
      setConfirmPinInput("");
      onToast("Đổi mật khẩu quản trị viên thành công! 🔐 Hãy ghi nhớ mật khẩu mới.");
    } else {
      onToast("Có lỗi khi lưu mật khẩu mới!");
    }
  };

  const handleExportData = () => {
    const jsonStr = exportAllAdminData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `bllsv_admin_backup_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onToast("Đã xuất tệp sao lưu dữ liệu JSON thành công! 📥");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importAllAdminData(content);
        if (success) {
          reloadAllData();
          onToast("Đã khôi phục dữ liệu từ tệp sao lưu thành công! 📤");
          onPostCreated?.();
        } else {
          onToast("Tệp sao lưu không đúng định dạng! ❌");
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleResetAllData = () => {
    if (
      window.confirm(
        "CẢNH BÁO: Hành động này sẽ xóa toàn bộ bài viết, chương trình, nhân sự tùy chỉnh và đưa tất cả về mặc định gốc. Bạn có chắc chắn không?"
      )
    ) {
      resetAllAdminDataToDefaults();
      reloadAllData();
      onToast("Đã khôi phục toàn bộ dữ liệu hệ thống về mặc định ban đầu! 🔄");
      onPostCreated?.();
    }
  };

  // Filtered lists for quick search
  const filteredPosts = useMemo(() => {
    if (!searchPost.trim()) return posts;
    const q = searchPost.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
    );
  }, [posts, searchPost]);

  const filteredPrograms = useMemo(() => {
    if (!searchProg.trim()) return programs;
    const q = searchProg.toLowerCase();
    return programs.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [programs, searchProg]);

  const filteredLeaders = useMemo(() => {
    if (!searchLead.trim()) return leaders;
    const q = searchLead.toLowerCase();
    return leaders.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q) ||
        l.khoa.toLowerCase().includes(q) ||
        l.hometown.toLowerCase().includes(q)
    );
  }, [leaders, searchLead]);

  return (
    <>
      {/* NÚT QUYỀN ADMIN THU NHỎ KÍN ĐÁO Ở GÓC MÀN HÌNH (GÓC DƯỚI PHẢI) */}
      <div className="fixed bottom-3 right-3 z-40 sm:bottom-4 sm:right-4 print:hidden">
        <button
          onClick={() => setShowModal(true)}
          title={isAdmin ? "Bảng Quản Trị Đang Mở (Ctrl+Shift+A)" : "Cổng Quản Trị Viên (Ctrl+Shift+A)"}
          aria-label="Cổng Quản Trị Viên"
          className={cn(
            "group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 shadow-sm backdrop-blur-md focus:outline-none sm:h-9 sm:w-9",
            isAdmin
              ? "border-red-400/80 bg-red-600/90 text-white opacity-90 shadow-soft hover:opacity-100 hover:scale-110"
              : "border-cobalt-200/50 bg-cobalt-950/20 text-cobalt-600 opacity-25 hover:opacity-100 hover:bg-cobalt-900/80 hover:text-white hover:scale-110"
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
        </button>
      </div>

      {/* MODAL CỬA SỔ QUẢN TRỊ VIÊN */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">
          <div
            className="fixed inset-0 bg-cobalt-950/70 backdrop-blur-md transition-opacity"
            onClick={() => setShowModal(false)}
          />

          <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl transition-all">
            {/* Nút đóng modal */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-cobalt-100/80 text-cobalt-700 transition hover:bg-red-500 hover:text-white"
              title="Đóng cửa sổ"
            >
              ✕
            </button>

            {!isAdmin ? (
              /* ================== GIAO DIỆN ĐĂNG NHẬP ADMIN ================== */
              <div className="p-6 text-center sm:p-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-3xl text-red-600 shadow-inner">
                  🔐
                </div>
                <h3 className="mt-4 font-display text-xl font-black text-cobalt-950 sm:text-2xl">
                  Cổng Quản Trị Viên BLLSV TMU
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-cobalt-600 sm:text-sm">
                  Khu vực dành riêng cho Ban Chủ Nhiệm, Ban Chấp Hành &amp; Đội SVTN BLLSV TMU để cập nhật tin tức, sự kiện, nhân sự, liên hệ và nội quy.
                </p>

                <form onSubmit={handleLoginSubmit} className="mx-auto mt-7 max-w-xs space-y-4">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      autoFocus
                      value={pinInput}
                      onChange={(e) => {
                        setPinInput(e.target.value);
                        setPinError(false);
                      }}
                      placeholder="Nhập mã xác thực Admin..."
                      className={cn(
                        "w-full rounded-2xl border px-4 py-2.5 pr-10 text-center text-sm font-bold text-cobalt-950 outline-none transition",
                        pinError ? "border-red-500 bg-red-50" : "border-cobalt-300 focus:border-flame-500 focus:ring-2 focus:ring-flame-100"
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-cobalt-400 hover:text-cobalt-700"
                      title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                    {pinError && (
                      <p className="mt-1.5 text-[11.5px] font-bold text-red-600">
                        Sai mật khẩu! Vui lòng thử lại hoặc bấm đặt lại về mặc định bên dưới.
                      </p>
                    )}
                  </div>

                  <Button variant="flame" className="w-full" type="submit">
                    Xác nhận đăng nhập 🚀
                  </Button>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={handleResetPinQuick}
                      className="text-[11px] font-medium text-cobalt-500 underline hover:text-red-600 transition"
                    >
                      Quên mật khẩu? Đặt lại về mặc định (36tmu)
                    </button>
                  </div>
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
                          Phiên quản trị viên đang mở
                        </span>
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
                    { id: "programs", label: "🎯 Chương trình & Sự kiện", count: programs.length },
                    { id: "leaders", label: "👥 Đội ngũ BCH", count: leaders.length },
                    { id: "motto", label: "🔥 Châm ngôn BCH", count: null },
                    { id: "rules", label: "📜 Thông báo nội quy", count: rulesData.rules.length },
                    { id: "notes", label: "📋 Duyệt Note TNV", count: notes.length },
                    { id: "contact", label: "📞 Kênh liên hệ", count: null },
                    { id: "settings", label: "🔐 Mật khẩu & Dữ liệu", count: null },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={cn(
                        "flex shrink-0 snap-start items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition",
                        activeTab === tab.id
                          ? "bg-cobalt-950 text-white shadow-soft"
                          : "text-cobalt-700 hover:bg-cobalt-50"
                      )}
                    >
                      <span>{tab.label}</span>
                      {tab.count !== null && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.2 text-[10px]",
                            activeTab === tab.id ? "bg-white/20 text-white" : "bg-cobalt-100 text-cobalt-700"
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
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                            {editingPostId ? "✏️ Chỉnh Sửa Bài Viết / Thông Báo" : "📢 Đăng Thông Báo / Tin Tức Mới Lên Trang Chủ"}
                          </h4>
                          {editingPostId && (
                            <button
                              type="button"
                              onClick={handleCancelEditPost}
                              className="rounded-lg bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
                            >
                              Hủy sửa
                            </button>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Bài viết sẽ xuất hiện ngay ở phần Sự kiện &amp; Tin tức của website.
                        </p>

                        <form onSubmit={handleSavePost} className="mt-4 space-y-3">
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

                          <div className="flex justify-end gap-2 pt-2">
                            {editingPostId && (
                              <button
                                type="button"
                                onClick={handleCancelEditPost}
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
                            onChange={(e) => setSearchPost(e.target.value)}
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
                                    onClick={() => handleTogglePinPost(p.id)}
                                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs hover:bg-amber-50"
                                    title={p.pinned ? "Bỏ ghim" : "Ghim lên đầu"}
                                  >
                                    📌
                                  </button>
                                  <button
                                    onClick={() => handleStartEditPost(p)}
                                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                                    title="Chỉnh sửa bài viết"
                                  >
                                    ✏️ Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeletePost(p.id)}
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
                  )}

                  {/* TAB 2: CHƯƠNG TRÌNH & SỰ KIỆN */}
                  {activeTab === "programs" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                            {editingProgId ? "✏️ Chỉnh Sửa Chương Trình / Sự Kiện" : "🎯 Cập Nhật Chương Trình / Sự Kiện Mới"}
                          </h4>
                          {editingProgId && (
                            <button
                              type="button"
                              onClick={handleCancelEditProgram}
                              className="rounded-lg bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
                            >
                              Hủy sửa
                            </button>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Thêm chiến dịch tình nguyện mới, giải thể thao hoặc ngày hội của Ban liên lạc vào danh mục Hoạt động.
                        </p>

                        <form onSubmit={handleSaveProgram} className="mt-4 space-y-3">
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

                          <div className="flex justify-end gap-2 pt-2">
                            {editingProgId && (
                              <button
                                type="button"
                                onClick={handleCancelEditProgram}
                                className="rounded-xl border border-cobalt-200 bg-white px-4 py-2 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                              >
                                Hủy sửa
                              </button>
                            )}
                            <Button variant="flame" type="submit">
                              {editingProgId ? "💾 Cập nhật chương trình" : "🎯 Lưu chương trình mới vào web"}
                            </Button>
                          </div>
                        </form>
                      </div>

                      {/* Danh sách chương trình đã thêm */}
                      <div>
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <h4 className="font-display text-sm font-bold text-cobalt-900">
                            Chương trình do Admin thêm mới ({programs.length})
                          </h4>
                          <input
                            type="text"
                            value={searchProg}
                            onChange={(e) => setSearchProg(e.target.value)}
                            placeholder="🔍 Tìm chương trình..."
                            className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-64"
                          />
                        </div>

                        <div className="mt-3 space-y-2.5">
                          {filteredPrograms.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
                              {searchProg ? "Không tìm thấy chương trình nào phù hợp." : "Chưa có chương trình tùy biến nào được thêm. Hệ thống đang hiển thị các chương trình chính thức."}
                            </p>
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
                                      onChange={(e) => handleQuickChangeProgramStatus(p.id, e.target.value as AdminProgram["status"])}
                                      className="rounded bg-flame-50 border border-flame-200 px-1.5 py-0.5 text-[10px] font-bold text-flame-700 outline-none cursor-pointer"
                                    >
                                      <option value="Mới đăng">Mới đăng</option>
                                      <option value="Đang mở đăng ký">Đang mở đăng ký</option>
                                      <option value="Sắp diễn ra">Sắp diễn ra</option>
                                      <option value="Đã kết thúc">Đã kết thúc</option>
                                    </select>
                                    <span className="text-[11px] text-cobalt-500">📍 {p.location}</span>
                                    <span className="text-[11px] text-cobalt-400">🕒 {p.dateLabel}</span>
                                  </div>
                                  <h5 className="mt-1 font-display text-sm font-bold text-cobalt-950">{p.title}</h5>
                                  <p className="text-xs text-cobalt-600 line-clamp-1">{p.excerpt}</p>
                                </div>
                                <div className="flex shrink-0 items-center gap-1.5">
                                  <button
                                    onClick={() => handleStartEditProgram(p)}
                                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                                    title="Chỉnh sửa chương trình"
                                  >
                                    ✏️ Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProgram(p.id)}
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
                  )}

                  {/* TAB 3: ĐỘI NGŨ BAN CHẤP HÀNH */}
                  {activeTab === "leaders" && (
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                            {editingLeadId ? "✏️ Chỉnh Sửa Thành Viên BCH" : "👥 Cập Nhật Đội Ngũ Ban Chấp Hành Mới Nhất"}
                          </h4>
                          {editingLeadId && (
                            <button
                              type="button"
                              onClick={handleCancelEditLeader}
                              className="rounded-lg bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
                            >
                              Hủy sửa
                            </button>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-cobalt-600">
                          Thêm hoặc chỉnh sửa thông tin các đồng chí BCH nhiệm kỳ mới (K60, K61...) vào danh sách lịch sử thế hệ giữ lửa.
                        </p>

                        <form onSubmit={handleSaveLeader} className="mt-4 space-y-3">
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

                          <div className="flex justify-end gap-2 pt-2">
                            {editingLeadId && (
                              <button
                                type="button"
                                onClick={handleCancelEditLeader}
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
                            onChange={(e) => setSearchLead(e.target.value)}
                            placeholder="🔍 Tìm đồng chí theo tên, vai trò..."
                            className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500 sm:w-64"
                          />
                        </div>

                        <div className="mt-3 space-y-2.5">
                          {filteredLeaders.length === 0 ? (
                            <p className="rounded-xl border border-dashed border-cobalt-200 p-6 text-center text-xs text-cobalt-500">
                              {searchLead ? "Không tìm thấy đồng chí nào phù hợp." : "Chưa có thành viên BCH mới nào được thêm riêng. Hệ thống đang hiển thị đầy đủ 16 thế hệ từ K44 đến K60."}
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
                                    onClick={() => handleStartEditLeader(lead)}
                                    className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs font-bold text-cobalt-700 hover:bg-cobalt-50"
                                    title="Chỉnh sửa thông tin"
                                  >
                                    ✏️ Sửa
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLeader(lead.id)}
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
                  )}

                  {/* TAB 4: CHÂM NGÔN HOẠT ĐỘNG MỚI NHẤT */}
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

                  {/* TAB 5: THÔNG BÁO NỘI QUY */}
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
                              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tmu-600 text-[10.5px] font-bold text-white">
                                  {idx + 1}
                                </span>
                                {editingRuleIndex === idx ? (
                                  <div className="flex-1 space-y-2">
                                    <textarea
                                      rows={2}
                                      value={editingRuleText}
                                      onChange={(e) => setEditingRuleText(e.target.value)}
                                      className="w-full rounded-lg border border-cobalt-300 p-2 text-xs font-medium text-cobalt-950 outline-none focus:border-flame-500"
                                    />
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={handleSaveEditRule}
                                        className="rounded bg-flame-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-flame-700"
                                      >
                                        Lưu
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingRuleIndex(null)}
                                        className="rounded bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
                                      >
                                        Hủy
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="font-medium text-cobalt-900 leading-relaxed">{rule}</p>
                                )}
                              </div>
                              {editingRuleIndex !== idx && (
                                <div className="flex shrink-0 items-center gap-1.5">
                                  <button
                                    onClick={() => handleStartEditRule(idx, rule)}
                                    className="text-cobalt-600 hover:text-cobalt-900 text-xs p-1 font-semibold"
                                    title="Sửa điều khoản"
                                  >
                                    ✏️
                                  </button>
                                  <button
                                    onClick={() => handleDeleteRuleItem(idx)}
                                    className="text-red-500 hover:text-red-700 text-xs shrink-0 font-bold p-1"
                                    title="Xóa điều khoản này"
                                  >
                                    ✕
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: QUẢN LÝ GHI CHÚ TNV */}
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

                  {/* TAB 7: THÔNG TIN LIÊN HỆ & KÊNH TRUYỀN THÔNG */}
                  {activeTab === "contact" && (
                    <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
                      <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                        📞 Quản Lý Thông Tin Liên Hệ &amp; Mạng Xã Hội
                      </h4>
                      <p className="mt-0.5 text-xs text-cobalt-600">
                        Thông tin được đồng bộ tự động tới khối Liên hệ, Chân trang (Footer) và các nút mạng xã hội.
                      </p>

                      <form onSubmit={handleSaveContact} className="mt-4 space-y-3.5">
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Hotline Ban Nhân sự *</label>
                            <input
                              required
                              value={contactData.phone}
                              onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                              placeholder="0987 654 321"
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Email chính thức *</label>
                            <input
                              required
                              type="email"
                              value={contactData.email}
                              onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                              placeholder="bllsvthanhhoa.tmu@gmail.com"
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-cobalt-800">Địa chỉ nhà chung *</label>
                          <input
                            required
                            value={contactData.address}
                            onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                            placeholder="79 Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội"
                            className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-bold text-cobalt-800">Lịch sinh hoạt &amp; tập nhảy định kỳ</label>
                          <input
                            value={contactData.scheduleInfo}
                            onChange={(e) => setContactData({ ...contactData, scheduleInfo: e.target.value })}
                            placeholder="19:00 – 21:00 tối thứ Ba hàng tuần"
                            className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                          />
                        </div>

                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link Facebook Fanpage</label>
                            <input
                              value={contactData.fanpage}
                              onChange={(e) => setContactData({ ...contactData, fanpage: e.target.value })}
                              placeholder="https://facebook.com/..."
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link Group Cộng Đồng</label>
                            <input
                              value={contactData.group}
                              onChange={(e) => setContactData({ ...contactData, group: e.target.value })}
                              placeholder="https://facebook.com/groups/..."
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link Kênh TikTok</label>
                            <input
                              value={contactData.tiktok}
                              onChange={(e) => setContactData({ ...contactData, tiktok: e.target.value })}
                              placeholder="https://tiktok.com/@..."
                              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setContactData(DEFAULT_CONTACT);
                              saveStoredAdminContact(DEFAULT_CONTACT);
                              onToast("Đã khôi phục thông tin liên hệ chuẩn ban đầu!");
                              onPostCreated?.();
                            }}
                            className="text-xs font-semibold text-cobalt-600 underline hover:text-cobalt-900"
                          >
                            Khôi phục thông tin ban đầu
                          </button>

                          <Button variant="flame" type="submit">
                            📞 Lưu thông tin liên hệ mới
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* TAB 8: MẬT KHẨU & SAO LƯU DỮ LIỆU */}
                  {activeTab === "settings" && (
                    <div className="space-y-6">
                      {/* KHỐI 1: ĐỔI MẬT KHẨU ADMIN */}
                      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4 sm:p-5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-flame-100 text-sm">
                            🔐
                          </span>
                          <div>
                            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                              Đổi Mật Khẩu Quản Trị Viên (Admin PIN)
                            </h4>
                            <p className="text-xs text-cobalt-600">
                              Bảo vệ bảng quản trị với mật khẩu riêng của Ban Chủ Nhiệm / BCH.
                            </p>
                          </div>
                        </div>

                        <form onSubmit={handleChangePassword} className="mt-4 space-y-3">
                          <div className="grid gap-3 sm:grid-cols-3">
                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Mật khẩu hiện tại *</label>
                              <input
                                required
                                type={showPinSettings ? "text" : "password"}
                                value={oldPinInput}
                                onChange={(e) => setOldPinInput(e.target.value)}
                                placeholder="Nhập mật khẩu đang dùng"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Mật khẩu mới *</label>
                              <input
                                required
                                type={showPinSettings ? "text" : "password"}
                                value={newPinInput}
                                onChange={(e) => setNewPinInput(e.target.value)}
                                placeholder="Tối thiểu 3 ký tự"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>

                            <div>
                              <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhập lại mật khẩu mới *</label>
                              <input
                                required
                                type={showPinSettings ? "text" : "password"}
                                value={confirmPinInput}
                                onChange={(e) => setConfirmPinInput(e.target.value)}
                                placeholder="Xác nhận mật khẩu mới"
                                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                            <label className="flex items-center gap-2 text-xs text-cobalt-600 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={showPinSettings}
                                onChange={(e) => setShowPinSettings(e.target.checked)}
                                className="rounded text-flame-600 focus:ring-flame-500"
                              />
                              <span>Hiển thị mật khẩu khi nhập</span>
                            </label>

                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={handleResetPinQuick}
                                className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-700 hover:bg-cobalt-50"
                              >
                                Đặt lại 36tmu
                              </button>
                              <Button variant="flame" type="submit">
                                🔐 Cập nhật mật khẩu mới
                              </Button>
                            </div>
                          </div>
                        </form>
                      </div>

                      {/* KHỐI 2: SAO LƯU & KHÔI PHỤC DỮ LIỆU */}
                      <div className="rounded-2xl border border-cobalt-100 bg-white p-4 sm:p-5">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-tmu-100 text-sm">
                            💾
                          </span>
                          <div>
                            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                              Sao Lưu &amp; Khôi Phục Dữ Liệu Toàn Hệ Thống
                            </h4>
                            <p className="text-xs text-cobalt-600">
                              Xuất toàn bộ bài viết, sự kiện, BCH, liên hệ thành file JSON để lưu trữ hoặc chuyển sang máy khác.
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-2">
                          <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4">
                            <h5 className="text-xs font-bold text-cobalt-900">📥 Xuất Tệp Sao Lưu (Export)</h5>
                            <p className="mt-1 text-[11.5px] text-cobalt-600">
                              Tải về tệp <code className="font-mono text-cobalt-800">.json</code> chứa toàn bộ nội dung mà quản trị viên đã tạo.
                            </p>
                            <Button variant="primary" className="mt-3 w-full" onClick={handleExportData}>
                              📥 Tải về file sao lưu JSON
                            </Button>
                          </div>

                          <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4">
                            <h5 className="text-xs font-bold text-cobalt-900">📤 Nhập Tệp Khôi Phục (Import)</h5>
                            <p className="mt-1 text-[11.5px] text-cobalt-600">
                              Chọn file sao lưu JSON đã lưu từ trước để nạp lại đầy đủ dữ liệu lên trang web.
                            </p>
                            <input
                              type="file"
                              accept=".json"
                              ref={fileInputRef}
                              onChange={handleImportFile}
                              className="hidden"
                            />
                            <Button
                              variant="outline"
                              className="mt-3 w-full"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              📤 Chọn tệp sao lưu JSON để nạp
                            </Button>
                          </div>
                        </div>

                        {/* Nút Reset toàn bộ */}
                        <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-red-200 bg-red-50/50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-xs font-bold text-red-900">⚠️ Vùng nguy hiểm: Làm sạch dữ liệu</p>
                            <p className="text-[11px] text-red-700">
                              Xóa toàn bộ các bài đăng, chương trình, nhân sự tùy chỉnh và đưa tất cả về mặc định chuẩn ban đầu.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleResetAllData}
                            className="rounded-xl border border-red-300 bg-white px-3.5 py-1.5 text-xs font-bold text-red-600 shadow-2xs hover:bg-red-600 hover:text-white transition shrink-0"
                          >
                            Khôi phục toàn bộ về gốc
                          </button>
                        </div>
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
