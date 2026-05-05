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
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="flex min-h-screen max-w-[1600px] mx-auto">
        
        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 border-r border-slate-800 bg-slate-950 p-6 flex flex-col hidden lg:flex shadow-2xl z-10">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                <span className="font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Admin Console</h1>
                <p className="text-xs text-indigo-400 font-medium uppercase tracking-wider mt-0.5">Dealer Tasikmalaya</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              Sistem kontrol antrian realtime. Pantau dan kelola antrian pelanggan dengan mudah.
            </p>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map(({ icon: Icon, label, href }, index) => (
              <a
                key={label}
                href={href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  index === 0
                    ? "bg-indigo-600/10 text-indigo-400 shadow-[inset_2px_0_0_0_#4f46e5]"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-slate-800">
            <button
              type="button"
              onClick={logout}
              className="flex w-full justify-center items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white"
            >
              Logout Admin
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-6 sm:p-10 lg:pl-12 lg:pr-10 xl:pr-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
