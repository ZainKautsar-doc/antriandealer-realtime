import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiArrowRightOnRectangle, HiOutlineBolt, HiOutlineQueueList, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { selectCurrentUser, useAuthStore } from "../hooks/useAuthStore";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = useAuthStore(selectCurrentUser);
  const logout = useAuthStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <NavLink 
        to="/" 
        onClick={() => setIsMobileMenuOpen(false)}
        className={({ isActive }) => 
          `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`
        }
      >
        Beranda
      </NavLink>
      
      {currentUser?.role === "user" && (
        <>
          <NavLink 
            to="/dashboard" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => 
              `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`
            }
          >
            Ruang Antrian
          </NavLink>
          <NavLink 
            to="/profile" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => 
              `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`
            }
          >
            Profil
          </NavLink>
        </>
      )}

      {currentUser?.role === "admin" && (
        <NavLink 
          to="/admin" 
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) => 
            `text-sm font-semibold transition ${isActive ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`
          }
        >
          Admin Panel
        </NavLink>
      )}
    </>
  );

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
          {/* Mobile visible branding text */}
          <div className="sm:hidden">
            <p className="text-sm font-bold text-slate-900 leading-none">Honda Dealer</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks}
          <div className="h-4 w-[1px] bg-slate-200" />

          {!currentUser ? (
            <Link to="/login" className="primary-button py-2.5 px-6">
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                <HiOutlineBolt className="text-brand-600" />
                {currentUser.name}
              </div>

              <button 
                type="button" 
                onClick={handleLogout} 
                className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:bg-brand-50 px-3 py-2 rounded-xl transition"
              >
                <HiArrowRightOnRectangle className="text-lg" />
                <span className="hidden lg:inline">Logout</span>
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-slate-600 hover:text-brand-600 transition"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiOutlineXMark className="text-2xl" /> : <HiOutlineBars3 className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks}
            <div className="h-[1px] w-full bg-slate-200" />
            {!currentUser ? (
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="primary-button py-2.5 px-6 w-full text-center block"
              >
                Login
              </Link>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-bold self-start">
                  <HiOutlineBolt className="text-brand-600" />
                  {currentUser.name}
                </div>

                <button 
                  type="button" 
                  onClick={handleLogout} 
                  className="flex items-center justify-center gap-2 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 px-3 py-2.5 rounded-xl transition w-full"
                >
                  <HiArrowRightOnRectangle className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
