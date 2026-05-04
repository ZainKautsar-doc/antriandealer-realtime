import { dealerProfile } from "../data/mockData";
import { HiOutlineDevicePhoneMobile, HiOutlineEnvelope, HiOutlineMapPin } from "react-icons/hi2";

export default function Footer({ compact = false }) {
  if (compact) {
    return (
      <footer className="mt-12 border-t border-slate-100 bg-white py-8">
        <div className="page-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-slate-500">© 2024 {dealerProfile.name}. All rights reserved.</p>
          <div className="flex gap-6 text-sm font-semibold text-slate-400">
            <a href="#" className="hover:text-brand-600 transition">Privacy Policy</a>
            <a href="#" className="hover:text-brand-600 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-24 bg-slate-950 pt-20 pb-10 text-slate-400">
      <div className="page-shell grid gap-12 lg:grid-cols-4">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-600 rounded-xl flex items-center justify-center text-white font-bold">H</div>
            <p className="text-xl font-bold text-white tracking-tight">Dealer Tasikmalaya</p>
          </div>
          <p className="mt-6 text-sm leading-relaxed">
            Dealer resmi sepeda motor Honda terbaik di Tasikmalaya. Melayani penjualan unit, suku cadang asli, dan servis berkualitas tinggi dengan teknologi realtime.
          </p>
          <div className="mt-8 flex gap-4">
            {['fb', 'ig', 'yt', 'tw'].map(soc => (
              <div key={soc} className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-600 hover:border-brand-600 transition-all cursor-pointer">
                <span className="text-xs font-bold text-white uppercase">{soc}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Layanan</h4>
          <ul className="mt-6 space-y-4 text-sm">
            <li><a href="#" className="hover:text-brand-500 transition">Penjualan Unit</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Servis Berkala</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Suku Cadang Asli</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Klaim Garansi</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Home Service</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Bantuan</h4>
          <ul className="mt-6 space-y-4 text-sm">
            <li><a href="#" className="hover:text-brand-500 transition">Booking Service</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Cek Status Antrian</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Panduan Member</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Lokasi Dealer</a></li>
            <li><a href="#" className="hover:text-brand-500 transition">Kontak Kami</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white">Hubungi Kami</h4>
          <ul className="mt-6 space-y-5 text-sm">
            <li className="flex gap-3">
              <HiOutlineMapPin className="text-brand-500 text-xl shrink-0" />
              <span>{dealerProfile.address}</span>
            </li>
            <li className="flex gap-3">
              <HiOutlineDevicePhoneMobile className="text-brand-500 text-xl shrink-0" />
              <span>Hotline: {dealerProfile.hotline}</span>
            </li>
            <li className="flex gap-3">
              <HiOutlineEnvelope className="text-brand-500 text-xl shrink-0" />
              <span>info@dealertasikmalaya.honda.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="page-shell mt-20 pt-8 border-t border-white/5 flex flex-col items-center justify-between gap-4 sm:flex-row text-xs">
        <p>© 2024 {dealerProfile.name}. Authorized Honda Dealer.</p>
        <p>Design & Development by Phase 1 Frontend Team</p>
      </div>
    </footer>
  );
}
