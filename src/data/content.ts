/**
 * THÔNG TIN CHÍNH THỐNG & CHUẨN XÁC CỦA BAN LIÊN LẠC SINH VIÊN THANH HÓA ĐẠI HỌC THƯƠNG MẠI
 * Cập nhật chuẩn hóa theo tài liệu chính thức từ Ban Liên Lạc.
 */

export const ORG = {
  shortName: "BLLSVTH TMU",
  fullName: "Ban Liên Lạc Sinh Viên Thanh Hóa Đại Học Thương Mại",
  school: "Trường Đại học Thương Mại",
  address: "79 Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội",
  mapQuery: "Trường Đại học Thương Mại, 79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
  email: "bllsvthanhhoa.tmu@gmail.com",
  phone: "0987 654 321",
  slogan: "Tinh thần 36, máu chảy trong tim, sống để yêu thương, sống để cống hiến",
  sloganRitual: "Mỗi khi hô slogan, các TNV sẽ đứng thành vòng tròn, đưa tay trái ra trước hướng về phía tâm của vòng tròn ấy.",
  mealCheer: "Đã không ăn thì thôi, đã ăn rồi là phải trăm phần trăm, trăm phần trăm, trăm phần trăm, ... ngon nguyên chất trăm phần trăm, cả nhà mời ..., cảm ơn ...",
  foundedDate: "12/04/2008",
  founded: 2008,
  imageEra: 2011, // Năm 2011 Ban liên lạc bắt đầu xây dựng hình ảnh bên ngoài và phát triển mạnh mẽ
  mission: [
    "Xây dựng môi trường sinh hoạt chung cho con em THANH HÓA đang học tập tại HÀ NỘI.",
    "Tạo ra các chương trình tình nguyện, hướng tới quê hương xứ Thanh nói riêng và các vùng khác nói chung.",
  ],
  parentOrg: "Hội đồng hương Sinh viên Thanh Hóa tại Hà Nội",
  parentOrgPresident: "Anh Đỗ Trung Tiến",
  parentOrgMembersCount: 20, // 20 đơn vị của các đoàn, đội trực thuộc Hội đồng hương
  parentOrgRenameDate: "03/04/2023", // Trước đó có tên là Ban liên lạc Sinh viên Thanh Hóa tại Hà Nội
  fanpage: "https://facebook.com",
  group: "https://facebook.com",
  tiktok: "https://tiktok.com",
  zalo: "https://zalo.me",
  youtube: "https://www.youtube.com/@THVcuMedia",
  youtubeChannel: "TH VCU Media",
};

export const NAV_ITEMS = [
  { id: "home", label: "Trang chủ", short: "Trang chủ", icon: "home" },
  { id: "about", label: "Về chúng mình", short: "Nhà chung", icon: "users" },
  { id: "events", label: "Hoạt động", short: "Hoạt động", icon: "calendar" },
  { id: "dance", label: "Kho bài nhảy & hát", short: "Bài nhảy", icon: "music" },
  { id: "memories", label: "Thế hệ & Kỷ niệm", short: "Kỷ niệm", icon: "camera" },
  { id: "contact", label: "Liên hệ", short: "Liên hệ", icon: "chat" },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];

export const HERO_STATS = [
  { value: "18+", label: "Năm thành lập", sub: "Từ 12/04/2008 đến nay", icon: "🔥" },
  { value: "16", label: "Thế hệ BCH", sub: "Từ K44 đến K60", icon: "🤝" },
  { value: "13+", label: "Mùa Hè Xanh", sub: "Vượt mọi bản làng xứ Thanh", icon: "🎯" },
  { value: "4 Năm", label: "Vô địch liên tiếp", sub: "Âm Vang Xứ Thanh", icon: "🏆" },
];

export const HERO_BADGES = [
  "Thành lập 12/04/2008 – Mái nhà chung 79 Hồ Tùng Mậu",
  "Trực thuộc Hội đồng hương Sinh viên Thanh Hóa tại Hà Nội",
  "Vô địch 4 năm liên tiếp Âm Vang Xứ Thanh",
  "13 Mùa Hè Xanh – 8 mùa Đông Ấm",
];

export type Ban = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  short: string;
  desc: string;
  duties: string[];
  accent: string;
  chip: string;
};

/* Đội Sinh Viên Tình Nguyện: Quản lý trực tiếp các tình nguyện viên thuộc 3 ban */
export const VOLUNTEER_TEAM = {
  name: "Đội Sinh Viên Tình Nguyện",
  shortName: "Đội SVTN BLLSV TMU",
  tagline: "Đơn vị quản lý và điều phối các tình nguyện viên thuộc 3 ban",
  emoji: "🛡️",
  desc: "Đội Sinh viên tình nguyện chịu trách nhiệm trực tiếp quản lý toàn bộ các tình nguyện viên (TNV) thuộc 3 ban: Ban Truyền thông, Ban Văn hóa – Sự kiện và Ban Hậu cần. Đội SVTN phụ trách rèn luyện kỹ năng, giữ vững kỷ luật, tổ chức các đợt tập huấn xa và điều phối nhân lực trong mọi chiến dịch lớn.",
  duties: [
    "Quản lý, theo dõi và đánh giá toàn bộ tình nguyện viên thuộc 3 ban chuyên môn",
    "Tổ chức chương trình Tập huấn Tình nguyện thường niên (Ba Vì, Sóc Sơn, Ứng Hòa...)",
    "Rèn luyện tính kỷ luật, kỹ năng sinh hoạt tập thể và bản lĩnh của người chiến sĩ áo xanh",
    "Điều phối quân số, đảm bảo an toàn và gắn kết tinh thần TNV trong Mùa Hè Xanh & Đông Ấm",
  ],
};

/* 3 Ban chuyên môn hiện tại của Ban liên lạc */
export const BANS: Ban[] = [
  {
    id: "truyen-thong",
    name: "Ban Truyền thông",
    tagline: "Kể câu chuyện màu cờ sắc áo 36",
    emoji: "🎬",
    short: "Vận hành Fanpage, TikTok, thiết kế ấn phẩm & hình ảnh sự kiện.",
    desc: "Nơi ghi lại những thước phim xúc động từ Mùa Hè Xanh đến Đông Ấm. Ban phụ trách lan tỏa hình ảnh đẹp của con em xứ Thanh tại TMU tới cộng đồng qua mọi nền tảng truyền thông số.",
    duties: [
      "Quản trị các kênh truyền thông chính thức: Fanpage, TikTok, Group nhà chung",
      "Sản xuất Aftermovie, phóng sự tình nguyện và các bộ ảnh chuyên đề",
      "Thiết kế toàn bộ ấn phẩm nhận diện: backdrop, áo đồng phục, kỷ yếu, avatar",
      "Vận hành cổng thông tin, form đăng ký tân sinh viên và các đợt tuyển quân",
    ],
    accent: "from-flame-500 to-flame-700",
    chip: "bg-flame-100 text-flame-700",
  },
  {
    id: "van-hoa-su-kien",
    name: "Ban Văn hóa – Sự kiện",
    tagline: "Trái tim của những ngọn lửa nhiệt huyết",
    emoji: "🎤",
    short: "Biên đạo bài nhảy, dàn dựng sân khấu, thể thao & Âm Vang Xứ Thanh.",
    desc: "Chủ nhân 4 chức vô địch liên tiếp tại Âm Vang Xứ Thanh! Nơi lưu giữ và truyền dạy 4 bài nhảy truyền thống, 4 bài hát truyền thống, sáng tạo tiết mục nghệ thuật đặc sắc và tổ chức các giải thể thao nội bộ.",
    duties: [
      "Tập luyện và gìn giữ 4 bài nhảy truyền thống: Chung sống, Con chim non, 12 bước, 9 bước",
      "Luyện tập 4 bài hát truyền thống: Một Nhà Một Tình Yêu, Đồng đội, Chỉ thế thôi, Sát cánh bên nhau",
      "Dàn dựng các tiết mục dự thi Âm Vang Xứ Thanh (kỷ lục 4 năm vô địch liên tiếp)",
      "Tổ chức giải thể thao, hội trại sinh nhật 12/04 và các đêm lửa trại",
    ],
    accent: "from-glow-400 to-flame-500",
    chip: "bg-amber-100 text-amber-700",
  },
  {
    id: "hau-can",
    name: "Ban Hậu cần",
    tagline: "Hậu phương vững chắc sau mọi chiến dịch",
    emoji: "🎒",
    short: "Quản lý logistics, ẩm thực, y tế, mua sắm và hỗ trợ chiến dịch.",
    desc: "Nơi chăm sóc từng bữa ăn ấm nóng trên các bản làng xa xôi, quản lý kho đồ, y tế, mua sắm vật dụng và là điểm tựa hậu cần vững vàng cho mọi hoạt động của nhà chung.",
    duties: [
      "Đảm bảo công tác hậu cần, ẩm thực, dinh dưỡng và y tế cho Mùa Hè Xanh, Đông Ấm",
      "Quản lý kho đồ dùng, đạo cụ, trang thiết bị phục vụ các sự kiện",
      "Lên thực đơn, quản lý chi tiêu và mua sắm vật tư minh bạch",
      "Chăm lo chu đáo từng bữa ăn và sức khỏe cho đội ngũ tình nguyện viên",
    ],
    accent: "from-cobalt-600 to-cobalt-900",
    chip: "bg-cobalt-100 text-cobalt-700",
  },
];

/* ------------------------------------------------------------------ *
 *  LỊCH HOẠT ĐỘNG THƯỜNG NIÊN TRONG NĂM THEO TÀI LIỆU CHÍNH THỨC
 * ------------------------------------------------------------------ */
export const YEARLY_TIMELINE = [
  {
    month: "Tháng 1",
    title: "Chiến dịch Đông Ấm",
    desc: "Đã trải qua 8 mùa Đông Ấm về với đồng bào vùng cao (Xuân Thắng - Thường Xuân, Thành Minh - Thạch Thành, Tam Lư, Trung Tiến, Sơn Điện - Quan Sơn, Phượng Nghi - Như Thanh, Giàng Vìn - Linh Sơn - Lang Chánh...).",
    badge: "8 Mùa yêu thương",
  },
  {
    month: "Tháng 3",
    title: "Tri ân các anh chị BCH tiền nhiệm",
    desc: "Gặp gỡ, lắng nghe và tri ân những đóng góp của các thế hệ anh chị BCH đi trước đã gìn giữ ngọn lửa nhà chung.",
    badge: "Truyền thống",
  },
  {
    month: "Tháng 4 (12/04)",
    title: "Sinh nhật Ban Liên Lạc",
    desc: "Kỷ niệm ngày thành lập 12/04/2008. Dịp hội ngộ tất cả các thế hệ thành viên con em Thanh Hóa tại TMU.",
    badge: "12/04/2008",
  },
  {
    month: "Tháng 5",
    title: "Tập Huấn Tình Nguyện",
    desc: "Trải qua các mùa tập huấn xa tại Ba Vì, Sóc Sơn, Ứng Hòa (Vạn Thái, Tản Lĩnh, Bắc Sơn, Phú Châu, Liễu Châu...). Rèn luyện kỹ năng và tinh thần kỷ luật cho TNV.",
    badge: "Rèn luyện",
  },
  {
    month: "Tháng 7",
    title: "Chiến dịch Mùa Hè Xanh",
    desc: "Trải qua 13 Mùa Hè Xanh từ 2013 đến nay: Tĩnh Gia, Cẩm Thủy, Lang Chánh, Thường Xuân, Thạch Thành, Quan Sơn, Ngọc Lặc, Như Thanh, Nam Xuân (Quan Hóa)...",
    badge: "13 Mùa hè xanh",
  },
  {
    month: "Tháng 8",
    title: "Ngày hội Thể thao BLLSV",
    desc: "Các giải giao lưu bóng đá, thể thao gắn kết các ban chuyên môn và các khóa thành viên.",
    badge: "Sức trẻ",
  },
  {
    month: "Tháng 9 - 10",
    title: "Tuyển Tình Nguyện Viên / Tân Thành Viên",
    desc: "Mở đơn tuyển quân, phỏng vấn và đón chào thế hệ tân sinh viên xứ Thanh mới bước chân vào giảng đường TMU.",
    badge: "Tuyển quân",
  },
  {
    month: "Tháng 11",
    title: "Đêm Chào Tân Sinh Viên",
    desc: "Đêm hội chính thức chào đón các em K mới, hướng dẫn học tập, chia sẻ kinh nghiệm sống tại Thủ đô.",
    badge: "Chào đón",
  },
  {
    month: "Tháng 12",
    title: "Âm Vang Xứ Thanh",
    desc: "Chương trình quy tụ 20 đơn vị trực thuộc Hội đồng hương Thanh Hóa tại Hà Nội. BLLSV TMU tự hào đạt kỷ lục 4 năm vô địch liên tiếp (đến 2024).",
    badge: "Vô địch 4 năm",
  },
];

/* ------------------------------------------------------------------ *
 *  BAN CHẤP HÀNH CÁC THẾ HỆ (CHUẨN TỪ K44 ĐẾN K60)
 * ------------------------------------------------------------------ */
export type LeaderRecord = {
  id?: string;
  term: string;
  khoa: string;
  name: string;
  dob: string;
  hometown: string;
  role: string;
};

export const LEADERSHIP_HISTORY: LeaderRecord[] = [
  // Khóa K60 (2026 - 2027)
  { term: "2026 - 2027", khoa: "K60", name: "Trịnh Tứ Huy", dob: "01/04/2006", hometown: "TP Sầm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2026 - 2027", khoa: "K60", name: "Trần Ngọc Lâm", dob: "24/05/2006", hometown: "Bỉm Sơn", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2026 - 2027", khoa: "K60", name: "Hàn Phụng Nhi", dob: "07/04/2006", hometown: "Quảng Xương", role: "Phó Ban liên lạc - Trưởng Ban Hậu cần" },
  { term: "2026 - 2027", khoa: "K60", name: "Võ Trọng Tuấn Anh", dob: "25/12/2006", hometown: "Thọ Xuân", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2026 - 2027", khoa: "K60", name: "Hoàng Thị Tiểu Tam", dob: "13/11/2006", hometown: "Như Xuân", role: "Trưởng Ban Truyền thông" },
  { term: "2026 - 2027", khoa: "K60", name: "Phan Ngọc Trâm", dob: "15/08/2006", hometown: "Nghi Sơn", role: "Phó Ban Truyền thông" },

  // Khóa K59 (2025 - 2026)
  { term: "2025 - 2026", khoa: "K59", name: "Lê Thị Huyền Trang", dob: "13/10/2005", hometown: "Nghi Sơn", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2025 - 2026", khoa: "K59", name: "Lê Nguyệt Ánh", dob: "09/08/2005", hometown: "Nghi Sơn", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2025 - 2026", khoa: "K59", name: "Trịnh Thị Vinh", dob: "20/12/2005", hometown: "Ngọc Lặc", role: "Trưởng Ban Truyền thông" },
  { term: "2025 - 2026", khoa: "K59", name: "Phạm Trần Thu Trang", dob: "05/09/2005", hometown: "TP Thanh Hóa", role: "Trưởng Ban Hậu cần" },

  // Khóa K58 (2024 - 2025)
  { term: "2024 - 2025", khoa: "K58", name: "Phạm Thị Thương", dob: "14/02/2004", hometown: "Hậu Lộc", role: "Trưởng Ban liên lạc" },
  { term: "2024 - 2025", khoa: "K58", name: "Đinh Cao Nguyên", dob: "25/02/2004", hometown: "Hậu Lộc", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2024 - 2025", khoa: "K58", name: "Lang Thị Châu Anh", dob: "12/07/2003", hometown: "Thường Xuân", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2024 - 2025", khoa: "K58", name: "Bùi Thị Vân", dob: "28/02/2004", hometown: "Ngọc Lặc", role: "Trưởng Ban Truyền thông" },
  { term: "2024 - 2025", khoa: "K58", name: "Bùi Thị Thúy Hằng", dob: "21/10/2004", hometown: "Thạch Thành", role: "Trưởng Ban Hậu cần" },

  // Khóa K57 (2023 - 2024)
  { term: "2023 - 2024", khoa: "K57", name: "Nguyễn Minh Tú", dob: "01/08/2003", hometown: "TP Thanh Hóa", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2023 - 2024", khoa: "K57", name: "Phạm Trọng Long", dob: "17/09/2004", hometown: "Yên Định", role: "Phó Ban liên lạc - Đội phó SVTN" },
  { term: "2023 - 2024", khoa: "K57", name: "Vũ Thị Phương Nhung", dob: "21/11/2003", hometown: "Triệu Sơn", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2023 - 2024", khoa: "K57", name: "Vũ Phạm Tường Vy", dob: "18/12/2003", hometown: "Nghi Sơn", role: "Trưởng Ban Truyền thông" },
  { term: "2023 - 2024", khoa: "K57", name: "Cao Thị Quỳnh Trang", dob: "16/06/2003", hometown: "Ngọc Lặc", role: "Trưởng Ban Hậu cần" },

  // Khóa K56 (2022 - 2023)
  { term: "2022 - 2023", khoa: "K56", name: "Trần Quang Thái", dob: "05/07/2002", hometown: "TP Thanh Hóa", role: "Trưởng Ban liên lạc" },
  { term: "2022 - 2023", khoa: "K56", name: "Lê Thùy Linh", dob: "09/04/2002", hometown: "TP Sầm Sơn", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2022 - 2023", khoa: "K56", name: "Nguyễn Ngọc Anh", dob: "20/11/2002", hometown: "Thường Xuân", role: "Phó Ban liên lạc - Trưởng Ban Truyền thông" },
  { term: "2022 - 2023", khoa: "K56", name: "Lê Thị Thu Hiền", dob: "08/08/2002", hometown: "Thạch Thành", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2022 - 2023", khoa: "K56", name: "Bùi Thị Trang", dob: "29/05/2002", hometown: "Thường Xuân", role: "Trưởng Ban Hậu cần" },

  // Khóa K55 (2021 - 2022)
  { term: "2021 - 2022", khoa: "K55", name: "Nguyễn Mai Chi", dob: "08/09/2001", hometown: "TP Thanh Hóa", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2021 - 2022", khoa: "K55", name: "Trương Thị Trang", dob: "21/09/2001", hometown: "Hậu Lộc", role: "Phó Ban liên lạc - Trưởng Ban Truyền thông" },
  { term: "2021 - 2022", khoa: "K55", name: "Phan Thị Thu Ngà", dob: "13/05/2001", hometown: "Thọ Xuân", role: "Phó Ban liên lạc - Trưởng Ban Hậu cần" },
  { term: "2021 - 2022", khoa: "K55", name: "Quách Thị Kiều Trinh", dob: "07/10/2001", hometown: "Ngọc Lặc", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2021 - 2022", khoa: "K55", name: "Trần Quang Thái", dob: "05/07/2002", hometown: "TP Thanh Hóa", role: "Đội phó Đội SVTN" },

  // Khóa K54 (2020 - 2021)
  { term: "2020 - 2021", khoa: "K54", name: "Nguyễn Xuân Hưng", dob: "17/01/2000", hometown: "Sầm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2020 - 2021", khoa: "K54", name: "Nguyễn Minh Quân", dob: "08/12/2000", hometown: "TX Nghi Sơn", role: "Phó BLL - Đội trưởng SVTN - TB Hậu cần" },
  { term: "2020 - 2021", khoa: "K54", name: "Lê Thị Phượng", dob: "22/02/2000", hometown: "TP Thanh Hóa", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2020 - 2021", khoa: "K54", name: "Lê Thị Thảo", dob: "20/11/2000", hometown: "Thọ Xuân", role: "Trưởng Ban Truyền thông" },

  // Khóa K53 (2019 - 2020)
  { term: "2019 - 2020", khoa: "K53", name: "Lê Cao Định", dob: "15/02/1999", hometown: "Sầm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2019 - 2020", khoa: "K53", name: "Phạm Trọng Linh", dob: "27/11/1999", hometown: "Yên Định", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2019 - 2020", khoa: "K53", name: "Trịnh Thị Ánh", dob: "03/09/1999", hometown: "TP Thanh Hóa", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2019 - 2020", khoa: "K53", name: "Lương Huyền My", dob: "28/09/1999", hometown: "Thọ Xuân", role: "Trưởng Ban Truyền thông" },
  { term: "2019 - 2020", khoa: "K53", name: "Vũ Thị Trang", dob: "23/05/1999", hometown: "Thạch Thành", role: "Trưởng Ban Hậu cần" },

  // Khóa K52 (2018 - 2019)
  { term: "2018 - 2019", khoa: "K52", name: "Lê Văn Hùng", dob: "27/04/1997", hometown: "Đông Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2018 - 2019", khoa: "K52", name: "Lưu Thị Thương Thương", dob: "10/09/1998", hometown: "Thạch Thành", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2018 - 2019", khoa: "K52", name: "Nguyễn Hương Ly", dob: "20/11/1998", hometown: "Bỉm Sơn", role: "Trưởng Ban Truyền thông" },
  { term: "2018 - 2019", khoa: "K52", name: "Phạm Thị Yến", dob: "13/12/1998", hometown: "Nga Sơn", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2018 - 2019", khoa: "K52", name: "Nguyễn Thị Vân", dob: "03/01/1998", hometown: "Thiệu Hóa", role: "Trưởng Ban Hậu cần" },

  // Khóa K51 (2017 - 2018)
  { term: "2017 - 2018", khoa: "K51", name: "Nguyễn Thị Thu Hà", dob: "26/06/1997", hometown: "Bỉm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2017 - 2018", khoa: "K51", name: "Hoàng Thị Lý", dob: "05/10/1997", hometown: "Yên Định", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2017 - 2018", khoa: "K51", name: "Phan Ngọc Sơn", dob: "04/02/1997", hometown: "Nông Cống", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2017 - 2018", khoa: "K51", name: "Nguyễn Thị Hạnh", dob: "06/12/1997", hometown: "TP Thanh Hóa", role: "Trưởng Ban Hậu cần" },
  { term: "2017 - 2018", khoa: "K51", name: "Nguyễn Thị Loan", dob: "31/10/1997", hometown: "Thạch Thành", role: "Trưởng Ban Truyền thông" },

  // Khóa K50 (2016 - 2017)
  { term: "2016 - 2017", khoa: "K50", name: "Hà Minh Hiếu", dob: "27/04/1996", hometown: "Thường Xuân", role: "Trưởng Ban liên lạc" },
  { term: "2016 - 2017", khoa: "K50", name: "Nguyễn Thị Quỳnh", dob: "10/06/1996", hometown: "Thiệu Hóa", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2016 - 2017", khoa: "K50", name: "Phạm Thị Trang", dob: "22/08/1996", hometown: "Quảng Xương", role: "Phó Ban liên lạc - Trưởng Ban Văn nghệ" },
  { term: "2016 - 2017", khoa: "K50", name: "Trịnh Thị Nguyệt", dob: "27/03/1996", hometown: "Sầm Sơn", role: "Trưởng Ban Hậu cần" },
  { term: "2016 - 2017", khoa: "K50", name: "Nguyễn Thị Thùy Dung", dob: "06/07/1996", hometown: "TP Thanh Hóa", role: "Trưởng Ban Truyền thông" },
  { term: "2016 - 2017", khoa: "K50", name: "Nguyễn Việt Thu", dob: "01/09/1996", hometown: "Ngọc Lặc", role: "Trưởng Ban Nội dung - Sự kiện" },

  // Khóa K49 (2015 - 2016)
  { term: "2015 - 2016", khoa: "K49", name: "Nguyễn Thị Thùy Linh", dob: "10/09/1994", hometown: "Hà Trung", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2015 - 2016", khoa: "K49", name: "Mai Thị Thu Hiền", dob: "13/10/1995", hometown: "Nga Sơn", role: "Phó BLL - Đội phó Đội SVTN" },
  { term: "2015 - 2016", khoa: "K49", name: "Lê Thị Ngọc Ánh", dob: "28/08/1995", hometown: "Đông Sơn", role: "Phó Ban liên lạc" },
  { term: "2015 - 2016", khoa: "K49", name: "Lê Thị Hương", dob: "29/03/1995", hometown: "Thọ Xuân", role: "Trưởng Ban Hậu cần" },

  // Khóa K48 (2014 - 2015)
  { term: "2014 - 2015", khoa: "K48", name: "Mai Thị Thục Hương", dob: "20/08/1994", hometown: "Nga Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2014 - 2015", khoa: "K48", name: "Hoàng Thị Minh Hòa", dob: "06/03/1994", hometown: "Yên Định", role: "Phó Ban liên lạc" },
  { term: "2014 - 2015", khoa: "K48", name: "Lương Văn Hải", dob: "06/03/1994", hometown: "Ngọc Lặc", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2014 - 2015", khoa: "K48", name: "Ngô Thị Thương", dob: "10/05/1994", hometown: "Thiệu Hóa", role: "Trưởng Ban Truyền thông - Kỹ thuật" },
  { term: "2014 - 2015", khoa: "K48", name: "Đỗ Thị Minh Anh", dob: "17/02/1994", hometown: "Thọ Xuân", role: "Trưởng Ban Tài chính - Hậu cần" },
  { term: "2014 - 2015", khoa: "K48", name: "Nguyễn Thị Thùy Linh", dob: "10/09/1994", hometown: "Hà Trung", role: "Trưởng Ban Văn nghệ" },

  // Khóa K47 (2011 - 2014)
  { term: "2011 - 2014", khoa: "K47", name: "Lê Bích Ngọc", dob: "11/01/1993", hometown: "Hoằng Hóa", role: "Trưởng Ban Đối ngoại" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Thị Dung", dob: "14/03/1993", hometown: "Hoằng Hóa", role: "Trưởng Ban TT - NS - Đội trưởng SVTN" },
  { term: "2011 - 2014", khoa: "K47", name: "Cao Thị Sâm", dob: "24/05/1993", hometown: "Hoằng Hóa", role: "Trưởng Ban Đào tạo Hậu cần" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Thị Trang", dob: "05/11/1992", hometown: "Thọ Xuân", role: "Đội trưởng Đội Văn nghệ" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Văn Tuấn", dob: "10/10/1993", hometown: "Yên Định", role: "Đội phó Đội SVTN" },

  // Khóa K45 (2010 - 2011)
  { term: "2010 - 2011", khoa: "K45", name: "Nguyễn Ngọc Sơn", dob: "28/12/1991", hometown: "Tĩnh Gia", role: "Trưởng Ban Đối ngoại" },
  { term: "2010 - 2011", khoa: "K45", name: "Lưu Kim Dung", dob: "18/11/1991", hometown: "Hoằng Hóa", role: "Trưởng Ban Hậu cần" },
  { term: "2010 - 2011", khoa: "K45", name: "Ngô Thị Thúy", dob: "21/04/1991", hometown: "TP Thanh Hóa", role: "Phó Ban Đối ngoại" },
  { term: "2010 - 2011", khoa: "K45", name: "Lê Thị Hồng", dob: "24/03/1991", hometown: "Nông Cống", role: "Trưởng Ban Truyền thông" },

  // Khóa K44 (2009 - 2010)
  { term: "2009 - 2010", khoa: "K44", name: "Đỗ Thị Loan", dob: "20/01/1990", hometown: "Thọ Xuân", role: "Trưởng Ban liên lạc" },
];

/* ------------------------------------------------------------------ *
 *  DANH SÁCH BÀI HÁT & BÀI NHẢY TRUYỀN THỐNG CHUẨN XÁC
 * ------------------------------------------------------------------ */
export type TraditionalSong = {
  id: string;
  title: string;
  author?: string;
  note: string;
  youtubeId: string;
  url: string;
  zingUrl?: string;
  thumbnail: string;
  type: "youtube";
  lyrics: { section: string; lines: string[] }[];
};

export const TRADITIONAL_SONGS: TraditionalSong[] = [
  {
    id: "s1",
    title: "Một Nhà Một Tình Yêu",
    author: "BLLSV Thanh Hóa ĐH Thương Mại (Mashup mừng sinh nhật nhà chung)",
    note: "Bài hát biểu tượng của tình cảm gia đình và sự sẻ chia trong Ban liên lạc",
    youtubeId: "4r30sl3Qpi4",
    url: "https://www.youtube.com/watch?v=4r30sl3Qpi4",
    thumbnail: "https://img.youtube.com/vi/4r30sl3Qpi4/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Đoạn 1 – Về chung mái nhà",
        lines: [
          "Khi hai ta về một nhà",
          "Khép đôi mi cùng một giường",
          "Đôi khi mơ cùng một giấc",
          "Thức giấc chung một giờ.",
          "Khi hai ta chung một đường",
          "Ta vui chung một nỗi vui",
          "Nước mắt rơi một dòng",
          "Sống chung nhau một đời...",
        ],
      },
      {
        section: "Đoạn 2 – Kỷ niệm giảng đường",
        lines: [
          "Vẫn ánh mắt ấy sáng long lanh",
          "Như trời cao mây trắng trong lành",
          "Đến hôm nay ta đã về đây bên nhau dưới mái nhà chung.",
          "Nhớ những lúc đứng dưới mái trường xưa",
          "Cùng sẻ chia dưới những cơn mưa",
          "Đến hôm nay ta đã chung một lối, chung một màu áo xanh TMU.",
        ],
      },
      {
        section: "Điệp khúc – Một Nhà",
        lines: [
          "Ta giờ đây chung trời mây, ta cùng đón tương lai",
          "Ta cầm tay, ta cùng vui say chân bước đường dài",
          "Như lời hứa, ta đã nói ngay từ phút giây đầu:",
          "Chúng ta mãi là một nhà!",
        ],
      },
      {
        section: "Đoạn 3 – Một Tình Yêu",
        lines: [
          "Một tình yêu, trọn con tim",
          "Một tình yêu, một tình yêu hoài dâng hiến",
          "Một tình yêu nhìn ngày mai với niềm tin mới",
          "Một ngày mai huy hoàng trong nắng tươi...",
          "Và chúng ta đã tìm thấy nhau nơi giảng đường Thương Mại!",
        ],
      },
    ],
  },
  {
    id: "s2",
    title: "Đồng Đội",
    author: "BLLSV Thanh Hóa ĐH Thương Mại (Sáng tác: Hoàng Hiệp)",
    note: "Video chính thức ghi lại kỷ niệm người lính tình nguyện trên kênh TH VCU Media",
    youtubeId: "VCyYsOcKPUk",
    url: "https://www.youtube.com/watch?v=VCyYsOcKPUk",
    zingUrl: "https://mp3.zing.vn/bai-hat/Dong-Doi-Lac-Viet/ZW7UOIOF.html",
    thumbnail: "https://i.ytimg.com/vi/VCyYsOcKPUk/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Đoạn 1 – Đêm rừng chiến dịch",
        lines: [
          "Chúng tôi ngồi kề vai bên nhau",
          "Trăng soi đầu súng ánh ngời sao",
          "Gió lạnh rừng khuya sương ướt áo",
          "Lòng ấm tình đồng chí thiết tha.",
        ],
      },
      {
        section: "Điệp khúc – Nghĩa tình đồng đội",
        lines: [
          "Đồng đội ơi! Người bạn thân yêu nhất",
          "Cùng chia sương sẻ nắng trên từng chặng đường xa",
          "Bát cơm chan tình nghĩa, hạt muối cắn làm đôi",
          "Sát cánh bên nhau giữ trọn lời thề son sắt.",
        ],
      },
      {
        section: "Đoạn kết – Ngọn lửa tình nguyện",
        lines: [
          "Mai này ta về lại quê hương",
          "Nhớ mãi những ngày cùng nhau gian khó",
          "Ngọn lửa tình nguyện bừng cháy trong tim",
          "Đồng đội ơi, khúc ca còn vang mãi!",
        ],
      },
    ],
  },
  {
    id: "s3",
    title: "Chỉ Thế Thôi",
    author: "Sáng tác: Việt Đặng – Ca sĩ: Minh Chuyên",
    note: "Giai điệu mộc mạc, chan chứa tình yêu thương của tuổi trẻ TMU",
    youtubeId: "sNoYfUhOClw",
    url: "https://www.youtube.com/watch?v=sNoYfUhOClw",
    zingUrl: "https://mp3.zing.vn/bai-hat/Chi-The-Thoi-Minh-Chuyen/ZW608AC0.html",
    thumbnail: "https://img.youtube.com/vi/sNoYfUhOClw/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Đoạn 1 – Sắc áo tình nguyện",
        lines: [
          "Màu áo xanh thân thương, mang bao niềm tin yêu",
          "Đi qua từng nẻo đường, mang nụ cười khắp muôn phương",
          "Bàn tay ấm chở che những mảnh đời bé nhỏ",
          "Ngọn lửa nhiệt huyết thắp sáng trong tim mình.",
        ],
      },
      {
        section: "Điệp khúc – Ước mơ màu xanh",
        lines: [
          "Ước mơ màu xanh, mang màu áo xanh – chỉ thế thôi!",
          "Ước mơ tuổi thanh xuân rạng rỡ giữa đất trời",
          "Để nụ cười trẻ thơ thêm tươi trên môi hồng",
          "Để tình người ấm áp chan hòa khắp non sông.",
        ],
      },
      {
        section: "Đoạn kết – Tuổi hai mươi",
        lines: [
          "Chỉ thế thôi, một tấm lòng son trẻ",
          "Chỉ thế thôi, một ngọn lửa khát khao",
          "Dẫu nắng mưa dặm dài đường xa xôi",
          "Tuổi hai mươi cất cao khúc ca tình nguyện!",
        ],
      },
    ],
  },
  {
    id: "s4",
    title: "Sát Cánh Bên Nhau",
    author: "Sáng tác: Nhạc sĩ Sỹ Luân",
    note: "Bài ca đoàn kết triệu con tim con em 36 cùng chung một nhịp đập",
    youtubeId: "Szkko0wSa5c",
    url: "https://www.youtube.com/watch?v=Szkko0wSa5c",
    zingUrl: "https://mp3.zing.vn/bai-hat/Sat-Canh-Ben-Nhau-Sy-Luan/ZWZACU9A.html",
    thumbnail: "https://img.youtube.com/vi/Szkko0wSa5c/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Đoạn 1 – Nắm chặt tay nhau",
        lines: [
          "Hãy cùng nhau ta cùng nắm tay nhau",
          "Bước cùng nhau trên đường tương lai",
          "Dù chông gai ta vẫn luôn vững bước",
          "Vì bên ta luôn có những người bạn.",
        ],
      },
      {
        section: "Điệp khúc – Sát cánh bên nhau",
        lines: [
          "Sát cánh bên nhau ta cùng đi tới",
          "Thắp sáng niềm tin hy vọng ngày mai",
          "Hãy hát vang lên khúc ca đoàn kết",
          "Cho yêu thương bay xa muôn trùng khơi.",
        ],
      },
      {
        section: "Đoạn kết – Mái nhà chung",
        lines: [
          "Bao khó khăn rồi cũng sẽ vượt qua",
          "Khi chúng ta chung một niềm tin",
          "Dưới mái nhà chung BLLSV Thanh Hóa Thương Mại",
          "Tuổi thanh xuân rực rỡ ngát hương đời!",
        ],
      },
    ],
  },
  {
    id: "s5",
    title: "Khát Vọng Tuổi Trẻ",
    author: "Nhạc sĩ Vũ Hoàng · Đồng ca chiến dịch BLLSV TMU",
    note: "Tiết mục đồng ca hào hùng của BLLSV và thanh niên địa phương trong Mùa Hè Xanh 2023",
    youtubeId: "WOPExjeLmtc",
    url: "https://www.youtube.com/watch?v=WOPExjeLmtc",
    thumbnail: "https://i.ytimg.com/vi/WOPExjeLmtc/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Lời 1 – Lời thề thanh niên",
        lines: [
          "Đường dài tương lai quê hương đang gọi mời",
          "Tuổi trẻ hôm nay chung tay xây đời mới",
          "Dù lên rừng hay xuống biển sâu",
          "Không quản ngại gian khó hiểm nguy.",
        ],
      },
      {
        section: "Điệp khúc – Khát vọng",
        lines: [
          "Đừng hỏi Tổ quốc đã làm gì cho ta",
          "Mà cần hỏi ta đã làm gì cho Tổ quốc hôm nay!",
          "Khát vọng tuổi trẻ bay cao muôn phương trời",
          "Màu áo xanh tình nguyện rạng ngời non sông.",
        ],
      },
    ],
  },
  {
    id: "s6",
    title: "Quê Tôi",
    author: "Sáng tác: Anh Minh · Biểu diễn: Đội Văn nghệ BLLSV TMU",
    note: "Tiết mục múa quê hương lắng đọng tình cảm của con em xứ Thanh (Mùa Hè Xanh 2023)",
    youtubeId: "GQuVa_FtjEQ",
    url: "https://www.youtube.com/watch?v=GQuVa_FtjEQ",
    thumbnail: "https://i.ytimg.com/vi/GQuVa_FtjEQ/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Lời bài hát – Nỗi nhớ quê hương",
        lines: [
          "Quê tôi có cánh diều vi vu chiều hè",
          "Có dòng sông Mã uốn quanh xóm làng",
          "Dù đi xa ngàn dặm muôn phương",
          "Lòng vẫn hướng về đất mẹ Thanh Hóa yêu thương.",
        ],
      },
    ],
  },
  {
    id: "s7",
    title: "Đêm Nghe Hát Đò Đưa Nhớ Bác",
    author: "Sáng tác: An Thuyên · Biểu diễn giao lưu thôn Đồng Phông",
    note: "Khúc dân ca ân tình, sâu lắng giao lưu cùng nhân dân địa phương (Mùa Hè Xanh 2023)",
    youtubeId: "xy7A9lJQ4zY",
    url: "https://www.youtube.com/watch?v=xy7A9lJQ4zY",
    thumbnail: "https://i.ytimg.com/vi/xy7A9lJQ4zY/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Giai điệu quê hương",
        lines: [
          "Một khúc dân ca sâu lắng nghĩa tình",
          "Gửi gắm tấm lòng người con sông Mã kính dâng lên Người.",
          "Đêm trăng thanh bên dòng sông vắng",
          "Ấm áp nghĩa tình quân dân gắn bó.",
        ],
      },
    ],
  },
  {
    id: "s8",
    title: "Nàng Thơ",
    author: "Sáng tác: Hoàng Dũng · Biểu diễn: Thành viên BLLSV TMU",
    note: "Tiết mục song ca ngọt ngào trong đêm Tri ân các thế hệ anh chị BCH tiền nhiệm",
    youtubeId: "AFj2ffqO4co",
    url: "https://www.youtube.com/watch?v=AFj2ffqO4co",
    thumbnail: "https://i.ytimg.com/vi/AFj2ffqO4co/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Lời ca tri ân thanh xuân",
        lines: [
          "Em ngày xưa của anh nay đâu rồi?",
          "Những tháng ngày cùng nhau cháy hết mình vì màu áo xanh BLLSV.",
          "Thanh xuân có nhau dưới mái trường Thương Mại",
          "Là kỷ niệm đẹp nhất mãi không phai mờ.",
        ],
      },
    ],
  },
  {
    id: "s9",
    title: "Hơn Cả Yêu",
    author: "Sáng tác: Khắc Hưng · Biểu diễn: Thành viên BLLSV TMU",
    note: "Món quà âm nhạc chan chứa tình thương gửi gắm tới đại gia đình nhà chung 36",
    youtubeId: "_hw5YbFZcoA",
    url: "https://www.youtube.com/watch?v=_hw5YbFZcoA",
    thumbnail: "https://i.ytimg.com/vi/_hw5YbFZcoA/hqdefault.jpg",
    type: "youtube",
    lyrics: [
      {
        section: "Tình cảm nhà chung",
        lines: [
          "Tình yêu chúng mình dành cho đại gia đình 36",
          "Lớn hơn cả những lời có thể nói ra.",
          "Cảm ơn vì đã luôn là mái nhà ấm áp",
          "Chở che và nâng bước mỗi chúng ta trưởng thành.",
        ],
      },
    ],
  },
];

export type Dance = {
  id: string;
  title: string;
  style: "Flashmob" | "Dân vũ truyền thống";
  bpm: number;
  duration: string;
  taughtBy: string;
  since: string;
  thumbnail: string;
  vibe: string;
  youtubeId: string;
  youtubeUrl: string;
  steps: { count: string; name: string; how: string; tip: string }[];
  music: { title: string; size: string };
};

export const DANCES: Dance[] = [
  {
    id: "chung-song",
    title: "Chung Sống",
    style: "Dân vũ truyền thống",
    bpm: 110,
    duration: "3:30",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "4 bài nhảy truyền thống chính thức của Ban Liên Lạc",
    thumbnail: "https://img.youtube.com/vi/IaVyFKUeWG4/hqdefault.jpg",
    vibe: "Một trong 4 bài nhảy truyền thống của nhà chung. Biểu tượng của tinh thần hòa hợp, chung sống và gắn bó như ruột thịt của những người con xa quê.",
    youtubeId: "IaVyFKUeWG4",
    youtubeUrl: "https://www.youtube.com/watch?v=IaVyFKUeWG4",
    steps: [
      { count: "1", name: "Bật chéo chân phải", how: "Nhảy nhẹ bằng bàn chân, tay phải đưa chéo lên cao 45°.", tip: "Đầu gối mềm, chuyển động tự nhiên theo nhịp." },
      { count: "2", name: "Vỗ tay ngang ngực", how: "Vỗ tay dứt khoát ngang ngực, mắt nhìn thẳng đồng đội.", tip: "Vỗ to để cả đội cùng hòa nhịp." },
      { count: "3", name: "Xoay người 180°", how: "Xoay người nhịp nhàng bằng mũi bàn chân trái.", tip: "Giữ thăng bằng và nụ cười rạng rỡ." },
      { count: "4", name: "Chụm tay mở rộng", how: "Hai tay bung rộng đón ánh sáng, bước chân mở rộng.", tip: "Thể hiện trọn vẹn tinh thần chung một mái nhà." },
    ],
    music: { title: "Chung Song - Truyen Thong BLLSV TMU.mp3", size: "4.5 MB" },
  },
  {
    id: "con-chim-non",
    title: "Con Chim Non (Khăn Quàng Thắp Sáng Bình Minh)",
    style: "Dân vũ truyền thống",
    bpm: 118,
    duration: "3:45",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "4 bài nhảy truyền thống chính thức của Ban Liên Lạc",
    thumbnail: "https://img.youtube.com/vi/UkDFewLThN8/hqdefault.jpg",
    vibe: "Điệu dân vũ trong trẻo, rộn ràng, mang lại năng lượng thanh xuân bất tận trước mỗi buổi chào tân sinh viên và hội quân.",
    youtubeId: "UkDFewLThN8",
    youtubeUrl: "https://www.youtube.com/watch?v=UkDFewLThN8",
    steps: [
      { count: "1", name: "Tay vỗ cánh chim", how: "Hai tay nâng ngang vai vẫy nhẹ như cánh chim non đón nắng.", tip: "Động tác thanh thoát, uyển chuyển." },
      { count: "2", name: "Nhún chân nhịp nhàng", how: "Chân phải nhún 2 nhịp nhỏ, đổi sang chân trái.", tip: "Nhún đều theo tiếng trống nhạc." },
      { count: "3", name: "Vòng tay khăn quàng", how: "Tay vuốt nhẹ chéo ngực mô phỏng dải khăn quàng bình minh.", tip: "Ánh mắt tự hào hướng về phía trước." },
      { count: "4", name: "Bung tay chào mặt trời", how: "Hai tay vươn cao đón chào ngày mới, miệng cười tươi.", tip: "Khoảnh khắc bừng sáng của tuổi trẻ." },
    ],
    music: { title: "Con Chim Non - Khan Quang Thap Sang Binh Minh.mp3", size: "4.8 MB" },
  },
  {
    id: "12-buoc",
    title: "12 Bước (Vào Đời)",
    style: "Flashmob",
    bpm: 124,
    duration: "4:00",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "4 bài nhảy truyền thống chính thức của Ban Liên Lạc",
    thumbnail: "https://img.youtube.com/vi/42eTQnZMA-o/hqdefault.jpg",
    vibe: "Bài nhảy sôi động với 12 bước chân kiên định biểu trưng cho hành trình trưởng thành, tự tin bước vào đời của sinh viên Thương Mại.",
    youtubeId: "42eTQnZMA-o",
    youtubeUrl: "https://www.youtube.com/watch?v=42eTQnZMA-o",
    steps: [
      { count: "1 - 3", name: "3 bước tiến thẳng", how: "Bước chân dứt khoát về phía trước, hai tay đánh hông mạnh mẽ.", tip: "Giữ lưng thẳng, mắt nhìn thẳng." },
      { count: "4 - 6", name: "3 bước quay ngang", how: "Chuyển hướng 90 độ, vỗ tay kết hợp xoay hông.", tip: "Động tác khỏe khoắn, dứt khoát." },
      { count: "7 - 9", name: "3 bước lùi phòng thủ", how: "Lùi chân nhịp nhàng giữ cự ly đội hình chuẩn xác.", tip: "Không nhìn xuống chân, cảm nhận khoảng cách." },
      { count: "10 - 12", name: "3 bước bứt phá", how: "Bật nhảy cao, giơ hai tay chữ V tự hào đón nhận tương lai.", tip: "Cả đội đồng thanh hô vang nhịp 12!" },
    ],
    music: { title: "12 Buoc Vao Doi - Flashmob BLLSV.mp3", size: "5.2 MB" },
  },
  {
    id: "9-buoc",
    title: "9 Bước (Đến Với Con Người Việt Nam Tôi)",
    style: "Flashmob",
    bpm: 120,
    duration: "3:50",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "4 bài nhảy truyền thống chính thức của Ban Liên Lạc",
    thumbnail: "https://img.youtube.com/vi/wqAD_SoIKsM/hqdefault.jpg",
    vibe: "Khúc ca tự hào quê hương xứ Thanh và đất nước Việt Nam. Bài nhảy luôn được chọn biểu diễn trong các sự kiện giao lưu cấp trường và cấp thành phố.",
    youtubeId: "wqAD_SoIKsM",
    youtubeUrl: "https://www.youtube.com/watch?v=wqAD_SoIKsM",
    steps: [
      { count: "1 - 3", name: "3 nhịp mở cánh sen", how: "Hai bàn tay tạo hình búp sen rồi bung nở trước ngực.", tip: "Mềm mại, trang trọng và giàu cảm xúc." },
      { count: "4 - 6", name: "3 nhịp sóng Mã giang", how: "Uốn lượn hai tay tượng trưng cho dòng sông Mã anh hùng.", tip: "Chuyển động nhịp nhàng từ vai đến cổ tay." },
      { count: "7 - 9", name: "3 nhịp đón bạn bè", how: "Bước rộng hai chân, vòng tay rộng ôm trọn bạn bè phương xa.", tip: "Nụ cười mến khách đậm chất con người xứ Thanh." },
    ],
    music: { title: "9 Buoc - Den Voi Con Nguoi Viet Nam Toi.mp3", size: "5.0 MB" },
  },
  {
    id: "flashmob-lof",
    title: "Flashmob LOF IS MY LIFE",
    style: "Flashmob",
    bpm: 126,
    duration: "4:03",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "Chiến dịch Mùa Hè Xanh 2023 · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/j8exV4jUhNY/hqdefault.jpg",
    vibe: "Điệu flashmob rực lửa giữa núi rừng Thanh Hóa trong chiến dịch Mùa Hè Xanh 2023, thể hiện trọn vẹn sức trẻ và tình yêu thương của BLLSV.",
    youtubeId: "j8exV4jUhNY",
    youtubeUrl: "https://www.youtube.com/watch?v=j8exV4jUhNY",
    steps: [
      { count: "1 - 4", name: "Bật nhảy vươn tay", how: "Chân bật nhịp nhàng, hai tay vươn hình trái tim hướng lên trời.", tip: "Bật cao và cười rạng rỡ." },
      { count: "5 - 8", name: "Bước chéo vỗ tay", how: "Chân phải bước chéo, hai tay vỗ nhịp 2 bên hông dứt khoát.", tip: "Đều tăm tắp theo tiếng bass dồn dập." },
      { count: "9 - 12", name: "Đội hình sóng cuộn", how: "Cả đội uốn lượn tay tạo dải sóng liên hoàn gắn kết.", tip: "Giữ khoảng cách cự ly đồng đội." },
      { count: "13 - 16", name: "Kết thúc tạo tim", how: "Chụm tay tạo hình trái tim lớn trao gửi thông điệp yêu thương.", tip: "Đồng thanh hô vang LOF IS MY LIFE!" },
    ],
    music: { title: "Flashmob LOF Is My Life - MHX 2023.mp3", size: "5.5 MB" },
  },
  {
    id: "flashmob-se-chia",
    title: "Flashmob Sẻ Chia Từng Khoảnh Khắc",
    style: "Flashmob",
    bpm: 122,
    duration: "3:49",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "Chiến dịch Mùa Hè Xanh 2023 · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/Q76YZ_ln5i8/hqdefault.jpg",
    vibe: "Giai điệu sẻ chia ấm áp, lan tỏa tinh thần tình nguyện và cống hiến vì cộng đồng của tuổi trẻ Thương Mại.",
    youtubeId: "Q76YZ_ln5i8",
    youtubeUrl: "https://www.youtube.com/watch?v=Q76YZ_ln5i8",
    steps: [
      { count: "1 - 4", name: "Mở tay sẻ chia", how: "Hai tay đưa về trước lòng bàn tay mở rộng đón nhận yêu thương.", tip: "Ánh mắt ấm áp nhìn đồng bào và khán giả." },
      { count: "5 - 8", name: "Xoay vòng gắn kết", how: "Xoay người theo vòng tròn đồng tâm kết nối với bạn bên cạnh.", tip: "Bước chân nhịp nhàng theo nhịp 4/4." },
      { count: "9 - 12", name: "Bật bước chữ V", how: "Hai chân bật mở chữ V, hai tay đưa cao hình cánh chim dang rộng.", tip: "Dứt khoát, tự tin." },
    ],
    music: { title: "Flashmob Se Chia Tung Khoanh Khac.mp3", size: "5.2 MB" },
  },
  {
    id: "flashmob-noi-vong-tay-lon",
    title: "Flashmob Nối Vòng Tay Lớn",
    style: "Flashmob",
    bpm: 120,
    duration: "3:23",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "Chiến dịch Mùa Hè Xanh 2023 · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/TkQ4qgon-g0/hqdefault.jpg",
    vibe: "Khúc ca nối triệu con tim đoàn kết của người con xứ Thanh tại TMU và nhân dân địa phương.",
    youtubeId: "TkQ4qgon-g0",
    youtubeUrl: "https://www.youtube.com/watch?v=TkQ4qgon-g0",
    steps: [
      { count: "1 - 4", name: "Đan tay siết chặt", how: "Các thành viên nắm chặt tay nhau tạo vòng tròn lớn vững chãi.", tip: "Không buông tay, cùng tiến vào tâm." },
      { count: "5 - 8", name: "Tiến bước vung cao", how: "Đồng loạt nâng cao tay hô to tinh thần 36.", tip: "Hô vang dõng dạc, khí thế hào hùng." },
    ],
    music: { title: "Flashmob Noi Vong Tay Lon.mp3", size: "4.7 MB" },
  },
  {
    id: "dance-new-fire",
    title: "Nhảy Hiện Đại 'Team New Fire'",
    style: "Flashmob",
    bpm: 128,
    duration: "3:45",
    taughtBy: "Tân TNV K59 – Tuyển quân Sacred Fire",
    since: "Tuyển tình nguyện viên K59 · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/DPz3KshqYCI/hqdefault.jpg",
    vibe: "Tiết mục bùng nổ năng lượng của các bạn tân tình nguyện viên K59 trong đêm chung kết tuyển quân Sacred Fire.",
    youtubeId: "DPz3KshqYCI",
    youtubeUrl: "https://www.youtube.com/watch?v=DPz3KshqYCI",
    steps: [
      { count: "1 - 4", name: "Bùng nổ ngọn lửa", how: "Đánh hông dứt khoát kết hợp đẩy tay theo nhịp nhạc điện tử sôi động.", tip: "Biểu cảm thần thái tự tin, ngập tràn sức sống." },
      { count: "5 - 8", name: "Wave tay chuyển khối", how: "Lượn sóng tay nhịp nhàng từ trái qua phải, chuyển khối đội hình.", tip: "Mắt nhìn đồng đội, giữ nhịp đều." },
    ],
    music: { title: "Nhay Hien Dai Team New Fire K59.mp3", size: "5.1 MB" },
  },
  {
    id: "dance-titanic",
    title: "Nhảy Hiện Đại 'Team Titanic'",
    style: "Flashmob",
    bpm: 125,
    duration: "4:13",
    taughtBy: "Tân TNV K59 – Tuyển quân Sacred Fire",
    since: "Tuyển tình nguyện viên K59 · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/0nGiWCcbfX4/hqdefault.jpg",
    vibe: "Màn vũ đạo sáng tạo, cuốn hút và gắn kết đồng đội từ vòng thi tuyển chọn thành viên thế hệ K59.",
    youtubeId: "0nGiWCcbfX4",
    youtubeUrl: "https://www.youtube.com/watch?v=0nGiWCcbfX4",
    steps: [
      { count: "1 - 4", name: "Tạo hình con tàu", how: "Xếp đội hình mũi tàu vươn ra biển lớn, tay dang rộng đón gió.", tip: "Giữ thế đứng vững chãi, thần thái kiên cường." },
    ],
    music: { title: "Nhay Hien Dai Team Titanic K59.mp3", size: "5.4 MB" },
  },
  {
    id: "dance-mashup-k58",
    title: "Nhảy Mashup K58 'SuperNova'",
    style: "Flashmob",
    bpm: 124,
    duration: "4:08",
    taughtBy: "Ban Văn hóa – Sự kiện (Thế hệ K58)",
    since: "Chào Tân Sinh Viên 2022 - SuperNova · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/hWh9l08uDMY/hqdefault.jpg",
    vibe: "Màn biểu diễn chào đón các em tân sinh viên K58 tràn đầy nhiệt huyết và sức trẻ của nhà chung.",
    youtubeId: "hWh9l08uDMY",
    youtubeUrl: "https://www.youtube.com/watch?v=hWh9l08uDMY",
    steps: [
      { count: "1 - 4", name: "Mashup chuyển nhịp", how: "Chuyển động linh hoạt từ nhịp điệu trẻ trung sang cao trào đồng đội.", tip: "Khớp nhịp chính xác theo từng đoạn drop." },
    ],
    music: { title: "Nhay Mashup K58 SuperNova.mp3", size: "5.7 MB" },
  },
  {
    id: "dance-hien-dai-k57",
    title: "Nhảy Hiện Đại Thế Hệ K57",
    style: "Flashmob",
    bpm: 125,
    duration: "4:18",
    taughtBy: "Ban Văn hóa – Sự kiện (Thế hệ K57)",
    since: "Chào Tân Sinh Viên 2022 · TH VCU Media",
    thumbnail: "https://i.ytimg.com/vi/Uhk89Nruess/hqdefault.jpg",
    vibe: "Tiết mục chào tân sinh viên công phu, hoành tráng do các anh chị thế hệ K57 dàn dựng.",
    youtubeId: "Uhk89Nruess",
    youtubeUrl: "https://www.youtube.com/watch?v=Uhk89Nruess",
    steps: [
      { count: "1 - 4", name: "Vũ đạo sao chổi", how: "Đội hình tỏa sáng mô phỏng dải sao chổi rực sáng bầu trời TMU.", tip: "Di chuyển đội hình đồng bộ và chính xác." },
    ],
    music: { title: "Nhay Hien Dai The He K57.mp3", size: "5.8 MB" },
  },
];

export const IMG = {
  volunteers: "https://images.pexels.com/photos/13418669/pexels-photo-13418669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  maskTeam: "https://images.pexels.com/photos/8543385/pexels-photo-8543385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  support: "https://images.pexels.com/photos/7475127/pexels-photo-7475127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kids: "https://images.pexels.com/photos/14025674/pexels-photo-14025674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kidsRead: "https://images.pexels.com/photos/14025666/pexels-photo-14025666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  classroom: "https://images.pexels.com/photos/15119089/pexels-photo-15119089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  walk: "https://images.pexels.com/photos/12719335/pexels-photo-12719335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  football: "https://images.pexels.com/photos/27394486/pexels-photo-27394486.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  football2: "https://images.pexels.com/photos/16651538/pexels-photo-16651538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  football3: "https://images.pexels.com/photos/14353976/pexels-photo-14353976.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  campus: "https://images.pexels.com/photos/7972534/pexels-photo-7972534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  park: "https://images.pexels.com/photos/7972671/pexels-photo-7972671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  friends: "https://images.pexels.com/photos/6147395/pexels-photo-6147395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  dance: "https://images.pexels.com/photos/17589607/pexels-photo-17589607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dance2: "https://images.pexels.com/photos/37436399/pexels-photo-37436399.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dance3: "https://images.pexels.com/photos/8973447/pexels-photo-8973447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dance4: "https://images.pexels.com/photos/12398403/pexels-photo-12398403.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  beach: "https://images.pexels.com/photos/38549549/pexels-photo-38549549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  beach2: "https://images.pexels.com/photos/38251939/pexels-photo-38251939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  community: "https://images.pexels.com/photos/33368443/pexels-photo-33368443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export type EventCategory =
  | "Tình nguyện"
  | "Hội đồng hương"
  | "Chào tân sinh viên"
  | "Chiến dịch Mùa Hè Xanh"
  | "Chiến dịch Đông Ấm"
  | "Âm Vang Xứ Thanh"
  | "Đào tạo & Gắn kết"
  | "Truyền thông & Đời sống";
export const EVENT_FILTERS = ["Tất cả", "Tình nguyện", "Hội đồng hương", "Chào tân sinh viên"] as const;

export type ProgramStatus = "Mới đăng" | "Đang mở đăng ký" | "Sắp diễn ra" | "Đã kết thúc";

export type Program = {
  id: string;
  title: string;
  category: EventCategory;
  year?: number;
  dateLabel: string;
  month: string;
  day: string;
  location: string;
  status: ProgramStatus;
  excerpt: string;
  cover: string;
  gallery: string[];
  driveLink?: string;
  schedule: { time: string; title: string; note: string }[];
  fact: { label: string; value: string }[];
};

export const PROGRAMS: Program[] = [
  // ==================== NĂM 2026 ====================
  {
    id: "mua-he-xanh-2026",
    title: "Chiến dịch Mùa Hè Xanh 2026 (13 Mùa Yêu Thương)",
    category: "Chiến dịch Mùa Hè Xanh",
    year: 2026,
    dateLabel: "Tháng 7 thường niên",
    month: "07",
    day: "15",
    location: "Các xã miền núi khó khăn thuộc Thanh Hóa",
    status: "Đang mở đăng ký",
    excerpt:
      "Hành trình 13 mùa hè đi qua khắp các huyện Tĩnh Gia, Cẩm Thủy, Lang Chánh, Thường Xuân, Thạch Thành, Quan Sơn, Ngọc Lặc, Như Thanh, Quan Hóa... mang tri thức, công trình và tình yêu thương tới bà con.",
    cover: "/images/programs/mua-he-xanh-2026/mhx-crowd-cover.jpg",
    gallery: [
      "/images/programs/mua-he-xanh-2026/mhx-crowd-cover.jpg",
      "/images/programs/mua-he-xanh-2026/mhx-van-nghe-1.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1kZ8TGJfj5N7PO5NVZqQpA2nt30SHuZ0U?usp=drive_link",
    schedule: [
      { time: "05:00", title: "Xuất quân tại 79 Hồ Tùng Mậu", note: "Lên xe về với các bản làng vùng cao xứ Thanh." },
      { time: "08:00", title: "Dạy học & sinh hoạt hè cho các em nhỏ", note: "Lớp học tình thương, trao tặng đồ dùng học tập." },
      { time: "14:00", title: "Thực hiện công trình thanh niên", note: "Đổ bê tông đường giao thông, sửa chữa nhà văn hóa thôn bản." },
      { time: "19:30", title: "Đêm lửa trại thắt chặt tình quân dân", note: "Nhảy dân vũ cùng bà con và thanh niên địa phương." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2026" },
      { label: "Số mùa đã qua", value: "13 Mùa hè xanh" },
      { label: "Địa bàn", value: "Các huyện vùng cao Thanh Hóa" },
      { label: "Lực lượng", value: "Đội SVTN nòng cốt TMU" },
    ],
  },
  {
    id: "dong-am-2026",
    title: "Chiến dịch Đông Ấm 2026 (Hơi Ấm Vùng Cao)",
    category: "Chiến dịch Đông Ấm",
    year: 2026,
    dateLabel: "Tháng 1 thường niên",
    month: "01",
    day: "10",
    location: "Các bản vùng sâu vùng xa Thanh Hóa",
    status: "Đã kết thúc",
    excerpt:
      "Trải qua 8 mùa Đông Ấm như 'Tết Ấm Bản Em', 'Đông Ấm Yêu Thương' tại Thường Xuân, Thạch Thành, Quan Sơn, Như Thanh, Lang Chánh... mang áo ấm, chăn bông và quà Tết đến các hộ nghèo và học sinh vùng cao.",
    cover: "/images/programs/dong-am-2026/dong-am-crowd-cover.jpg",
    gallery: [
      "/images/programs/dong-am-2026/dong-am-crowd-cover.jpg",
      "/images/programs/dong-am-2025/dong-am-2025-cover.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1KgN-5lNuMjMC9nlyQkn-G63nUCnsqalp?usp=drive_link",
    schedule: [
      { time: "06:00", title: "Vận chuyển hàng cứu trợ Tết", note: "Chăn ấm, áo khoác, gạo nếp, bánh chưng tới bản vùng sâu." },
      { time: "10:00", title: "Trao học bổng & quà tặng bà con", note: "Gặp gỡ thăm hỏi từng hộ gia đình khó khăn." },
      { time: "19:00", title: "Nấu bánh chưng Tết ấm tình đồng hương", note: "Quây quần bên bếp lửa cùng bà con bản làng." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2026" },
      { label: "Số mùa đã qua", value: "8 Mùa Đông Ấm" },
      { label: "Quà tặng", value: "Hàng nghìn suất quà áo ấm" },
      { label: "Ý nghĩa", value: "Sống để yêu thương, cống hiến" },
    ],
  },
  {
    id: "sinh-nhat-bllsv-2026",
    title: "Đại Lễ Sinh Nhật 18 Tuổi BLLSV TMU (12/04/2008 – 2026)",
    category: "Hội đồng hương",
    year: 2026,
    dateLabel: "12/04/2026",
    month: "04",
    day: "12",
    location: "Trường Đại học Thương Mại – 79 Hồ Tùng Mậu",
    status: "Đã kết thúc",
    excerpt:
      "Ngày 12/04/2008 đánh dấu sự ra đời của Ban Liên Lạc Sinh Viên Thanh Hóa Đại Học Thương Mại. Đại lễ kỷ niệm 18 năm thành lập là dịp hội ngộ lịch sử quy tụ đông đảo các thế hệ cựu BCH và thành viên từ K44 đến K60.",
    cover: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    gallery: [
      "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1bpUGAPI8hk7uHhApBGP0hVrrXUB0ZX6x?usp=drive_link",
    schedule: [
      { time: "14:00", title: "Hội ngộ các thế hệ anh chị tiền nhiệm", note: "Gặp mặt BCH qua 16 nhiệm kỳ." },
      { time: "16:00", title: "Hội trại & Flashmob truyền thống", note: "Cháy hết mình cùng 4 bài nhảy truyền thống." },
      { time: "18:30", title: "Cắt bánh sinh nhật 12/04 & Gala tri ân", note: "Hô vang khẩu hiệu 'Tinh thần 36' quanh vòng tròn." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2026" },
      { label: "Ngày thành lập", value: "12/04/2008" },
      { label: "Lịch sử", value: "Hơn 18 năm giữ lửa" },
      { label: "Thế hệ gắn kết", value: "Từ K44 đến K60" },
    ],
  },

  // ==================== NĂM 2025 ====================
  {
    id: "tri-an-k56-2025",
    title: "Lễ Tri Ân K56 – Ngọn Lửa Kế Thừa & Khắc Ghi (2025)",
    category: "Hội đồng hương",
    year: 2025,
    dateLabel: "Tháng 6/2025",
    month: "06",
    day: "15",
    location: "Trường Đại học Thương Mại – 79 Hồ Tùng Mậu",
    status: "Đã kết thúc",
    excerpt:
      "Đêm tri ân ấm áp tri ân các anh chị BCH và thế hệ tình nguyện viên K56 đã hoàn thành xuất sắc chặng đường đại học và cống hiến hết mình cho nhà chung 36TMU.",
    cover: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    gallery: [
      "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    ],
    driveLink: "https://drive.google.com/file/d/1B_5VfFmD7y5LYvVfqmLOjt-8bmoPegb-/view?usp=sharing",
    schedule: [
      { time: "18:00", title: "Đón tiếp cựu thành viên và thế hệ K56", note: "Ký tên lưu bút, chụp hình kỷ niệm bên backdrop tri ân." },
      { time: "19:00", title: "Trình chiếu Video Phóng sự Tri ân K56", note: "Nhìn lại hành trình 4 năm gắn bó dưới mái nhà chung 79 Hồ Tùng Mậu." },
      { time: "20:30", title: "Trao kỷ niệm chương & Lời dặn dò thế hệ kế cận", note: "Chuyển giao ngọn lửa nhiệt huyết cho các thế hệ sau." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2025" },
      { label: "Thế hệ vinh danh", value: "Cựu TNV & BCH K56" },
      { label: "Tư liệu", value: "Video Tri Ân chính thức trên Drive" },
    ],
  },
  {
    id: "tap-huan-tinh-nguyen-2025",
    title: "Tập Huấn Tình Nguyện (THTN 2025) – Rèn Bản Lĩnh Áo Xanh",
    category: "Đào tạo & Gắn kết",
    year: 2025,
    dateLabel: "Tháng 5/2025",
    month: "05",
    day: "20",
    location: "Trường Đại học Thương Mại & Địa bàn dã ngoại",
    status: "Đã kết thúc",
    excerpt:
      "Khóa tập huấn chuyên sâu rèn luyện thể lực, kỹ năng sinh hoạt tập thể, kỹ năng sơ cấp cứu và kiểm tra 4 bài nhảy truyền thống, chuẩn bị đội hình tinh nhuệ cho Mùa Hè Xanh.",
    cover: "/images/programs/tap-huan-2024/thtn-2024-cover.jpg",
    gallery: ["/images/programs/tap-huan-2024/thtn-2024-cover.jpg"],
    driveLink: "https://drive.google.com/drive/folders/1--6RBgw79vEPNvyGTvRxOxAFEcQcyhkT",
    schedule: [
      { time: "07:00", title: "Tập trung trước Tòa nhà H – TMU", note: "Hô vang khẩu hiệu truyền thống, kiểm tra tác phong người chiến sĩ." },
      { time: "09:00", title: "Thử thách Teamwork & Huấn luyện kỹ năng dã chiến", note: "Rèn luyện khả năng ứng biến, dựng lều dã ngoại, sơ cứu chấn thương." },
      { time: "15:00", title: "Sát hạch 4 bài nhảy và 4 bài hát truyền thống", note: "Kiểm tra kỹ năng văn hóa - sự kiện của toàn bộ TNV mới." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2025" },
      { label: "Địa điểm tập huấn", value: "Đại học Thương Mại & dã ngoại" },
      { label: "Mục tiêu", value: "Chuẩn bị nhân lực cho Mùa Hè Xanh" },
    ],
  },
  {
    id: "giai-bong-da-2025",
    title: "Giải Bóng Đá Hội Đồng Hương: 36TMU vs 36VATM (2025)",
    category: "Hội đồng hương",
    year: 2025,
    dateLabel: "Tháng 3/2025",
    month: "03",
    day: "24",
    location: "Sân bóng đá sinh viên Hà Nội",
    status: "Đã kết thúc",
    excerpt:
      "Trận cầu giao hữu nảy lửa và thắm đượm tình đồng hương giữa Ban liên lạc SVTH Trường Đại học Thương Mại và Học viện Tòa án.",
    cover: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    gallery: ["/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg"],
    driveLink: "https://drive.google.com/drive/folders/1_fNmCCRSSQU_pDNtR5eyC8AdRSAM15II",
    schedule: [
      { time: "15:00", title: "Lễ chào cờ & Khai mạc trận giao hữu", note: "Giao lưu giữa đội hình 36TMU và 36VATM." },
      { time: "15:30", title: "Tranh tài 2 hiệp đấu", note: "Cống hiến những bàn thắng đẹp mắt và tinh thần fair-play." },
      { time: "17:30", title: "Trao cờ lưu niệm & Liên hoan đồng hương", note: "Thắt chặt mối quan hệ bền chặt giữa hai đơn vị xứ Thanh." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2025" },
      { label: "Đơn vị tham gia", value: "36TMU vs 36VATM (Học viện Tòa Án)" },
      { label: "Tinh thần", value: "Gắn kết thể thao con em xứ Thanh" },
    ],
  },
  {
    id: "chao-tan-sinh-vien-2025",
    title: "Chào Đón Tân Sinh Viên Xứ Thanh TMU (2025)",
    category: "Chào tân sinh viên",
    year: 2025,
    dateLabel: "Tháng 11/2025",
    month: "11",
    day: "19",
    location: "Hội trường Trường Đại học Thương Mại",
    status: "Đã kết thúc",
    excerpt:
      "Chuỗi hoạt động chào đón các tân sinh viên bước vào mái nhà chung 36TMU, dạy 4 bài nhảy truyền thống, giao lưu kết nối và đại nhạc hội ấm áp tình đồng hương.",
    cover: "/images/programs/chao-tan-k60-2024/chao-tan-k60-cover.jpg",
    gallery: [
      "/images/programs/chao-tan-k60-2024/chao-tan-k60-cover.jpg",
      "/images/programs/chao-tan-k60-2024/chao-tan-k60-practice.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1-ARmx98PF9B5pcDgG6N3ryZ7auJbh25u",
    schedule: [
      { time: "18:00", title: "Tập nhảy truyền thống tại sân trường TMU", note: "Ban Văn hóa - Sự kiện hướng dẫn trực tiếp từng động tác 4 bài nhảy." },
      { time: "19:30", title: "Đêm Gala Chào Tân Sinh Viên", note: "Giao lưu văn nghệ bùng nổ, trao quà tân sinh viên có hoàn cảnh khó khăn." },
      { time: "21:30", title: "Vòng tròn đoàn kết hô vang khẩu hiệu Tinh thần 36", note: "Khoảnh khắc gắn kết thiêng liêng chào đón tân sinh viên thành 'người nhà'." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2025" },
      { label: "Khóa sinh viên", value: "Tân sinh viên Trường ĐH Thương Mại" },
      { label: "Video Teaser & Tư liệu", value: "Có sẵn trên Google Drive" },
    ],
  },
  {
    id: "dong-am-2025",
    title: "Chiến dịch Đông Ấm 2025 – Hơi Ấm Bản Tân Sơn (Quan Sơn)",
    category: "Chiến dịch Đông Ấm",
    year: 2025,
    dateLabel: "22/01 – 25/01/2025",
    month: "01",
    day: "22",
    location: "Bản Tân Sơn, Xã Sơn Điện, Huyện Quan Sơn, Thanh Hóa",
    status: "Đã kết thúc",
    excerpt:
      "Chiến dịch Đông Ấm 2025 trao tặng hàng trăm suất quà chăn ấm, áo bông, nhu yếu phẩm Tết và tổ chức phiên chợ 0 đồng, đêm lửa trại văn nghệ thắm đượm tình quân dân cho đồng bào bản Tân Sơn, xã Sơn Điện, huyện Quan Sơn.",
    cover: "/images/programs/dong-am-2025/dong-am-2025-cover.jpg",
    gallery: [
      "/images/programs/dong-am-2025/dong-am-2025-cover.jpg",
      "/images/programs/dong-am-2025/dong-am-2025-activities.jpg",
      "/images/programs/dong-am-2025/dong-am-2025-banner.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1NfISaudU2aNBUOZ_iamUa2V2NdGKrlHx",
    schedule: [
      { time: "22/01 - 22:30", title: "Tập hợp xuất quân tại Cầu vượt Mai Dịch – TMU", note: "Dán banner 'Đông Ấm 2025', xếp hàng chăn ấm lên xe khách khởi hành về Quan Sơn." },
      { time: "23/01 - 07:00", title: "Cập bến bản Tân Sơn – Sơn Điện – Quan Sơn", note: "Bốc xếp hàng hóa, phân chia quà tết theo từng hộ nghèo." },
      { time: "23/01 - 09:30", title: "Khai mạc Phiên Chợ 0 Đồng & Trao học bổng", note: "Phát áo ấm, chăn bông, nhu yếu phẩm cho đồng bào và các em nhỏ vùng cao." },
      { time: "24/01 - 14:00", title: "Cùng bà con giã bánh giầy, nấu bánh chưng Tết", note: "Hoạt động truyền thống thắt chặt tình đoàn kết với đồng bào xứ Thanh." },
      { time: "24/01 - 19:30", title: "Đêm giao lưu văn nghệ lửa trại vùng cao", note: "Múa sạp, đốt lửa trại ấm áp tình quân dân trước khi chia tay bản làng." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2025" },
      { label: "Địa bàn", value: "Bản Tân Sơn, Sơn Điện, Quan Sơn" },
      { label: "Tư liệu Drive", value: "10 thư mục ảnh & video thành viên" },
      { label: "Hoạt động", value: "Phiên chợ 0 đồng, gói bánh chưng, giã bánh" },
    ],
  },

  // ==================== NĂM 2024 ====================
  {
    id: "am-vang-xu-thanh-2024",
    title: "Âm Vang Xứ Thanh Lần Thứ 12 (2024) – Bản Lĩnh 36TMU",
    category: "Hội đồng hương",
    year: 2024,
    dateLabel: "11/05/2024",
    month: "05",
    day: "11",
    location: "Trường Đại học Thủy Lợi – Hà Nội",
    status: "Đã kết thúc",
    excerpt:
      "Sân chơi văn hóa nghệ thuật và thể thao lớn nhất của 20 Ban liên lạc trực thuộc Hội đồng hương Thanh Hóa tại Hà Nội, nơi sắc đỏ xanh 36TMU tỏa sáng rực rỡ.",
    cover: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    gallery: [
      "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
      "/images/programs/dong-am-2026/dong-am-lua-trai-1.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/18-FzirQN63Oz0LEp4yd0jcGDyWkbCC-V",
    schedule: [
      { time: "08:00", title: "Hội quân 20 đơn vị đồng hương", note: "Đoàn kết thi đấu Teambuilding và văn nghệ." },
      { time: "19:00", title: "Đêm Lễ Kỷ Niệm & Vinh Danh", note: "Trình diễn các tiết mục văn nghệ đặc sắc ca ngợi quê hương Thanh Hóa." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2024" },
      { label: "Sự kiện", value: "Âm Vang Xứ Thanh Ver 12 (11/05/2024)" },
      { label: "Địa điểm", value: "ĐH Thủy Lợi – Hà Nội" },
    ],
  },
  {
    id: "mua-he-xanh-2024",
    title: "Chiến dịch Mùa Hè Xanh 2024 (12 Mùa Gieo Hạt)",
    category: "Chiến dịch Mùa Hè Xanh",
    year: 2024,
    dateLabel: "Tháng 7/2024",
    month: "07",
    day: "15",
    location: "Bản làng vùng cao xứ Thanh",
    status: "Đã kết thúc",
    excerpt:
      "Chiến dịch Mùa Hè Xanh 2024 với lực lượng chiến sĩ áo xanh TMU xung kích về bản làng, thi công công trình đường bê tông nông thôn, thắp sáng đường quê và dạy học hè cho thiếu nhi.",
    cover: "/images/programs/mua-he-xanh-2024/mhx-2024-cover.jpg",
    gallery: [
      "/images/programs/mua-he-xanh-2024/mhx-2024-cover.jpg",
      "/images/programs/mua-he-xanh-2026/mhx-cttn-1.jpg",
      "/images/programs/mua-he-xanh-2026/mhx-van-nghe-1.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1--6uE6ufb9TnBHOKygfd81XV04aYqMMQ",
    schedule: [
      { time: "05:00", title: "Xuất quân tại cổng Trường Đại học Thương Mại", note: "Đội hình toàn quân tập hợp, chụp ảnh lưu niệm trước cổng trường và lên đường." },
      { time: "08:00", title: "Dạy hè & tổ chức sinh hoạt kỹ năng sống cho thiếu nhi", note: "Mở các lớp học bổ trợ tiếng Anh, toán và kỹ năng an toàn hè." },
      { time: "14:00", title: "Thi công Công trình Thanh niên 'Đường sáng bản em'", note: "Đổ bê tông đường giao thông nông thôn và kéo đường điện chiếu sáng." },
      { time: "19:30", title: "Đêm Gala tổng kết Mùa Hè Xanh 2024", note: "Giao lưu văn nghệ cùng bà con bản làng và thanh niên địa phương." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2024" },
      { label: "Tư liệu Drive", value: "Kho ảnh 6 chặng ngày và video tổng kết" },
      { label: "Lực lượng", value: "Hơn 30 chiến sĩ tình nguyện nòng cốt" },
    ],
  },
  {
    id: "tuyen-tnv-biggame-k60-2024",
    title: "Tuyển TNV K60 & Vòng 4 Teamwork Biggame (2024)",
    category: "Đào tạo & Gắn kết",
    year: 2024,
    dateLabel: "Tháng 10/2024",
    month: "10",
    day: "14",
    location: "Trường Đại học Thương Mại",
    status: "Đã kết thúc",
    excerpt:
      "Vòng tuyển chọn Assembly, phỏng vấn và vòng 4 Teamwork Biggame bùng nổ, rèn luyện kỹ năng và tinh thần đồng đội cho các bạn tân sinh viên K60 gia nhập đội ngũ tình nguyện viên.",
    cover: "/images/programs/biggame-k60-2024/biggame-2024-cover.jpg",
    gallery: ["/images/programs/biggame-k60-2024/biggame-2024-cover.jpg"],
    driveLink: "https://drive.google.com/drive/folders/1HSrPgJEVVJhygpZF6F6XRK2VYPKClJs6",
    schedule: [
      { time: "07:30", title: "Đặt bàn tuyển quân và tiếp đón ứng viên K60", note: "Tư vấn và hướng dẫn điền đơn tham gia các ban chuyên môn." },
      { time: "13:30", title: "Vòng phỏng vấn Assembly", note: "Tìm hiểu nguyện vọng, sở trường của từng bạn tân sinh viên." },
      { time: "15:00", title: "Vòng 4: Teamwork - Biggame vượt thử thách", note: "Chuỗi trạm game liên hoàn thử thách tính đoàn kết, sức bền và trí tuệ." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2024" },
      { label: "Đối tượng tuyển chọn", value: "Tân sinh viên K60 TMU" },
      { label: "Các vòng thi", value: "Đặt bàn, Phỏng vấn, Teamwork & Biggame" },
    ],
  },
  {
    id: "sinh-nhat-16-2024",
    title: "Đại Lễ Sinh Nhật 16 Năm BLL (12/04/2008 – 2024)",
    category: "Hội đồng hương",
    year: 2024,
    dateLabel: "12/04/2024",
    month: "04",
    day: "12",
    location: "Trường Đại học Thương Mại – 79 Hồ Tùng Mậu",
    status: "Đã kết thúc",
    excerpt:
      "Kỷ niệm 16 năm thành lập Ban liên lạc Sinh viên Thanh Hóa TMU, hội ngộ các thế hệ tiền bối và chuyển giao thế hệ giữ vững tinh thần 36 máu chảy trong tim.",
    cover: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    gallery: [
      "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg",
    ],
    driveLink: "https://drive.google.com/drive/folders/1FfqLLSEN5ktfWDjHadfWSFbDXEX7M-xu",
    schedule: [
      { time: "14:00", title: "Đón tiếp các thế hệ cựu BCH K44 - K58", note: "Hội ngộ truyền thống tại giảng đường TMU." },
      { time: "18:00", title: "Đại lễ Kỷ niệm 16 năm & Tri ân", note: "Cắt bánh sinh nhật 12/04 và chuyển giao thế hệ." },
    ],
    fact: [
      { label: "Năm thực hiện", value: "2024" },
      { label: "Cột mốc", value: "16 năm giữ lửa (2008 – 2024)" },
      { label: "Tư liệu", value: "Kho ảnh Drive & Canva chuyển giao thế hệ" },
    ],
  },
];

export type Memory = {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  category?: "mua-he-xanh" | "dong-am" | "sinh-nhat" | "am-vang" | "chung";
  height: string;
};

export const MEMORIES: Memory[] = [
  { id: "m1", src: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg", title: "Đại Lễ Sinh Nhật 18", caption: "Khoảnh khắc lịch sử quy tụ hơn 80 thành viên, cựu BCH và sinh viên K44 - K60 trên sân khấu.", tag: "Sinh nhật 18", category: "sinh-nhat", height: "h-72 md:h-96" },
  { id: "m2", src: "/images/programs/dong-am-2026/dong-am-crowd-cover.jpg", title: "Đông Ấm 2026 Lửa Trại", caption: "Đội hình tình nguyện viên áo ấm và khăn rằn quây quần bên đốm lửa ấm tình quân dân.", tag: "Đông Ấm", category: "dong-am", height: "h-64 md:h-80" },
  { id: "m3", src: "/images/programs/mua-he-xanh-2026/mhx-crowd-cover.jpg", title: "Mùa Hè Xanh Xuất Quân", caption: "Hơn 20 chiến sĩ áo xanh mang cờ Tổ quốc và cờ BLL trước cổng trường ĐH Thương Mại.", tag: "Mùa Hè Xanh", category: "mua-he-xanh", height: "h-64 md:h-72" },
  { id: "m4", src: "/images/programs/dong-am-2025/dong-am-2025-cover.jpg", title: "Đông Ấm Xuất Bến Mai Dịch", caption: "Toàn đội hình tập hợp trong đêm bên xe khách chuẩn bị hành quân về bản vùng cao.", tag: "Đông Ấm", category: "dong-am", height: "h-72 md:h-88" },
  { id: "m5", src: "/images/programs/chao-tan-k60-2024/chao-tan-k60-cover.jpg", title: "Vòng Tròn Chào Tân K60", caption: "Hơn 30 tân sinh viên quây quần thành vòng tròn dưới hàng cọ TMU trong đêm ấm áp.", tag: "Chào Tân K60", category: "chung", height: "h-64 md:h-80" },
  { id: "m6", src: "/images/programs/sinh-nhat-2026/sinh-nhat-back-1.jpg", title: "Đại Gia Đình 36TMU", caption: "Đại hội ngộ các thế hệ anh chị BCH và TNV đứng kín phông nền kỷ niệm 18 năm giữ lửa.", tag: "Sinh nhật 18", category: "sinh-nhat", height: "h-64 md:h-80" },
  { id: "m7", src: "/images/programs/mua-he-xanh-2026/mhx-van-nghe-1.jpg", title: "Hội Nghị & Giao Lưu Văn Nghệ", caption: "Hơn 20 đại biểu và chiến sĩ tình nguyện tề tựu trong hội trường văn hóa bản làng.", tag: "Mùa Hè Xanh", category: "mua-he-xanh", height: "h-56 md:h-72" },
  { id: "m8", src: "/images/programs/dong-am-2026/dong-am-crowd-cover.jpg", title: "Đêm Hội Lửa Trại Đồng Bào", caption: "Vòng tròn đoàn kết đông đảo thắp sáng màn đêm ấm áp tình quân dân biên giới.", tag: "Đông Ấm", category: "dong-am", height: "h-72 md:h-64" },
  { id: "m9", src: "/images/programs/tap-huan-2024/thtn-2024-cover.jpg", title: "Tập Huấn Tình Nguyện TMU", caption: "18 chiến sĩ ưu tú tề tựu trang nghiêm trước đài phun nước rèn luyện tác phong.", tag: "Tập huấn", category: "chung", height: "h-60 md:h-72" },
  { id: "m10", src: "/images/programs/dong-am-2025/dong-am-2025-cover.jpg", title: "Đội Quân Áo Xanh Lên Đường", caption: "Đại gia đình tình nguyện viên đoàn kết một lòng vì màu cờ sắc áo và đồng bào xứ Thanh.", tag: "Đông Ấm", category: "dong-am", height: "h-64 md:h-80" },
  { id: "m11", src: "/images/programs/mua-he-xanh-2024/mhx-2024-cover.jpg", title: "Mùa Hè Xanh TMU Khí Thế", caption: "Đội ngũ chiến sĩ chung tay xung kích vì cộng đồng, thắp sáng các nẻo đường quê hương.", tag: "Mùa Hè Xanh", category: "mua-he-xanh", height: "h-60 md:h-72" },
  { id: "m12", src: "/images/programs/biggame-k60-2024/biggame-2024-cover.jpg", title: "Xếp Hàng Vượt Thử Thách", caption: "Đông đảo bạn trẻ xếp hàng dài trước cổng đá TMU sẵn sàng cho chặng Biggame gay cấn.", tag: "Biggame K60", category: "chung", height: "h-64 md:h-80" },
  { id: "m13", src: "/images/programs/dong-am-2025/dong-am-2025-cover.jpg", title: "Đông Ấm 2025 Xuất Quân", caption: "Đội hình xuất quân trong đêm tại Mai Dịch hướng về bản Tân Sơn, Quan Sơn.", tag: "Đông Ấm 2025", category: "dong-am", height: "h-64 md:h-80" },
  { id: "m14", src: "/images/programs/tap-huan-2024/thtn-2024-cover.jpg", title: "Đội Ngũ THTN Khóa Mới", caption: "Đội hình rèn quân rực lửa tại khuôn viên Trường Đại học Thương Mại.", tag: "Tập huấn", category: "chung", height: "h-72 md:h-88" },
  { id: "m15", src: "/images/programs/mua-he-xanh-2024/mhx-2024-cover.jpg", title: "Mùa Hè Xanh 2024", caption: "Đội hình chiến sĩ áo xanh TMU kiên cường trước giờ xuất quân về bản làng.", tag: "Mùa Hè Xanh 2024", category: "mua-he-xanh", height: "h-64 md:h-72" },
  { id: "m16", src: "/images/programs/tap-huan-2024/thtn-2024-cover.jpg", title: "Tập Huấn Tình Nguyện 2024", caption: "Đội hình rèn quân rực lửa tại đài phun nước khuôn viên Trường Đại học Thương Mại.", tag: "Tập huấn", category: "chung", height: "h-72 md:h-88" },
  { id: "m17", src: "/images/programs/biggame-k60-2024/biggame-2024-cover.jpg", title: "Biggame K60 Rực Rỡ", caption: "Hàng chục tân sinh viên K60 xếp hàng bước vào thử thách Teamwork Biggame bùng nổ.", tag: "Biggame K60", category: "chung", height: "h-64 md:h-80" },
  { id: "m18", src: "/images/programs/chao-tan-k60-2024/chao-tan-k60-cover.jpg", title: "Vòng Tròn Đoàn Kết Chào Tân", caption: "Vòng tròn gắn kết của những người con xứ Thanh dưới hàng cọ TMU trong đêm chào tân.", tag: "Chào Tân K60", category: "chung", height: "h-64 md:h-80" },
];

export type Confession = {
  id: string;
  text: string;
  author: string;
  role: string;
  tone: "blue" | "orange" | "paper" | "mint";
  rotate: string;
};

export const CONFESSIONS: Confession[] = [
  {
    id: "c1",
    text: "Ngày 12/04/2008 khi Ban mới thành lập, tụi mình chỉ có vài anh chị em quây quần bên nhau. Nhìn thấy nhà chung hôm nay vững mạnh qua 16 thế hệ BCH và 4 năm liền vô địch Âm Vang Xứ Thanh, thực sự nghẹn ngào tự hào!",
    author: "Chị Đỗ Thị Loan",
    role: "Trưởng Ban Liên Lạc khóa K44 (2009 - 2010)",
    tone: "paper",
    rotate: "-2.5deg",
  },
  {
    id: "c2",
    text: "Câu slogan 'Tinh thần 36, máu chảy trong tim, sống để yêu thương, sống để cống hiến' và nghi thức vòng tròn đưa tay trái về tâm sẽ là hành trang đi cùng mình suốt cả cuộc đời.",
    author: "Anh Trần Quang Thái",
    role: "Trưởng Ban Liên Lạc khóa K56 (2022 - 2023)",
    tone: "blue",
    rotate: "1.8deg",
  },
  {
    id: "c3",
    text: "Mỗi bữa ăn cùng đồng đội hô vang khẩu hiệu 'Đã không ăn thì thôi, đã ăn rồi là phải trăm phần trăm...', cảm giác ấm áp như ở chính bữa cơm gia đình quê nhà.",
    author: "Chị Phạm Thị Thương",
    role: "Trưởng Ban Liên Lạc khóa K58 (2024 - 2025)",
    tone: "orange",
    rotate: "-1.2deg",
  },
  {
    id: "c4",
    text: "Tự hào là đơn vị xuất sắc trực thuộc Hội đồng hương Sinh viên Thanh Hóa tại Hà Nội, mang tinh thần Thương Mại bản lĩnh, đoàn kết và cống hiến hết mình.",
    author: "Anh Trịnh Tứ Huy",
    role: "Trưởng Ban Liên Lạc khóa K60 (2026 - 2027)",
    tone: "mint",
    rotate: "2.4deg",
  },
];
