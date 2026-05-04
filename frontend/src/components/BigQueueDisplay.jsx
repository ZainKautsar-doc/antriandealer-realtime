export default function BigQueueDisplay({ currentQueue, nextQueue }) {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-[32px] border border-sky-400/20 bg-gradient-to-br from-brand-600 to-sky-500 p-6 text-white">
        <p className="section-heading text-sky-100">Display Utama</p>
        <p className="mt-4 text-sm text-sky-100">Nomor yang sedang dilayani</p>
        <p className="mt-4 text-6xl font-semibold tracking-[0.24em] sm:text-7xl">
          {currentQueue?.queueNumber ?? "---"}
        </p>
        <p className="mt-4 text-sm text-sky-50">
          {currentQueue
            ? `${currentQueue.name} • ${currentQueue.serviceType}`
            : "Belum ada nomor aktif saat ini."}
        </p>
      </div>

      <div className="rounded-[32px] border border-white/10 bg-slate-950/50 p-6 text-white">
        <p className="section-heading text-sky-300">Next Queue</p>
        <p className="mt-4 text-sm text-slate-400">Nomor berikutnya</p>
        <p className="mt-4 text-5xl font-semibold tracking-[0.2em]">
          {nextQueue?.queueNumber ?? "---"}
        </p>
        <p className="mt-4 text-sm text-slate-300">
          {nextQueue
            ? `${nextQueue.name} • ${nextQueue.motorType}`
            : "Belum ada nomor tunggu berikutnya."}
        </p>
      </div>
    </div>
  );
}
