import { useState, useEffect, type FormEvent } from "react";
import { Button, useLockScroll, useEscape } from "@/components/ui";
import {
  getStoredRecruitment,
  addVolunteerApplication,
  type RecruitmentCampaign,
  type VolunteerApplication,
} from "@/data/adminStore";

interface VolunteerRecruitmentModalProps {
  open: boolean;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export default function VolunteerRecruitmentModal({
  open,
  onClose,
  onToast,
}: VolunteerRecruitmentModalProps) {
  const [campaign, setCampaign] = useState<RecruitmentCampaign>(getStoredRecruitment());
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [cohort, setCohort] = useState("K61");
  const [major, setMajor] = useState("");
  const [hometown, setHometown] = useState("");
  const [targetDept, setTargetDept] = useState<VolunteerApplication["targetDept"]>("Ban Truyền thông");
  const [skills, setSkills] = useState("");
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useLockScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      setCampaign(getStoredRecruitment());
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addVolunteerApplication({
        fullName: fullName.trim(),
        phone: phone.trim(),
        cohort,
        major: major.trim(),
        hometown: hometown.trim(),
        targetDept,
        skills: skills.trim(),
        reason: reason.trim(),
      });

      onToast("🎉 Nộp đơn ứng tuyển thành công! Ban Hậu cần & Đội SVTN sẽ liên hệ phỏng vấn sớm nhất.");
      // Reset form
      setFullName("");
      setPhone("");
      setMajor("");
      setHometown("");
      setSkills("");
      setReason("");
      onClose();
    } catch {
      onToast("Có lỗi xảy ra khi gửi đơn, vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-5 shadow-lift sm:p-7">
        <button
          onClick={onClose}
          aria-label="Đóng cửa sổ"
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-cobalt-100 text-cobalt-700 transition hover:bg-cobalt-200"
        >
          ✕
        </button>

        <div className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-flame-100 text-xl font-bold text-flame-600">
            💙
          </span>
          <div>
            <h3 className="font-display text-base font-black text-cobalt-950 sm:text-lg">
              Đăng Ký Gia Nhập Nhà Chung 36
            </h3>
            <p className="text-xs text-cobalt-600">
              Đội Sinh Viên Tình Nguyện • Trường ĐH Thương Mại
            </p>
          </div>
        </div>

        <div className="mt-3.5 rounded-2xl border border-flame-100 bg-flame-50/60 p-3.5 text-xs text-cobalt-800">
          <p className="font-bold text-flame-900">{campaign.title}</p>
          <p className="mt-1 text-[11.5px] leading-relaxed text-cobalt-700">
            {campaign.description}
          </p>
          {campaign.deadline && (
            <p className="mt-1.5 text-[11px] font-semibold text-flame-700">
              ⏰ Hạn chót nhận đơn: <strong>{campaign.deadline}</strong>
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Họ và Tên *</label>
              <input
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="VD: Lê Thị Mai Linh"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Số điện thoại (Zalo) *</label>
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0388 xxx xxx"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Khóa TMU *</label>
              <select
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              >
                <option value="K62">K62 (Tân sinh viên)</option>
                <option value="K61">K61</option>
                <option value="K60">K60</option>
                <option value="K59">K59</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Chuyên ngành học tại TMU *</label>
              <input
                required
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="VD: Thương mại điện tử, Marketing..."
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Quê quán (Huyện / Thị xã Thanh Hóa) *</label>
            <input
              required
              value={hometown}
              onChange={(e) => setHometown(e.target.value)}
              placeholder="VD: Huyện Hoằng Hóa, Huyện Đông Sơn, TP. Sầm Sơn..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-bold text-cobalt-800">
              Nguyện vọng gia nhập Ban chuyên môn *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  id: "Ban Truyền thông",
                  label: "Ban Truyền thông",
                  desc: "Chụp ảnh, quay video, viết bài, TikTok",
                  color: "border-sky-300 hover:bg-sky-50",
                },
                {
                  id: "Ban Văn hóa – Sự kiện",
                  label: "Ban Văn hóa – Sự kiện",
                  desc: "Nhảy, múa, hát, MC, lên lịch sự kiện",
                  color: "border-purple-300 hover:bg-purple-50",
                },
                {
                  id: "Ban Hậu cần",
                  label: "Ban Hậu cần",
                  desc: "Chuẩn bị đồ, cơ sở vật chất, gây quỹ",
                  color: "border-amber-300 hover:bg-amber-50",
                },
              ].map((b) => (
                <button
                  type="button"
                  key={b.id}
                  onClick={() => setTargetDept(b.id as VolunteerApplication["targetDept"])}
                  className={`rounded-xl border p-2.5 text-left transition ${
                    targetDept === b.id
                      ? "border-flame-500 bg-flame-50/70 shadow-xs ring-1 ring-flame-500"
                      : "border-cobalt-200 bg-white hover:bg-cobalt-50"
                  }`}
                >
                  <p className="font-bold text-[11.5px] text-cobalt-950">{b.label}</p>
                  <p className="mt-0.5 text-[10px] text-cobalt-600 line-clamp-2">{b.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Kỹ năng / Sở trường</label>
            <input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="VD: Biết chụp ảnh, đàn guitar, nhiệt tình, có bằng lái xe..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Lý do mong muốn tham gia Nhà chung 36 *</label>
            <textarea
              required
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Chia sẻ lý do bạn muốn gắn bó cùng Đội SVTN Thanh Hóa TMU..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="pt-2">
            <Button variant="flame" className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi đơn..." : "Gửi Đơn Ứng Tuyển Ngay 🚀"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
