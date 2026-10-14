import React from "react";
import { Button } from "@/components/ui";
import { type AdminRule } from "@/data/adminStore";

interface AdminRulesTabProps {
  rulesData: AdminRule;
  onRulesDataChange: (data: AdminRule) => void;
  newRuleItem: string;
  onNewRuleItemChange: (val: string) => void;
  editingRuleIndex: number | null;
  editingRuleText: string;
  onEditingRuleTextChange: (val: string) => void;
  onAddRuleItem: () => void;
  onStartEditRule: (idx: number, text: string) => void;
  onSaveEditRule: () => void;
  onCancelEditRule: () => void;
  onDeleteRuleItem: (idx: number) => void;
  onSaveRulesHeader: (e: React.FormEvent) => void;
}

export default function AdminRulesTab({
  rulesData,
  onRulesDataChange,
  newRuleItem,
  onNewRuleItemChange,
  editingRuleIndex,
  editingRuleText,
  onEditingRuleTextChange,
  onAddRuleItem,
  onStartEditRule,
  onSaveEditRule,
  onCancelEditRule,
  onDeleteRuleItem,
  onSaveRulesHeader,
}: AdminRulesTabProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-cobalt-100 bg-cobalt-50/40 p-4 sm:p-5">
        <h4 className="font-display text-sm font-extrabold text-cobalt-950 sm:text-base">
          Ban Hành &amp; Cập Nhật Thông Báo Nội Quy Mới
        </h4>
        <p className="mt-0.5 text-xs text-cobalt-600">
          Điều chỉnh nội quy, quy chế sinh hoạt, tác phong và kỷ luật tình nguyện viên của nhà chung.
        </p>

        <form onSubmit={onSaveRulesHeader} className="mt-4 space-y-3">
          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tiêu đề thông báo nội quy *</label>
            <input
              required
              value={rulesData.title}
              onChange={(e) => onRulesDataChange({ ...rulesData, title: e.target.value })}
              className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-bold text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Thời gian hiệu lực</label>
              <input
                value={rulesData.effectiveDate}
                onChange={(e) => onRulesDataChange({ ...rulesData, effectiveDate: e.target.value })}
                placeholder="Áp dụng từ năm học 2026 – 2027"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-bold text-cobalt-800">Cơ quan ban hành</label>
              <input
                value={rulesData.issuedBy}
                onChange={(e) => onRulesDataChange({ ...rulesData, issuedBy: e.target.value })}
                placeholder="Ban Chấp Hành & Đội Trưởng Đội SVTN"
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold text-cobalt-800">Tóm tắt mục đích &amp; yêu cầu</label>
            <textarea
              rows={2}
              value={rulesData.summary}
              onChange={(e) => onRulesDataChange({ ...rulesData, summary: e.target.value })}
              className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
            />
          </div>

          <div className="flex justify-end pt-1">
            <Button variant="flame" type="submit">
              💾 Lưu thông tin tiêu đề nội quy
            </Button>
          </div>
        </form>
      </div>

      {/* Danh sách các điều khoản nội quy */}
      <div className="rounded-2xl border border-cobalt-100 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 border-b border-cobalt-100">
          <div>
            <h4 className="font-display text-sm font-bold text-cobalt-900">
              Các điều khoản nội quy hiện hành ({rulesData.rules.length})
            </h4>
            <p className="text-[11.5px] text-cobalt-500">Mỗi điều khoản được hiển thị rõ ràng trên mục Nội Quy Nhà Chung</p>
          </div>
        </div>

        {/* Thêm điều khoản mới */}
        <div className="mt-4 flex gap-2">
          <input
            value={newRuleItem}
            onChange={(e) => onNewRuleItemChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddRuleItem();
              }
            }}
            placeholder="Nhập nội dung điều khoản mới (VD: Quy định về bảo mật hình ảnh...)"
            className="flex-1 rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
          />
          <Button variant="flame" onClick={onAddRuleItem}>
            + Thêm điều
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {rulesData.rules.map((rule, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-3 rounded-xl border border-cobalt-100 bg-cobalt-50/50 p-3 text-xs"
            >
              <div className="flex items-start gap-2.5 flex-1 min-w-0">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tmu-600 text-[10.5px] font-bold text-white">
                  {idx + 1}
                </span>
                {editingRuleIndex === idx ? (
                  <div className="flex-1 space-y-2">
                    <textarea
                      rows={2}
                      value={editingRuleText}
                      onChange={(e) => onEditingRuleTextChange(e.target.value)}
                      className="w-full rounded-lg border border-cobalt-300 p-2 text-xs font-medium text-cobalt-950 outline-none focus:border-flame-500"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={onSaveEditRule}
                        className="rounded bg-flame-600 px-2 py-1 text-[11px] font-bold text-white hover:bg-flame-700"
                      >
                        Lưu
                      </button>
                      <button
                        type="button"
                        onClick={onCancelEditRule}
                        className="rounded bg-cobalt-200 px-2 py-1 text-[11px] font-bold text-cobalt-800 hover:bg-cobalt-300"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium text-cobalt-900 leading-relaxed">{rule}</p>
                )}
              </div>
              {editingRuleIndex !== idx && (
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onStartEditRule(idx, rule)}
                    className="text-cobalt-600 hover:text-cobalt-900 text-xs p-1 font-semibold"
                    title="Sửa điều khoản"
                  >
                    ✏️
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteRuleItem(idx)}
                    className="text-red-500 hover:text-red-700 text-xs shrink-0 font-bold p-1"
                    title="Xóa điều khoản này"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
