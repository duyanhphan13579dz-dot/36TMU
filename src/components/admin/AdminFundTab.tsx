import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui";
import {
  saveStoredFundCampaign,
  addFundDonation,
  deleteFundDonation,
  type FundCampaign,
  type FundDonation,
} from "@/data/adminStore";

interface AdminFundTabProps {
  campaign: FundCampaign;
  donations: FundDonation[];
  onCampaignChange: (camp: FundCampaign) => void;
  onDonationsChange: (donations: FundDonation[]) => void;
  onToast: (msg: string) => void;
  userDept?: string;
}

export default function AdminFundTab({
  campaign,
  donations,
  onCampaignChange,
  onDonationsChange,
  onToast,
}: AdminFundTabProps) {
  // Form chiến dịch
  const [campData, setCampData] = useState<FundCampaign>(campaign);

  // Form thêm khoản ủng hộ mới
  const [donorName, setDonorName] = useState("");
  const [cohortOrOrg, setCohortOrOrg] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [program, setProgram] = useState("Đông Ấm 2026");
  const [note, setNote] = useState("");

  const handleSaveCampaign = (e: FormEvent) => {
    e.preventDefault();
    const updated = {
      ...campData,
      updatedAt: new Date().toLocaleDateString("vi-VN"),
    };
    onCampaignChange(updated);
    saveStoredFundCampaign(updated);
    onToast("Đã lưu mục tiêu gây quỹ chiến dịch!");
  };

  const handleAddDonation = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      onToast("Vui lòng nhập số tiền hợp lệ!");
      return;
    }
    const newDonation = {
      donorName: donorName.trim(),
      cohortOrOrg: cohortOrOrg.trim() || undefined,
      amount: Number(amount),
      program: program.trim(),
      note: note.trim() || undefined,
      date: new Date().toLocaleDateString("vi-VN"),
    };
    addFundDonation(newDonation);

    // Update parent state
    const updatedDonations = [
      { ...newDonation, id: "fund-" + Date.now() },
      ...donations,
    ];
    onDonationsChange(updatedDonations);

    const updatedCamp = {
      ...campData,
      currentAmount: campData.currentAmount + Number(amount),
      updatedAt: new Date().toLocaleDateString("vi-VN"),
    };
    setCampData(updatedCamp);
    onCampaignChange(updatedCamp);

    // Reset form
    setDonorName("");
    setCohortOrOrg("");
    setAmount("");
    setNote("");
    onToast("Đã ghi nhận khoản ủng hộ vào sổ quỹ minh bạch!");
  };

  const handleDeleteDonation = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc muốn xóa khoản đóng góp của "${name}"?`)) {
      deleteFundDonation(id);
      const deleted = donations.find((d) => d.id === id);
      const updated = donations.filter((d) => d.id !== id);
      onDonationsChange(updated);

      if (deleted) {
        const updatedCamp = {
          ...campData,
          currentAmount: Math.max(0, campData.currentAmount - deleted.amount),
        };
        setCampData(updatedCamp);
        onCampaignChange(updatedCamp);
      }
      onToast("Đã xóa khoản đóng góp!");
    }
  };

  const percent = Math.min(
    100,
    Math.round((campData.currentAmount / (campData.targetAmount || 1)) * 100)
  );

  const handleExportCSV = () => {
    if (donations.length === 0) {
      onToast("Chưa có danh sách ủng hộ để xuất!");
      return;
    }
    const headers = [
      "STT",
      "Người ủng hộ / Đơn vị",
      "Khóa / Chi hội",
      "Số tiền (VNĐ)",
      "Chương trình",
      "Ghi chú",
      "Ngày ghi nhận",
    ];
    const rows = donations.map((d, idx) => [
      idx + 1,
      `"${d.donorName.replace(/"/g, '""')}"`,
      `"${(d.cohortOrOrg || "").replace(/"/g, '""')}"`,
      d.amount,
      `"${d.program.replace(/"/g, '""')}"`,
      `"${(d.note || "").replace(/"/g, '""')}"`,
      d.date,
    ]);

    const csvContent =
      "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sao_Ke_Quy_Tinh_Nguyen_36TMU_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    onToast("Đã xuất sao kê quỹ tình nguyện ra file CSV!");
  };

  return (
    <div className="space-y-6">
      {/* Banner giới thiệu */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
              💰 Sổ Quỹ Tình Nguyện &amp; Minh Bạch Thu Chi
            </h4>
            <p className="mt-0.5 text-xs text-cobalt-600">
              Quản trị: <strong>Đội SVTN</strong> giám sát &amp; <strong>Ban Hậu cần</strong> thực thi ghi sổ, sao kê công khai.
            </p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
            Minh Bạch 100%
          </span>
        </div>

        {/* Tiến độ gây quỹ */}
        <div className="mt-4 rounded-xl border border-emerald-200 bg-white p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-bold text-cobalt-900">{campData.programName}</p>
              <p className="text-[11px] text-cobalt-500 mt-0.5">{campData.description}</p>
            </div>
            <div className="text-right">
              <span className="font-display text-base font-extrabold text-emerald-700">
                {campData.currentAmount.toLocaleString("vi-VN")} đ
              </span>
              <span className="text-xs text-cobalt-500">
                {" "}
                / {campData.targetAmount.toLocaleString("vi-VN")} đ ({percent}%)
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Cập nhật Mục tiêu & Thêm khoản ủng hộ */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Cột 1: Cài đặt mục tiêu chiến dịch */}
        <form
          onSubmit={handleSaveCampaign}
          className="rounded-2xl border border-cobalt-100 bg-white p-4 shadow-xs space-y-3"
        >
          <h5 className="text-xs font-extrabold text-cobalt-900 uppercase tracking-wider">
            ⚙️ Cài đặt mục tiêu chiến dịch
          </h5>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tên chiến dịch *</label>
            <input
              required
              value={campData.programName}
              onChange={(e) => setCampData({ ...campData, programName: e.target.value })}
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Mục tiêu (VNĐ) *</label>
              <input
                required
                type="number"
                value={campData.targetAmount}
                onChange={(e) => setCampData({ ...campData, targetAmount: Number(e.target.value) })}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Số tiền hiện có (VNĐ)</label>
              <input
                type="number"
                value={campData.currentAmount}
                onChange={(e) => setCampData({ ...campData, currentAmount: Number(e.target.value) })}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Mô tả mục đích gây quỹ</label>
            <textarea
              rows={2}
              value={campData.description}
              onChange={(e) => setCampData({ ...campData, description: e.target.value })}
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button variant="cobalt" size="sm" type="submit">
              💾 Lưu Mục Tiêu
            </Button>
          </div>
        </form>

        {/* Cột 2: Ghi nhận khoản ủng hộ mới */}
        <form
          onSubmit={handleAddDonation}
          className="rounded-2xl border border-cobalt-100 bg-white p-4 shadow-xs space-y-3"
        >
          <h5 className="text-xs font-extrabold text-cobalt-900 uppercase tracking-wider">
            ➕ Ghi nhận khoản ủng hộ / tài trợ
          </h5>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Tên người ủng hộ / Đơn vị *</label>
              <input
                required
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="VD: Anh Lê Văn Tuấn / Cựu SV K55"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Khóa / Chi hội / Đơn vị</label>
              <input
                value={cohortOrOrg}
                onChange={(e) => setCohortOrOrg(e.target.value)}
                placeholder="VD: K58 TMU, Doanh nghiệp X"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Số tiền ủng hộ (VNĐ) *</label>
              <input
                required
                type="number"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="VD: 1000000"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chương trình tiếp nhận</label>
              <input
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                placeholder="VD: Đông Ấm 2026 / Mùa Hè Xanh"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Lời nhắn / Ghi chú</label>
            <input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="VD: Chúc chiến dịch thành công rực rỡ..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button variant="flame" size="sm" type="submit">
              ➕ Ghi Vào Sổ Quỹ
            </Button>
          </div>
        </form>
      </div>

      {/* Bảng danh sách ủng hộ sao kê */}
      <div className="rounded-2xl border border-cobalt-100 bg-white p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h5 className="font-display text-sm font-bold text-cobalt-950">
            Danh Sách Các Khoản Đóng Góp ({donations.length})
          </h5>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            📥 Xuất Sao Kê (CSV)
          </Button>
        </div>

        {donations.length === 0 ? (
          <div className="p-8 text-center text-xs text-cobalt-500">
            Chưa có khoản ủng hộ nào được ghi nhận.
          </div>
        ) : (
          <div className="divide-y divide-cobalt-100 overflow-hidden rounded-xl border border-cobalt-100">
            {donations.map((d) => (
              <div
                key={d.id}
                className="flex items-center justify-between p-3 transition hover:bg-cobalt-50/50"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-cobalt-950">{d.donorName}</span>
                    {d.cohortOrOrg && (
                      <span className="rounded-md bg-cobalt-100 px-1.5 py-0.5 text-[10px] font-semibold text-cobalt-700">
                        {d.cohortOrOrg}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-cobalt-500 mt-0.5">
                    {d.program} • Ngày: {d.date} {d.note && `• "${d.note}"`}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-display text-sm font-extrabold text-emerald-700">
                    +{d.amount.toLocaleString("vi-VN")} đ
                  </span>
                  <button
                    onClick={() => handleDeleteDonation(d.id, d.donorName)}
                    className="text-xs text-rose-500 hover:text-rose-700"
                    title="Xóa khoản đóng góp"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
