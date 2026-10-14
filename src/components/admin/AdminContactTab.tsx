import type { FormEvent } from "react";
import { Button } from "@/components/ui";
import { DEFAULT_CONTACT, saveStoredAdminContact, type AdminContact } from "@/data/adminStore";

interface AdminContactTabProps {
  contactData: AdminContact;
  onContactDataChange: (data: AdminContact) => void;
  onSaveContact: (e: FormEvent) => void;
  onToast: (msg: string) => void;
  onPostCreated?: () => void;
}

export default function AdminContactTab({
  contactData,
  onContactDataChange,
  onSaveContact,
  onToast,
  onPostCreated,
}: AdminContactTabProps) {
  return (
    <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
      <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
        📞 Quản Lý Thông Tin Liên Hệ &amp; Mạng Xã Hội
      </h4>
      <p className="mt-0.5 text-xs text-cobalt-600">
        Thông tin được đồng bộ tự động tới khối Liên hệ, Chân trang (Footer) và các nút mạng xã hội.
      </p>

      <form onSubmit={onSaveContact} className="mt-4 space-y-3.5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Hotline Ban Nhân sự *</label>
            <input
              required
              value={contactData.phone}
              onChange={(e) => onContactDataChange({ ...contactData, phone: e.target.value })}
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
              onChange={(e) => onContactDataChange({ ...contactData, email: e.target.value })}
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
            onChange={(e) => onContactDataChange({ ...contactData, address: e.target.value })}
            placeholder="79 Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội"
            className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-bold text-cobalt-800">Lịch sinh hoạt &amp; tập nhảy định kỳ</label>
          <input
            value={contactData.scheduleInfo}
            onChange={(e) => onContactDataChange({ ...contactData, scheduleInfo: e.target.value })}
            placeholder="19:00 – 21:00 tối thứ Ba hàng tuần"
            className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link Facebook Fanpage</label>
            <input
              value={contactData.fanpage}
              onChange={(e) => onContactDataChange({ ...contactData, fanpage: e.target.value })}
              placeholder="https://facebook.com/..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link Group Cộng Đồng</label>
            <input
              value={contactData.group}
              onChange={(e) => onContactDataChange({ ...contactData, group: e.target.value })}
              placeholder="https://facebook.com/groups/..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Link Kênh TikTok</label>
            <input
              value={contactData.tiktok}
              onChange={(e) => onContactDataChange({ ...contactData, tiktok: e.target.value })}
              placeholder="https://tiktok.com/@..."
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              onContactDataChange(DEFAULT_CONTACT);
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
  );
}
