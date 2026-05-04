import { Link } from "react-router-dom";
import { HiArrowLongRight, HiOutlineCalendarDays, HiOutlineHome, HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { dealerArticles, dealerGallery, dealerProfile, dealerServices, landingPromos, motorCatalog } from "../data/mockData";
import { useQueueStore } from "../hooks/useQueueStore";
import { getCurrentQueue, getNextQueue } from "../lib/queue-utils";

export default function LandingPage() {
  const entries = useQueueStore((state) => state.entries);
  const currentQueue = getCurrentQueue(entries);
  const nextQueue = getNextQueue(entries);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden bg-slate-900">
        <img
          src="/images/hero.png"
          alt="Dealer Hero"
          className="h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="page-shell">
            <div className="max-w-2xl text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-400">
                Welcome to {dealerProfile.name}
              </p>
              <h1 className="mt-4 text-5xl font-bold leading-tight sm:text-6xl">
                Dealer Motor Honda Impian Anda Hadir di Tasikmalaya
              </h1>
              <p className="mt-6 text-lg text-slate-200">
                {dealerProfile.tagline} Nikmati layanan purna jual terbaik dengan sistem antrian realtime yang transparan.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/login" className="primary-button h-14 px-8 text-base">
                  Login Member
                  <HiArrowLongRight className="text-xl" />
                </Link>
                <Link to="/ambil-antrian" className="secondary-button h-14 bg-white/10 px-8 text-base text-white backdrop-blur hover:bg-white hover:text-slate-900">
                  Ambil Antrian Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Queue Status Section */}
      <section className="relative -mt-16 z-10">
        <div className="page-shell">
          <div className="glass-panel grid gap-8 overflow-hidden bg-white p-0 shadow-2xl lg:grid-cols-3">
            <div className="bg-brand-600 p-8 text-white">
              <h2 className="text-lg font-semibold uppercase tracking-wider">Status Antrian Live</h2>
              <p className="mt-2 text-sm opacity-80">Pantau progres servis secara realtime</p>
              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70">Sedang Dilayani</p>
                  <p className="mt-2 text-5xl font-bold tracking-widest">
                    {currentQueue?.queueNumber ?? "---"}
                  </p>
                  <p className="mt-2 text-sm font-medium italic opacity-90">
                    {currentQueue ? `${currentQueue.serviceType}` : "Belum ada antrian"}
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20">
                  <p className="text-xs uppercase tracking-widest opacity-70">Nomor Berikutnya</p>
                  <p className="mt-2 text-3xl font-bold tracking-wider text-brand-100">
                    {nextQueue?.queueNumber ?? "---"}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-2 p-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-bold text-slate-900">Layanan Cepat</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Ganti oli dan servis rutin ringan tanpa harus menunggu lama dengan jalur ekspres kami.
                </p>
                <Link to="/login" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">
                  Cek Jadwal Booking <HiArrowLongRight />
                </Link>
              </div>
              <div className="rounded-2xl bg-brand-50 p-6 border border-brand-100">
                <h3 className="font-bold text-brand-900">Tips Servis</h3>
                <p className="mt-2 text-sm text-brand-800 italic leading-relaxed">
                  "Lakukan servis rutin setiap 2.000 KM atau 2 bulan sekali untuk menjaga performa mesin tetap optimal."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section */}
      <section className="page-shell mt-24">
        <div className="text-center">
          <p className="section-heading">Penawaran Menarik</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Promo Spesial Bulan Ini</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {landingPromos.map((promo) => (
            <div key={promo.id} className="group relative overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-2 hover:shadow-xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                  {promo.tag}
                </span>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{promo.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {promo.subtitle}
                </p>
                <button className="mt-6 w-full primary-button">Lihat Detail</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Motor Catalog */}
      <section className="mt-24 bg-slate-50 py-24">
        <div className="page-shell">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-heading text-brand-600">Katalog Unit</p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900">Pilih Motor Favorit Anda</h2>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white">Matic</button>
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Sport</button>
              <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cub</button>
            </div>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {motorCatalog.map((motor) => (
              <div key={motor.id} className="glass-panel flex flex-col items-center p-8 text-center transition hover:border-brand-200">
                <img src={motor.image} alt={motor.name} className="h-48 object-contain" />
                <h3 className="mt-6 text-xl font-bold text-slate-900">{motor.name}</h3>
                <p className="mt-1 text-brand-600 font-bold">{motor.price}</p>
                <button className="mt-6 w-full secondary-button hover:bg-brand-600 hover:text-white transition-colors">Cek Promo</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="page-shell mt-24">
        <div className="text-center">
          <p className="section-heading">Layanan Kami</p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900">Perawatan Terbaik Untuk Motor Anda</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dealerServices.map((service, idx) => {
            const Icon = { HiOutlineCalendarDays, HiOutlineWrenchScrewdriver, HiOutlineHome }[service.icon];
            return (
              <div key={idx} className="glass-panel p-8 transition hover:border-brand-200 group">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                  <Icon className="text-2xl" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
                <button className="mt-6 text-sm font-bold text-brand-600 uppercase tracking-widest hover:underline">
                  Info Selengkapnya
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gallery */}
      <section className="mt-24 py-24 bg-brand-900 text-white">
        <div className="page-shell">
          <div className="text-center">
            <p className="text-brand-300 font-semibold uppercase tracking-[0.3em] text-sm">Galeri Dealer</p>
            <h2 className="mt-4 text-3xl font-bold">Fasilitas Nyaman & Modern</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {dealerGallery.map((item) => (
              <div key={item.id} className="group relative aspect-square overflow-hidden rounded-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-semibold">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="page-shell mt-24">
        <div className="flex items-end justify-between">
          <div>
            <p className="section-heading">Artikel Terbaru</p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">Tips & Berita Otomotif</h2>
          </div>
          <button className="hidden md:block secondary-button">Lihat Semua Artikel</button>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {dealerArticles.map((article) => (
            <div key={article.id} className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl bg-slate-200 aspect-video">
                <img src="/images/hero.png" alt="Article" className="h-full w-full object-cover transition group-hover:scale-105" />
              </div>
              <p className="mt-4 text-xs font-bold text-brand-600 uppercase tracking-widest">{article.date}</p>
              <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="page-shell mt-24 mb-10">
        <div className="glass-panel overflow-hidden p-0 shadow-xl lg:flex">
          <div className="bg-white p-10 lg:w-1/2">
            <h2 className="text-2xl font-bold text-slate-900">Kunjungi Dealer Kami</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Tim profesional kami siap melayani segala kebutuhan kendaraan Anda, mulai dari pembelian unit baru hingga perawatan purna jual.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <HiOutlineHome className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Alamat</p>
                  <p className="mt-1 text-sm text-slate-600">{dealerProfile.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <HiOutlineCalendarDays className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Jam Operasional</p>
                  <p className="mt-1 text-sm text-slate-600">{dealerProfile.hours}</p>
                </div>
              </div>
            </div>
            <button className="mt-10 primary-button w-full">Hubungi Kami via WhatsApp</button>
          </div>
          <div className="bg-slate-200 lg:w-1/2">
             <div className="h-full w-full min-h-[300px] bg-slate-300 flex items-center justify-center text-slate-500 italic">
               [Peta Lokasi Dealer Tasikmalaya]
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
