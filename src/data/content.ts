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

export const BANS: Ban[] = [
  {
    id: "doi-ngoai",
    name: "Ban Đối ngoại",
    tagline: "Cầu nối đưa nhà chung vươn xa",
    emoji: "🤝",
    short: "Tìm kiếm tài trợ, kết nối đối tác và 20 đơn vị BLLSV bạn.",
    desc: "Là “cánh tay phải” của mọi chương trình lớn. Ban Đối ngoại đảm nhận kết nối nhà tài trợ, chăm sóc đối tác, thắt chặt tình đoàn kết với Hội đồng hương và 20 đơn vị trường bạn.",
    duties: [
      "Lập hồ sơ tài trợ và làm việc trực tiếp với các nhà hảo tâm, doanh nghiệp",
      "Kết nối giao lưu với 20 đơn vị trực thuộc Hội đồng hương Sinh viên Thanh Hóa tại Hà Nội",
      "Đón tiếp đại biểu, cựu thành viên các thế hệ trong các đêm hội lớn",
      "Đàm phán quyền lợi hình ảnh và đối tác đồng hành các chiến dịch",
    ],
    accent: "from-tmu-500 to-cobalt-700",
    chip: "bg-tmu-100 text-tmu-700",
  },
  {
    id: "truyen-thong",
    name: "Ban Truyền thông – Kỹ thuật",
    tagline: "Kể câu chuyện màu cờ sắc áo 36",
    emoji: "🎬",
    short: "Vận hành Fanpage, TikTok, thiết kế ấn phẩm & kỹ thuật số.",
    desc: "Nơi ghi lại những thước phim xúc động từ Mùa Hè Xanh đến Đông Ấm. Ban phụ trách lan tỏa hình ảnh đẹp của con em xứ Thanh tại TMU tới cộng đồng qua mọi nền tảng truyền thông.",
    duties: [
      "Quản trị các kênh truyền thông chính thức: Fanpage, TikTok, Group nhà chung",
      "Sản xuất Aftermovie, phóng sự tình nguyện và bộ ảnh chuyên đề",
      "Thiết kế toàn bộ ấn phẩm nhận diện: backdrop, áo đồng phục, kỷ yếu",
      "Vận hành cổng thông tin, form đăng ký tân sinh viên và tuyển quân",
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
    desc: "Chủ nhân của 4 chức vô địch liên tiếp tại Âm Vang Xứ Thanh! Nơi lưu giữ và truyền dạy 4 bài nhảy truyền thống, sáng tạo các tiết mục nghệ thuật đặc sắc và tổ chức các giải thể thao nội bộ.",
    duties: [
      "Tập luyện và gìn giữ 4 bài nhảy truyền thống: Chung sống, Con chim non, 12 bước, 9 bước",
      "Luyện tập 4 bài hát truyền thống: Một Nhà Một Tình Yêu, Đồng đội, Chỉ thế thôi, Sát cánh bên nhau",
      "Dàn dựng các tiết mục dự thi Âm Vang Xứ Thanh (đạt kỷ lục 4 năm vô địch liên tiếp)",
      "Tổ chức giải thể thao, hội trại sinh nhật 12/04 và các đêm lửa trại",
    ],
    accent: "from-glow-400 to-flame-500",
    chip: "bg-amber-100 text-amber-700",
  },
  {
    id: "hau-can",
    name: "Ban Hậu cần – Nhân sự",
    tagline: "Hậu phương vững chắc sau mọi chiến dịch",
    emoji: "🎒",
    short: "Quản lý nhân sự, đào tạo tập huấn, tài chính và logistics.",
    desc: "Nơi chăm sóc từng bữa ăn ấm nóng trên các bản làng xa xôi, quản lý kho đồ, y tế và là điểm tựa tinh thần vững chắc cho mỗi thành viên trong mọi chuyến đi.",
    duties: [
      "Tổ chức chương trình Tập huấn Tình nguyện thường niên vào tháng 5",
      "Đảm bảo công tác hậu cần, ẩm thực, y tế cho Mùa Hè Xanh và Đông Ấm",
      "Quản lý tài chính, quỹ thiện nguyện minh bạch và mua sắm trang thiết bị",
      "Chăm lo đời sống, lắng nghe tâm tư và kết nối các thành viên trong nhà chung",
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
  term: string;
  khoa: string;
  name: string;
  dob: string;
  hometown: string;
  role: string;
};

export const LEADERSHIP_HISTORY: LeaderRecord[] = [
  { term: "2009 - 2010", khoa: "K44", name: "Đỗ Thị Loan", dob: "20/01/1990", hometown: "Thọ Xuân", role: "Trưởng Ban liên lạc" },
  { term: "2010 - 2011", khoa: "K45", name: "Nguyễn Ngọc Sơn", dob: "28/12/1991", hometown: "Tĩnh Gia", role: "Trưởng Ban Đối ngoại" },
  { term: "2010 - 2011", khoa: "K45", name: "Lưu Kim Dung", dob: "18/11/1991", hometown: "Hoằng Hóa", role: "Trưởng Ban Hậu cần" },
  { term: "2010 - 2011", khoa: "K45", name: "Ngô Thị Thúy", dob: "21/04/1991", hometown: "TP Thanh Hóa", role: "Phó Ban Đối ngoại" },
  { term: "2010 - 2011", khoa: "K45", name: "Lê Thị Hồng", dob: "24/03/1991", hometown: "Nông Cống", role: "Trưởng Ban Truyền thông" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Bích Ngọc", dob: "11/01/1993", hometown: "Hoằng Hóa", role: "Trưởng Ban Đối ngoại" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Thị Dung", dob: "14/03/1993", hometown: "Hoằng Hóa", role: "Trưởng Ban TT - NS - Đội trưởng SVTN" },
  { term: "2011 - 2014", khoa: "K47", name: "Cao Thị Sâm", dob: "24/05/1993", hometown: "Hoằng Hóa", role: "Trưởng Ban Đào tạo Hậu cần" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Thị Trang", dob: "05/11/1992", hometown: "Thọ Xuân", role: "Đội trưởng Đội Văn nghệ" },
  { term: "2011 - 2014", khoa: "K47", name: "Lê Văn Tuấn", dob: "10/10/1993", hometown: "Yên Định", role: "Đội phó Đội SVTN" },
  { term: "2014 - 2015", khoa: "K48", name: "Mai Thị Thục Hương", dob: "20/08/1994", hometown: "Nga Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2014 - 2015", khoa: "K48", name: "Hoàng Thị Minh Hòa", dob: "06/03/1994", hometown: "Yên Định", role: "Phó Ban liên lạc" },
  { term: "2014 - 2015", khoa: "K48", name: "Lương Văn Hải", dob: "06/03/1994", hometown: "Ngọc Lặc", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2014 - 2015", khoa: "K48", name: "Ngô Thị Thương", dob: "10/05/1994", hometown: "Thiệu Hóa", role: "Trưởng Ban Truyền thông - Kỹ thuật" },
  { term: "2014 - 2015", khoa: "K48", name: "Đỗ Thị Minh Anh", dob: "17/02/1994", hometown: "Thọ Xuân", role: "Trưởng Ban Tài chính - Hậu cần" },
  { term: "2014 - 2015", khoa: "K48", name: "Nguyễn Thị Thùy Linh", dob: "10/09/1994", hometown: "Hà Trung", role: "Trưởng Ban Văn nghệ" },
  { term: "2015 - 2016", khoa: "K49", name: "Nguyễn Thị Thùy Linh", dob: "10/09/1994", hometown: "Hà Trung", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2015 - 2016", khoa: "K49", name: "Mai Thị Thu Hiền", dob: "13/10/1995", hometown: "Nga Sơn", role: "Phó BLL - Đội phó Đội SVTN" },
  { term: "2015 - 2016", khoa: "K49", name: "Lê Thị Ngọc Ánh", dob: "28/08/1995", hometown: "Đông Sơn", role: "Phó Ban liên lạc" },
  { term: "2015 - 2016", khoa: "K49", name: "Lê Thị Hương", dob: "29/03/1995", hometown: "Thọ Xuân", role: "Trưởng Ban Hậu cần" },
  { term: "2016 - 2017", khoa: "K50", name: "Hà Minh Hiếu", dob: "27/04/1996", hometown: "Thường Xuân", role: "Trưởng Ban liên lạc" },
  { term: "2016 - 2017", khoa: "K50", name: "Nguyễn Thị Quỳnh", dob: "10/06/1996", hometown: "Thiệu Hóa", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2016 - 2017", khoa: "K50", name: "Phạm Thị Trang", dob: "22/08/1996", hometown: "Quảng Xương", role: "Phó Ban liên lạc - Trưởng Ban Văn nghệ" },
  { term: "2016 - 2017", khoa: "K50", name: "Trịnh Thị Nguyệt", dob: "27/03/1996", hometown: "Sầm Sơn", role: "Trưởng Ban Hậu cần" },
  { term: "2016 - 2017", khoa: "K50", name: "Nguyễn Thị Thùy Dung", dob: "06/07/1996", hometown: "TP Thanh Hóa", role: "Trưởng Ban Truyền thông" },
  { term: "2016 - 2017", khoa: "K50", name: "Nguyễn Việt Thu", dob: "01/09/1996", hometown: "Ngọc Lặc", role: "Trưởng Ban Nội dung - Sự kiện" },
  { term: "2017 - 2018", khoa: "K51", name: "Nguyễn Thị Thu Hà", dob: "26/06/1997", hometown: "Bỉm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2017 - 2018", khoa: "K51", name: "Hoàng Thị Lý", dob: "05/10/1997", hometown: "Yên Định", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2017 - 2018", khoa: "K51", name: "Phan Ngọc Sơn", dob: "04/02/1997", hometown: "Nông Cống", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2017 - 2018", khoa: "K51", name: "Nguyễn Thị Hạnh", dob: "06/12/1997", hometown: "TP Thanh Hóa", role: "Trưởng Ban Hậu cần" },
  { term: "2017 - 2018", khoa: "K51", name: "Nguyễn Thị Loan", dob: "31/10/1997", hometown: "Thạch Thành", role: "Trưởng Ban Truyền thông" },
  { term: "2018 - 2019", khoa: "K52", name: "Lê Văn Hùng", dob: "27/04/1997", hometown: "Đông Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2018 - 2019", khoa: "K52", name: "Lưu Thị Thương Thương", dob: "10/09/1998", hometown: "Thạch Thành", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2018 - 2019", khoa: "K52", name: "Nguyễn Hương Ly", dob: "20/11/1998", hometown: "Bỉm Sơn", role: "Trưởng Ban Truyền thông" },
  { term: "2018 - 2019", khoa: "K52", name: "Phạm Thị Yến", dob: "13/12/1998", hometown: "Nga Sơn", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2018 - 2019", khoa: "K52", name: "Nguyễn Thị Vân", dob: "03/01/1998", hometown: "Thiệu Hóa", role: "Trưởng Ban Hậu cần" },
  { term: "2019 - 2020", khoa: "K53", name: "Lê Cao Định", dob: "15/02/1999", hometown: "Sầm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2019 - 2020", khoa: "K53", name: "Phạm Trọng Linh", dob: "27/11/1999", hometown: "Yên Định", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2019 - 2020", khoa: "K53", name: "Trịnh Thị Ánh", dob: "03/09/1999", hometown: "TP Thanh Hóa", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2019 - 2020", khoa: "K53", name: "Lương Huyền My", dob: "28/09/1999", hometown: "Thọ Xuân", role: "Trưởng Ban Truyền thông" },
  { term: "2019 - 2020", khoa: "K53", name: "Vũ Thị Trang", dob: "23/05/1999", hometown: "Thạch Thành", role: "Trưởng Ban Hậu cần" },
  { term: "2020 - 2021", khoa: "K54", name: "Nguyễn Xuân Hưng", dob: "17/01/2000", hometown: "Sầm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2020 - 2021", khoa: "K54", name: "Nguyễn Minh Quân", dob: "08/12/2000", hometown: "TX Nghi Sơn", role: "Phó BLL - Đội trưởng SVTN - TB Hậu cần" },
  { term: "2020 - 2021", khoa: "K54", name: "Lê Thị Phượng", dob: "22/02/2000", hometown: "TP Thanh Hóa", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2020 - 2021", khoa: "K54", name: "Lê Thị Thảo", dob: "20/11/2000", hometown: "Thọ Xuân", role: "Trưởng Ban Truyền thông" },
  { term: "2021 - 2022", khoa: "K55", name: "Nguyễn Mai Chi", dob: "08/09/2001", hometown: "TP Thanh Hóa", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2021 - 2022", khoa: "K55", name: "Trương Thị Trang", dob: "21/09/2001", hometown: "Hậu Lộc", role: "Phó Ban liên lạc - Trưởng Ban Truyền thông" },
  { term: "2021 - 2022", khoa: "K55", name: "Phan Thị Thu Ngà", dob: "13/05/2001", hometown: "Thọ Xuân", role: "Phó Ban liên lạc - Trưởng Ban Hậu cần" },
  { term: "2021 - 2022", khoa: "K55", name: "Quách Thị Kiều Trinh", dob: "07/10/2001", hometown: "Ngọc Lặc", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2021 - 2022", khoa: "K55", name: "Trần Quang Thái", dob: "05/07/2002", hometown: "TP Thanh Hóa", role: "Đội phó Đội SVTN" },
  { term: "2022 - 2023", khoa: "K56", name: "Trần Quang Thái", dob: "05/07/2002", hometown: "TP Thanh Hóa", role: "Trưởng Ban liên lạc" },
  { term: "2022 - 2023", khoa: "K56", name: "Lê Thùy Linh", dob: "09/04/2002", hometown: "TP Sầm Sơn", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2022 - 2023", khoa: "K56", name: "Nguyễn Ngọc Anh", dob: "20/11/2002", hometown: "Thường Xuân", role: "Phó Ban liên lạc - Trưởng Ban Truyền thông" },
  { term: "2022 - 2023", khoa: "K56", name: "Lê Thị Thu Hiền", dob: "08/08/2002", hometown: "Thạch Thành", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2022 - 2023", khoa: "K56", name: "Bùi Thị Trang", dob: "29/05/2002", hometown: "Thường Xuân", role: "Trưởng Ban Hậu cần" },
  { term: "2023 - 2024", khoa: "K57", name: "Nguyễn Minh Tú", dob: "01/08/2003", hometown: "TP Thanh Hóa", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2023 - 2024", khoa: "K57", name: "Phạm Trọng Long", dob: "17/09/2004", hometown: "Yên Định", role: "Phó Ban liên lạc - Đội phó SVTN" },
  { term: "2023 - 2024", khoa: "K57", name: "Vũ Thị Phương Nhung", dob: "21/11/2003", hometown: "Triệu Sơn", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2023 - 2024", khoa: "K57", name: "Vũ Phạm Tường Vy", dob: "18/12/2003", hometown: "Nghi Sơn", role: "Trưởng Ban Truyền thông" },
  { term: "2023 - 2024", khoa: "K57", name: "Cao Thị Quỳnh Trang", dob: "16/06/2003", hometown: "Ngọc Lặc", role: "Trưởng Ban Hậu cần" },
  { term: "2024 - 2025", khoa: "K58", name: "Phạm Thị Thương", dob: "14/02/2004", hometown: "Hậu Lộc", role: "Trưởng Ban liên lạc" },
  { term: "2024 - 2025", khoa: "K58", name: "Đinh Cao Nguyên", dob: "25/02/2004", hometown: "Hậu Lộc", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2024 - 2025", khoa: "K58", name: "Lang Thị Châu Anh", dob: "12/07/2003", hometown: "Thường Xuân", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2024 - 2025", khoa: "K58", name: "Bùi Thị Vân", dob: "28/02/2004", hometown: "Ngọc Lặc", role: "Trưởng Ban Truyền thông" },
  { term: "2024 - 2025", khoa: "K58", name: "Bùi Thị Thúy Hằng", dob: "21/10/2004", hometown: "Thạch Thành", role: "Trưởng Ban Hậu cần" },
  { term: "2025 - 2026", khoa: "K59", name: "Lê Thị Huyền Trang", dob: "13/10/2005", hometown: "Nghi Sơn", role: "Trưởng Ban liên lạc - Đội trưởng SVTN" },
  { term: "2025 - 2026", khoa: "K59", name: "Lê Nguyệt Ánh", dob: "09/08/2005", hometown: "Nghi Sơn", role: "Phó BLL - Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2025 - 2026", khoa: "K59", name: "Trịnh Thị Vinh", dob: "20/12/2005", hometown: "Ngọc Lặc", role: "Trưởng Ban Truyền thông" },
  { term: "2025 - 2026", khoa: "K59", name: "Phạm Trần Thu Trang", dob: "05/09/2005", hometown: "TP Thanh Hóa", role: "Trưởng Ban Hậu cần" },
  { term: "2026 - 2027", khoa: "K60", name: "Trịnh Tứ Huy", dob: "01/04/2006", hometown: "TP Sầm Sơn", role: "Trưởng Ban liên lạc" },
  { term: "2026 - 2027", khoa: "K60", name: "Trần Ngọc Lâm", dob: "24/05/2006", hometown: "Bỉm Sơn", role: "Phó Ban liên lạc - Đội trưởng SVTN" },
  { term: "2026 - 2027", khoa: "K60", name: "Hàn Phụng Nhi", dob: "07/04/2006", hometown: "Quảng Xương", role: "Phó Ban liên lạc - Trưởng Ban Hậu cần" },
  { term: "2026 - 2027", khoa: "K60", name: "Võ Trọng Tuấn Anh", dob: "25/12/2006", hometown: "Thọ Xuân", role: "Trưởng Ban Văn hóa - Sự kiện" },
  { term: "2026 - 2027", khoa: "K60", name: "Hoàng Thị Tiểu Tam", dob: "13/11/2006", hometown: "Như Xuân", role: "Trưởng Ban Truyền thông" },
  { term: "2026 - 2027", khoa: "K60", name: "Phan Ngọc Trâm", dob: "15/08/2006", hometown: "Nghi Sơn", role: "Phó Ban Truyền thông" },
];

/* ------------------------------------------------------------------ *
 *  DANH SÁCH BÀI HÁT & BÀI NHẢY TRUYỀN THỐNG CHUẨN XÁC
 * ------------------------------------------------------------------ */
export const TRADITIONAL_SONGS = [
  { id: "s1", title: "Một Nhà Một Tình Yêu", note: "Bài hát biểu tượng của tình cảm gia đình và sự sẻ chia trong Ban liên lạc" },
  { id: "s2", title: "Đồng đội", note: "Khúc ca người lính tình nguyện, sát cánh trên từng cung đường xứ Thanh" },
  { id: "s3", title: "Chỉ thế thôi", note: "Giai điệu mộc mạc, chan chứa tình yêu thương của tuổi trẻ TMU" },
  { id: "s4", title: "Sát cánh bên nhau", note: "Bài ca đoàn kết triệu con tim con em 36 cùng chung một nhịp đập" },
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
  steps: { count: string; name: string; how: string; tip: string }[];
  music: { title: string; size: string };
};

const IMG = {
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

export const DANCES: Dance[] = [
  {
    id: "chung-song",
    title: "Chung Sống",
    style: "Dân vũ truyền thống",
    bpm: 110,
    duration: "3:30",
    taughtBy: "Ban Văn hóa – Sự kiện BLLSV TMU",
    since: "4 bài nhảy truyền thống chính thức của Ban Liên Lạc",
    thumbnail: IMG.dance,
    vibe: "Một trong 4 bài nhảy truyền thống của nhà chung. Biểu tượng của tinh thần hòa hợp, chung sống và gắn bó như ruột thịt của những người con xa quê.",
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
    thumbnail: IMG.dance2,
    vibe: "Điệu dân vũ trong trẻo, rộn ràng, mang lại năng lượng thanh xuân bất tận trước mỗi buổi chào tân sinh viên và hội quân.",
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
    thumbnail: IMG.dance3,
    vibe: "Bài nhảy sôi động với 12 bước chân kiên định biểu trưng cho hành trình trưởng thành, tự tin bước vào đời của sinh viên Thương Mại.",
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
    thumbnail: IMG.dance4,
    vibe: "Khúc ca tự hào quê hương xứ Thanh và đất nước Việt Nam. Bài nhảy luôn được chọn biểu diễn trong các sự kiện giao lưu cấp trường và cấp thành phố.",
    steps: [
      { count: "1 - 3", name: "3 nhịp mở cánh sen", how: "Hai bàn tay tạo hình búp sen rồi bung nở trước ngực.", tip: "Mềm mại, trang trọng và giàu cảm xúc." },
      { count: "4 - 6", name: "3 nhịp sóng Mã giang", how: "Uốn lượn hai tay tượng trưng cho dòng sông Mã anh hùng.", tip: "Chuyển động nhịp nhàng từ vai đến cổ tay." },
      { count: "7 - 9", name: "3 nhịp đón bạn bè", how: "Bước rộng hai chân, vòng tay rộng ôm trọn bạn bè phương xa.", tip: "Nụ cười mến khách đậm chất con người xứ Thanh." },
    ],
    music: { title: "9 Buoc - Den Voi Con Nguoi Viet Nam Toi.mp3", size: "5.0 MB" },
  },
];

export type EventCategory = "Tình nguyện" | "Hội đồng hương" | "Chào tân sinh viên";
export const EVENT_FILTERS = ["Tất cả", "Tình nguyện", "Hội đồng hương", "Chào tân sinh viên"] as const;

export type Program = {
  id: string;
  title: string;
  category: EventCategory;
  dateLabel: string;
  month: string;
  day: string;
  location: string;
  status: "Đang mở đăng ký" | "Sắp diễn ra" | "Đã kết thúc";
  excerpt: string;
  cover: string;
  gallery: string[];
  schedule: { time: string; title: string; note: string }[];
  fact: { label: string; value: string }[];
};

export const PROGRAMS: Program[] = [
  {
    id: "am-vang-xu-thanh",
    title: "Âm Vang Xứ Thanh – Kỷ Lục 4 Năm Vô Địch Liên Tiếp",
    category: "Hội đồng hương",
    dateLabel: "Tháng 12 thường niên",
    month: "12",
    day: "20",
    location: "Hà Nội – Sân khấu Hội đồng hương Sinh viên Thanh Hóa",
    status: "Đã kết thúc",
    excerpt:
      "Chương trình lớn nhất quy tụ 20 Ban liên lạc trực thuộc Hội đồng hương Thanh Hóa tại Hà Nội. BLLSV TMU tự hào đạt kỷ lục 4 năm liên tiếp giữ cúp vô địch toàn đoàn!",
    cover: IMG.dance,
    gallery: [IMG.dance2, IMG.dance3, IMG.community, IMG.friends],
    schedule: [
      { time: "08:00", title: "Hội quân 20 đơn vị", note: "Các đội quy tụ, giăng cờ sắc áo chuẩn bị thi đấu." },
      { time: "13:30", title: "Phần thi nhảy truyền thống & nghệ thuật", note: "TMU bùng nổ với các màn trình diễn xuất sắc được chuẩn bị kỹ lưỡng." },
      { time: "19:00", title: "Đêm Gala chung kết & Vinh danh", note: "Khoảnh khắc nâng cao chiếc cúp vô địch đầy xúc động của cả nhà chung." },
    ],
    fact: [
      { label: "Quy mô", value: "20 Đơn vị trực thuộc Hội ĐH" },
      { label: "Thành tích", value: "Vô địch 4 năm liên tiếp" },
      { label: "Lịch sử giải", value: "Đã diễn ra hơn 11 năm" },
    ],
  },
  {
    id: "mua-he-xanh",
    title: "Chiến dịch Mùa Hè Xanh (13 Mùa Yêu Thương)",
    category: "Tình nguyện",
    dateLabel: "Tháng 7 thường niên",
    month: "07",
    day: "15",
    location: "Các xã miền núi khó khăn thuộc Thanh Hóa",
    status: "Đang mở đăng ký",
    excerpt:
      "Hành trình 13 mùa hè đi qua khắp các huyện Tĩnh Gia, Cẩm Thủy, Lang Chánh, Thường Xuân, Thạch Thành, Quan Sơn, Ngọc Lặc, Như Thanh, Quan Hóa... mang tri thức, công trình và tình yêu thương tới bà con.",
    cover: IMG.volunteers,
    gallery: [IMG.kids, IMG.community, IMG.walk, IMG.classroom],
    schedule: [
      { time: "05:00", title: "Xuất quân tại 79 Hồ Tùng Mậu", note: "Lên xe về với các bản làng vùng cao xứ Thanh." },
      { time: "08:00", title: "Dạy học & sinh hoạt hè cho các em nhỏ", note: "Lớp học tình thương, trao tặng đồ dùng học tập." },
      { time: "14:00", title: "Thực hiện công trình thanh niên", note: "Đổ bê tông đường giao thông, sửa chữa nhà văn hóa thôn bản." },
      { time: "19:30", title: "Đêm lửa trại thắt chặt tình quân dân", note: "Nhảy dân vũ cùng bà con và thanh niên địa phương." },
    ],
    fact: [
      { label: "Số mùa đã qua", value: "13 Mùa hè xanh" },
      { label: "Địa bàn", value: "Các huyện vùng cao Thanh Hóa" },
      { label: "Lực lượng", value: "Đội SVTN nòng cốt TMU" },
    ],
  },
  {
    id: "dong-am",
    title: "Chiến dịch Đông Ấm (8 Mùa Hơi Ấm Vùng Cao)",
    category: "Tình nguyện",
    dateLabel: "Tháng 1 thường niên",
    month: "01",
    day: "10",
    location: "Các bản vùng sâu vùng xa Thanh Hóa",
    status: "Đã kết thúc",
    excerpt:
      "Trải qua 8 mùa Đông Ấm như 'Tết Ấm Bản Em', 'Đông Ấm Yêu Thương' tại Thường Xuân, Thạch Thành, Quan Sơn, Như Thanh, Lang Chánh... mang áo ấm, chăn bông và quà Tết đến các hộ nghèo và học sinh vùng cao.",
    cover: IMG.kidsRead,
    gallery: [IMG.support, IMG.classroom, IMG.community, IMG.maskTeam],
    schedule: [
      { time: "06:00", title: "Vận chuyển hàng cứu trợ Tết", note: "Chăn ấm, áo khoác, gạo nếp, bánh chưng tới bản vùng sâu." },
      { time: "10:00", title: "Trao học bổng & quà tặng bà con", note: "Gặp gỡ thăm hỏi từng hộ gia đình khó khăn." },
      { time: "19:00", title: "Nấu bánh chưng Tết ấm tình đồng hương", note: "Quây quần bên bếp lửa cùng bà con bản làng." },
    ],
    fact: [
      { label: "Số mùa đã qua", value: "8 Mùa Đông Ấm" },
      { label: "Quà tặng", value: "Hàng nghìn suất quà áo ấm" },
      { label: "Ý nghĩa", value: "Sống để yêu thương, cống hiến" },
    ],
  },
  {
    id: "sinh-nhat-bllsv",
    title: "Kỷ Niệm Ngày Thành Lập BLLSV TMU (12/04)",
    category: "Hội đồng hương",
    dateLabel: "Ngày 12/04 hàng năm",
    month: "04",
    day: "12",
    location: "Trường Đại học Thương Mại – 79 Hồ Tùng Mậu",
    status: "Sắp diễn ra",
    excerpt:
      "Ngày 12/04/2008 đánh dấu sự ra đời của Ban Liên Lạc Sinh Viên Thanh Hóa Đại Học Thương Mại. Dịp hội ngộ lịch sử giữa các thế hệ cựu BCH từ K44 đến K60.",
    cover: IMG.campus,
    gallery: [IMG.friends, IMG.park, IMG.dance, IMG.beach],
    schedule: [
      { time: "14:00", title: "Hội ngộ các thế hệ anh chị tiền nhiệm", note: "Gặp mặt BCH qua 16 nhiệm kỳ." },
      { time: "16:00", title: "Hội trại & Flashmob truyền thống", note: "Cháy hết mình cùng 4 bài nhảy truyền thống." },
      { time: "18:30", title: "Cắt bánh sinh nhật 12/04 & Gala tri ân", note: "Hô vang khẩu hiệu 'Tinh thần 36' quanh vòng tròn." },
    ],
    fact: [
      { label: "Ngày thành lập", value: "12/04/2008" },
      { label: "Lịch sử", value: "Hơn 18 năm giữ lửa" },
      { label: "Thế hệ gắn kết", value: "Từ K44 đến K60" },
    ],
  },
  {
    id: "tap-huan-tinh-nguyen",
    title: "Chương Trình Tập Huấn Tình Nguyện",
    category: "Tình nguyện",
    dateLabel: "Tháng 5 thường niên",
    month: "05",
    day: "20",
    location: "Ba Vì, Sóc Sơn, Ứng Hòa (Hà Nội)",
    status: "Sắp diễn ra",
    excerpt:
      "Chương trình rèn luyện kỹ năng sinh tồn, làm việc nhóm, kỷ luật tình nguyện và truyền lửa nhiệt huyết cho thế hệ tình nguyện viên mới trước thềm Mùa Hè Xanh.",
    cover: IMG.walk,
    gallery: [IMG.volunteers, IMG.support, IMG.park],
    schedule: [
      { time: "06:00", title: "Hành quân về địa điểm dã ngoại", note: "Các mùa tập huấn tại Ba Vì, Sóc Sơn, Ứng Hòa." },
      { time: "09:00", title: "Thử thách kỹ năng dã ngoại & teamwork", note: "Dựng lều, nấu ăn dã chiến, sơ cứu thương tích." },
      { time: "15:00", title: "Kiểm tra 4 bài nhảy & 4 bài hát truyền thống", note: "Thử thách thể lực và nhịp điệu tập thể." },
    ],
    fact: [
      { label: "Thời gian", value: "Tháng 5 hàng năm" },
      { label: "Mục tiêu", value: "Chuẩn bị nhân lực Mùa Hè Xanh" },
      { label: "Đối tượng", value: "Toàn thể TNV nhà chung" },
    ],
  },
  {
    id: "chao-tan-sinh-vien",
    title: "Chào Tân Sinh Viên Xứ Thanh TMU",
    category: "Chào tân sinh viên",
    dateLabel: "Tháng 11 thường niên",
    month: "11",
    day: "15",
    location: "Hội trường Trường Đại học Thương Mại",
    status: "Sắp diễn ra",
    excerpt:
      "Buổi đầu tiên những người con sông Mã bước vào TMU được gọi bằng hai tiếng thân thương: 'người nhà'. Đón tân sinh viên, hướng dẫn học tập và truyền lửa truyền thống 36.",
    cover: IMG.campus,
    gallery: [IMG.dance, IMG.friends, IMG.park],
    schedule: [
      { time: "08:00", title: "Đón tân sinh viên & tặng quà quê", note: "Phát tài liệu hướng dẫn học tập, chia sẻ kinh nghiệm trọ." },
      { time: "14:00", title: "Dạy nhảy 4 bài truyền thống", note: "Ban Văn hóa – Sự kiện trực tiếp hướng dẫn từng bước." },
      { time: "18:00", title: "Đêm Gala Chào Tân Sinh Viên", note: "Biểu diễn văn nghệ, giao lưu đồng hương ấm áp." },
    ],
    fact: [
      { label: "Thời gian", value: "Tháng 11 hàng năm" },
      { label: "Đối tượng", value: "Tân sinh viên Thanh Hóa TMU" },
      { label: "Hỗ trợ", value: "Tư vấn ký túc xá, trọ, học tập" },
    ],
  },
];

export type Memory = {
  id: string;
  src: string;
  title: string;
  caption: string;
  tag: string;
  height: string;
};

export const MEMORIES: Memory[] = [
  { id: "m1", src: IMG.volunteers, title: "Mùa Hè Xanh", caption: "13 mùa hè qua các bản làng xa xôi nhất của Thanh Hóa.", tag: "Tình nguyện", height: "h-64 md:h-72" },
  { id: "m2", src: IMG.dance, title: "Âm Vang Xứ Thanh", caption: "Khoảnh khắc vinh quang vô địch 4 năm liên tiếp.", tag: "Vô địch", height: "h-72 md:h-96" },
  { id: "m3", src: IMG.kids, title: "Đông Ấm yêu thương", caption: "Mang áo ấm và nụ cười tới các em nhỏ vùng cao.", tag: "Đông Ấm", height: "h-56 md:h-64" },
  { id: "m4", src: IMG.beach, title: "Sinh nhật 12/04", caption: "Kỷ niệm ngày thành lập với các thế hệ K44 - K60.", tag: "Truyền thống", height: "h-64 md:h-80" },
  { id: "m5", src: IMG.football, title: "Hội thao gắn kết", caption: "Những trận bóng đá nảy lửa của con em 36 tại TMU.", tag: "Thể thao", height: "h-60 md:h-72" },
  { id: "m6", src: IMG.campus, title: "Chào Tân sinh viên", caption: "Vòng tay rộng mở đón những người con sông Mã về nhà.", tag: "Tân SV", height: "h-64 md:h-80" },
  { id: "m7", src: IMG.walk, title: "Tập huấn tình nguyện", caption: "Rèn luyện ý chí và kỷ luật tại Ba Vì, Sóc Sơn.", tag: "Tập huấn", height: "h-56 md:h-72" },
  { id: "m8", src: IMG.community, title: "Vòng tròn Tinh thần 36", caption: "Đứng thành vòng tròn, tay trái đưa về tâm hô vang khẩu hiệu.", tag: "Nghi thức", height: "h-72 md:h-64" },
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
