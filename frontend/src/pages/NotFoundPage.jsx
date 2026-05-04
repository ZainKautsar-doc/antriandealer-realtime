import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="page-shell py-20">
      <div className="glass-panel mx-auto max-w-2xl p-10 text-center">
        <p className="section-heading">404</p>
        <h1 className="mt-4 text-4xl font-semibold text-slate-900">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-sm leading-6 text-slate-600">
          Rute yang Anda tuju belum tersedia pada implementasi phase 1 ini.
        </p>
        <Link to="/" className="primary-button mt-8">
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
