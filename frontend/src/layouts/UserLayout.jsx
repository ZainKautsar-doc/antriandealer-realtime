import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function UserLayout() {
  return (
    <div className="min-h-screen bg-hero-grid">
      <Navbar />
      <main className="pb-12 pt-8">
        <div className="page-shell">
          <Outlet />
        </div>
      </main>
      <Footer compact />
    </div>
  );
}
