import { Outlet } from "react-router-dom";
import { HiOutlineArrowTrendingUp, HiOutlineRectangleStack, HiOutlineUsers } from "react-icons/hi2";
import { useAuthStore } from "../hooks/useAuthStore";

const navigation = [
  {
    label: "Overview",
    icon: HiOutlineArrowTrendingUp,
    href: "#overview",
  },
  {
    label: "Antrian Hari Ini",
    icon: HiOutlineRectangleStack,
    href: "#queue-list",
  },
  {
    label: "Pelanggan Aktif",
    icon: HiOutlineUsers,
    href: "#activity-feed",
  },
];

export default function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="glass-panel border-slate-800/70 bg-slate-900/80 p-6 text-slate-100">
          <div>
            <p className="section-heading text-sky-300">Admin Console</p>
            <h1 className="mt-3 text-2xl font-semibold">
              Kontrol antrian bengkel realtime
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              Semua kontrol queue phase 1 ada di sini. State tetap lokal dan siap
              dipindahkan ke backend saat fase berikutnya.
            </p>
          </div>

          <nav className="mt-8 space-y-2">
            {navigation.map(({ icon: Icon, label, href }, index) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  index === 0
                    ? "bg-brand-500/20 text-white"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={logout}
            className="secondary-button mt-8 w-full border-slate-700 bg-slate-900 text-slate-100 hover:border-slate-500 hover:text-white"
          >
            Logout Admin
          </button>
        </aside>

        <main className="overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/60 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
