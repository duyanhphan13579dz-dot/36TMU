# Hướng dẫn đóng góp (Contributing Guidelines)

Cảm ơn bạn đã quan tâm và muốn đóng góp cho dự án website **Ban Liên Lạc Sinh Viên Thanh Hóa - Trường Đại Học Thương Mại (BLLSVTH TMU)**!

## Quy trình đóng góp

1. **Fork** repository này về tài khoản GitHub của bạn.
2. Tạo nhánh mới cho tính năng hoặc bản sửa lỗi:
   ```bash
   git checkout -b feature/ten-tinh-nang
   # hoặc
   git checkout -b fix/ten-loi
   ```
3. Thực hiện thay đổi, chạy thử và kiểm tra build cục bộ:
   ```bash
   npm run build
   ```
4. Commit với thông điệp rõ ràng theo định dạng [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: ...` cho tính năng mới.
   - `fix: ...` cho sửa lỗi.
   - `docs: ...` cho tài liệu hoặc nội dung.
5. Đẩy nhánh lên repository của bạn và tạo một **Pull Request (PR)** đến nhánh `main` của repository chính.

## Quy chuẩn mã nguồn

- Tuân thủ cấu trúc thư mục hiện tại (`src/components`, `src/data`, `src/lib`, `src/utils`).
- Toàn bộ nội dung chữ (text, mô tả, sự kiện) nên tập trung trong `src/data/content.ts` thay vì hardcode trong component.
- Giữ tinh thần thiết kế đồng nhất theo hệ màu nhận diện Cobalt Blue & Flame Orange.
