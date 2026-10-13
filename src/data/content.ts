/**
 * Toàn bộ nội dung demo của BLLSV Thanh Hóa - TMU.
 * Tách riêng để component chỉ lo phần render & tương tác.
 */

export const ORG = {
  shortName: "BLLSVTH TMU",
  fullName: "Ban Liên Lạc Sinh Viên Thanh Hóa",
  school: "Trường Đại học Thương Mại",
  address: "79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
  mapQuery: "Trường Đại học Thương Mại, 79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
  email: "bllsvthanhhoa.tmu@gmail.com",
  phone: "0987 654 321",
  slogan: "Tinh thần 36 – Máu chảy trong tim – Sống để yêu thương – Sống để cống hiến",
  founded: 2011,
  fanpage: "https://facebook.com",
  group: "https://facebook.com",
  tiktok: "https://tiktok.com",
  zalo: "https://zalo.me",
};

export const NAV_ITEMS = [
  { id: "home", label: "Trang chủ", short: "Trang chủ", icon: "home" },
  { id: "about", label: "Về chúng mình", short: "Nhà chung", icon: "users" },
  { id: "events", label: "Hoạt động", short: "Hoạt động", icon: "calendar" },
  { id: "dance", label: "Kho bài nhảy", short: "Bài nhảy", icon: "music" },
  { id: "memories", label: "Góc kỷ niệm", short: "Kỷ niệm", icon: "camera" },
  { id: "contact", label: "Liên hệ", short: "Liên hệ", icon: "chat" },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]["id"];

export const HERO_STATS = [
  { value: "15+", label: "Năm giữ lửa", sub: "Từ 2011 đến nay", icon: "🔥" },
  { value: "1000+", label: "Thành viên", sub: "Từ K9 đến K17", icon: "💙" },
  { value: "24", label: "Chương trình / năm", sub: "Mùa Hè Xanh, TMU Cup…", icon: "🎯" },
  { value: "11", label: "Huyện thị nguồn", sub: "Từ Quảng Xương tới Mường Lát", icon: "🗺️" },
];

export const HERO_BADGES = [
  "Mùa Hè Xanh 2026 – 15 năm một chuyến đi",
  "Nhà chung 79 Hồ Tùng Mậu",
  "Flashmob Tinh thần 36",
  "Xứ Thanh TMU Cup mùa 12",
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
    tagline: "Cầu nối đưa nhà chung đi xa",
    emoji: "🤝",
    short: "Tìm tài trợ, kết nối đối tác và các BLLSV bạn.",
    desc: "Là “cánh tay phải” của mọi chương trình: từ tờ trình xin tài trợ 20 thùng nước cho Mùa Hè Xanh tới việc đón đại diện BLLSV Nghệ An, Hà Tĩnh sang giao lưu. Ban Đối ngoại giúp bạn học cách nói chuyện chuyên nghiệp mà vẫn giữ chất người xứ Thanh.",
    duties: [
      "Viết thư đề xuất & làm việc trực tiếp với nhà tài trợ, đối tác",
      "Kết nối BLLSV các trường, các tỉnh bạn trong và ngoài TMU",
      "Chăm sóc khách mời, cựu thành viên trong các đêm hội lớn",
      "Đàm phán logo trên backdrop, áo nhóm, quà tặng",
    ],
    accent: "from-tmu-500 to-cobalt-700",
    chip: "bg-tmu-100 text-tmu-700",
  },
  {
    id: "truyen-thong",
    name: "Ban Truyền thông – Kỹ thuật",
    tagline: "Kể chuyện áo xanh bằng hình ảnh",
    emoji: "🎬",
    short: "Fanpage, TikTok, aftermovie và cả hệ thống đăng ký.",
    desc: "Mỗi aftermovie Mùa Hè Xanh khiến bao người xem xong muốn chuyển trường 😆 — đó là tác phẩm của tụi mình. Ban đảm nhận từ khâu viết caption “gây thiện cảm”, chụp ảnh decode, dựng video, cho tới chạy form đăng ký và livestream sự kiện.",
    duties: [
      "Vận hành Fanpage, Group nội bộ và kênh TikTok của nhà chung",
      "Quay dựng & hậu kỳ aftermovie, video flashmob",
      "Thiết kế backdrop, standee, áo nhóm, bộ nhận diện",
      "Vận hành website, form đăng ký và cơ sở dữ liệu thành viên",
    ],
    accent: "from-flame-500 to-flame-700",
    chip: "bg-flame-100 text-flame-700",
  },
  {
    id: "van-the-my",
    name: "Ban Văn thể mỹ",
    tagline: "Nơi các bài nhảy ra đời",
    emoji: "🎤",
    short: "Biên đạo flashmob, dân vũ, dẫn chương trình, thể thao.",
    desc: "Cái “chất” của BLLSV Thanh Hóa nằm ở những nhịp 1-2-3-4. Ban Văn thể mỹ biên đạo từng bài flashmob chào tân sinh viên, tập dân vũ đêm trước Hội trại, và là chủ của giải bóng đá Xứ Thanh TMU Cup vô cùng ồn ào.",
    duties: [
      "Biên đạo flashmob, dân vũ truyền thống TMU cho từng khoá",
      "Dẫn chương trình, hát múa trong Đêm hội đồng hương",
      "Tổ chức giải bóng đá Xứ Thanh TMU Cup & các môn thể thao",
      "Giảng lại bài nhảy cho tân thành viên mỗi tối thứ Ba",
    ],
    accent: "from-glow-400 to-flame-500",
    chip: "bg-amber-100 text-amber-700",
  },
  {
    id: "nhan-su",
    name: "Ban Nhân sự – Hậu cần",
    tagline: "Người giữ lửa sau hậu trường",
    emoji: "🎒",
    short: "Hồ sơ thành viên, đào tạo, logistics mọi chuyến đi.",
    desc: "Được ăn cơm nóng sau một ngày chạy điểm thi, có nước đá khi tập flashmob dưới nắng — công của tụi mình đấy. Ban Nhân sự – Hậu cần chăm lo từ buổi phỏng vấn đầu tiên cho tới chuyến xe về quê cuối cùng.",
    duties: [
      "Quản lý hồ sơ thành viên, tổ chức Đào tạo khoá đầu (Khoá 1)",
      "Đi chợ, nấu ăn, chuẩn bị lều bạt trong Mùa Hè Xanh",
      "Logistics nước uống, y tế, xe đưa đón cho từng sự kiện",
      "Chăm sóc tâm lý thành viên – “nghe chuyện” mỗi khi buồn",
    ],
    accent: "from-cobalt-600 to-cobalt-900",
    chip: "bg-cobalt-100 text-cobalt-700",
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

const IMG = {
  volunteers:
    "https://images.pexels.com/photos/13418669/pexels-photo-13418669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  maskTeam:
    "https://images.pexels.com/photos/8543385/pexels-photo-8543385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  support:
    "https://images.pexels.com/photos/7475127/pexels-photo-7475127.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kids: "https://images.pexels.com/photos/14025674/pexels-photo-14025674.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  kidsRead:
    "https://images.pexels.com/photos/14025666/pexels-photo-14025666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  classroom:
    "https://images.pexels.com/photos/15119089/pexels-photo-15119089.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  walk: "https://images.pexels.com/photos/12719335/pexels-photo-12719335.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  football:
    "https://images.pexels.com/photos/27394486/pexels-photo-27394486.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  football2:
    "https://images.pexels.com/photos/16651538/pexels-photo-16651538.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  football3:
    "https://images.pexels.com/photos/14353976/pexels-photo-14353976.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  campus:
    "https://images.pexels.com/photos/7972534/pexels-photo-7972534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  park: "https://images.pexels.com/photos/7972671/pexels-photo-7972671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  friends:
    "https://images.pexels.com/photos/6147395/pexels-photo-6147395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  dance: "https://images.pexels.com/photos/17589607/pexels-photo-17589607.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dance2:
    "https://images.pexels.com/photos/37436399/pexels-photo-37436399.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dance3:
    "https://images.pexels.com/photos/8973447/pexels-photo-8973447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dance4:
    "https://images.pexels.com/photos/12398403/pexels-photo-12398403.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  beach: "https://images.pexels.com/photos/38549549/pexels-photo-38549549.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  beach2:
    "https://images.pexels.com/photos/38251939/pexels-photo-38251939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  community:
    "https://images.pexels.com/photos/33368443/pexels-photo-33368443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
};

export const PROGRAMS: Program[] = [
  {
    id: "mua-he-xanh",
    title: "Chiến dịch Mùa Hè Xanh 2026",
    category: "Tình nguyện",
    dateLabel: "15/06 – 30/06/2026",
    month: "06",
    day: "15",
    location: "Xã Cẩm Liên, Cẩm Thủy, Thanh Hóa",
    status: "Đang mở đăng ký",
    excerpt:
      "15 năm, 15 chuyến đi. Mùa Hè Xanh là chuyến xe mỗi tối thứ Sáu tháng Sáu, đưa tụi mình về vùng cao gieo chữ, đổ bê tông đường liên thôn và học cách tự giặt quần áo bằng nước suối.",
    cover: IMG.volunteers,
    gallery: [IMG.kids, IMG.community, IMG.walk, IMG.classroom, IMG.beach2],
    schedule: [
      { time: "04:30", title: "Tập trung ở sân 79 Hồ Tùng Mậu", note: "Ký danh sách, chất hàng quà: 300 bộ đồ dùng học tập." },
      { time: "07:00", title: "Lên xe về Cẩm Thủy", note: "Trên xe có phần “giới thiệu bản thân bằng tiếng Quảng” cực vui." },
      { time: "11:30", title: "Trưa với bà con & giao ban đầu", note: "Chia đội: Lớp học tình thương – Đường gắn kết – Trại sức khoẻ." },
      { time: "15:00", title: "Hoạt động chuyên đề theo đội", note: "Dạy học, đổ bê tông 120m đường, khám và phát thuốc cho người cao tuổi." },
      { time: "19:30", title: "Đêm lửa trại & dân vũ", note: "Nhảy “Ai Đưa Tôi Sang Sông” với bà con – nhớ mang theo gopro để quay đoàn kết!" },
    ],
    fact: [
      { label: "Đơn vị phối hợp", value: "Đoàn TNCS Cẩm Thủy" },
      { label: "Số suất tình nguyện", value: "45 suất" },
      { label: "Chi phí", value: "1.200.000đ (đã gồm ăn ở, xe)" },
    ],
  },
  {
    id: "tiep-suc-mua-thi",
    title: "Tiếp Sức Mùa Thi 2026",
    category: "Tình nguyện",
    dateLabel: "25/06 – 28/06/2026",
    month: "06",
    day: "25",
    location: "Điểm thi THPT Hàm Rồng & Đình Lập, TP Thanh Hóa",
    status: "Đang mở đăng ký",
    excerpt:
      "Nước mía miễn phí, chỗ trọ 0 đồng và một cái ô giữa nắng tháng Sáu. Tụi mình về ngay chính ngôi trường cũ của mình để tiếp sức cho các em thi tốt nghiệp.",
    cover: IMG.support,
    gallery: [IMG.maskTeam, IMG.community, IMG.classroom, IMG.kidsRead],
    schedule: [
      { time: "05:00", title: "Trải bạt, dựng điểm nước", note: "4 điểm nước mía, 2 điểm gửi xe miễn phí quanh điểm thi." },
      { time: "06:30", title: "Đón thí sinh & phụ huynh", note: "Phát nước, khăn ướt, “túi tâm lý” có viết lời động viên bằng tay." },
      { time: "09:00", title: "Tư vấn tuyển sinh TMU", note: "Trải nghiệm giải đáp điểm chuẩn, học phí, ký túc xá cho các em." },
      { time: "16:00", title: "Dọn dẹp & họp tổng kết ngày", note: "Ghi nhận số liệu, cập nhật bảng tiến độ của từng điểm." },
    ],
    fact: [
      { label: "Đối tác nước mía", value: "Hợp tác xã Quảng Xương" },
      { label: "Số tình nguyện viên", value: "60 người" },
      { label: "Điều kiện tham gia", value: "Đã qua 1 Khoá 1" },
    ],
  },
  {
    id: "tmu-cup",
    title: "Giải bóng đá Xứ Thanh TMU Cup – Mùa 12",
    category: "Hội đồng hương",
    dateLabel: "11/10 – 25/10/2026",
    month: "10",
    day: "11",
    location: "Sân bãi Trường ĐH Thương Mại, 79 Hồ Tùng Mậu",
    status: "Sắp diễn ra",
    excerpt:
      "16 đội, 32 trận, vô số cái nịt và tiếng “Quảng” vang cả sân. TMU Cup là dịp các anh chị đã đi làm về “trả lại sân cỏ” và các em K17 có dịp lòi mắt ngợi khen.",
    cover: IMG.football,
    gallery: [IMG.football2, IMG.football3, IMG.park, IMG.friends],
    schedule: [
      { time: "07:00", title: "Lễ khai mạc & tranh tài vòng bảng", note: "Mở màn bằng flashmob 40 người của Ban Văn thể mỹ." },
      { time: "09:00", title: "Lượt đấu bảng A – B", note: "Mỗi trận 2 hiệp × 15 phút, bỏ lượt về nếu mưa." },
      { time: "11:30", title: "Gian hàng ẩm thực xứ Thanh", note: "Bánh cuốn Thanh Sơn, nem chua Thanh Hóa, chè khoai mì Nga Sơn." },
      { time: "15:00", title: "Bán kết & chung kết", note: "Chung kết thi penalty nếu hoà – quay livestream trên fanpage." },
    ],
    fact: [
      { label: "Số đội tham dự", value: "16 đội" },
      { label: "Giải thưởng nhất", value: "5.000.000đ + cúp" },
      { label: "Lệ phí", value: "800.000đ / đội" },
    ],
  },
  {
    id: "chao-tan-sinh-vien",
    title: "Chào Tân Sinh Viên K17 – “Về Nhà Chung”",
    category: "Chào tân sinh viên",
    dateLabel: "14/09/2026",
    month: "09",
    day: "14",
    location: "Hội trường A – 79 Hồ Tùng Mậu",
    status: "Sắp diễn ra",
    excerpt:
      "Buổi đầu tiên bạn được gọi là “người nhà”. Một ngày có xe đón ở bến Giáp Bát, có suất cơm miễn phí, có anh chị kèm ký túc xá và một bài flashmob mà bạn sẽ học trong 20 phút.",
    cover: IMG.campus,
    gallery: [IMG.dance, IMG.friends, IMG.park, IMG.dance3],
    schedule: [
      { time: "07:30", title: "Đón tân sinh viên tại cổng trường", note: "Có team cầm bảng tên huyện thị để bạn tìm “đồng hương” ngay." },
      { time: "08:30", title: "Giao lưu & giới thiệu 4 ban chuyên môn", note: "Mỗi ban 5 phút “chăn kéo” bằng một tiết mục tự chọn." },
      { time: "10:00", title: "Tư vấn học bổng, việc làm thêm, ký túc xá", note: "Chia sẻ thật: giá thuê trọ khu Cầu Giấy, Dịch Vọng." },
      { time: "14:00", title: "Học flashmob Tinh thần 36", note: "Có chế độ xem gương để bạn tập trước ở nhà." },
      { time: "18:00", title: "Đêm văn nghệ & chụp ảnh tập thể", note: "Bức ảnh dòng họ 1000 người – nộp ngay ở phần Liên hệ nhé!" },
    ],
    fact: [
      { label: "Đối tượng", value: "Tân SV Thanh Hóa khoá K17" },
      { label: "Phí tham dự", value: "Miễn phí" },
      { label: "Đăng ký trước", value: "Trước 10/09" },
    ],
  },
  {
    id: "tet-doan-vien",
    title: "Tết Đoàn Viên – Gói bánh chưng tình thương",
    category: "Hội đồng hương",
    dateLabel: "10/02/2026 (28 Tết)",
    month: "02",
    day: "10",
    location: "Nhà văn hoá sinh viên TMU",
    status: "Đã kết thúc",
    excerpt:
      "300 chiếc bánh chưng gói trong một đêm, 200 phần quà cho các bạn không về quê được. Mỗi chiếc bánh gói bằng lá đủ hái ở quê mang lên, thơm đến mức Security hỏi xin một miếng.",
    cover: IMG.community,
    gallery: [IMG.park, IMG.friends, IMG.classroom, IMG.walk],
    schedule: [
      { time: "15:00", title: "Chuẩn bị lá, gạo, nhân", note: "Đều đặn mỗi năm: 40kg gạo nếp Quảng Xương." },
      { time: "18:00", title: "Gói bánh cùng cựu thành viên", note: "Chia 10 nhóm, mỗi nhóm có 1 “bàn tay vàng” hướng dẫn." },
      { time: "22:00", title: "Luộc bánh & lửa trại mini", note: "Đánh trống, hát ví giặm – không ngủ được là bình thường." },
      { time: "07:00", title: "Phát bánh & quà cho bạn ở lại Hà Nội", note: "Trực tiếp mang tới tận ký túc xá MỸ Đình, Phương Canh." },
    ],
    fact: [
      { label: "Số bánh chưng", value: "300 chiếc" },
      { label: "Quà tặng", value: "200 phần" },
      { label: "Thành viên tham gia", value: "80 người" },
    ],
  },
  {
    id: "hoi-trai-xu-thanh",
    title: "Hội Trại “Về Ăn Số” – Picnic Sầm Sơn",
    category: "Hội đồng hương",
    dateLabel: "23/03/2026",
    month: "03",
    day: "23",
    location: "Bãi biển Sầm Sơn, Thanh Hóa",
    status: "Đã kết thúc",
    excerpt:
      "Xe khách 45 chỗ, 5kg chả cá, 1 màn hình chiếu “nhà chung” ngay trên bãi cát. Chuyến đi để các bạn bên Bắc – Nam – Trung cùng một ngôi nhà chung thực sự nắm tay nhau.",
    cover: IMG.beach,
    gallery: [IMG.beach2, IMG.dance4, IMG.volunteers, IMG.dance2],
    schedule: [
      { time: "05:30", title: "Xuất phát từ Hà Nội", note: "Điểm hẹn: cổng 79 Hồ Tùng Mậu – nhớ mang theo áo nhóm màu xanh." },
      { time: "09:00", title: "Thám hiểm bãi biển & trò chơi bãi cát", note: "3 đội thi “cướp cờ dưới nước”, đội thua phải nhảy dân vũ." },
      { time: "12:00", title: "Bữa trưa hải sản xứ Thanh", note: "Menu: chả cá Sầm Sơn, nem chua Thanh Hóa, canh cua đồng." },
      { time: "16:00", title: "Đêm lửa trại & flashmob bãi biển", note: "Quay chung một video “Tinh thần 36” đúng 36 giây." },
    ],
    fact: [
      { label: "Số thành viên", value: "140 người" },
      { label: "Chi phí", value: "450.000đ / người" },
      { label: "Phương tiện", value: "Xe khách 45 chỗ × 3" },
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
  steps: { count: string; name: string; how: string; tip: string }[];
  music: { title: string; size: string };
};

export const DANCES: Dance[] = [
  {
    id: "tinh-than-36",
    title: "Tinh Thần 36",
    style: "Flashmob",
    bpm: 128,
    duration: "3:24",
    taughtBy: "Chị Hoàng Hà – Ban Văn thể mỹ K14",
    since: "Ra mắt mùa Chào Tân Sinh Viên 2019",
    thumbnail: IMG.dance,
    vibe: "Bài nhảy “quốc dân” của nhà chung. Điệu chao chao đầu tiên là thứ ai cũng nhớ – nhịp 4 chồm lên đúng lúc “máu chảy trong tim”.",
    steps: [
      { count: "1", name: "Bật chéo chân phải", how: "Nhảy nhẹ bằng bàn chân, tay phải đưa chéo lên cao 45°.", tip: "Đầu gối mềm, đừng đứng cứng như cột điện." },
      { count: "2", name: "Vỗ tay ngang ngực", how: "Vỗ một cái rõ ràng, khuỷu tay mở ngang vai.", tip: "Vỗ to để cả đội nghe được nhịp." },
      { count: "3", name: "Quay 180° sang phải", how: "Xoay bằng bàn chân trái, tay chống hông.", tip: "Nhìn một điểm xa để khỏi chóng mặt." },
      { count: "4", name: "Chồm lên – giơ hai tay chữ V", how: "Nhảy lên nhẹ, hai tay mở chữ V, miệng cười to nhất.", tip: "Đây là khoảnh khắc “đắt giá” nhất – cứ hét lên!" },
    ],
    music: { title: "Tinh Than 36 - BLLSVTH TMU (Flashmix).mp3", size: "4.2 MB" },
  },
  {
    id: "xu-thanh-goi-ten",
    title: "Xứ Thanh Gọi Tên",
    style: "Flashmob",
    bpm: 112,
    duration: "4:05",
    taughtBy: "Anh Đình Cường – Cựu trưởng ban Văn thể mỹ K12",
    since: "Sân khấu Đêm hội đồng hương 2021",
    thumbnail: IMG.dance2,
    vibe: "Vừa nhảy vừa “kể chuyện” về quê: điệu múa ôn lại sông Mã, núi Trường Lệ và cả tiếng ve Sầm Sơn.",
    steps: [
      { count: "1", name: "Tay ôm tròn – lắc hông trái", how: "Hai tay vẽ vòng tròn trước ngực, hông đưa nhẹ sang trái.", tip: "Tưởng tượng bạn đang vẽ mặt sông Mã." },
      { count: "2", name: "Xoè tay như sóng biển", how: "Hai tay đẩy ra trước theo sóng lượn, đầu cúi theo.", tip: "Tay phải chậm hơn tay trái nửa nhịp." },
      { count: "3", name: "Bước trái – bước phải", how: "Hai bước chân trượt (grapevine) sang trái rồi sang phải.", tip: "Nhẹ nhàng, đừng dậm mạnh làm rung sân khấu." },
      { count: "4", name: "Chỉ tay về phía đông – Sầm Sơn", how: "Tay phải chỉ chéo lên, chân trái khẽ cong.", tip: "Cười thật tươi – camera sẽ lia qua đúng khúc này." },
    ],
    music: { title: "Xu Thanh Goi Ten - Nhac San Khau.mp3", size: "5.1 MB" },
  },
  {
    id: "thuong-mai-tuoi-dep",
    title: "Thương Mại Tươi Đẹp",
    style: "Dân vũ truyền thống",
    bpm: 104,
    duration: "3:48",
    taughtBy: "Cô Phạm Thu Hà – Giảng viên hướng dẫn BLLSV",
    since: "Dân vũ chính thức của TMU từ 2008",
    thumbnail: IMG.dance3,
    vibe: "Bài dân vũ bắt buộc “thuộc lòng” trước Hội trại. Mỗi khoá mới đều được truyền lại đúng một vòng tay – không hơn không kém.",
    steps: [
      { count: "1", name: "Vòng tay phải – bước chân phải lên", how: "Tay phải vòng qua ngực, chân phải bước tới 30cm.", tip: "Vai thả lỏng, cổ thẳng." },
      { count: "2", name: "Vòng tay trái – bước chân trái lên", how: "Đổi tay, đổi chân. Giữ nhịp đều như đồng hồ.", tip: "Không nhìn chân, nhìn vai người trước." },
      { count: "3", name: "Quay người phải – chắp tay", how: "Quay 90°, chắp tay trước ngực như chào khách.", tip: "Giữ khoảng cách 1 cánh tay với bạn bên cạnh." },
      { count: "4", name: "Cúi chào – đứng thẳng", how: "Cúi đầu 15° rồi đứng thẳng, mỉm cười.", tip: "Cái cúi đầu là “chất Thương Mại” đấy nhé." },
    ],
    music: { title: "Thuong Mai Tuoi Dep - Dan Vu TMU.mp3", size: "3.8 MB" },
  },
  {
    id: "ai-dua-toi-sang-song",
    title: "Ai Đưa Tôi Sang Sông",
    style: "Dân vũ truyền thống",
    bpm: 96,
    duration: "5:12",
    taughtBy: "Chị Lê Thu Trang – Cựu thành viên K10",
    since: "Bài dân vũ lửa trại truyền thống của Mùa Hè Xanh",
    thumbnail: IMG.dance4,
    vibe: "Vòng tròn lớn quanh lửa trại, tay nắm tay với bà con. Chậm, nhẹ và ấm – đúng chất “sống để yêu thương”.",
    steps: [
      { count: "1", name: "Nắm tay – lắc sang trái", how: "Nắm tay hai người bên cạnh, lắc nhẹ theo nhịp.", tip: "Nắm thật chặt, đừng buông giữa bài." },
      { count: "2", name: "Giơ tay cao – bước vào trong", how: "Cả vòng giơ tay lên, bước một bước vào tâm.", tip: "Đếm to để cả vòng vào cùng lúc." },
      { count: "3", name: "Bước ra – tay hạ xuống vai", how: "Bước ra, tay phải đặt lên vai người bên phải.", tip: "Cúi thấp chút cho ấm áp." },
      { count: "4", name: "Xoay người theo vòng tròn", how: "Đi 2 bước theo chiều kim đồng hồ, giữ khoảng cách.", tip: "Không cần giỏi, chỉ cần cùng vui." },
    ],
    music: { title: "Ai Dua Toi Sang Song - Dan Vu Trai.mp3", size: "6.0 MB" },
  },
  {
    id: "mua-he-xanh-buoc",
    title: "Mùa Hè Xanh Bước",
    style: "Flashmob",
    bpm: 120,
    duration: "2:58",
    taughtBy: "Em Nguyễn Minh Anh – Ban Văn thể mỹ K16",
    since: "Ra mắt tại Mùa Hè Xanh 2025",
    thumbnail: IMG.dance,
    vibe: "Bài nhảy “dễ học nhất nhà chung” – chỉ 8 nhịp, tập 20 phút là nhảy được ngay dưới nắng 40 độ.",
    steps: [
      { count: "1", name: "Đập chân – vỗ đùi", how: "Đập gót chân phải xuống, hai tay vỗ nhẹ lên đùi.", tip: "Gót chân đập, không dậm cả bàn chân." },
      { count: "2", name: "Giơ hai tay sang trái", how: "Hai tay đưa sang trái, người nghiêng theo.", tip: "Hông cũng nghiêng, không chỉ riêng tay." },
      { count: "3", name: "Bật nhảy 2 nhịp tại chỗ", how: "Nhảy hai nhịp nhỏ tại chỗ, tay đung đưa.", tip: "Nhẹ chân để đỡ mỏi khi tập 30 phút." },
      { count: "4", name: "Chào mũ bảo hiểm (cử chỉ tình nguyện)", how: "Tay phải đưa lên đầu như chạm mũ, cúi đầu.", tip: "Cử chỉ mang ý nghĩa “an toàn trên mọi chuyến đi”." },
    ],
    music: { title: "Mua He Xanh Buoc - Flashmix 2025.mp3", size: "3.5 MB" },
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
  { id: "m1", src: IMG.volunteers, title: "Mùa Hè Xanh 2025", caption: "Chuyến xe 4h sáng, chẳng ai ngủ được vì phấn khích.", tag: "Tình nguyện", height: "h-64 md:h-72" },
  { id: "m2", src: IMG.dance, title: "Flashmob Tinh Thần 36", caption: "40 người, 1 nhịp, 0 ai đứng yên.", tag: "Bài nhảy", height: "h-72 md:h-96" },
  { id: "m3", src: IMG.kids, title: "Lớp học tình thương", caption: "Các em học xong không chịu về, đòi tụi mình hát tiếp.", tag: "Mùa Hè Xanh", height: "h-56 md:h-64" },
  { id: "m4", src: IMG.beach, title: "Hoàng hôn Sầm Sơn", caption: "Kết thúc Hội trại “Về Ăn Số” đúng lúc trời đẹp nhất.", tag: "Hội trại", height: "h-64 md:h-80" },
  { id: "m5", src: IMG.football, title: "Xứ Thanh TMU Cup", caption: "Đội 2B vô địch mùa 11 – quả penalty cuối vẫn còn ám ảnh.", tag: "Thể thao", height: "h-60 md:h-72" },
  { id: "m6", src: IMG.campus, title: "Ngày đầu vào TMU", caption: "Các bạn K16 mới về, chụp ảnh cổng trường với tâm trạng bối rối.", tag: "Tân sinh viên", height: "h-64 md:h-80" },
  { id: "m7", src: IMG.community, title: "Đêm gói bánh chưng", caption: "300 chiếc bánh, 80 bàn tay và 1 tiếng cười không dứt.", tag: "Tết đoàn viên", height: "h-56 md:h-72" },
  { id: "m8", src: IMG.park, title: "Họpban ở công viên Cầu Giấy", caption: "Buổi họp chính thức… kéo dài 4 tiếng vì nói chuyện quá vui.", tag: "Họp ban", height: "h-72 md:h-64" },
  { id: "m9", src: IMG.dance2, title: "Dân vũ lửa trại", caption: "Bà con Cẩm Liên nhảy giỏi hơn tụi mình nhiều.", tag: "Mùa Hè Xanh", height: "h-64 md:h-72" },
  { id: "m10", src: IMG.classroom, title: "Trại sức khoẻ", caption: "120 suất khám bệnh, 200 hộp thuốc mang về vùng cao.", tag: "Tình nguyện", height: "h-60 md:h-64" },
  { id: "m11", src: IMG.friends, title: "Tan trường 5h chiều", caption: "Ăn bún đậu trước cổng 79 Hồ Tùng Mậu – nghiện từ 2019.", tag: "Thường ngày", height: "h-64 md:h-80" },
  { id: "m12", src: IMG.beach2, title: "Sáng sớm ra biển", caption: "Chụp ảnh nhóm lúc 5h20, mọi người còn chưa kịp mở mắt.", tag: "Hội trại", height: "h-56 md:h-72" },
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
    text: "Năm 2013 em chỉ là đứa sinh viên sợ nói trước đám đông. Rồi em bị đẩy lên dẫn Đêm hội đồng hương. Bây giờ em thuyết trình với khách hàng cả ngày mà không run tay nữa. Cảm ơn nhà chung!",
    author: "Chị Ngọc Anh",
    role: "Cựu trưởng ban Đối ngoại – K9",
    tone: "paper",
    rotate: "-2.5deg",
  },
  {
    id: "c2",
    text: "Mùa Hè Xanh đầu tiên em tưởng chỉ đi 5 ngày để “có tên CV”. Về Hà Nội em khóc cả đêm vì nhớ mấy em học sinh Cẩm Liên. Năm sau em về làm trưởng đội.",
    author: "Anh Quốc Bảo",
    role: "Cựu thành viên K11 – nay là KOL truyền thông",
    tone: "blue",
    rotate: "1.8deg",
  },
  {
    id: "c3",
    text: "Mình trượt Khoá 1 lần đầu vì nhảy sai nhịp 😭 Năm sau mình thử lại, giờ là người biên đạo flashmob. Đừng bỏ cuộc ở nhịp 3 nhé!",
    author: "Em Minh Thư",
    role: "Tân sinh viên K17 – Ban Văn thể mỹ",
    tone: "orange",
    rotate: "-1.2deg",
  },
  {
    id: "c4",
    text: "Con trai tôi nói nó “không về quê được”. BLLSV đã cho nó một mái nhà ở Hà Nội và một chuyến xe về Thanh Hóa mỗi Tết. Bố mẹ cảm ơn các bạn rất nhiều.",
    author: "Chú Tuấn",
    role: "Phụ huynh tân sinh viên K16",
    tone: "mint",
    rotate: "2.4deg",
  },
  {
    id: "c5",
    text: "Bí kíp sống sót ở nhà chung: học cách nói “anh chị ơi giúp em với” và luôn mang theo 1 chai nước cho anh chị ban Hậu cần. Bảo đảm được yêu thương.",
    author: "Anh Hồng Phong",
    role: "Chủ nhiệm BLLSV Thanh Hóa TMU",
    tone: "paper",
    rotate: "-0.8deg",
  },
  {
    id: "c6",
    text: "Em ở Mường Lát, nhà 30km mới tới trường. Buổi Chào Tân Sinh Viên là lần đầu em thấy có nhiều người cùng quê như mình ở Hà Nội. Cảm ơn vì đã cho em “người nhà”.",
    author: "Em Lò Thị Hằng",
    role: "Tân sinh viên K17 – Ban Nhân sự",
    tone: "blue",
    rotate: "-2deg",
  },
];
