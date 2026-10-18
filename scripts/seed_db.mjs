import { neon } from "@neondatabase/serverless";

const DATABASE_URL = "postgresql://neondb_owner:npg_1FXWYB8eoONf@ep-odd-paper-b5ysht9l-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

async function main() {
  console.log("Connecting to Neon PostgreSQL...");
  const initialPayload = {
    version: "1.2",
    appName: "BLLSVTMU-Manager",
    exportedAt: new Date().toLocaleString("vi-VN"),
    posts: [],
    programs: [],
    leaders: [],
    motto: {
      slogan: "Tinh thần 36, máu chảy trong tim, sống để yêu thương, sống để cống hiến",
      term: "Nhiệm kỳ 2026 – 2027 (K60)",
      meaning: "Ngọn lửa nhiệt huyết, tình yêu thương và tinh thần cống hiến không ngừng nghỉ vì quê hương Thanh Hóa của tuổi trẻ TMU.",
      updatedAt: "18/10/2026",
    },
    rules: {
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
        "Tinh thần trách nhiệm & Chủ động: Luôn hết mình với công việc được phân công, chủ động hỗ trợ đồng đội với tinh thần 'Một người vì mọi người'."
      ],
      updatedAt: "18/10/2026",
    },
    contact: {
      email: "svthanhhoatmu@gmail.com",
      phone: "0343246446 - Trịnh Huy",
      address: "79 Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội",
      fanpage: "https://www.facebook.com/SinhVienThanhHoaTMU/",
      tiktok: "https://vt.tiktok.com/ZSdBAU7hk/",
      scheduleInfo: "19:00 – 21:00 tối thứ Ba hàng tuần",
      updatedAt: "18/10/2026",
    },
    broadcast: {
      enabled: true,
      type: "info",
      title: "Thông báo từ Đội SVTN Nhà Chung 36",
      message: "Lịch sinh hoạt định kỳ tối thứ Ba hàng tuần (19h00 – 21h00) tại sân Thư viện Trường ĐH Thương Mại.",
      actionLabel: "Xem hoạt động",
      actionLink: "#events",
      updatedAt: "18/10/2026",
      updatedBy: "Ban Truyền thông & Đội SVTN",
    },
    recruitment: {
      isOpen: true,
      title: "Mở Cổng Tuyển Tình Nguyện Viên & Cộng Tác Viên Nhà Chung 36",
      description: "Chào đón toàn thể sinh viên quê Thanh Hóa tại Trường ĐH Thương Mại (K60, K61, K62) gia nhập 3 Ban chuyên môn: Ban Truyền thông, Ban Văn hóa – Sự kiện và Ban Hậu cần do Đội SVTN điều hành.",
      deadline: "30/11/2026",
      allowedDepts: ["Ban Truyền thông", "Ban Văn hóa – Sự kiện", "Ban Hậu cần"],
      updatedAt: "18/10/2026",
    },
    applications: [
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
    ],
    fundCampaign: {
      programName: "Chiến dịch Tình nguyện Đông Ấm 2026 – Vùng cao Xứ Thanh",
      targetAmount: 35000000,
      currentAmount: 24500000,
      description: "Quyên góp áo ấm, chăn bông, sách vở và quà Tết trao tặng các em học sinh và bà con có hoàn cảnh khó khăn tại vùng cao Thanh Hóa.",
      updatedAt: "18/10/2026",
    },
    fundDonations: [
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
    ],
    notes: [],
    confessions: [],
  };

  await sql`
    INSERT INTO site_data (key, data, updated_by, updated_at)
    VALUES ('full_site_payload', ${JSON.stringify(initialPayload)}, 'Khởi tạo hệ thống (BCH BLLSV TMU)', NOW())
    ON CONFLICT (key) DO UPDATE
    SET data = EXCLUDED.data,
        updated_by = EXCLUDED.updated_by,
        updated_at = EXCLUDED.updated_at
  `;

  console.log("SUCCESS! site_data has been initialized in Neon PostgreSQL.");
}

main().catch(console.error);
