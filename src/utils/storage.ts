/**
 * Tiện ích an toàn cho LocalStorage:
 * - Bắt lỗi QuotaExceededError khi lưu dữ liệu quá lớn (base64 ảnh, JSON lớn)
 * - Ước tính dung lượng đã sử dụng
 */

export function safeLocalStorageSet(key: string, value: string, onError?: (err: unknown) => void): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err: unknown) {
    console.error(`[Storage Quota Error] Không thể lưu khóa "${key}":`, err);
    if (onError) {
      onError(err);
    }
    return false;
  }
}

export function getStorageUsageKb(): { usedKb: number; percent: number } {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) {
        total += (localStorage.getItem(k) || "").length * 2;
      }
    }
    const usedKb = Math.round(total / 1024);
    // Typical quota is ~5MB (5120KB)
    const percent = Math.min(100, Math.round((usedKb / 5120) * 100));
    return { usedKb, percent };
  } catch {
    return { usedKb: 0, percent: 0 };
  }
}
