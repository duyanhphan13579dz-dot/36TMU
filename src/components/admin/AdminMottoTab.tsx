import React from "react";
import { Button } from "@/components/ui";
import { DEFAULT_MOTTO, saveStoredAdminMotto, type AdminMotto } from "@/data/adminStore";

interface AdminMottoTabProps {
  motto: AdminMotto;
  onMottoChange: (motto: AdminMotto) => void;
  onSaveMotto: (e: React.FormEvent) => void;
  onToast: (msg: string) => void;
  onPostCreated?: () => void;
}

export default function AdminMottoTab({
  motto,
  onMottoChange,
  onSaveMotto,
  onToast,
  onPostCreated,
}: AdminMottoTabProps) {
  return (
    <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
      <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
        Cập Nhật Châm Ngôn Hoạt Động &amp; Slogan Của BCH
      </h4>
      <p className="mt-0.5 text-xs text-cobalt-600">
        Châm ngôn sẽ được cập nhật đồng bộ lên toàn bộ website: dải Divider trang chủ, mục Tinh thần 36 và Footer.
      </p>

      <form onSubmit={onSaveMotto} className="mt-4 space-y-3.5">
        <div>
          <label className="mb-1 block text-xs font-bold text-cobalt-800">
            Châm ngôn / Slogan hoạt động chính thức *
          </label>
          <textarea
            required
            rows={2}
            value={motto.slogan}
            onChange={(e) => onMottoChange({ ...motto, slogan: e.target.value })}
            className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-bold text-cobalt-950 outline-none focus:border-flame-500"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhiệm kỳ áp dụng</label>
            <input
              value={motto.term}
              onChange={(e) => onMottoChange({ ...motto, term: e.target.value })}
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
            onChange={(e) => onMottoChange({ ...motto, meaning: e.target.value })}
            placeholder="Thông điệp truyền cảm hứng cho các thế hệ tình nguyện viên..."
            className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              onMottoChange(DEFAULT_MOTTO);
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
  );
}
