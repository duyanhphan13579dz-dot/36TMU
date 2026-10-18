import { useState, useEffect } from "react";
import { getStoredAdminBroadcast, type AdminBroadcast } from "@/data/adminStore";

export default function BroadcastBanner() {
  const [broadcast, setBroadcast] = useState<AdminBroadcast>(getStoredAdminBroadcast());
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setBroadcast(getStoredAdminBroadcast());
      setDismissed(false);
    };
    window.addEventListener("bllsv_data_updated", handleUpdate);
    return () => window.removeEventListener("bllsv_data_updated", handleUpdate);
  }, []);

  if (!broadcast.enabled || dismissed) return null;

  const bgClass =
    broadcast.type === "emergency"
      ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white"
      : broadcast.type === "warning"
      ? "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950"
      : broadcast.type === "success"
      ? "bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white"
      : "bg-gradient-to-r from-cobalt-950 via-cobalt-900 to-tmu-900 text-white";

  const icon =
    broadcast.type === "emergency"
      ? "🚨"
      : broadcast.type === "warning"
      ? "⚠️"
      : broadcast.type === "success"
      ? "🎉"
      : "📢";

  return (
    <div
      className={`relative z-[110] px-3 py-2 text-xs shadow-md transition-all sm:px-6 ${bgClass}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base shrink-0 animate-bounce">{icon}</span>
          <div className="min-w-0 leading-tight">
            <span className="font-extrabold mr-1.5 underline decoration-white/40 underline-offset-2">
              {broadcast.title}:
            </span>
            <span className="opacity-95 text-[12px]">{broadcast.message}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {broadcast.actionLabel && broadcast.actionLink && (
            <a
              href={broadcast.actionLink}
              className="rounded-lg bg-white/20 px-2.5 py-1 text-[11px] font-bold backdrop-blur-xs transition hover:bg-white hover:text-cobalt-950"
            >
              {broadcast.actionLabel} →
            </a>
          )}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Đóng thông báo"
            className="rounded-md p-1 opacity-70 hover:opacity-100 transition"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
