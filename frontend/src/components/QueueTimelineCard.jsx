import { HiOutlineSignal, HiOutlineSparkles } from "react-icons/hi2";
import InfoCard from "./InfoCard";

export default function QueueTimelineCard({
  currentQueue,
  nextQueue,
  connectionState,
  lastHeartbeatAt,
}) {
  return (
    <InfoCard
      eyebrow="Realtime Queue"
      title="Antrian yang sedang berjalan"
      icon={HiOutlineSignal}
      accent="blue"
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-950 p-5 text-white">
            <p className="text-sm text-slate-300">Sedang dilayani</p>
            <p className="mt-4 text-4xl font-semibold tracking-[0.18em]">
              {currentQueue?.queueNumber ?? "---"}
            </p>
            <p className="mt-3 text-sm text-slate-300">
              {currentQueue
                ? `${currentQueue.name} • ${currentQueue.serviceType}`
                : "Belum ada nomor aktif saat ini."}
            </p>
          </div>

          <div className="rounded-3xl border border-dashed border-brand-200 bg-brand-50 p-5">
            <p className="text-sm text-slate-500">Berikutnya</p>
            <p className="mt-4 text-4xl font-semibold tracking-[0.18em] text-brand-700">
              {nextQueue?.queueNumber ?? "---"}
            </p>
            <p className="mt-3 text-sm text-slate-500">
              {nextQueue
                ? `${nextQueue.name} • ${nextQueue.serviceType}`
                : "Belum ada antrean menunggu."}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                connectionState === "connected"
                  ? "animate-pulse bg-emerald-500"
                  : "bg-slate-300"
              }`}
            />
            {connectionState === "connected" ? "Socket mock terhubung" : "Menghubungkan realtime"}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2">
            <HiOutlineSparkles className="text-brand-600" />
            {lastHeartbeatAt
              ? `Heartbeat terakhir ${new Intl.DateTimeFormat("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                }).format(new Date(lastHeartbeatAt))}`
              : "Menunggu heartbeat pertama"}
          </span>
        </div>
      </div>
    </InfoCard>
  );
}
