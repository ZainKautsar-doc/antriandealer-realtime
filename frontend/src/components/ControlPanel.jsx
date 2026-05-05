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
      <div className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">Control Panel</p>
        <h2 className="mt-2 text-2xl font-bold text-slate-100">Kendalikan alur antrian</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <button type="button" onClick={onNext} className="primary-button bg-indigo-600 hover:bg-indigo-500 border-none shadow-indigo-500/20 shadow-lg text-white">
            <HiOutlineArrowRightCircle className="text-lg" />
            Next
          </button>
          <button type="button" onClick={onSkip} className="secondary-button border-slate-700 bg-slate-800 text-white hover:border-slate-500 hover:bg-slate-700">
            <HiOutlineForward className="text-lg" />
            Skip
          </button>
          <button type="button" onClick={onComplete} className="secondary-button border-emerald-800 bg-emerald-950/40 text-emerald-300 hover:border-emerald-600 hover:text-white">
            <HiOutlineCheckCircle className="text-lg" />
            Selesai
          </button>
          <button type="button" onClick={onReset} className="secondary-button border-rose-800 bg-rose-950/40 text-rose-300 hover:border-rose-600 hover:text-white">
            <HiOutlineArrowPathRoundedSquare className="text-lg" />
            Reset Antrian
          </button>
        </div>
      </div>

      <div className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">Ringkasan</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <p className="text-sm font-medium text-slate-400">Antrian menunggu</p>
            <p className="mt-2 text-4xl font-bold text-slate-100">{waitingCount}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-400">Sedang diproses</p>
            <p className="mt-2 text-4xl font-bold text-slate-100">{activeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
