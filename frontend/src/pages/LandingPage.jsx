import { Link } from "react-router-dom";
import { HiArrowLongRight, HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { dealerProfile, dummyStats, landingHighlights } from "../data/mockData";
import { useQueueStore } from "../hooks/useQueueStore";
import { getCurrentQueue, getNextQueue } from "../lib/queue-utils";

export default function LandingPage() {
  const entries = useQueueStore((state) => state.entries);
  const currentQueue = getCurrentQueue(entries);
  const nextQueue = getNextQueue(entries);

  return (
    <div className="pb-8">
      <section className="page-shell pt-10 sm:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="glass-panel bg-hero-grid p-8 sm:p-10">
            <p className="section-heading">Sistem Antrian Bengkel</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Servis motor lebih rapi dengan dashboard realtime untuk pelanggan dan admin.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              {dealerProfile.description} Landing page ini menampilkan mock data aktif,
              alur login, serta kesiapan integrasi API dan Socket.IO untuk fase backend.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/login" className="primary-button">
                Login Sekarang
                <HiArrowLongRight />
              </Link>
              <Link to="/ambil-antrian" className="secondary-button">
                Ambil Nomor Antrian
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {dummyStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-white/90 p-5">
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel overflow-hidden p-0">
            <div className="bg-slate-950 p-6 text-white">
              <p className="section-heading text-sky-300">Live Preview</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Sedang dilayani</p>
                  <p className="mt-3 text-5xl font-semibold tracking-[0.2em]">
                    {currentQueue?.queueNumber ?? "---"}
                  </p>
                  <p className="mt-3 text-sm text-slate-300">
                    {currentQueue
                      ? `${currentQueue.name} • ${currentQueue.serviceType}`
                      : "Belum ada nomor aktif"}
                  </p>
                </div>

                <div className="rounded-3xl border border-sky-300/15 bg-brand-500/10 p-5">
                  <p className="text-sm text-sky-100">Nomor berikutnya</p>
                  <p className="mt-3 text-4xl font-semibold tracking-[0.18em] text-white">
                    {nextQueue?.queueNumber ?? "---"}
                  </p>
                  <p className="mt-3 text-sm text-sky-100">
                    {nextQueue ? nextQueue.name : "Menunggu antrian baru"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-6">
              {landingHighlights.map((item) => (
                <div key={item.title} className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-12 grid gap-4 md:grid-cols-3">
        <div className="glass-panel p-6">
          <HiOutlineWrenchScrewdriver className="text-2xl text-brand-600" />
          <h2 className="mt-4 text-xl font-semibold">Alur servis lebih jelas</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Pelanggan melihat status menunggu, dipanggil, hingga selesai dalam satu layar.
          </p>
        </div>
        <div className="glass-panel p-6">
          <HiOutlineSparkles className="text-2xl text-brand-600" />
          <h2 className="mt-4 text-xl font-semibold">UI modern & responsif</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Dibangun mobile-first dengan card besar, kontrol jelas, dan struktur siap dipoles lebih lanjut.
          </p>
        </div>
        <div className="glass-panel p-6">
          <HiOutlineShieldCheck className="text-2xl text-brand-600" />
          <h2 className="mt-4 text-xl font-semibold">Siap ke backend phase 2</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Socket mock, API client, dan persistence localStorage sudah dipisah agar migrasi lebih mulus.
          </p>
        </div>
      </section>
    </div>
  );
}
