import { dealerProfile } from "../data/mockData";

export default function Footer({ compact = false }) {
  return (
    <footer
      className={`border-t border-white/70 bg-white/70 backdrop-blur ${
        compact ? "mt-6" : "mt-12"
      }`}
    >
      <div className="page-shell flex flex-col gap-3 py-6 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-semibold text-slate-900">{dealerProfile.name}</p>
          <p>{dealerProfile.address}</p>
        </div>
        <div className="flex flex-col gap-1 lg:items-end">
          <p>{dealerProfile.hours}</p>
          <p>Hotline: {dealerProfile.hotline}</p>
        </div>
      </div>
    </footer>
  );
}
