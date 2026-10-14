import { type TnvNote } from "@/components/TnvNoteBoard";

interface AdminNotesTabProps {
  notes: TnvNote[];
  onTogglePinNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export default function AdminNotesTab({
  notes,
  onTogglePinNote,
  onDeleteNote,
}: AdminNotesTabProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-cobalt-600">
        Danh sách các ghi chú, lời nhắn do các bạn TNV gửi lên bảng. Bạn có thể xóa hoặc ghim note lên đầu.
      </p>

      <div className="max-h-[380px] space-y-2.5 overflow-y-auto pr-1">
        {notes.length === 0 ? (
          <p className="py-8 text-center text-xs text-cobalt-500">Chưa có ghi chú nào từ TNV.</p>
        ) : (
          notes.map((n) => (
            <div
              key={n.id}
              className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-cobalt-50/60 p-3 text-xs"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cobalt-950">{n.author}</span>
                  <span className="rounded bg-cobalt-200 px-1.5 py-0.5 text-[10px] font-semibold text-cobalt-800">
                    {n.department}
                  </span>
                  {n.pinned && (
                    <span className="rounded bg-flame-500 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                      Đã ghim
                    </span>
                  )}
                </div>
                <p className="mt-1 leading-relaxed text-cobalt-800">{n.content}</p>
                <span className="mt-1 block text-[10px] text-cobalt-500">{n.createdAt}</span>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onTogglePinNote(n.id)}
                  title={n.pinned ? "Bỏ ghim" : "Ghim note"}
                  className="rounded-lg border border-cobalt-200 bg-white p-1.5 hover:bg-flame-50"
                >
                  📌
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote(n.id)}
                  title="Xóa note"
                  className="rounded-lg border border-red-200 bg-white p-1.5 text-red-600 hover:bg-red-50"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
