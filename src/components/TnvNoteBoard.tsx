import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui";

export type TnvNote = {
  id: string;
  author: string;
  department: string;
  content: string;
  color: "amber" | "sky" | "rose" | "emerald";
  createdAt: string;
  pinned?: boolean;
};

const DEFAULT_NOTES: TnvNote[] = [
  {
    id: "note-1",
    author: "Linh Chi – K58",
    department: "Ban Văn hóa – Sự kiện",
    content: "Tối thứ Ba tuần này cả nhà nhớ mang giày thể thao để tập ghép đội hình bài 12 Bước (Vào Đời) ở sân 79 nhé! 🔥",
    color: "amber",
    createdAt: "Hôm nay 14:20",
    pinned: true,
  },
  {
    id: "note-2",
    author: "Thành Đạt – K59",
    department: "Ban Truyền thông",
    content: "Ảnh và video buổi tổng duyệt Âm Vang Xứ Thanh đã up lên Drive nội bộ, các bạn vào check để chọn ảnh nhé 📸",
    color: "sky",
    createdAt: "Hôm qua 19:45",
    pinned: false,
  },
  {
    id: "note-3",
    author: "Hương Giang – K57",
    department: "Ban Hậu cần",
    content: "Chúc chiến dịch Đông Ấm năm nay thành công rực rỡ! Tự hào là một phần của đại gia đình 36 Thương Mại 💙",
    color: "rose",
    createdAt: "12/10/2026",
    pinned: false,
  },
];

const STORAGE_KEY = "bllsv_tnv_notes";

export function getStoredNotes(): TnvNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_NOTES;
  } catch {
    return DEFAULT_NOTES;
  }
}

export function saveStoredNotes(notes: TnvNote[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Ignore storage quota
  }
}

export default function TnvNoteBoard({
  isAdmin = false,
  onToast,
}: {
  isAdmin?: boolean;
  onToast: (msg: string) => void;
}) {
  const [notes, setNotes] = useState<TnvNote[]>([]);
  const [author, setAuthor] = useState("");
  const [department, setDepartment] = useState("Ban Truyền thông");
  const [content, setContent] = useState("");
  const [color, setColor] = useState<TnvNote["color"]>("amber");
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    setNotes(getStoredNotes());
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    const newNote: TnvNote = {
      id: "note-" + Date.now(),
      author: author.trim(),
      department,
      content: content.trim(),
      color,
      createdAt: "Vừa xong",
      pinned: false,
    };

    const next = [newNote, ...notes];
    setNotes(next);
    saveStoredNotes(next);
    setContent("");
    onToast("Đã dán ghi chú lên bảng nhà chung thành công! 📌");
  };

  const handleDeleteNote = (id: string) => {
    const next = notes.filter((n) => n.id !== id);
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã xóa ghi chú khỏi bảng 🗑️");
  };

  const handleTogglePin = (id: string) => {
    const next = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    setNotes(next);
    saveStoredNotes(next);
    onToast("Đã cập nhật trạng thái ghim ghi chú 📌");
  };

  const filteredNotes = notes.filter((n) => {
    if (filter === "all") return true;
    return n.department.includes(filter);
  });

  const colorStyles: Record<TnvNote["color"], { bg: string; border: string; badge: string }> = {
    amber: { bg: "bg-amber-50/90", border: "border-amber-200", badge: "bg-amber-100 text-amber-800" },
    sky: { bg: "bg-sky-50/90", border: "border-sky-200", badge: "bg-sky-100 text-sky-800" },
    rose: { bg: "bg-rose-50/90", border: "border-rose-200", badge: "bg-rose-100 text-rose-800" },
    emerald: { bg: "bg-emerald-50/90", border: "border-emerald-200", badge: "bg-emerald-100 text-emerald-800" },
  };

  return (
    <div className="space-y-6">
      {/* Khung viết note mới */}
      <div className="rounded-3xl border border-cobalt-200 bg-white/95 p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between border-b border-cobalt-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-flame-100 text-lg">📝</span>
            <div>
              <h3 className="font-display text-base font-extrabold text-cobalt-950 sm:text-lg">
                Góc Ghi Chú &amp; Lời Nhắn TNV
              </h3>
              <p className="text-[12px] text-cobalt-600">
                Để lại lưu ý, dặn dò lịch tập hoặc lời nhắn gửi đồng đội nhà chung
              </p>
            </div>
          </div>
          <span className="rounded-full bg-tmu-50 px-2.5 py-1 text-[11px] font-bold text-tmu-700">
            {notes.length} ghi chú
          </span>
        </div>

        <form onSubmit={handleAddNote} className="mt-4 space-y-3.5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[12px] font-bold text-cobalt-800">
                Tên &amp; Khóa của bạn *
              </label>
              <input
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="VD: Hải Anh – K59"
                className="w-full rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-900 outline-none transition focus:border-tmu-400 focus:ring-2 focus:ring-tmu-100"
              />
            </div>

            <div>
              <label className="mb-1 block text-[12px] font-bold text-cobalt-800">
                Ban / Đơn vị
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-900 outline-none transition focus:border-tmu-400 focus:ring-2 focus:ring-tmu-100"
              >
                <option value="Ban Truyền thông">Ban Truyền thông</option>
                <option value="Ban Văn hóa – Sự kiện">Ban Văn hóa – Sự kiện</option>
                <option value="Ban Hậu cần">Ban Hậu cần</option>
                <option value="Đội SVTN / Ban Chủ nhiệm">Đội SVTN / Ban Chủ nhiệm</option>
                <option value="Thành viên nhà chung">Thành viên nhà chung</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12px] font-bold text-cobalt-800">
              Nội dung ghi chú / dặn dò *
            </label>
            <textarea
              required
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Nhập nội dung note: lưu ý lịch tập, chuẩn bị đạo cụ, nhắc nhở đồng đội hoặc lời chúc..."
              className="w-full resize-none rounded-xl border border-cobalt-200 px-3 py-2 text-xs text-cobalt-900 outline-none transition focus:border-tmu-400 focus:ring-2 focus:ring-tmu-100"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-[11.5px] font-semibold text-cobalt-700">Màu giấy:</span>
              {(["amber", "sky", "rose", "emerald"] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={cn(
                    "h-6 w-6 rounded-full border-2 transition-transform active:scale-95",
                    c === "amber" && "bg-amber-300",
                    c === "sky" && "bg-sky-300",
                    c === "rose" && "bg-rose-300",
                    c === "emerald" && "bg-emerald-300",
                    color === c ? "scale-110 border-cobalt-950 shadow-xs" : "border-transparent opacity-70",
                  )}
                />
              ))}
            </div>

            <Button variant="flame" size="sm" type="submit">
              <span>📌</span> Dán ghi chú lên bảng
            </Button>
          </div>
        </form>
      </div>

      {/* Bộ lọc danh sách ghi chú */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cobalt-100 pb-2">
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: "all", label: "Tất cả" },
            { id: "Truyền thông", label: "Truyền thông" },
            { id: "Văn hóa", label: "Văn hóa – SK" },
            { id: "Hậu cần", label: "Hậu cần" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-[11px] font-bold transition",
                filter === f.id
                  ? "bg-cobalt-900 text-white shadow-xs"
                  : "bg-white text-cobalt-700 hover:bg-cobalt-50",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isAdmin && (
          <span className="rounded-lg bg-red-100 px-2 py-0.5 text-[10.5px] font-bold text-red-700">
            Quyền Admin: Có thể xóa &amp; ghim note
          </span>
        )}
      </div>

      {/* Danh sách các sticky notes */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        {filteredNotes.map((note) => {
          const style = colorStyles[note.color] || colorStyles.amber;
          return (
            <div
              key={note.id}
              className={cn(
                "group relative flex flex-col justify-between rounded-2xl border p-4 shadow-xs transition hover:shadow-soft",
                style.bg,
                style.border,
                note.pinned && "ring-2 ring-flame-400/80 shadow-soft",
              )}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className={cn("rounded-md px-2 py-0.5 text-[10px] font-bold", style.badge)}>
                      {note.department}
                    </span>
                    {note.pinned && (
                      <span className="rounded-md bg-flame-500 px-1.5 py-0.5 text-[9.5px] font-extrabold text-white">
                        📌 Đã ghim
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] text-cobalt-500 font-medium">
                    {note.createdAt}
                  </span>
                </div>

                <p className="mt-2.5 text-[13px] leading-relaxed font-medium text-cobalt-950">
                  {note.content}
                </p>
              </div>

              <div className="mt-3.5 flex items-center justify-between border-t border-cobalt-900/10 pt-2 text-[11px]">
                <span className="font-bold text-cobalt-800">
                  👤 {note.author}
                </span>

                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleTogglePin(note.id)}
                      title={note.pinned ? "Bỏ ghim" : "Ghim note lên đầu"}
                      className="rounded p-1 text-cobalt-600 hover:bg-white hover:text-flame-600"
                    >
                      📌
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      title="Xóa ghi chú"
                      className="rounded p-1 text-red-600 hover:bg-white hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
