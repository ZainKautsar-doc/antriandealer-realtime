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
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur shadow-sm">
      <div className="page-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">
            <HiOutlineQueueList className="text-xl" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-brand-600 leading-none">
              HONDA
            </p>
            <p className="mt-1 text-sm font-bold text-slate-900 leading-none">Dealer Tasikmalaya</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2 sm:gap-6">
          {!currentUser ? (
            <>
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`
                }
              >
                Beranda
              </NavLink>
              <div className="h-4 w-[1px] bg-slate-200" />
              <Link to="/login" className="primary-button py-2.5 px-6">
                Login
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3 sm:gap-4">
              {currentUser.role === "user" ? (
                <>
                  <NavLink to="/dashboard" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition">Dashboard</NavLink>
                  <NavLink to="/profile" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition">Profil</NavLink>
                </>
              ) : (
                <NavLink to="/admin" className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition">Admin Panel</NavLink>
              )}
              
              <div className="h-4 w-[1px] bg-slate-200" />
              
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                <HiOutlineBolt className="text-brand-600" />
                {currentUser.name}
              </div>

              <button 
                type="button" 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:bg-brand-50 px-3 py-2 rounded-xl transition"
              >
                <HiArrowRightOnRectangle className="text-lg" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
