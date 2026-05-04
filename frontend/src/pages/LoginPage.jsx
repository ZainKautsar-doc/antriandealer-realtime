import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineArrowRight, HiOutlineGlobeAlt, HiOutlineKey } from "react-icons/hi2";
import { adminAccount, dummyUsers } from "../data/mockData";
import { selectCurrentUser, useAuthStore } from "../hooks/useAuthStore";
import { useToast } from "../hooks/useToast";

const redirectByRole = (user) => {
  if (user.role === "admin") {
    return "/admin";
  }

  return user.profileComplete ? "/dashboard" : "/profile";
};

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useAuthStore(selectCurrentUser);
  const loginWithPreset = useAuthStore((state) => state.loginWithPreset);
  const loginWithCredentials = useAuthStore((state) => state.loginWithCredentials);
  const loginWithMockGoogle = useAuthStore((state) => state.loginWithMockGoogle);
  const { pushToast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    role: "user",
  });

  useEffect(() => {
    if (currentUser) {
      navigate(redirectByRole(currentUser), { replace: true });
    }
  }, [currentUser, navigate]);

  const handlePresetLogin = (userId) => {
    const result = loginWithPreset(userId);

    if (!result.ok) {
      pushToast({
        title: "Login gagal",
        message: result.message,
        tone: "error",
      });
      return;
    }

    navigate(location.state?.from ?? redirectByRole(result.user), { replace: true });
    pushToast({
      title: "Login berhasil",
      message: `Selamat datang, ${result.user.name}.`,
      tone: "success",
    });
  };

  const handleGoogleMock = () => {
    const result = loginWithMockGoogle();
    navigate(redirectByRole(result.user), { replace: true });
    pushToast({
      title: "Google OAuth Mock",
      message: `Masuk sebagai ${result.user.name}.`,
      tone: "success",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = loginWithCredentials(form);

    if (!result.ok) {
      pushToast({
        title: "Login gagal",
        message: result.message,
        tone: "error",
      });
      return;
    }

    navigate(redirectByRole(result.user), { replace: true });
    pushToast({
      title: result.isNewUser ? "Akun baru dibuat" : "Login berhasil",
      message: result.isNewUser
        ? "Lengkapi profil Anda sebelum mengambil nomor antrian."
        : `Selamat datang kembali, ${result.user.name}.`,
      tone: "success",
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  return (
    <section className="page-shell py-10 sm:py-16">
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel bg-slate-950 p-8 text-white">
          <p className="section-heading text-sky-300">Quick Access</p>
          <h1 className="mt-3 text-3xl font-semibold">Masuk ke alur antrian dalam satu klik</h1>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Untuk development phase 1, Anda bisa login memakai akun dummy atau membuat akun
            user baru secara lokal. Admin juga tersedia sebagai kredensial tetap.
          </p>

          <button type="button" onClick={handleGoogleMock} className="primary-button mt-8 w-full">
            <HiOutlineGlobeAlt />
            Masuk dengan Google OAuth Mock
          </button>

          <div className="mt-8 space-y-3">
            {[...dummyUsers.slice(0, 4), adminAccount].map((account) => (
              <button
                key={account.id}
                type="button"
                onClick={() => handlePresetLogin(account.id)}
                className="flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"
              >
                <div>
                  <p className="font-semibold">{account.name}</p>
                  <p className="mt-1 text-sm text-slate-300">{account.email}</p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">
                  {account.role}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="glass-panel p-8">
          <p className="section-heading">Fallback Login</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Masuk manual atau buat akun baru</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            Jika email belum pernah dipakai, sistem akan membuat akun user lokal dan
            mengarahkan Anda ke form profil.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block text-sm font-medium text-slate-700">
              Email
              <input
                className="field-shell"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Password
              <input
                className="field-shell"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Nama Lengkap
              <input
                className="field-shell"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Wajib untuk akun baru"
              />
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Peran
              <select
                className="field-shell"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User / Pelanggan</option>
                <option value="admin">Admin</option>
              </select>
            </label>

            <button type="submit" className="primary-button w-full">
              <HiOutlineKey />
              Masuk Sekarang
            </button>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Kredensial admin demo</p>
            <p className="mt-2">
              Email: <span className="font-medium">{adminAccount.email}</span>
            </p>
            <p>
              Password: <span className="font-medium">{adminAccount.password}</span>
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-brand-700">
              <HiOutlineArrowRight />
              User dummy menggunakan password <span className="font-medium">user123</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
