# Flash Card App 📚

Một ứng dụng học từ vựng hiệu quả với Flash Card được xây dựng bằng React Native và Vite.

![Flash Card App](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Tính năng

### 🎯 Tính năng chính
- **Flash Card tương tác**: Lật thẻ để xem nghĩa với hiệu ứng 3D mượt mà
- **Thêm từ vựng**: Dễ dàng thêm từ vựng mới với giao diện thân thiện
- **Theo dõi tiến độ**: Theo dõi số lượng từ đã học và phần trăm hoàn thành
- **Quản lý thẻ**: Chỉnh sửa, xóa và phân loại flash card
- **Đánh dấu đã học**: Theo dõi từ vựng đã thuộc

### 🎨 Giao diện
- **Responsive Design**: Hoạt động tốt trên mọi kích thước màn hình
- **Màu xanh chủ đạo**: Giao diện tươi mát với gradient xanh emerald/teal
- **Hiệu ứng Glassmorphism**: Hiệu ứng kính mờ hiện đại
- **Animations**: Chuyển động mượt mà và tự nhiên
- **Modern UI**: Thiết kế theo xu hướng 2024

### 📊 Thống kê & Tiến độ
- Tổng số flash card
- Số lượng từ đã học
- Phần trăm hoàn thành
- Progress bar trực quan

## 🚀 Cài đặt

### Yêu cầu hệ thống
- Node.js 16.0 trở lên
- npm hoặc yarn
- React Native CLI (nếu build native)

### Cách cài đặt

```bash
# Clone repository
git clone https://github.com/yourusername/flashcard-app.git
cd flashcard-app

# Cài đặt dependencies
npm install

# Khởi động development server với Vite
npm run dev

# Hoặc với yarn
yarn install
yarn dev
```

### Build cho production

```bash
# Build web app
npm run build

# Build cho Android
npm run android

# Build cho iOS
npm run ios
```

## 🛠️ Tech Stack

- **Frontend Framework**: React Native
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)
- **Responsive Design**: TailwindCSS utilities

## 📱 Screenshots

### Trang chủ
- Dashboard với thống kê tiến độ
- Menu điều hướng trực quan
- Progress bar và số liệu

### Chế độ học
- Flash card với hiệu ứng flip 3D
- Điều khiển navigation
- Đánh dấu từ đã học

### Quản lý thẻ
- Danh sách tất cả flash card
- Chức năng edit/delete
- Phân loại theo category

## 🎯 Hướng dẫn sử dụng

### Thêm flash card mới
1. Nhấn nút "Thêm thẻ" trên trang chủ
2. Điền từ tiếng Anh (mặt trước)
3. Điền nghĩa tiếng Việt (mặt sau)
4. Chọn danh mục (category)
5. Nhấn "Thêm" để lưu

### Học từ vựng
1. Nhấn "Học ngay" từ trang chủ
2. Nhấn vào thẻ để lật và xem nghĩa
3. Sử dụng nút điều hướng để chuyển thẻ
4. Đánh dấu ✓ khi đã thuộc từ

### Quản lý flash card
1. Vào mục "Quản lý"
2. Xem danh sách tất cả thẻ
3. Nhấn icon edit để chỉnh sửa
4. Nhấn icon trash để xóa
5. Nhấn "Đã học/Chưa học" để đổi trạng thái

## 🔧 Cấu hình

### Tùy chỉnh màu sắc
Chỉnh sửa file `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        }
      }
    }
  }
}
```

### Thêm animations
File CSS với custom animations đã được tích hợp:
- 3D flip effect cho flash card
- Smooth transitions
- Hover effects

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Hãy:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

### Coding Standards
- Sử dụng ESLint và Prettier
- Follow React best practices
- Component-based architecture
- Responsive design first

## 📋 Roadmap

### Version 2.0
- [ ] Chế độ quiz/test
- [ ] Thống kê chi tiết theo thời gian
- [ ] Import/Export data
- [ ] Dark mode
- [ ] Multi-language support

### Version 2.1
- [ ] Spaced repetition algorithm
- [ ] Voice pronunciation
- [ ] Gamification (points, streaks)
- [ ] Cloud sync
- [ ] Offline mode

## 🐛 Bug Reports

Nếu bạn phát hiện bug, vui lòng tạo issue với:
- Mô tả chi tiết bug
- Steps to reproduce
- Screenshots (nếu có)
- Environment info

## 📄 License

Dự án này được phân phối dưới MIT License. Xem file `LICENSE` để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern flash card apps
- Color palette from [TailwindCSS](https://tailwindcss.com/)
- Vietnamese translation community

## ⭐ Star History

Nếu dự án này hữu ích với bạn, hãy cho chúng tôi một ⭐ star!

---

**Học từ vựng thông minh với Flash Card App** 🎓
