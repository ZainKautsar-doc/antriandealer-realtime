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
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
              <HiOutlineUsers className="text-2xl text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-slate-400">Total antrian hari ini</p>
            <p className="mt-2 text-4xl font-bold text-slate-100">{entries.length}</p>
          </div>
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4">
              <HiOutlineBolt className="text-2xl text-amber-400" />
            </div>
            <p className="text-sm font-medium text-slate-400">Menunggu</p>
            <p className="mt-2 text-4xl font-bold text-slate-100">{waitingCount}</p>
          </div>
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
              <HiOutlineChartBarSquare className="text-2xl text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-slate-400">Selesai</p>
            <p className="mt-2 text-4xl font-bold text-slate-100">{completedCount}</p>
          </div>
          <div className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
              <HiOutlineSignal className="text-2xl text-indigo-400" />
            </div>
            <p className="text-sm font-medium text-slate-400">Status realtime</p>
            <p className="mt-2 text-2xl font-bold capitalize text-slate-100">{connectionState}</p>
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
              <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">Daftar Antrian</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-100">
                Semua pelanggan aktif dan riwayat hari ini
              </h2>
            </div>
            <QueueTable entries={orderedEntries} />
          </div>

          <div
            id="activity-feed"
            className="rounded-[24px] border border-slate-800 bg-slate-950/50 p-6 shadow-sm"
          >
            <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">Activity Feed</p>
            <div className="mt-6 space-y-3">
              {activity.slice(0, 7).map((item) => (
                <div key={item.id} className="rounded-xl border border-slate-800/60 bg-slate-900/80 p-4 transition-colors hover:bg-slate-800">
                  <p className="text-sm text-slate-300 leading-relaxed">{item.message}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
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
