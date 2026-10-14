import React from "react";
import { cn } from "@/utils/cn";
import { type DbAuditLog } from "@/lib/db";

interface AdminAuditTabProps {
  auditLogs: DbAuditLog[];
  isLoading: boolean;
  onRefresh: () => void;
}

export default function AdminAuditTab({ auditLogs, isLoading, onRefresh }: AdminAuditTabProps) {
  const getActionBadge = (act: string) => {
    if (act.includes("CREATE")) return "bg-emerald-100 text-emerald-800 border-emerald-200";
    if (act.includes("DELETE") || act.includes("RESET")) return "bg-red-100 text-red-800 border-red-200";
    if (act.includes("UPDATE") || act.includes("PIN")) return "bg-sky-100 text-sky-800 border-sky-200";
    return "bg-amber-100 text-amber-800 border-amber-200";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cobalt-100 bg-cobalt-50/50 p-4">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
              📜 Lịch Sử Hoạt Động &amp; Thay Đổi (Audit Logs)
            </h4>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10.5px] font-bold text-emerald-800">
              Neon PostgreSQL
            </span>
          </div>
          <p className="mt-0.5 text-xs text-cobalt-600">
            Ghi nhận minh bạch mọi thao tác đăng nhập, chỉnh sửa nội dung, xóa bài viết hoặc đồng bộ dữ liệu của Ban Chấp Hành.
          </p>
        </div>
        <button
          type="button"
          disabled={isLoading}
          onClick={onRefresh}
          className="flex items-center gap-1.5 rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs font-bold text-cobalt-800 shadow-2xs hover:bg-cobalt-50 transition active:scale-95 disabled:opacity-50"
        >
          <span>🔄</span>
          {isLoading ? "Đang tải..." : "Làm mới lịch sử"}
        </button>
      </div>

      {/* Bảng danh sách Audit Log */}
      <div className="overflow-hidden rounded-2xl border border-cobalt-100 bg-white shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-cobalt-100 bg-cobalt-50/70 text-[11px] font-bold text-cobalt-700 uppercase">
              <tr>
                <th className="px-4 py-3">Thời gian</th>
                <th className="px-4 py-3">Quản trị viên</th>
                <th className="px-4 py-3">Hành động</th>
                <th className="px-4 py-3">Chuyên mục</th>
                <th className="px-4 py-3">Nội dung thay đổi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cobalt-100">
              {auditLogs.length > 0 ? (
                auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-cobalt-50/40 transition">
                    <td className="px-4 py-3 text-cobalt-600 font-mono text-[11px] whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString("vi-VN")}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-cobalt-950">{log.admin_name}</p>
                      <p className="text-[10px] text-cobalt-500 font-mono">{log.admin_id || "root"}</p>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={cn("inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase", getActionBadge(log.action_type))}>
                        {log.action_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-cobalt-800 uppercase text-[10.5px]">
                      {log.target_entity}
                    </td>
                    <td className="px-4 py-3 text-cobalt-900 leading-relaxed font-medium">
                      {log.summary}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-cobalt-500">
                    Chưa có nhật ký hoạt động nào được ghi nhận.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
