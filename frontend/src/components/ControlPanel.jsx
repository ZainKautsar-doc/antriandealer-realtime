import { HiOutlineArrowPathRoundedSquare, HiOutlineArrowRightCircle, HiOutlineCheckCircle, HiOutlineForward } from "react-icons/hi2";

export default function ControlPanel({
  onNext,
  onSkip,
  onComplete,
  onReset,
  waitingCount,
  activeCount,
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <p className="section-heading text-sky-300">Control Panel</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Kendalikan alur antrian</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <button type="button" onClick={onNext} className="primary-button bg-brand-500 hover:bg-brand-400">
            <HiOutlineArrowRightCircle />
            Next
          </button>
          <button type="button" onClick={onSkip} className="secondary-button border-slate-700 bg-slate-900 text-white hover:border-slate-500">
            <HiOutlineForward />
            Skip
          </button>
          <button type="button" onClick={onComplete} className="secondary-button border-emerald-700 bg-emerald-950/40 text-emerald-100 hover:border-emerald-500">
            <HiOutlineCheckCircle />
            Selesai
          </button>
          <button type="button" onClick={onReset} className="secondary-button border-rose-700 bg-rose-950/30 text-rose-100 hover:border-rose-500">
            <HiOutlineArrowPathRoundedSquare />
            Reset Antrian
          </button>
        </div>
      </div>

      <div className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6">
        <p className="section-heading text-sky-300">Ringkasan</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-sm text-slate-400">Antrian menunggu</p>
            <p className="mt-2 text-4xl font-semibold text-white">{waitingCount}</p>
          </div>
          <div>
            <p className="text-sm text-slate-400">Sedang diproses</p>
            <p className="mt-2 text-4xl font-semibold text-white">{activeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
