import { ORG, PROGRAMS, LEADERSHIP_HISTORY, type Program, type EventCategory, type ProgramStatus, type LeaderRecord } from "@/data/content";
import { safeLocalStorageSet } from "@/utils/storage";

function notifyQuotaError() {
  window.dispatchEvent(
    new CustomEvent("bllsv_toast", {
      detail: { message: "⚠️ Dung lượng lưu trữ trình duyệt gần đầy! Vui lòng dùng link ảnh trực tuyến." },
    })
  );
}

/* ==========================================================================
   1. TYPES
   ========================================================================== */

export type AdminPost = {
  id: string;
  title: string;
  category: string;
  author: string;
  summary: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  pinned?: boolean;
};

export type AdminProgram = {
  id: string;
  title: string;
  category: EventCategory;
  status: ProgramStatus;
  month: string;
  day: string;
  dateLabel: string;
  location: string;
  excerpt: string;
  cover: string;
  driveLink?: string;
  schedule: { time: string; title: string; note: string }[];
  fact: { label: string; value: string }[];
  createdAt: string;
};

export type AdminLeader = LeaderRecord & {
  id: string;
  createdAt: string;
};

export type AdminMotto = {
  slogan: string;
  term: string;
  meaning: string;
  updatedAt: string;
};

export type AdminRule = {
  id: string;
  title: string;
  effectiveDate: string;
  issuedBy: string;
  summary: string;
  rules: string[];
  updatedAt: string;
};

export type AdminContact = {
  email: string;
  phone: string;
  address: string;
  fanpage: string;
  tiktok: string;
  group?: string;
  scheduleInfo: string;
  updatedAt: string;
};

export type DepartmentType =
  | "Đội SVTN"
  | "Ban Chấp Hành"
  | "Ban Truyền thông"
  | "Ban Văn hóa – Sự kiện"
  | "Ban Hậu cần";

export type AdminBroadcast = {
  enabled: boolean;
  type: "emergency" | "warning" | "info" | "success";
  title: string;
  message: string;
  actionLabel?: string;
  actionLink?: string;
  updatedAt: string;
  updatedBy?: string;
};

export type VolunteerApplication = {
  id: string;
  fullName: string;
  phone: string;
  cohort: string;
  major: string;
  hometown: string;
  targetDept: "Ban Truyền thông" | "Ban Văn hóa – Sự kiện" | "Ban Hậu cần";
  skills: string;
  reason: string;
  status: "pending" | "interviewed" | "accepted" | "rejected";
  createdAt: string;
};

export type RecruitmentCampaign = {
  isOpen: boolean;
  title: string;
  description: string;
  deadline: string;
  allowedDepts: string[];
  updatedAt: string;
};

export type FundDonation = {
  id: string;
  donorName: string;
  cohortOrOrg?: string;
  amount: number;
  program: string;
  note?: string;
  date: string;
};

export type FundCampaign = {
  programName: string;
  targetAmount: number;
  currentAmount: number;
  description: string;
  updatedAt: string;
};

/* ==========================================================================
   2. STORAGE KEYS & DEFAULTS
   ========================================================================== */

const PIN_KEY = "bllsv_admin_pin";
export const DEFAULT_PIN = "36tmu";

const CONTACT_KEY = "bllsv_admin_contact";
const POSTS_KEY = "bllsv_admin_posts";
const PROGRAMS_KEY = "bllsv_admin_programs";
const LEADERS_KEY = "bllsv_admin_leaders";
const MOTTO_KEY = "bllsv_admin_motto";
const RULES_KEY = "bllsv_admin_rules";
const BROADCAST_KEY = "bllsv_admin_broadcast";
const RECRUIT_KEY = "bllsv_admin_recruitment";
const APPS_KEY = "bllsv_admin_applications";
const FUND_CAMPAIGN_KEY = "bllsv_admin_fund_campaign";
const FUND_DONATIONS_KEY = "bllsv_admin_fund_donations";

export const DEFAULT_BROADCAST: AdminBroadcast = {
  enabled: true,
  type: "info",
  title: "Thông báo từ Đội SVTN Nhà Chung 36",
  message: "Lịch sinh hoạt định kỳ tối thứ Ba hàng tuần (19h00 – 21h00) tại sân Thư viện Trường ĐH Thương Mại.",
  actionLabel: "Xem hoạt động",
  actionLink: "#events",
  updatedAt: "18/10/2026",
  updatedBy: "Ban Truyền thông & Đội SVTN",
};

export const DEFAULT_RECRUITMENT: RecruitmentCampaign = {
  isOpen: true,
  title: "Mở Cổng Tuyển Tình Nguyện Viên & Cộng Tác Viên Nhà Chung 36",
  description: "Chào đón toàn thể sinh viên quê Thanh Hóa tại Trường ĐH Thương Mại (K60, K61, K62) gia nhập 3 Ban chuyên môn: Ban Truyền thông, Ban Văn hóa – Sự kiện và Ban Hậu cần do Đội SVTN điều hành.",
  deadline: "30/11/2026",
  allowedDepts: ["Ban Truyền thông", "Ban Văn hóa – Sự kiện", "Ban Hậu cần"],
  updatedAt: "18/10/2026",
};

export const DEFAULT_APPLICATIONS: VolunteerApplication[] = [
  {
    id: "app-1",
    fullName: "Nguyễn Thị Phương Thảo",
    phone: "0388 123 456",
    cohort: "K61",
    major: "Marketing số (E-Commerce)",
    hometown: "Hoằng Hóa, Thanh Hóa",
    targetDept: "Ban Truyền thông",
    skills: "Chụp ảnh, quay dựng video ngắn TikTok/CapCut, viết content",
    reason: "Em muốn cống hiến cho phong trào quê hương và lan tỏa hình ảnh sinh viên 36 TMU.",
    status: "interviewed",
    createdAt: "15/10/2026 14:30",
  },
  {
    id: "app-2",
    fullName: "Lê Văn Hùng",
    phone: "0974 654 321",
    cohort: "K61",
    major: "Logistics và Quản lý Chuỗi Cung Ứng",
    hometown: "Quảng Xương, Thanh Hóa",
    targetDept: "Ban Hậu cần",
    skills: "Nhiệt tình, sức khỏe tốt, quản lý đồ đạc và chuẩn bị hậu cần chiến dịch",
    reason: "Muốn sát cánh cùng anh chị trong chiến dịch Mùa Hè Xanh và Đông Ấm.",
    status: "pending",
    createdAt: "16/10/2026 09:15",
  },
  {
    id: "app-3",
    fullName: "Trần Mai Anh",
    phone: "0912 345 678",
    cohort: "K61",
    major: "Quản trị Khách sạn & Du lịch",
    hometown: "TP. Thanh Hóa",
    targetDept: "Ban Văn hóa – Sự kiện",
    skills: "Múa dân gian, nhảy hiện đại, dẫn chương trình MC",
    reason: "Yêu thích sân khấu Âm Vang Xứ Thanh và các hoạt động văn nghệ nhà chung.",
    status: "accepted",
    createdAt: "14/10/2026 20:00",
  },
];

export const DEFAULT_FUND_CAMPAIGN: FundCampaign = {
  programName: "Chiến dịch Tình nguyện Đông Ấm 2026 – Vùng cao Xứ Thanh",
  targetAmount: 35000000,
  currentAmount: 24500000,
  description: "Quyên góp áo ấm, chăn bông, sách vở và quà Tết trao tặng các em học sinh và bà con có hoàn cảnh khó khăn tại vùng cao Thanh Hóa.",
  updatedAt: "18/10/2026",
};

export const DEFAULT_FUND_DONATIONS: FundDonation[] = [
  {
    id: "fund-1",
    donorName: "Anh Trịnh Tứ Huy & BCH K60",
    cohortOrOrg: "Ban Liên Lạc K60",
    amount: 5000000,
    program: "Đông Ấm 2026",
    note: "Ủng hộ quỹ áo ấm học sinh vùng cao",
    date: "10/10/2026",
  },
  {
    id: "fund-2",
    donorName: "Chi hội Cựu Sinh Viên 36 TMU (K50 - K55)",
    cohortOrOrg: "Cựu Sinh Viên TMU",
    amount: 10000000,
    program: "Đông Ấm 2026",
    note: "Đồng hành cùng đàn em nhà chung",
    date: "12/10/2026",
  },
  {
    id: "fund-3",
    donorName: "Tập thể Ban Hậu cần & Đội SVTN",
    cohortOrOrg: "Đội SVTN",
    amount: 3500000,
    program: "Đông Ấm 2026",
    note: "Gây quỹ từ chương trình bán hoa và ve chai tình nguyện",
    date: "15/10/2026",
  },
  {
    id: "fund-4",
    donorName: "Nhà hảo tâm giấu tên (Quê Hậu Lộc)",
    cohortOrOrg: "Đồng hương Thanh Hóa tại Hà Nội",
    amount: 6000000,
    program: "Đông Ấm 2026",
    note: "Chung tay vì các cháu học sinh nghèo",
    date: "17/10/2026",
  },
];

export const DEFAULT_CONTACT: AdminContact = {
  email: ORG.email,
  phone: ORG.phone,
  address: ORG.address,
  fanpage: ORG.fanpage,
  tiktok: ORG.tiktok,
  scheduleInfo: "19:00 – 21:00 tối thứ Ba hàng tuần",
  updatedAt: "12/04/2026",
};

export const DEFAULT_MOTTO: AdminMotto = {
  slogan: ORG.slogan,
  term: "Nhiệm kỳ 2026 – 2027 (K60)",
  meaning: "Ngọn lửa nhiệt huyết, tình yêu thương và tinh thần cống hiến không ngừng nghỉ vì quê hương Thanh Hóa của tuổi trẻ TMU.",
  updatedAt: "12/04/2026",
};

export const DEFAULT_RULES: AdminRule = {
  id: "rule-official-2026",
  title: "Thông Báo Nội Quy & Quy Chế Hoạt Động TNV Nhà Chung 36",
  effectiveDate: "Áp dụng từ năm học 2026 – 2027",
  issuedBy: "Ban Chấp Hành & Đội Trưởng Đội SVTN",
  summary: "Quy chuẩn đạo đức, tinh thần kỷ luật và trách nhiệm phụng sự dành cho toàn thể thành viên và tình nguyện viên trực thuộc 3 ban chuyên môn.",
  rules: [
    "Trang phục & Tác phong: Mặc áo xanh tình nguyện hoặc áo đồng phục Ban liên lạc đúng quy cách trong tất cả các buổi lễ, sự kiện và chiến dịch.",
    "Kỷ luật thời gian & Chuyên cần: Có mặt đúng giờ sinh hoạt định kỳ tối thứ 3 hàng tuần (19h00 – 21h00). Vắng mặt phải báo phép trước ít nhất 12 giờ.",
    "Văn hóa ứng xử & Tinh thần đoàn kết: Luôn giữ gìn hình ảnh người con xứ Thanh lễ phép, văn minh, khiêm tốn; cấm tuyệt đối hành vi gây chia rẽ bè phái.",
    "Kỷ luật trong chiến dịch Mùa Hè Xanh & Đông Ấm: Chấp hành 100% mệnh lệnh của Ban Chỉ huy chiến dịch và Đội SVTN. Nghiêm cấm tắm sông suối hoặc tự ý rời địa bàn tình nguyện.",
    "Trách nhiệm bảo vệ tài sản chung: Quản lý minh bạch công quỹ, bảo quản cẩn thận đạo cụ, kho đồ và trang thiết bị của nhà chung.",
    "Tinh thần trách nhiệm & Chủ động: Luôn hết mình với công việc được phân công, chủ động hỗ trợ đồng đội với tinh thần 'Một người vì mọi người'.",
  ],
  updatedAt: "12/04/2026",
};

/* ==========================================================================
   3. GETTERS & SETTERS (LOCALSTORAGE)
   ========================================================================== */

// --- POSTS / THÔNG BÁO ---
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
  if (safeLocalStorageSet(POSTS_KEY, JSON.stringify(posts), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "posts" } }));
  }
}

// --- PROGRAMS / CHƯƠNG TRÌNH ---
export function getStoredAdminPrograms(): AdminProgram[] {
  try {
    const raw = localStorage.getItem(PROGRAMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredAdminPrograms(programs: AdminProgram[]) {
  if (safeLocalStorageSet(PROGRAMS_KEY, JSON.stringify(programs), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "programs" } }));
  }
}

// Merge programs with defaults (custom programs override built-in ones with same id)
export function getAllPrograms(): Program[] {
  const custom = getStoredAdminPrograms();
  const customMapped: Program[] = custom.map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    month: p.month || "MỚI",
    day: p.day || "HOT",
    dateLabel: p.dateLabel,
    location: p.location,
    excerpt: p.excerpt,
    cover: p.cover || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80",
    gallery: [p.cover || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80"],
    driveLink: p.driveLink,
    schedule: p.schedule?.length ? p.schedule : [{ time: "Sự kiện", title: p.title, note: p.excerpt }],
    fact: p.fact?.length ? p.fact : [{ label: "Địa điểm", value: p.location }],
  }));
  const customIds = new Set(customMapped.map((p) => p.id));
  return [...customMapped, ...PROGRAMS.filter((p) => !customIds.has(p.id))];
}

export function importDefaultProgramsToAdmin(): AdminProgram[] {
  const existing = getStoredAdminPrograms();
  const existingIds = new Set(existing.map((p) => p.id));
  const newOnes: AdminProgram[] = PROGRAMS.filter((p) => !existingIds.has(p.id)).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    status: p.status,
    month: p.month,
    day: p.day,
    dateLabel: p.dateLabel,
    location: p.location,
    excerpt: p.excerpt,
    cover: p.cover,
    driveLink: p.driveLink,
    schedule: p.schedule,
    fact: p.fact,
    createdAt: "Chính thức",
  }));
  const merged = [...existing, ...newOnes];
  saveStoredAdminPrograms(merged);
  return merged;
}


// --- LEADERS / BAN CHẤP HÀNH ---
export function getStoredAdminLeaders(): AdminLeader[] {
  try {
    const raw = localStorage.getItem(LEADERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredAdminLeaders(leaders: AdminLeader[]) {
  if (safeLocalStorageSet(LEADERS_KEY, JSON.stringify(leaders), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "leaders" } }));
  }
}

// Helpers to sort leaders chronologically (newest to oldest)
function parseKhoa(k: string): number {
  const match = k.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

function parseTermYear(term: string): number {
  const match = term.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

// Merge leaders with defaults and sort chronologically from newest to oldest (K60 down to K44)
export function getAllLeaders(): LeaderRecord[] {
  const custom = getStoredAdminLeaders();
  const all = [...custom, ...LEADERSHIP_HISTORY];
  return all.slice().sort((a, b) => {
    const kA = parseKhoa(a.khoa);
    const kB = parseKhoa(b.khoa);
    if (kA !== kB) {
      return kB - kA; // Khóa mới nhất xếp trước (K60, K59, ... K44)
    }
    const yA = parseTermYear(a.term);
    const yB = parseTermYear(b.term);
    if (yA !== yB) {
      return yB - yA; // Nhiệm kỳ năm học mới nhất xếp trước
    }
    return 0; // Giữ nguyên thứ tự chức vụ (Trưởng ban, Phó ban...)
  });
}

// --- MOTTO / CHÂM NGÔN HOẠT ĐỘNG ---
export function getStoredAdminMotto(): AdminMotto {
  try {
    const raw = localStorage.getItem(MOTTO_KEY);
    if (!raw) return DEFAULT_MOTTO;
    const parsed = JSON.parse(raw);
    return parsed?.slogan ? { ...DEFAULT_MOTTO, ...parsed } : DEFAULT_MOTTO;
  } catch {
    return DEFAULT_MOTTO;
  }
}

export function saveStoredAdminMotto(motto: AdminMotto) {
  if (safeLocalStorageSet(MOTTO_KEY, JSON.stringify(motto), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "motto" } }));
  }
}

// --- RULES / THÔNG BÁO NỘI QUY ---
export function getStoredAdminRules(): AdminRule {
  try {
    const raw = localStorage.getItem(RULES_KEY);
    if (!raw) return DEFAULT_RULES;
    const parsed = JSON.parse(raw);
    return parsed?.rules?.length ? { ...DEFAULT_RULES, ...parsed } : DEFAULT_RULES;
  } catch {
    return DEFAULT_RULES;
  }
}

export function saveStoredAdminRules(rules: AdminRule) {
  if (safeLocalStorageSet(RULES_KEY, JSON.stringify(rules), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "rules" } }));
  }
}

// --- PIN / MẬT KHẨU QUẢN TRỊ ---
export function getStoredAdminPin(): string {
  try {
    return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function saveStoredAdminPin(newPin: string): boolean {
  try {
    const trimmed = newPin.trim();
    if (!trimmed || trimmed.length < 3) return false;
    localStorage.setItem(PIN_KEY, trimmed);
    return true;
  } catch {
    return false;
  }
}

export function resetStoredAdminPin(): void {
  try {
    localStorage.removeItem(PIN_KEY);
  } catch {}
}

// --- CONTACT / THÔNG TIN LIÊN HỆ & KÊNH TRUYỀN THÔNG ---
export function getStoredAdminContact(): AdminContact {
  try {
    const raw = localStorage.getItem(CONTACT_KEY);
    if (!raw) return DEFAULT_CONTACT;
    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      parsed.email === "bllsvthanhhoa.tmu@gmail.com" ||
      parsed.fanpage === "https://facebook.com" ||
      parsed.phone === "0987 654 321"
    ) {
      return DEFAULT_CONTACT;
    }
    return { ...DEFAULT_CONTACT, ...parsed };
  } catch {
    return DEFAULT_CONTACT;
  }
}

export function saveStoredAdminContact(contact: AdminContact): void {
  if (safeLocalStorageSet(CONTACT_KEY, JSON.stringify(contact), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "contact" } }));
  }
}

// --- BROADCAST / THÔNG BÁO KHẨN TRANG CHỦ ---
export function getStoredAdminBroadcast(): AdminBroadcast {
  try {
    const raw = localStorage.getItem(BROADCAST_KEY);
    if (!raw) return DEFAULT_BROADCAST;
    const parsed = JSON.parse(raw);
    return parsed?.title ? { ...DEFAULT_BROADCAST, ...parsed } : DEFAULT_BROADCAST;
  } catch {
    return DEFAULT_BROADCAST;
  }
}

export function saveStoredAdminBroadcast(broadcast: AdminBroadcast): void {
  if (safeLocalStorageSet(BROADCAST_KEY, JSON.stringify(broadcast), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "broadcast" } }));
  }
}

// --- RECRUITMENT / TUYỂN TÌNH NGUYỆN VIÊN ---
export function getStoredRecruitment(): RecruitmentCampaign {
  try {
    const raw = localStorage.getItem(RECRUIT_KEY);
    if (!raw) return DEFAULT_RECRUITMENT;
    const parsed = JSON.parse(raw);
    return parsed?.title ? { ...DEFAULT_RECRUITMENT, ...parsed } : DEFAULT_RECRUITMENT;
  } catch {
    return DEFAULT_RECRUITMENT;
  }
}

export function saveStoredRecruitment(rec: RecruitmentCampaign): void {
  if (safeLocalStorageSet(RECRUIT_KEY, JSON.stringify(rec), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "recruitment" } }));
  }
}

export function getStoredApplications(): VolunteerApplication[] {
  try {
    const raw = localStorage.getItem(APPS_KEY);
    if (!raw) return DEFAULT_APPLICATIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_APPLICATIONS;
  } catch {
    return DEFAULT_APPLICATIONS;
  }
}

export function saveStoredApplications(apps: VolunteerApplication[]): void {
  if (safeLocalStorageSet(APPS_KEY, JSON.stringify(apps), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "applications" } }));
  }
}

export function addVolunteerApplication(
  app: Omit<VolunteerApplication, "id" | "createdAt" | "status">
): boolean {
  const current = getStoredApplications();
  const newApp: VolunteerApplication = {
    ...app,
    id: "app-" + Date.now(),
    status: "pending",
    createdAt: new Date().toLocaleString("vi-VN"),
  };
  const updated = [newApp, ...current];
  saveStoredApplications(updated);
  return true;
}

export function updateApplicationStatus(
  id: string,
  status: VolunteerApplication["status"]
): void {
  const current = getStoredApplications();
  const updated = current.map((a) => (a.id === id ? { ...a, status } : a));
  saveStoredApplications(updated);
}

export function deleteVolunteerApplication(id: string): void {
  const current = getStoredApplications();
  const updated = current.filter((a) => a.id !== id);
  saveStoredApplications(updated);
}

// --- FUND / QUỸ TÌNH NGUYỆN & MINH BẠCH THU CHI ---
export function getStoredFundCampaign(): FundCampaign {
  try {
    const raw = localStorage.getItem(FUND_CAMPAIGN_KEY);
    if (!raw) return DEFAULT_FUND_CAMPAIGN;
    const parsed = JSON.parse(raw);
    return parsed?.programName ? { ...DEFAULT_FUND_CAMPAIGN, ...parsed } : DEFAULT_FUND_CAMPAIGN;
  } catch {
    return DEFAULT_FUND_CAMPAIGN;
  }
}

export function saveStoredFundCampaign(camp: FundCampaign): void {
  if (safeLocalStorageSet(FUND_CAMPAIGN_KEY, JSON.stringify(camp), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "fund" } }));
  }
}

export function getStoredFundDonations(): FundDonation[] {
  try {
    const raw = localStorage.getItem(FUND_DONATIONS_KEY);
    if (!raw) return DEFAULT_FUND_DONATIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_FUND_DONATIONS;
  } catch {
    return DEFAULT_FUND_DONATIONS;
  }
}

export function saveStoredFundDonations(donations: FundDonation[]): void {
  if (safeLocalStorageSet(FUND_DONATIONS_KEY, JSON.stringify(donations), notifyQuotaError)) {
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "fund_donations" } }));
  }
}

export function addFundDonation(donation: Omit<FundDonation, "id">): void {
  const current = getStoredFundDonations();
  const newDonation: FundDonation = {
    ...donation,
    id: "fund-" + Date.now(),
  };
  const updated = [newDonation, ...current];
  saveStoredFundDonations(updated);

  // Auto-increment current amount in fund campaign
  const campaign = getStoredFundCampaign();
  campaign.currentAmount += donation.amount;
  campaign.updatedAt = new Date().toLocaleDateString("vi-VN");
  saveStoredFundCampaign(campaign);
}

export function deleteFundDonation(id: string): void {
  const current = getStoredFundDonations();
  const deleted = current.find((d) => d.id === id);
  const updated = current.filter((d) => d.id !== id);
  saveStoredFundDonations(updated);

  if (deleted) {
    const campaign = getStoredFundCampaign();
    campaign.currentAmount = Math.max(0, campaign.currentAmount - deleted.amount);
    saveStoredFundCampaign(campaign);
  }
}

const NOTES_KEY = "bllsv_tnv_notes";
const CONFESSIONS_KEY = "bllsv_confessions";

// --- BACKUP & RESTORE DỮ LIỆU ---
export function exportAllAdminData(): string {
  let notes: unknown[] = [];
  try {
    const rawNotes = localStorage.getItem(NOTES_KEY);
    if (rawNotes) notes = JSON.parse(rawNotes);
  } catch {}

  let confessions: unknown[] = [];
  try {
    const rawConf = localStorage.getItem(CONFESSIONS_KEY);
    if (rawConf) confessions = JSON.parse(rawConf);
  } catch {}

  const data = {
    version: "1.2",
    appName: "BLLSVTMU-Manager",
    exportedAt: new Date().toLocaleString("vi-VN"),
    posts: getStoredAdminPosts(),
    programs: getStoredAdminPrograms(),
    leaders: getStoredAdminLeaders(),
    motto: getStoredAdminMotto(),
    rules: getStoredAdminRules(),
    contact: getStoredAdminContact(),
    broadcast: getStoredAdminBroadcast(),
    recruitment: getStoredRecruitment(),
    applications: getStoredApplications(),
    fundCampaign: getStoredFundCampaign(),
    fundDonations: getStoredFundDonations(),
    notes,
    confessions,
  };
  return JSON.stringify(data, null, 2);
}

export function importAllAdminData(jsonStr: string): boolean {
  try {
    const data = JSON.parse(jsonStr);
    if (Array.isArray(data.posts)) saveStoredAdminPosts(data.posts);
    if (Array.isArray(data.programs)) saveStoredAdminPrograms(data.programs);
    if (Array.isArray(data.leaders)) saveStoredAdminLeaders(data.leaders);
    if (data.motto?.slogan) saveStoredAdminMotto(data.motto);
    if (data.rules?.rules) saveStoredAdminRules(data.rules);
    if (data.contact?.email) saveStoredAdminContact(data.contact);
    if (data.broadcast?.title) saveStoredAdminBroadcast(data.broadcast);
    if (data.recruitment?.title) saveStoredRecruitment(data.recruitment);
    if (Array.isArray(data.applications)) saveStoredApplications(data.applications);
    if (data.fundCampaign?.programName) saveStoredFundCampaign(data.fundCampaign);
    if (Array.isArray(data.fundDonations)) saveStoredFundDonations(data.fundDonations);
    if (Array.isArray(data.notes)) {
      try {
        localStorage.setItem(NOTES_KEY, JSON.stringify(data.notes));
      } catch {}
    }
    if (Array.isArray(data.confessions)) {
      try {
        localStorage.setItem(CONFESSIONS_KEY, JSON.stringify(data.confessions));
      } catch {}
    }
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "all" } }));
    return true;
  } catch {
    return false;
  }
}

export function resetAllAdminDataToDefaults(): void {
  try {
    localStorage.removeItem(POSTS_KEY);
    localStorage.removeItem(PROGRAMS_KEY);
    localStorage.removeItem(LEADERS_KEY);
    localStorage.removeItem(MOTTO_KEY);
    localStorage.removeItem(RULES_KEY);
    localStorage.removeItem(CONTACT_KEY);
    localStorage.removeItem(BROADCAST_KEY);
    localStorage.removeItem(RECRUIT_KEY);
    localStorage.removeItem(APPS_KEY);
    localStorage.removeItem(FUND_CAMPAIGN_KEY);
    localStorage.removeItem(FUND_DONATIONS_KEY);
    localStorage.removeItem(NOTES_KEY);
    localStorage.removeItem(CONFESSIONS_KEY);
    window.dispatchEvent(new CustomEvent("bllsv_data_updated", { detail: { type: "all" } }));
  } catch {}
}
