import { useState } from "react";
import { Button } from "@/components/ui";
import { type TnvNote } from "@/components/TnvNoteBoard";
import { type Confession } from "@/data/content";

interface AdminNotesTabProps {
  notes: TnvNote[];
  confessions: Confession[];
  onAddNote: (note: Omit<TnvNote, "id" | "createdAt">) => void;
  onEditNote?: (id: string, updated: Partial<TnvNote>) => void;
  onTogglePinNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onAddConfession: (confession: Omit<Confession, "id" | "rotate">) => void;
  onEditConfession?: (id: string, updated: Partial<Confession>) => void;
  onDeleteConfession: (id: string) => void;
}

export default function AdminNotesTab({
  notes,
  confessions,
  onAddNote,
  onEditNote,
  onTogglePinNote,
  onDeleteNote,
  onAddConfession,
  onEditConfession,
  onDeleteConfession,
}: AdminNotesTabProps) {
  const [subTab, setSubTab] = useState<"notes" | "confessions">("notes");

  // State cho Form thêm Note của BCH
  const [noteAuthor, setNoteAuthor] = useState("Ban Chấp Hành BLLSV TMU");
  const [noteDept, setNoteDept] = useState("Ban Chấp Hành");
  const [noteContent, setNoteContent] = useState("");
  const [noteColor, setNoteColor] = useState<TnvNote["color"]>("amber");
  const [notePin, setNotePin] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState("");

  // State cho Form thêm Confession
  const [confText, setConfText] = useState("");
  const [confAuthor, setConfAuthor] = useState("");
  const [confRole, setConfRole] = useState("Thành viên Nhà Chung 36");
  const [confTone, setConfTone] = useState<Confession["tone"]>("paper");
  const [editingConfId, setEditingConfId] = useState<string | null>(null);
  const [editingConfText, setEditingConfText] = useState("");

  // Bộ lọc & tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    onAddNote({
      author: noteAuthor.trim() || "Ban Chấp Hành",
      department: noteDept,
      content: noteContent.trim(),
      color: noteColor,
      pinned: notePin,
    });

    setNoteContent("");
  };

  const handleCreateConfessionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confText.trim()) return;

    onAddConfession({
      text: confText.trim(),
      author: confAuthor.trim() || "Ẩn danh (Tình nguyện viên 36)",
      role: confRole.trim() || "Ban Chấp Hành / Đội SVTN",
      tone: confTone,
    });

    setConfText("");
    setConfAuthor("");
  };

  const filteredNotes = notes.filter((n) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      n.content.toLowerCase().includes(q) ||
      n.author.toLowerCase().includes(q) ||
      n.department.toLowerCase().includes(q)
    );
  });

  const filteredConfessions = confessions.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.text.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.role.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* THANH CHUYỂN ĐỔI SUB-TAB: NOTES VS CONFESSIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-cobalt-100 pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSubTab("notes")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              subTab === "notes"
                ? "bg-cobalt-900 text-white shadow-xs"
                : "bg-cobalt-50 text-cobalt-700 hover:bg-cobalt-100"
            }`}
          >
            <span>📌 Bảng Ghi Chú TNV</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px] text-white">
              {notes.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSubTab("confessions")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
              subTab === "confessions"
                ? "bg-flame-500 text-white shadow-xs"
                : "bg-cobalt-50 text-cobalt-700 hover:bg-cobalt-100"
            }`}
          >
            <span>💌 Hòm Thư Confession</span>
            <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[10px] text-white">
              {confessions.length}
            </span>
          </button>
        </div>

        <div className="w-full sm:w-56">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={subTab === "notes" ? "🔍 Tìm note theo tên, lời nhắn..." : "🔍 Tìm confession, tác giả..."}
            className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-1.5 text-xs text-cobalt-950 outline-none focus:border-flame-500"
          />
        </div>
      </div>

      {/* ===================== PHẦN 1: QUẢN LÝ GHI CHÚ TNV ===================== */}
      {subTab === "notes" && (
        <div className="space-y-5">
          {/* Form đăng ghi chú chính thức từ Ban Chấp Hành */}
          <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-4">
            <h4 className="font-display text-sm font-bold text-amber-950">
              📌 Dán Lời Nhắn / Ghi Chú Mới Từ Ban Chấp Hành Lên Bảng
            </h4>
            <p className="mt-0.5 text-xs text-amber-800">
              Gửi thông báo nhanh, lời động viên hoặc nhắc nhở lịch sinh hoạt trực tiếp đến toàn thể tình nguyện viên.
            </p>

            <form onSubmit={handleCreateNoteSubmit} className="mt-3.5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-cobalt-800 mb-1">Người đăng *</label>
                  <input
                    required
                    value={noteAuthor}
                    onChange={(e) => setNoteAuthor(e.target.value)}
                    placeholder="VD: Ban Chấp Hành BLLSV TMU"
                    className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cobalt-800 mb-1">Bộ phận / Ban</label>
                  <select
                    value={noteDept}
                    onChange={(e) => setNoteDept(e.target.value)}
                    className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                  >
                    <option value="Ban Chấp Hành">Ban Chấp Hành</option>
                    <option value="Đội SVTN">Đội SVTN</option>
                    <option value="Ban Truyền thông">Ban Truyền thông</option>
                    <option value="Ban Văn hóa – Sự kiện">Ban Văn hóa – Sự kiện</option>
                    <option value="Ban Hậu cần">Ban Hậu cần</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-cobalt-800 mb-1">Màu giấy dán</label>
                  <div className="flex items-center gap-2 pt-1">
                    {(["amber", "sky", "rose", "emerald"] as const).map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setNoteColor(color)}
                        className={`h-7 w-7 rounded-full border-2 transition ${
                          noteColor === color ? "scale-110 border-cobalt-900 shadow-xs" : "border-transparent opacity-70"
                        } ${
                          color === "amber"
                            ? "bg-amber-300"
                            : color === "sky"
                            ? "bg-sky-300"
                            : color === "rose"
                            ? "bg-rose-300"
                            : "bg-emerald-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cobalt-800 mb-1">Nội dung ghi chú *</label>
                <textarea
                  required
                  rows={2}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Nhập nội dung lời nhắn dán lên bảng tin tình nguyện viên..."
                  className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-cobalt-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notePin}
                    onChange={(e) => setNotePin(e.target.checked)}
                    className="h-4 w-4 rounded text-flame-500 focus:ring-flame-400"
                  />
                  <span>Ghim ngay lên đầu bảng tin 📌</span>
                </label>

                <Button variant="flame" type="submit">
                  📌 Dán Note lên bảng tin
                </Button>
              </div>
            </form>
          </div>

          {/* Danh sách các Note */}
          <div className="space-y-2">
            <h5 className="font-display text-xs font-bold text-cobalt-900">
              Danh sách ghi chú hiện có ({filteredNotes.length})
            </h5>

            <div className="max-h-[420px] space-y-2.5 overflow-y-auto pr-1">
              {filteredNotes.length === 0 ? (
                <p className="py-8 text-center text-xs text-cobalt-500">Chưa có ghi chú nào phù hợp.</p>
              ) : (
                filteredNotes.map((n) => (
                  <div
                    key={n.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-3 text-xs shadow-2xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-cobalt-950">{n.author}</span>
                        <span className="rounded bg-cobalt-100 px-1.5 py-0.5 text-[10px] font-semibold text-cobalt-800">
                          {n.department}
                        </span>
                        {n.pinned && (
                          <span className="rounded bg-flame-500 px-1.5 py-0.5 text-[9.5px] font-bold text-white">
                            Đã ghim
                          </span>
                        )}
                        <span className="text-[10px] text-cobalt-400">{n.createdAt}</span>
                      </div>

                      {editingNoteId === n.id ? (
                        <div className="mt-2 space-y-2">
                          <textarea
                            rows={2}
                            value={editingNoteContent}
                            onChange={(e) => setEditingNoteContent(e.target.value)}
                            className="w-full rounded-xl border border-flame-300 p-2 text-xs text-cobalt-950 outline-none focus:ring-1 focus:ring-flame-400"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingNoteId(null)}
                              className="rounded-lg bg-cobalt-100 px-2 py-1 text-[11px] font-bold text-cobalt-700"
                            >
                              Hủy
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (onEditNote && editingNoteContent.trim()) {
                                  onEditNote(n.id, { content: editingNoteContent.trim() });
                                  setEditingNoteId(null);
                                }
                              }}
                              className="rounded-lg bg-flame-500 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-flame-600"
                            >
                              Lưu thay đổi
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-1 leading-relaxed text-cobalt-800">{n.content}</p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNoteId(n.id);
                          setEditingNoteContent(n.content);
                        }}
                        title="Chỉnh sửa nội dung note"
                        className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs text-cobalt-700 hover:bg-cobalt-50"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => onTogglePinNote(n.id)}
                        title={n.pinned ? "Bỏ ghim" : "Ghim note"}
                        className={`rounded-lg border p-1.5 text-xs transition ${
                          n.pinned
                            ? "border-flame-300 bg-flame-50 text-flame-700"
                            : "border-cobalt-200 bg-white hover:bg-flame-50"
                        }`}
                      >
                        📌
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteNote(n.id)}
                        title="Xóa note khỏi bảng"
                        className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs text-red-600 hover:bg-red-100"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================== PHẦN 2: QUẢN LÝ CONFESSIONS ===================== */}
      {subTab === "confessions" && (
        <div className="space-y-5">
          {/* Form thêm Confession chính thức */}
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4">
            <h4 className="font-display text-sm font-bold text-rose-950">
              💌 Thêm Mẩu Tin / Confession Kỷ Niệm Chính Thức
            </h4>
            <p className="mt-0.5 text-xs text-rose-800">
              BCH có thể đăng tải những lời tri ân, trích dẫn kỷ niệm từ các anh chị cựu BCH hoặc thư ngỏ nhà chung.
            </p>

            <form onSubmit={handleCreateConfessionSubmit} className="mt-3.5 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="block text-xs font-bold text-cobalt-800 mb-1">Người gửi / Tác giả</label>
                  <input
                    value={confAuthor}
                    onChange={(e) => setConfAuthor(e.target.value)}
                    placeholder="VD: Chị Đỗ Thị Loan hoặc để trống (Ẩn danh)"
                    className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cobalt-800 mb-1">Khóa / Danh xưng</label>
                  <input
                    value={confRole}
                    onChange={(e) => setConfRole(e.target.value)}
                    placeholder="VD: Trưởng BLL khóa K44 (2009 - 2010)"
                    className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-cobalt-800 mb-1">Tông màu giấy</label>
                  <select
                    value={confTone}
                    onChange={(e) => setConfTone(e.target.value as Confession["tone"])}
                    className="w-full rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs font-semibold text-cobalt-950 outline-none focus:border-flame-500"
                  >
                    <option value="paper">Giấy vintage cổ điển</option>
                    <option value="blue">Xanh dương hy vọng</option>
                    <option value="orange">Cam lửa nhiệt huyết</option>
                    <option value="mint">Bạc hà thanh xuân</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-cobalt-800 mb-1">Nội dung tâm sự / Confession *</label>
                <textarea
                  required
                  rows={3}
                  value={confText}
                  onChange={(e) => setConfText(e.target.value)}
                  placeholder="Nhập nội dung tâm sự, lời chúc gửi tới đại gia đình sinh viên Thanh Hóa..."
                  className="w-full resize-none rounded-xl border border-cobalt-200 bg-white px-3 py-2 text-xs text-cobalt-950 outline-none focus:border-flame-500"
                />
              </div>

              <div className="flex justify-end pt-1">
                <Button variant="flame" type="submit">
                  💌 Đăng Confession vào Hòm Thư
                </Button>
              </div>
            </form>
          </div>

          {/* Danh sách Confessions */}
          <div className="space-y-2">
            <h5 className="font-display text-xs font-bold text-cobalt-900">
              Danh sách Confessions trong hòm thư ({filteredConfessions.length})
            </h5>

            <div className="max-h-[420px] space-y-2.5 overflow-y-auto pr-1">
              {filteredConfessions.length === 0 ? (
                <p className="py-8 text-center text-xs text-cobalt-500">Chưa có confession nào phù hợp.</p>
              ) : (
                filteredConfessions.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-start justify-between gap-3 rounded-2xl border border-cobalt-100 bg-white p-3 text-xs shadow-2xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-cobalt-950">{c.author}</span>
                        <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[10px] font-semibold text-rose-800">
                          {c.role}
                        </span>
                        <span className="rounded bg-cobalt-100 px-1.5 py-0.5 text-[9.5px] text-cobalt-600">
                          Tone: {c.tone}
                        </span>
                      </div>

                      {editingConfId === c.id ? (
                        <div className="mt-2 space-y-2">
                          <textarea
                            rows={3}
                            value={editingConfText}
                            onChange={(e) => setEditingConfText(e.target.value)}
                            className="w-full rounded-xl border border-rose-300 p-2 text-xs text-cobalt-950 outline-none focus:ring-1 focus:ring-rose-400"
                          />
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setEditingConfId(null)}
                              className="rounded-lg bg-cobalt-100 px-2 py-1 text-[11px] font-bold text-cobalt-700"
                            >
                              Hủy
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (onEditConfession && editingConfText.trim()) {
                                  onEditConfession(c.id, { text: editingConfText.trim() });
                                  setEditingConfId(null);
                                }
                              }}
                              className="rounded-lg bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-rose-600"
                            >
                              Lưu thay đổi
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-1 leading-relaxed text-cobalt-800 italic">“{c.text}”</p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingConfId(c.id);
                          setEditingConfText(c.text);
                        }}
                        title="Chỉnh sửa nội dung confession"
                        className="rounded-lg border border-cobalt-200 bg-white p-1.5 text-xs text-cobalt-700 hover:bg-cobalt-50"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteConfession(c.id)}
                        title="Xóa confession khỏi hòm thư"
                        className="rounded-lg border border-red-200 bg-red-50 p-1.5 text-xs text-red-600 hover:bg-red-100"
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
