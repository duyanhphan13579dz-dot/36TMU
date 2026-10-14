import type { ChangeEvent, FormEvent, RefObject } from "react";
import { Button } from "@/components/ui";

interface AdminSettingsTabProps {
  oldPinInput: string;
  onOldPinChange: (val: string) => void;
  newPinInput: string;
  onNewPinChange: (val: string) => void;
  confirmPinInput: string;
  onConfirmPinChange: (val: string) => void;
  showPinSettings: boolean;
  onToggleShowPinSettings: () => void;
  onChangePassword: (e: FormEvent) => void;
  onResetPinQuick: () => void;
  onExportData: () => void;
  onImportFile: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  isSyncingCloud: boolean;
  onCloudSyncPush: () => void;
  onCloudSyncPull: () => void;
  onResetAllData: () => void;
}

export default function AdminSettingsTab({
  oldPinInput,
  onOldPinChange,
  newPinInput,
  onNewPinChange,
  confirmPinInput,
  onConfirmPinChange,
  showPinSettings,
  onToggleShowPinSettings,
  onChangePassword,
  onResetPinQuick,
  onExportData,
  onImportFile,
  fileInputRef,
  isSyncingCloud,
  onCloudSyncPush,
  onCloudSyncPull,
  onResetAllData,
}: AdminSettingsTabProps) {
  return (
    <div className="space-y-6">
      {/* KHỐI 1: ĐỔI MẬT KHẨU ADMIN */}
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-flame-100 text-sm">
            🔐
          </span>
          <div>
            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
              Đổi Mật Khẩu Quản Trị Viên (Admin PIN)
            </h4>
            <p className="text-xs text-cobalt-600">
              Bảo vệ bảng quản trị với mật khẩu riêng của Ban Chủ Nhiệm / BCH.
            </p>
          </div>
        </div>

        <form onSubmit={onChangePassword} className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Mật khẩu hiện tại *</label>
              <input
                required
                type={showPinSettings ? "text" : "password"}
                value={oldPinInput}
                onChange={(e) => onOldPinChange(e.target.value)}
                placeholder="Nhập mật khẩu đang dùng"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Mật khẩu mới *</label>
              <input
                required
                type={showPinSettings ? "text" : "password"}
                value={newPinInput}
                onChange={(e) => onNewPinChange(e.target.value)}
                placeholder="Tối thiểu 3 ký tự"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Nhập lại mật khẩu mới *</label>
              <input
                required
                type={showPinSettings ? "text" : "password"}
                value={confirmPinInput}
                onChange={(e) => onConfirmPinChange(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <label className="flex items-center gap-2 text-xs text-cobalt-600 cursor-pointer">
              <input
                type="checkbox"
                checked={showPinSettings}
                onChange={onToggleShowPinSettings}
                className="rounded text-flame-600 focus:ring-flame-500"
              />
              <span>Hiển thị mật khẩu khi nhập</span>
            </label>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onResetPinQuick}
                className="rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-semibold text-cobalt-700 hover:bg-cobalt-50"
              >
                Đặt lại 36tmu
              </button>
              <Button variant="flame" type="submit">
                🔐 Cập nhật mật khẩu mới
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* KHỐI 2: SAO LƯU & KHÔI PHỤC DỮ LIỆU */}
      <div className="rounded-2xl border border-cobalt-100 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-tmu-100 text-sm">
            💾
          </span>
          <div>
            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
              Sao Lưu &amp; Khôi Phục Dữ Liệu Toàn Hệ Thống
            </h4>
            <p className="text-xs text-cobalt-600">
              Xuất toàn bộ bài viết, sự kiện, BCH, liên hệ thành file JSON để lưu trữ hoặc chuyển sang máy khác.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4">
            <h5 className="text-xs font-bold text-cobalt-900">📥 Xuất Tệp Sao Lưu (Export)</h5>
            <p className="mt-1 text-[11.5px] text-cobalt-600">
              Tải về tệp <code className="font-mono text-cobalt-800">.json</code> chứa toàn bộ nội dung mà quản trị viên đã tạo.
            </p>
            <Button variant="primary" className="mt-3 w-full" onClick={onExportData}>
              📥 Tải về file sao lưu JSON
            </Button>
          </div>

          <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4">
            <h5 className="text-xs font-bold text-cobalt-900">📤 Nhập Tệp Khôi Phục (Import)</h5>
            <p className="mt-1 text-[11.5px] text-cobalt-600">
              Chọn file sao lưu JSON đã lưu từ trước để nạp lại đầy đủ dữ liệu lên trang web.
            </p>
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={onImportFile}
              className="hidden"
            />
            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              📤 Chọn tệp sao lưu JSON để nạp
            </Button>
          </div>
        </div>

        {/* KHỐI 3: ĐỒNG BỘ ĐÁM MÂY NEON POSTGRESQL (CLOUD SYNC) */}
        <div className="mt-6 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-sky-50/40 p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-100 text-sm">
                ☁️
              </span>
              <div>
                <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
                  Đồng Bộ Đám Mây Neon Serverless PostgreSQL
                </h4>
                <p className="text-xs text-cobalt-600">
                  Lưu trữ dữ liệu toàn trang lên cơ sở dữ liệu Neon PostgreSQL để các thành viên BCH truy cập trên mọi thiết bị.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800">
              🟢 Neon Connected
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={isSyncingCloud}
              onClick={onCloudSyncPush}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
            >
              <span>🚀</span>
              {isSyncingCloud ? "Đang đồng bộ..." : "Đẩy Dữ Liệu Lên Đám Mây (Cloud Push)"}
            </button>
            <button
              type="button"
              disabled={isSyncingCloud}
              onClick={onCloudSyncPull}
              className="flex items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-2.5 text-xs font-bold text-indigo-700 shadow-2xs transition hover:bg-indigo-50 active:scale-95 disabled:opacity-50"
            >
              <span>📥</span>
              {isSyncingCloud ? "Đang tải về..." : "Kéo Dữ Liệu Mới Nhất Về Máy (Cloud Pull)"}
            </button>
          </div>
        </div>

        {/* Nút Reset toàn bộ */}
        <div className="mt-6 flex flex-col gap-2 rounded-2xl border border-red-200 bg-red-50/50 p-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold text-red-900">⚠️ Vùng nguy hiểm: Làm sạch dữ liệu</p>
            <p className="text-[11px] text-red-700">
              Xóa toàn bộ các bài đăng, chương trình, nhân sự tùy chỉnh và đưa tất cả về mặc định chuẩn ban đầu.
            </p>
          </div>
          <button
            type="button"
            onClick={onResetAllData}
            className="rounded-xl border border-red-300 bg-white px-3.5 py-1.5 text-xs font-bold text-red-600 shadow-2xs hover:bg-red-600 hover:text-white transition shrink-0"
          >
            Khôi phục toàn bộ về gốc
          </button>
        </div>
      </div>
    </div>
  );
}
