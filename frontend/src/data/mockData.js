import { formatQueueNumber, getTodayKey } from "../lib/queue-utils";

export const serviceOptions = [
  "Servis Rutin",
  "Ganti Oli",
  "Perbaikan Mesin",
  "Servis Kelistrikan",
  "Perbaikan Suspensi",
  "Lainnya",
];

export const motorTypeOptions = [
  "Honda Vario 160",
  "Honda PCX 160",
  "Honda Beat Street",
  "Yamaha Nmax",
  "Yamaha Aerox 155",
  "Suzuki Burgman Street 125EX",
  "Kawasaki KLX 150",
  "Lainnya",
];

export const dealerProfile = {
  name: "AntrianDealer Realtime",
  branch: "Cabang Pasteur, Bandung",
  tagline: "Alur servis lebih tenang dengan nomor antrian yang hidup.",
  description:
    "Platform frontend phase 1 untuk memantau antrian servis bengkel secara realtime dengan pengalaman yang nyaman di ponsel maupun desktop.",
  address: "Jl. Dr. Djunjunan No. 144, Bandung",
  hours: "Senin - Sabtu, 08.00 - 17.00 WIB",
  hotline: "(022) 567-8890",
};

export const adminAccount = {
  id: "admin-1",
  role: "admin",
  name: "Admin Service",
  email: "admin@dealer.test",
  password: "admin123",
  phone: "081122334455",
  address: "Workshop Office",
  age: 29,
  motorType: "Operational Unit",
  licensePlate: "B 1000 ADM",
  serviceType: "Operasional",
  profileComplete: true,
  provider: "internal",
};

export const dummyUsers = [
  {
    id: "user-1",
    role: "user",
    name: "Budi Santoso",
    email: "budi@example.com",
    password: "user123",
    phone: "08123456789",
    address: "Jl. Merdeka No. 10, Bandung",
    age: 35,
    motorType: "Yamaha Nmax",
    licensePlate: "D 1234 AB",
    serviceType: "Servis Rutin",
    profileComplete: true,
    provider: "google-mock",
  },
  {
    id: "user-2",
    role: "user",
    name: "Siti Rahma",
    email: "siti@example.com",
    password: "user123",
    phone: "08129876543",
    address: "Jl. Asia Afrika No. 27, Bandung",
    age: 28,
    motorType: "Honda PCX 160",
    licensePlate: "D 4321 CD",
    serviceType: "Ganti Oli",
    profileComplete: true,
    provider: "google-mock",
  },
  {
    id: "user-3",
    role: "user",
    name: "Andi Pratama",
    email: "andi@example.com",
    password: "user123",
    phone: "081377788899",
    address: "Jl. Setiabudi No. 88, Bandung",
    age: 31,
    motorType: "Honda Vario 160",
    licensePlate: "D 9988 EF",
    serviceType: "Servis Kelistrikan",
    profileComplete: true,
    provider: "manual",
  },
  {
    id: "user-4",
    role: "user",
    name: "Rina Kurnia",
    email: "rina@example.com",
    password: "user123",
    phone: "081355566677",
    address: "Jl. Ciumbuleuit No. 19, Bandung",
    age: 26,
    motorType: "Honda Beat Street",
    licensePlate: "D 7788 GH",
    serviceType: "Servis Kelistrikan",
    profileComplete: true,
    provider: "manual",
  },
  {
    id: "user-5",
    role: "user",
    name: "Fajar Nugraha",
    email: "fajar@example.com",
    password: "user123",
    phone: "081312341234",
    address: "Jl. Braga No. 50, Bandung",
    age: 38,
    motorType: "Suzuki Burgman Street 125EX",
    licensePlate: "D 1199 IJ",
    serviceType: "Perbaikan Suspensi",
    profileComplete: true,
    provider: "manual",
  },
  {
    id: "user-6",
    role: "user",
    name: "Lala Puspita",
    email: "lala@example.com",
    password: "user123",
    phone: "081244455566",
    address: "Jl. Sukajadi No. 101, Bandung",
    age: 24,
    motorType: "Yamaha Aerox 155",
    licensePlate: "D 5544 KL",
    serviceType: "Perbaikan Mesin",
    profileComplete: true,
    provider: "google-mock",
  },
];

const createSeedQueueEntry = (user, index, status, minutesAgo, sortIndex = index) => {
  const createdAt = new Date(Date.now() - minutesAgo * 60 * 1000).toISOString();

  return {
    id: `queue-${index}`,
    queueNumber: formatQueueNumber(index),
    profileId: user.id,
    businessDate: getTodayKey(),
    name: user.name,
    phone: user.phone,
    address: user.address,
    age: user.age,
    motorType: user.motorType,
    licensePlate: user.licensePlate,
    serviceType: user.serviceType,
    status,
    createdAt,
    updatedAt: createdAt,
    sortIndex,
    skipCount: 0,
  };
};

export const seededQueueEntries = [
  createSeedQueueEntry(dummyUsers[0], 1, "completed", 120, 1),
  createSeedQueueEntry(dummyUsers[1], 2, "called", 88, 2),
  createSeedQueueEntry(dummyUsers[2], 3, "waiting", 70, 3),
  createSeedQueueEntry(dummyUsers[3], 4, "waiting", 56, 4),
  createSeedQueueEntry(dummyUsers[4], 5, "waiting", 42, 5),
  createSeedQueueEntry(dummyUsers[5], 6, "waiting", 29, 6),
];

export const seededCurrentQueueId = "queue-2";

export const dummyStats = [
  {
    label: "Rata-rata antrean aktif",
    value: "18 menit",
    detail: "Mock insight untuk menunjukkan kesiapan area analytics phase 2.",
  },
  {
    label: "Kepuasan pelanggan",
    value: "4.8/5",
    detail: "Diambil sebagai placeholder testimonial dan quality signal.",
  },
  {
    label: "Slot servis harian",
    value: "40+",
    detail: "Bisa disesuaikan saat backend dan kapasitas cabang tersedia.",
  },
];

export const landingHighlights = [
  {
    title: "Pantau nomor secara hidup",
    description:
      "User melihat antrian yang sama dengan admin, tanpa refresh manual dan tanpa kehilangan konteks servis.",
  },
  {
    title: "Profil pelanggan sekali isi",
    description:
      "Data motor, plat nomor, dan kebutuhan servis tersimpan agar pengambilan antrian berikutnya makin cepat.",
  },
  {
    title: "Siap integrasi backend",
    description:
      "Layer state, realtime, dan API client sudah dipisahkan agar fase berikutnya tinggal menyambungkan server.",
  },
];
