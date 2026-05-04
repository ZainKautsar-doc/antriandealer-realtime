import { useState } from "react";
import { HiOutlineBolt, HiOutlineChartBarSquare, HiOutlineSignal, HiOutlineUsers } from "react-icons/hi2";
import ControlPanel from "../components/ControlPanel";
import BigQueueDisplay from "../components/BigQueueDisplay";
import QueueTable from "../components/QueueTable";
import ConfirmDialog from "../components/ConfirmDialog";
import { useQueueStore } from "../hooks/useQueueStore";
import { getCurrentQueue, getNextQueue, sortQueueEntries } from "../lib/queue-utils";
import { useToast } from "../hooks/useToast";

export default function AdminDashboardPage() {
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const entries = useQueueStore((state) => state.entries);
  const activity = useQueueStore((state) => state.activity);
  const connectionState = useQueueStore((state) => state.connectionState);
  const adminNextQueue = useQueueStore((state) => state.adminNextQueue);
  const adminSkipCurrent = useQueueStore((state) => state.adminSkipCurrent);
  const adminCompleteCurrent = useQueueStore((state) => state.adminCompleteCurrent);
  const adminResetQueue = useQueueStore((state) => state.adminResetQueue);
  const { pushToast } = useToast();

  const currentQueue = getCurrentQueue(entries);
  const nextQueue = getNextQueue(entries);
  const orderedEntries = sortQueueEntries(entries);
  const waitingCount = entries.filter((entry) => entry.status === "waiting").length;
  const activeCount = entries.filter((entry) => entry.status === "called").length;
  const completedCount = entries.filter((entry) => entry.status === "completed").length;

  const notifyResult = (title, result, successTone = "success") => {
    pushToast({
      title,
      message: result.message,
      tone: result.ok ? successTone : "warning",
    });
  };

  return (
    <>
      <div className="space-y-6">
        <section id="overview" className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-white">
            <HiOutlineUsers className="text-2xl text-sky-300" />
            <p className="mt-5 text-sm text-slate-400">Total antrian hari ini</p>
            <p className="mt-2 text-4xl font-semibold">{entries.length}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-white">
            <HiOutlineBolt className="text-2xl text-amber-300" />
            <p className="mt-5 text-sm text-slate-400">Menunggu</p>
            <p className="mt-2 text-4xl font-semibold">{waitingCount}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-white">
            <HiOutlineChartBarSquare className="text-2xl text-emerald-300" />
            <p className="mt-5 text-sm text-slate-400">Selesai</p>
            <p className="mt-2 text-4xl font-semibold">{completedCount}</p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 text-white">
            <HiOutlineSignal className="text-2xl text-sky-300" />
            <p className="mt-5 text-sm text-slate-400">Status realtime</p>
            <p className="mt-2 text-2xl font-semibold capitalize">{connectionState}</p>
          </div>
        </section>

        <BigQueueDisplay currentQueue={currentQueue} nextQueue={nextQueue} />

        <ControlPanel
          onNext={() => notifyResult("Next Queue", adminNextQueue())}
          onSkip={() => notifyResult("Queue Dilewati", adminSkipCurrent(), "warning")}
          onComplete={() => notifyResult("Queue Selesai", adminCompleteCurrent())}
          onReset={() => setResetDialogOpen(true)}
          waitingCount={waitingCount}
          activeCount={activeCount}
        />

        <section id="queue-list" className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div>
              <p className="section-heading text-sky-300">Daftar Antrian</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">
                Semua pelanggan aktif dan riwayat hari ini
              </h2>
            </div>
            <QueueTable entries={orderedEntries} />
          </div>

          <div
            id="activity-feed"
            className="rounded-[28px] border border-white/10 bg-white/5 p-6 text-white"
          >
            <p className="section-heading text-sky-300">Activity Feed</p>
            <div className="mt-5 space-y-3">
              {activity.slice(0, 7).map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <p className="text-sm text-slate-100">{item.message}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {new Intl.DateTimeFormat("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(new Date(item.createdAt))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={resetDialogOpen}
        title="Reset antrian hari ini?"
        description="Seluruh nomor, status, dan progres harian akan dikosongkan. Aksi ini dipakai untuk simulasi admin reset sebelum phase 2."
        onCancel={() => setResetDialogOpen(false)}
        onConfirm={() => {
          const result = adminResetQueue();
          pushToast({
            title: "Antrian direset",
            message: result.message,
            tone: "warning",
          });
          setResetDialogOpen(false);
        }}
      />
    </>
  );
}
