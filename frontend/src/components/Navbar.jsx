import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle, HiOutlineBolt, HiOutlineQueueList } from "react-icons/hi2";
import { selectCurrentUser, useAuthStore } from "../hooks/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(selectCurrentUser);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/85 backdrop-blur">
      <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-400/30">
              <HiOutlineQueueList className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-700">
                AntrianDealer
              </p>
              <p className="text-base font-semibold text-slate-900">Realtime Workshop</p>
            </div>
          </Link>

          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Phase 1 Frontend
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {!currentUser && (
            <>
              <NavLink to="/" className="secondary-button">
                Beranda
              </NavLink>
              <NavLink to="/login" className="primary-button">
                Login
              </NavLink>
            </>
          )}

          {currentUser?.role === "user" && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "primary-button" : "secondary-button"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "primary-button" : "secondary-button"
                }
              >
                Profil
              </NavLink>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                <HiOutlineBolt className="text-brand-600" />
                <span>{currentUser.name}</span>
              </div>
              <button type="button" onClick={handleLogout} className="secondary-button">
                <HiArrowRightOnRectangle />
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
