import React, { useEffect, useState, useMemo, useRef } from "react";
import { cn } from "@/utils/cn";
import { Button, useLockScroll, useEscape } from "@/components/ui";
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
  getStoredAdminBroadcast,
  saveStoredAdminBroadcast,
  getStoredRecruitment,
  saveStoredRecruitment,
  getStoredApplications,
  saveStoredApplications,
  getStoredFundCampaign,
  saveStoredFundCampaign,
  getStoredFundDonations,
  saveStoredFundDonations,
  getStoredAdminPin,
  saveStoredAdminPin,
  resetStoredAdminPin,
  exportAllAdminData,
  importAllAdminData,
  resetAllAdminDataToDefaults,
  importDefaultProgramsToAdmin,
  DEFAULT_MOTTO,
  DEFAULT_RULES,
  DEFAULT_CONTACT,
  DEFAULT_BROADCAST,
  DEFAULT_RECRUITMENT,
  DEFAULT_FUND_CAMPAIGN,
  type AdminPost,
  type AdminProgram,
  type AdminLeader,
  type AdminMotto,
  type AdminRule,
  type AdminContact,
  type AdminBroadcast,
  type RecruitmentCampaign,
  type VolunteerApplication,
  type FundCampaign,
  type FundDonation,
} from "@/data/adminStore";
import {
  authenticateAdmin,
  createDbAdmin,
  deleteDbAdmin,
  fetchAuditLogs,
  fetchDbAdmins,
  recordAuditLog,
  syncAllDataToCloud,
  fetchAllDataFromCloud,
  type DbAdmin,
  type DbAuditLog,
} from "@/lib/db";

import AdminBroadcastTab from "./admin/AdminBroadcastTab";
import AdminPostsTab from "./admin/AdminPostsTab";
import AdminProgramsTab from "./admin/AdminProgramsTab";
import AdminRecruitmentTab from "./admin/AdminRecruitmentTab";
import AdminFundTab from "./admin/AdminFundTab";
import AdminLeadersTab from "./admin/AdminLeadersTab";
import AdminMottoTab from "./admin/AdminMottoTab";
import AdminRulesTab from "./admin/AdminRulesTab";
import AdminNotesTab from "./admin/AdminNotesTab";
import AdminContactTab from "./admin/AdminContactTab";
import AdminUsersTab from "./admin/AdminUsersTab";
import AdminAuditTab from "./admin/AdminAuditTab";
import AdminSettingsTab from "./admin/AdminSettingsTab";

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

  useLockScroll(showModal);
  useEscape(showModal, () => setShowModal(false));

  type TabType =
    | "broadcast"
    | "posts"
    | "programs"
    | "recruitment"
    | "fund"
    | "leaders"
    | "motto"
    | "rules"
    | "notes"
    | "contact"
    | "admins"
    | "audit"
    | "settings";
  const [activeTab, setActiveTab] = useState<TabType>("broadcast");

  // --- NEON POSTGRESQL & AUDIT LOG STATE ---
  const [currentAdmin, setCurrentAdmin] = useState<DbAdmin | null>(null);
  const [dbAdmins, setDbAdmins] = useState<DbAdmin[]>([]);
  const [auditLogs, setAuditLogs] = useState<DbAuditLog[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  // Form tạo admin mới
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPin, setNewAdminPin] = useState("");
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminRole, setNewAdminRole] = useState("Ủy viên Đội SVTN TMU");
  const [newAdminDept, setNewAdminDept] = useState("Đội SVTN");
  const [newAdminCohort, setNewAdminCohort] = useState("K60");

  // --- 0. BROADCAST, RECRUITMENT & FUND STATE ---
  const [broadcast, setBroadcast] = useState<AdminBroadcast>(getStoredAdminBroadcast());
  const [recruitment, setRecruitment] = useState<RecruitmentCampaign>(getStoredRecruitment());
  const [applications, setApplications] = useState<VolunteerApplication[]>(getStoredApplications());
  const [fundCampaign, setFundCampaign] = useState<FundCampaign>(getStoredFundCampaign());
  const [fundDonations, setFundDonations] = useState<FundDonation[]>(getStoredFundDonations());

  // --- 1. POSTS STATE ---
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [searchPost, setSearchPost] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postTitle, setPostTitle] = useState("");
  const [postCategory, setPostCategory] = useState("Hoạt động tình nguyện");
  const [postAuthor, setPostAuthor] = useState("Ban Chấp Hành BLLSV TMU");
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
  const [progDriveLink, setProgDriveLink] = useState("");

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
    setBroadcast(getStoredAdminBroadcast());
    setRecruitment(getStoredRecruitment());
    setApplications(getStoredApplications());
    setFundCampaign(getStoredFundCampaign());
    setFundDonations(getStoredFundDonations());
    fetchDbAdmins().then(setDbAdmins).catch(() => {});
    fetchAuditLogs(50).then(setAuditLogs).catch(() => {});
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
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentPin = getStoredAdminPin();
    const admin = await authenticateAdmin(pinInput, pinInput);
    if (admin || pinInput.trim() === currentPin) {
      const activeAdmin: DbAdmin = admin || {
        id: "admin-root",
        username: "admin36",
        pin: "36tmu",
        name: "Ban Chấp Hành BLLSV TMU",
        role: "Ủy viên Ban Chấp Hành",
        department: "Ban Chấp Hành",
        cohort: "K60",
        is_active: true,
        created_at: new Date().toISOString(),
      };
      setCurrentAdmin(activeAdmin);
      onLogin();
      setPinError(false);
      setPinInput("");
      onToast(`Đăng nhập thành công! Xin chào ${activeAdmin.name} 🔐`);
      recordAuditLog({
        adminId: activeAdmin.id,
        adminName: activeAdmin.name,
        actionType: "LOGIN",
        targetEntity: "auth",
        summary: `${activeAdmin.name} (${activeAdmin.role}) đăng nhập vào hệ thống`,
      });
      fetchAuditLogs(50).then(setAuditLogs).catch(() => {});
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

  // --- POSTS HANDLERS ---
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
      const next = posts.map((p) =>
        p.id === editingPostId
          ? {
              ...p,
              title: postTitle.trim(),
              category: postCategory,
              author: postAuthor.trim() || "Ban Chấp Hành BLLSV TMU",
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
      const newPost: AdminPost = {
        id: "post-" + Date.now(),
        title: postTitle.trim(),
        category: postCategory,
        author: postAuthor.trim() || "Ban Chấp Hành BLLSV TMU",
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

  // --- PROGRAMS HANDLERS ---
  const handleStartEditProgram = (p: AdminProgram) => {
    setEditingProgId(p.id);
    setProgTitle(p.title);
    setProgCategory(p.category);
    setProgStatus(p.status);
    setProgDateLabel(p.dateLabel);
    setProgLocation(p.location);
    setProgExcerpt(p.excerpt);
    setProgCover(p.cover || "");
    setProgDriveLink(p.driveLink || "");
  };

  const handleCancelEditProgram = () => {
    setEditingProgId(null);
    setProgTitle("");
    setProgExcerpt("");
    setProgCover("");
    setProgDriveLink("");
    setProgDateLabel("");
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!progTitle.trim() || !progExcerpt.trim()) return;

    if (editingProgId) {
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
              driveLink: progDriveLink.trim() || undefined,
            }
          : p
      );
      setPrograms(next);
      saveStoredAdminPrograms(next);
      recordAuditLog({
        adminId: currentAdmin?.id,
        adminName: currentAdmin?.name || "BCH",
        actionType: "UPDATE_PROGRAM",
        targetEntity: "programs",
        targetId: editingProgId,
        summary: `Cập nhật thông tin & link Drive chương trình: ${progTitle.trim()}`,
      }).catch(() => {});
      handleCancelEditProgram();
      onToast("Đã cập nhật chương trình & link Drive thành công! 🎯");
    } else {
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
        driveLink: progDriveLink.trim() || undefined,
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
      recordAuditLog({
        adminId: currentAdmin?.id,
        adminName: currentAdmin?.name || "BCH",
        actionType: "CREATE_PROGRAM",
        targetEntity: "programs",
        targetId: newProg.id,
        summary: `Tạo mới chương trình & link Drive: ${newProg.title}`,
      }).catch(() => {});
      setProgTitle("");
      setProgExcerpt("");
      setProgCover("");
      setProgDriveLink("");
      setProgDateLabel("");
      onToast("Đã thêm chương trình mới vào website! 🎯");
    }
    onPostCreated?.();
  };

  const handleLoadDefaultPrograms = () => {
    const loaded = importDefaultProgramsToAdmin();
    setPrograms(loaded);
    onToast("Đã nạp 4 chương trình chính thức vào bảng quản lý! 🎯");
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

  // --- LEADERS HANDLERS ---
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

  // --- MOTTO HANDLER ---
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

  // --- RULES HANDLERS ---
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

  // --- NOTES HANDLERS ---
  const handleDeleteNote = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã xóa ghi chú của TNV khỏi hệ thống 🗑️");
    onPostCreated?.();
  };

  const handleTogglePinNote = (id: string) => {
    const next = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã cập nhật trạng thái ghim ghi chú 📌");
    onPostCreated?.();
  };

  // --- CONTACT HANDLER ---
  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    const next = { ...contactData, updatedAt: new Date().toLocaleDateString("vi-VN") };
    setContactData(next);
    saveStoredAdminContact(next);
    onToast("Đã cập nhật thông tin liên hệ & kênh truyền thông! 📞");
    onPostCreated?.();
  };

  // --- SETTINGS & AUTH HANDLERS ---
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
      recordAuditLog({
        adminId: currentAdmin?.id,
        adminName: currentAdmin?.name || "Admin",
        actionType: "RESET_DATA",
        targetEntity: "all",
        summary: "Khôi phục toàn bộ dữ liệu hệ thống về mặc định",
      });
      onToast("Đã khôi phục toàn bộ dữ liệu hệ thống về mặc định ban đầu! 🔄");
      onPostCreated?.();
    }
  };

  const handleCreateAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminUsername.trim() || !newAdminPin.trim() || !newAdminName.trim()) {
      onToast("Vui lòng nhập đầy đủ thông tin tài khoản!");
      return;
    }
    const success = await createDbAdmin({
      username: newAdminUsername.trim(),
      pin: newAdminPin.trim(),
      name: newAdminName.trim(),
      role: newAdminRole.trim(),
      department: newAdminDept.trim(),
      cohort: newAdminCohort.trim(),
    });
    if (success) {
      onToast(`Đã tạo tài khoản quản trị cho ${newAdminName}! 🎉`);
      recordAuditLog({
        adminId: currentAdmin?.id,
        adminName: currentAdmin?.name || "Admin",
        actionType: "LOGIN",
        targetEntity: "admins",
        summary: `Tạo tài khoản admin mới: ${newAdminName} (@${newAdminUsername.trim().toLowerCase()})`,
      });
      setNewAdminUsername("");
      setNewAdminPin("");
      setNewAdminName("");
      fetchDbAdmins().then(setDbAdmins).catch(() => {});
    } else {
      onToast("Tạo tài khoản thất bại! Có thể tên đăng nhập đã tồn tại.");
    }
  };

  const handleDeleteAdminClick = async (adminId: string, adminName: string) => {
    if (adminId === "admin-root") {
      onToast("Không thể xóa tài khoản Quản trị viên gốc!");
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản admin của "${adminName}"?`)) {
      const ok = await deleteDbAdmin(adminId);
      if (ok) {
        onToast(`Đã xóa tài khoản admin của ${adminName} 🗑️`);
        recordAuditLog({
          adminId: currentAdmin?.id,
          adminName: currentAdmin?.name || "Admin",
          actionType: "DELETE_POST",
          targetEntity: "admins",
          targetId: adminId,
          summary: `Xóa tài khoản admin: ${adminName}`,
        });
        fetchDbAdmins().then(setDbAdmins).catch(() => {});
      } else {
        onToast("Xóa tài khoản thất bại!");
      }
    }
  };

  const handleCloudSyncPush = async () => {
    setIsSyncingCloud(true);
    const payload = {
      posts: getStoredAdminPosts(),
      programs: getStoredAdminPrograms(),
      leaders: getStoredAdminLeaders(),
      motto: getStoredAdminMotto(),
      rules: getStoredAdminRules(),
      contact: getStoredAdminContact(),
      notes: getStoredNotes(),
    };
    const ok = await syncAllDataToCloud(payload, currentAdmin?.name || "Admin BCH");
    setIsSyncingCloud(false);
    if (ok) {
      onToast("Đã đồng bộ toàn bộ dữ liệu lên Neon PostgreSQL thành công! ☁️🚀");
      recordAuditLog({
        adminId: currentAdmin?.id,
        adminName: currentAdmin?.name || "Admin",
        actionType: "LOGIN",
        targetEntity: "cloud",
        summary: "Đồng bộ toàn bộ dữ liệu website lên đám mây Neon PostgreSQL",
      });
      fetchAuditLogs(50).then(setAuditLogs).catch(() => {});
    } else {
      onToast("Đồng bộ đám mây thất bại! Vui lòng kiểm tra kết nối mạng.");
    }
  };

  const handleCloudSyncPull = async () => {
    setIsSyncingCloud(true);
    const data = await fetchAllDataFromCloud();
    setIsSyncingCloud(false);
    if (data) {
      importAllAdminData(JSON.stringify(data));
      reloadAllData();
      onToast("Đã tải và cập nhật dữ liệu mới nhất từ Neon Cloud về trình duyệt! 📥✨");
      onPostCreated?.();
    } else {
      onToast("Chưa có bản lưu dữ liệu trên đám mây hoặc tải thất bại!");
    }
  };

  const handleRefreshAuditLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const logs = await fetchAuditLogs(100);
      setAuditLogs(logs);
      onToast("Đã cập nhật lịch sử thay đổi từ Neon DB! 📜");
    } catch {
      onToast("Không thể tải nhật ký hoạt động!");
    } finally {
      setIsLoadingLogs(false);
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
      {/* NÚT QUYỀN ADMIN THU NHỎ KÍN ĐÁO Ở GÓC MÀN HÌNH */}
      <div className="fixed bottom-20 right-3.5 z-[95] sm:bottom-22 sm:right-4 xl:bottom-4 xl:right-4 print:hidden">
        <button
          onClick={() => setShowModal(true)}
          title={isAdmin ? "Bảng Quản Trị Đang Mở (Ctrl+Shift+A)" : "Cổng Ban Chấp Hành (Ctrl+Shift+A)"}
          aria-label="Cổng Ban Chấp Hành"
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
        <div className="fixed inset-0 z-[260] flex items-center justify-center p-2 sm:p-4 md:p-6" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-cobalt-950/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl transition-all">
            {!isAdmin ? (
              /* ================== GIAO DIỆN ĐĂNG NHẬP ADMIN ================== */
              <div className="relative p-6 text-center sm:p-10">
                {/* Nút đóng modal ở màn hình đăng nhập */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-2xl bg-cobalt-100/80 text-cobalt-700 transition hover:bg-red-500 hover:text-white active:scale-95"
                  title="Đóng cửa sổ (ESC)"
                  aria-label="Đóng cửa sổ"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.4}>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-red-100 text-3xl text-red-600 shadow-inner">
                  🔐
                </div>
                <h3 className="mt-4 font-display text-xl font-black text-cobalt-950 sm:text-2xl">
                  Cổng Ban Chấp Hành BLLSV TMU
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-cobalt-600 sm:text-sm">
                  Khu vực dành riêng cho Ban Chấp Hành BLLSV TMU để cập nhật tin tức, sự kiện, nhân sự, liên hệ và nội quy.
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
                {/* Header thanh công cụ quản trị */}
                <div className="flex items-center justify-between border-b border-cobalt-100 bg-cobalt-50/80 px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-xl font-bold text-red-600 shadow-2xs">
                      ⚙️
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-sm font-black text-cobalt-950 sm:text-base">
                        Bảng Quản Trị BLLSV Thanh Hóa TMU
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                          {currentAdmin
                            ? `${currentAdmin.name} • ${currentAdmin.department || "Đội SVTN"} (${currentAdmin.role || "Quản trị viên"})`
                            : "Đội SVTN (Cấp Quản Lý 3 Ban)"}
                        </span>
                        <span className="hidden md:inline rounded-md bg-cobalt-100 px-2 py-0.5 text-[10px] font-semibold text-cobalt-700">
                          3 Ban chuyên môn: Ban Truyền thông • Ban Văn hóa – Sự kiện • Ban Hậu cần
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (currentAdmin) {
                          recordAuditLog({
                            adminId: currentAdmin.id,
                            adminName: currentAdmin.name,
                            actionType: "LOGOUT",
                            targetEntity: "auth",
                            summary: `${currentAdmin.name} đăng xuất khỏi hệ thống`,
                          });
                        }
                        setCurrentAdmin(null);
                        onLogout();
                        setShowModal(false);
                        onToast("Đã thoát phiên làm việc Ban Chấp Hành!");
                      }}
                      className="rounded-xl border border-red-200 bg-white px-2.5 py-1.5 text-xs font-bold text-red-600 shadow-2xs transition hover:bg-red-50 active:scale-95"
                      title="Đăng xuất quyền quản trị"
                    >
                      Đăng xuất
                    </button>

                    {/* Nút Đóng cửa sổ quản trị chuẩn target cảm ứng */}
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex h-10 items-center gap-1.5 rounded-xl border border-cobalt-200 bg-white px-3 text-xs font-bold text-cobalt-700 shadow-2xs transition hover:border-red-500 hover:bg-red-500 hover:text-white active:scale-95"
                      title="Đóng cửa sổ quản trị (ESC)"
                      aria-label="Đóng cửa sổ quản trị"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4}>
                        <path d="M6 6l12 12M18 6L6 18" />
                      </svg>
                      <span className="hidden sm:inline">Đóng</span>
                      <kbd className="hidden md:inline rounded bg-black/5 px-1 py-0.5 text-[9px] font-mono text-cobalt-500">
                        ESC
                      </kbd>
                    </button>
                  </div>
                </div>

                {/* Danh sách Tabs chức năng */}
                <div className="scrollbar-none flex snap-x gap-1.5 overflow-x-auto border-b border-cobalt-100 bg-white px-4 py-2.5 sm:px-6">
                  {[
                    { id: "broadcast", label: "📢 Banner Khẩn", badge: "Truyền thông", count: broadcast.enabled ? "BẬT" : "TẮT" },
                    { id: "posts", label: "📰 Bài viết", badge: "Truyền thông", count: posts.length },
                    { id: "programs", label: "🎯 Sự kiện", badge: "Văn hóa - SK", count: programs.length },
                    { id: "recruitment", label: "📋 Tuyển TNV", badge: "Hậu cần", count: applications.length },
                    { id: "fund", label: "💰 Quỹ Tình Nguyện", badge: "Hậu cần", count: fundDonations.length },
                    { id: "leaders", label: "👥 Đội ngũ BCH", badge: "Văn hóa - SK", count: leaders.length },
                    { id: "motto", label: "🔥 Khẩu hiệu 36", badge: "Văn hóa - SK", count: null },
                    { id: "rules", label: "📜 Nội quy", badge: "Văn hóa - SK", count: rulesData.rules.length },
                    { id: "notes", label: "💬 Lời nhắn TNV", badge: "Nhân sự", count: notes.length },
                    { id: "contact", label: "📞 Kênh liên hệ", badge: "Truyền thông", count: null },
                    { id: "admins", label: "🛡️ Quản lý Admin", badge: "Đội SVTN", count: dbAdmins.length },
                    { id: "audit", label: "📜 Nhật ký audit", badge: "Đội SVTN", count: auditLogs.length },
                    { id: "settings", label: "🔐 Cài đặt & Cloud", badge: "Đội SVTN", count: null },
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
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[9px] font-semibold",
                          activeTab === tab.id ? "bg-white/20 text-white" : "bg-cobalt-100 text-cobalt-600"
                        )}
                      >
                        {tab.badge}
                      </span>
                      {tab.count !== null && (
                        <span
                          className={cn(
                            "rounded-md px-1.5 py-0.2 text-[10px]",
                            activeTab === tab.id
                              ? "bg-flame-500 text-white font-extrabold"
                              : "bg-cobalt-200/70 text-cobalt-800"
                          )}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Khung nội dung theo từng Tab */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {activeTab === "broadcast" && (
                    <AdminBroadcastTab
                      broadcast={broadcast}
                      onBroadcastChange={setBroadcast}
                      onToast={onToast}
                      userDept={currentAdmin?.department}
                    />
                  )}

                  {activeTab === "recruitment" && (
                    <AdminRecruitmentTab
                      recruitment={recruitment}
                      applications={applications}
                      onRecruitmentChange={setRecruitment}
                      onApplicationsChange={setApplications}
                      onToast={onToast}
                      userDept={currentAdmin?.department}
                    />
                  )}

                  {activeTab === "fund" && (
                    <AdminFundTab
                      campaign={fundCampaign}
                      donations={fundDonations}
                      onCampaignChange={setFundCampaign}
                      onDonationsChange={setFundDonations}
                      onToast={onToast}
                      userDept={currentAdmin?.department}
                    />
                  )}

                  {activeTab === "posts" && (
                    <AdminPostsTab
                      posts={posts}
                      filteredPosts={filteredPosts}
                      searchPost={searchPost}
                      onSearchChange={setSearchPost}
                      editingPostId={editingPostId}
                      postTitle={postTitle}
                      onTitleChange={setPostTitle}
                      postCategory={postCategory}
                      onCategoryChange={setPostCategory}
                      postAuthor={postAuthor}
                      onAuthorChange={setPostAuthor}
                      postSummary={postSummary}
                      onSummaryChange={setPostSummary}
                      postContent={postContent}
                      onContentChange={setPostContent}
                      postImage={postImage}
                      onImageChange={setPostImage}
                      onSavePost={handleSavePost}
                      onStartEditPost={handleStartEditPost}
                      onCancelEditPost={handleCancelEditPost}
                      onDeletePost={handleDeletePost}
                      onTogglePinPost={handleTogglePinPost}
                    />
                  )}

                  {activeTab === "programs" && (
                    <AdminProgramsTab
                      programs={programs}
                      filteredPrograms={filteredPrograms}
                      searchProg={searchProg}
                      onSearchChange={setSearchProg}
                      editingProgId={editingProgId}
                      progTitle={progTitle}
                      onTitleChange={setProgTitle}
                      progCategory={progCategory}
                      onCategoryChange={setProgCategory}
                      progStatus={progStatus}
                      onStatusChange={setProgStatus}
                      progDateLabel={progDateLabel}
                      onDateLabelChange={setProgDateLabel}
                      progLocation={progLocation}
                      onLocationChange={setProgLocation}
                      progExcerpt={progExcerpt}
                      onExcerptChange={setProgExcerpt}
                      progCover={progCover}
                      onCoverChange={setProgCover}
                      progDriveLink={progDriveLink}
                      onDriveLinkChange={setProgDriveLink}
                      onSaveProgram={handleSaveProgram}
                      onStartEditProgram={handleStartEditProgram}
                      onCancelEditProgram={handleCancelEditProgram}
                      onDeleteProgram={handleDeleteProgram}
                      onQuickChangeStatus={handleQuickChangeProgramStatus}
                      onLoadDefaultPrograms={handleLoadDefaultPrograms}
                    />
                  )}

                  {activeTab === "leaders" && (
                    <AdminLeadersTab
                      leaders={leaders}
                      filteredLeaders={filteredLeaders}
                      searchLead={searchLead}
                      onSearchChange={setSearchLead}
                      editingLeadId={editingLeadId}
                      leadKhoa={leadKhoa}
                      onKhoaChange={setLeadKhoa}
                      leadTerm={leadTerm}
                      onTermChange={setLeadTerm}
                      leadName={leadName}
                      onNameChange={setLeadName}
                      leadDob={leadDob}
                      onDobChange={setLeadDob}
                      leadHometown={leadHometown}
                      onHometownChange={setLeadHometown}
                      leadRole={leadRole}
                      onRoleChange={setLeadRole}
                      onSaveLeader={handleSaveLeader}
                      onStartEditLeader={handleStartEditLeader}
                      onCancelEditLeader={handleCancelEditLeader}
                      onDeleteLeader={handleDeleteLeader}
                    />
                  )}

                  {activeTab === "motto" && (
                    <AdminMottoTab
                      motto={motto}
                      onMottoChange={setMotto}
                      onSaveMotto={handleSaveMotto}
                      onToast={onToast}
                      onPostCreated={onPostCreated}
                    />
                  )}

                  {activeTab === "rules" && (
                    <AdminRulesTab
                      rulesData={rulesData}
                      onRulesDataChange={setRulesData}
                      newRuleItem={newRuleItem}
                      onNewRuleItemChange={setNewRuleItem}
                      editingRuleIndex={editingRuleIndex}
                      editingRuleText={editingRuleText}
                      onEditingRuleTextChange={setEditingRuleText}
                      onAddRuleItem={handleAddRuleItem}
                      onStartEditRule={handleStartEditRule}
                      onSaveEditRule={handleSaveEditRule}
                      onCancelEditRule={() => setEditingRuleIndex(null)}
                      onDeleteRuleItem={handleDeleteRuleItem}
                      onSaveRulesHeader={handleSaveRulesHeader}
                    />
                  )}

                  {activeTab === "notes" && (
                    <AdminNotesTab
                      notes={notes}
                      onTogglePinNote={handleTogglePinNote}
                      onDeleteNote={handleDeleteNote}
                    />
                  )}

                  {activeTab === "contact" && (
                    <AdminContactTab
                      contactData={contactData}
                      onContactDataChange={setContactData}
                      onSaveContact={handleSaveContact}
                      onToast={onToast}
                      onPostCreated={onPostCreated}
                    />
                  )}

                  {activeTab === "admins" && (
                    <AdminUsersTab
                      dbAdmins={dbAdmins}
                      newAdminName={newAdminName}
                      onAdminNameChange={setNewAdminName}
                      newAdminUsername={newAdminUsername}
                      onAdminUsernameChange={setNewAdminUsername}
                      newAdminPin={newAdminPin}
                      onAdminPinChange={setNewAdminPin}
                      newAdminRole={newAdminRole}
                      onAdminRoleChange={setNewAdminRole}
                      newAdminDept={newAdminDept}
                      onAdminDeptChange={setNewAdminDept}
                      newAdminCohort={newAdminCohort}
                      onAdminCohortChange={setNewAdminCohort}
                      onCreateAdmin={handleCreateAdminSubmit}
                      onDeleteAdmin={handleDeleteAdminClick}
                    />
                  )}

                  {activeTab === "audit" && (
                    <AdminAuditTab
                      auditLogs={auditLogs}
                      isLoading={isLoadingLogs}
                      onRefresh={handleRefreshAuditLogs}
                    />
                  )}

                  {activeTab === "settings" && (
                    <AdminSettingsTab
                      oldPinInput={oldPinInput}
                      onOldPinChange={setOldPinInput}
                      newPinInput={newPinInput}
                      onNewPinChange={setNewPinInput}
                      confirmPinInput={confirmPinInput}
                      onConfirmPinChange={setConfirmPinInput}
                      showPinSettings={showPinSettings}
                      onToggleShowPinSettings={() => setShowPinSettings((prev) => !prev)}
                      onChangePassword={handleChangePassword}
                      onResetPinQuick={handleResetPinQuick}
                      onExportData={handleExportData}
                      onImportFile={handleImportFile}
                      fileInputRef={fileInputRef}
                      isSyncingCloud={isSyncingCloud}
                      onCloudSyncPush={handleCloudSyncPush}
                      onCloudSyncPull={handleCloudSyncPull}
                      onResetAllData={handleResetAllData}
                    />
                  )}
                </div>

                {/* Modal Footer: thanh cố định chân trang cho phép đóng nhanh */}
                <div className="flex items-center justify-between border-t border-cobalt-100 bg-cobalt-50/80 px-4 py-2.5 sm:px-6">
                  <div className="flex items-center gap-2 text-[11px] text-cobalt-600">
                    <span className="hidden sm:inline">Phím tắt:</span>
                    <kbd className="rounded border border-cobalt-200 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-cobalt-700">
                      ESC
                    </kbd>
                    <span>để đóng cửa sổ</span>
                    <span className="hidden md:inline">•</span>
                    <span className="hidden md:inline">
                      <kbd className="rounded border border-cobalt-200 bg-white px-1.5 py-0.5 text-[10px] font-mono font-bold text-cobalt-700">
                        Ctrl+Shift+A
                      </kbd>{" "}
                      để mở lại
                    </span>
                  </div>

                  <button
                    onClick={() => setShowModal(false)}
                    className="flex h-9 items-center gap-1.5 rounded-xl bg-cobalt-900 px-3.5 text-xs font-bold text-white shadow-soft transition hover:bg-red-600 active:scale-95"
                  >
                    <span>Đóng cửa sổ</span>
                    <span className="text-xs">✕</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
