# AntrianDealer Realtime

Implementasi phase 1 frontend untuk sistem antrian bengkel realtime berbasis React + Vite. Repo ini disusun dari folder kosong sesuai requirement di `project_prompt.md`, dengan fokus pada UI responsif, dummy auth, queue management lokal, dan mock realtime yang siap disambungkan ke backend pada phase 2.

## Struktur

```text
.
├── backend/                 # placeholder phase 2
├── frontend/                # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── styles/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── project_prompt.md
```

## Fitur Phase 1

- Landing page publik dengan preview antrian aktif.
- Login dummy melalui akun preset, Google OAuth mock, dan form manual.
- Form profil pelanggan lengkap dengan validasi field bengkel.
- Dashboard user dengan kartu antrian pribadi, queue live, dan ringkasan servis.
- Dashboard admin dengan control panel `Next`, `Skip`, `Selesai`, dan `Reset`.
- Mock realtime berbasis channel lokal dengan heartbeat 4 detik.
- State persisten via Zustand + `localStorage`.
- Siap migrasi ke backend melalui `src/lib/api.js` dan `src/lib/socket.js`.

## Cara Menjalankan

1. Masuk ke folder frontend:

   ```powershell
   cd frontend
   ```

2. Install dependency:

   ```powershell
   npm install
   ```

3. Jalankan mode development:

   ```powershell
   npm run dev
   ```

4. Build production:

   ```powershell
   npm run build
   ```

## Akun Demo

- Admin:
  - Email: `admin@dealer.test`
  - Password: `admin123`
- User dummy:
  - Email: `budi@example.com` dan akun dummy lain di halaman login
  - Password: `user123`

## Catatan Teknis

- Realtime phase 1 memakai mock event broadcaster dengan `BroadcastChannel` agar perubahan queue dapat muncul lintas tab browser.
- Queue disimpan per hari dengan format `A-001`, `A-002`, dan reset otomatis saat tanggal lokal berubah.
- `frontend/.env.example` sudah disiapkan untuk fase integrasi Socket.IO dan API backend.
