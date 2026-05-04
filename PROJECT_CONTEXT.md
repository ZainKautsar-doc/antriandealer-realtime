# 🧠 PROJECT CONTEXT

## 1. Informasi Umum
- **Nama Project**: AntrianDealer Realtime
- **Deskripsi Project**: Aplikasi web untuk manajemen antrian bengkel atau dealer kendaraan secara realtime. Aplikasi ini dirancang untuk mendigitalkan proses antrian konvensional menjadi sistem yang transparan dan dapat dipantau dari mana saja.
- **Tujuan Utama**: 
    - Mengurangi penumpukan pelanggan di ruang tunggu bengkel.
    - Memberikan kepastian waktu tunggu kepada pelanggan melalui status realtime.
    - Memudahkan staf bengkel (Admin/Service Advisor) dalam mengelola urutan servis (panggil, lewati, atau selesaikan antrian).
- **Target User**: 
    - **Pelanggan**: Mengambil nomor antrian, mengisi profil kendaraan, dan memantau posisi antrian secara live.
    - **Admin/Staf**: Mengontrol jalannya antrian (Next, Skip, Selesai) dari panel dashboard.
- **Fitur Utama**:
    - **Realtime Queue Monitoring**: Pembaruan status antrian secara langsung di semua layar tanpa perlu refresh halaman.
    - **Admin Control Panel**: Alat bagi admin untuk memajukan antrian, melewati nomor tertentu, atau mereset antrian harian.
    - **Dynamic Profiling**: Form pengisian data kendaraan dan keluhan sebelum pelanggan masuk ke dalam daftar antrian.
    - **Persistent State**: Data antrian dan sesi login tetap tersimpan meskipun browser ditutup (menggunakan local storage).
    - **Mock Realtime System**: Menggunakan `BroadcastChannel` API untuk sinkronisasi data antar tab browser sebagai simulasi backend realtime.

## 2. Teknologi yang Digunakan
- **Bahasa Pemrograman**: JavaScript (ES6+).
- **Framework Utama**: **React.js (v18)** sebagai framework UI dan **Vite** sebagai build tool untuk performa pengembangan yang cepat.
- **Library / Packages Penting**:
    - **Zustand**: State management utama untuk menangani data Auth dan Queue secara global.
    - **React Router Dom**: Menangani navigasi dan proteksi route (Public vs Private).
    - **React Icons / Lucide React**: Koleksi ikon untuk antarmuka pengguna.
    - **Axios**: HTTP Client yang disiapkan untuk integrasi API di masa depan (Phase 2).
    - **Socket.io-client**: Library realtime yang disiapkan untuk integrasi WebSocket di masa depan.
- **Design System / UI Framework**: 
    - **Tailwind CSS**: Framework CSS utility-first untuk styling yang responsif dan modern.
    - **PostCSS & Autoprefixer**: Tools tambahan untuk optimasi CSS.

## 3. Arsitektur & Alur Sistem
- **Arsitektur**: Menggunakan pola **Component-Based Architecture** dengan pemisahan logika ke dalam **Custom Hooks** dan **Stores (Zustand)**.
- **Alur Data**: 
    - User/Admin melakukan aksi di komponen UI.
    - Komponen memicu fungsi di **Zustand Store** (`useQueueStore` atau `useAuthStore`).
    - Store memperbarui state internal dan menyimpannya ke `localStorage`.
    - **BroadcastChannel** mengirimkan sinyal ke tab lain agar melakukan sinkronisasi state yang sama.
    - UI secara otomatis merender ulang data terbaru dari Store.
- **Authentication**: Menggunakan **Dummy Auth**. Data user disimpan dalam state global dan divalidasi melalui komponen `ProtectedRoute`. Login mendukung akun preset (admin & user) serta simulasi Google OAuth.
- **State Management**: Zustand digunakan dengan middleware `persist` agar data tidak hilang saat refresh. Logika antrian (generasi nomor, update status) semuanya terpusat di `useQueueStore.js`.

## 4. Struktur Folder & Penjelasan Detail
```text
.
├── backend/                 # Placeholder untuk pengembangan API di Phase 2
├── frontend/                # Root aplikasi frontend (React + Vite)
│   ├── public/              # Aset statis seperti logo dan favicon
│   ├── src/                 # Source code utama
│   │   ├── components/      # Komponen UI kecil dan reusable (Button, Card, Modal, dll)
│   │   ├── context/         # React Context untuk state ringan (seperti Toast/Notification)
│   │   ├── data/            # Data statis atau mock data untuk testing
│   │   ├── hooks/           # Custom hooks dan Zustand Stores (Logic layer)
│   │   ├── layouts/         # Komponen wrapper untuk struktur halaman (Admin, User, Public)
│   │   ├── lib/             # Konfigurasi library (API, Socket, Queue Utilities)
│   │   ├── pages/           # Komponen level halaman (Landing, Login, Dashboard, Profile)
│   │   ├── styles/          # File CSS global dan konfigurasi Tailwind
│   │   ├── App.jsx          # Entry point aplikasi & konfigurasi Routing
│   │   └── main.jsx         # Render React ke DOM
│   ├── package.json         # Daftar dependency dan script perintah
│   ├── tailwind.config.js   # Konfigurasi tema dan plugin Tailwind
│   └── vite.config.js       # Konfigurasi build tool Vite
└── README.md                # Dokumentasi dasar project
```

## 5. Konvensi & Gaya Coding
- **Gaya Coding**: Mengikuti prinsip **Clean Code** dan **DRY (Don't Repeat Yourself)**. Komponen dipecah sekecil mungkin agar mudah dirawat.
- **Naming Convention**: 
    - **Komponen**: PascalCase (contoh: `QueueCard.jsx`).
    - **Fungsi/Variabel**: camelCase (contoh: `handleNextQueue`).
    - **Store/Hooks**: Prefix `use` (contoh: `useQueueStore.js`).
- **Pemisahan Logic**: Logika bisnis yang kompleks dipindahkan ke dalam store atau utility functions di folder `lib/`, sehingga komponen React hanya fokus pada tampilan.
- **Error Handling**: Menggunakan sistem **Toast Notification** untuk memberikan feedback sukses atau gagal ke user secara visual.
- **Reusable Code**: Pembuatan komponen generic di folder `components/` yang menerima props untuk variasi tampilan.

## 6. Cara Menjalankan Project
1. **Prasyarat**: Pastikan Node.js sudah terinstall di sistem.
2. **Masuk ke direktori frontend**:
   ```powershell
   cd frontend
   ```
3. **Install Dependency**:
   ```powershell
   npm install
   ```
4. **Jalankan Mode Development**:
   ```powershell
   npm run dev
   ```
5. **Akses Aplikasi**: Buka browser di `http://localhost:5173`.

## 7. Insight Teknis Tambahan
- **Keputusan Teknis**: Penggunaan `BroadcastChannel` dipilih untuk memberikan pengalaman "realtime" di Phase 1 tanpa memerlukan setup server backend yang rumit, memungkinkan pengujian sinkronisasi data antar jendela browser secara instan.
- **Potensi Improvement**: 
    - Integrasi Socket.io yang sesungguhnya untuk sinkronisasi antar perangkat yang berbeda.
    - Implementasi Database (PostgreSQL/MongoDB) untuk menyimpan riwayat antrian jangka panjang.
    - Penambahan fitur estimasi waktu tunggu berdasarkan kecepatan servis rata-rata.
- **Known Limitation**: Karena saat ini masih menggunakan `localStorage`, data antrian terbatas pada browser yang sama. Data tidak akan tersinkronisasi jika dibuka di perangkat yang berbeda sampai Phase 2 (Backend Integration) diimplementasikan.

## 8. Ringkasan untuk AI
- **Project**: Sistem manajemen antrian bengkel realtime (Phase 1 - Frontend focus).
- **Stack Utama**: React 18, Vite, Tailwind CSS, Zustand.
- **Struktur**: Modular dengan pemisahan ketat antara UI (`pages/components`) dan Logic (`hooks/stores`).
- **Realtime**: Mock menggunakan `BroadcastChannel`, siap diganti ke Socket.io.
- **Hal Penting**: Data bersifat lokal di browser (`localStorage`), mendukung dua peran utama: Admin (Controller) dan User (Viewer/Petitioner).
- **Routing**: Terproteksi berdasarkan role user.
