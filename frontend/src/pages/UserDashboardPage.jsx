import { Link } from "react-router-dom";
import { HiOutlineArrowPathRoundedSquare, HiOutlineQueueList, HiOutlineUser } from "react-icons/hi2";
import PersonalQueueCard from "../components/PersonalQueueCard";
import QueueTimelineCard from "../components/QueueTimelineCard";
import ServiceSummaryCard from "../components/ServiceSummaryCard";
import InfoCard from "../components/InfoCard";
import { selectCurrentUser, useAuthStore } from "../hooks/useAuthStore";
import { useQueueStore } from "../hooks/useQueueStore";
import {
  getCurrentQueue,
  getNextQueue,
  getQueueAheadCount,
  getQueueForUserToday,
} from "../lib/queue-utils";
import { useToast } from "../hooks/useToast";

export default function UserDashboardPage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const entries = useQueueStore((state) => state.entries);
  const businessDate = useQueueStore((state) => state.businessDate);
  const activity = useQueueStore((state) => state.activity);
  const connectionState = useQueueStore((state) => state.connectionState);
  const lastHeartbeatAt = useQueueStore((state) => state.lastHeartbeatAt);
  const cancelQueue = useQueueStore((state) => state.cancelQueue);
  const { pushToast } = useToast();

  const currentQueue = getCurrentQueue(entries);
  const nextQueue = getNextQueue(entries);
  const personalQueue = getQueueForUserToday(entries, currentUser.id, businessDate);
  const queueAheadCount = getQueueAheadCount(entries, personalQueue);

  const handleCancelQueue = () => {
    const result = cancelQueue(currentUser.id);

    pushToast({
      title: result.ok ? "Antrian dibatalkan" : "Aksi tidak dapat dilakukan",
      message: result.message,
      tone: result.ok ? "warning" : "error",
    });
  };

  return (
    <div className="space-y-6">
      <section className="glass-panel bg-hero-grid p-6 sm:p-8">
        <p className="section-heading">Ruang Antrian</p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-950">
              Halo, {currentUser.name}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Semua update antrian untuk akun Anda akan muncul di sini secara realtime.
              Gunakan halaman profil untuk memperbarui data motor atau mengambil nomor baru
              pada hari berikutnya.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/profile" className="secondary-button">
              <HiOutlineUser />
              Edit Profil
            </Link>
            {personalQueue ? (
              <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500">
                <HiOutlineQueueList />
                Nomor Hari Ini Sudah Diambil
              </div>
            ) : (
              <Link to="/profile" className="primary-button">
                <HiOutlineQueueList />
                Ambil Nomor Baru
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <PersonalQueueCard
          queueEntry={personalQueue}
          queueAheadCount={queueAheadCount}
          onCancel={handleCancelQueue}
          canCancel={personalQueue?.status === "waiting" || personalQueue?.status === "called"}
        />
        <QueueTimelineCard
          currentQueue={currentQueue}
          nextQueue={nextQueue}
          connectionState={connectionState}
          lastHeartbeatAt={lastHeartbeatAt}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <ServiceSummaryCard user={currentUser} queueEntry={personalQueue} />

        <InfoCard
          eyebrow="Realtime Feed"
          title="Aktivitas terakhir"
          icon={HiOutlineArrowPathRoundedSquare}
          accent="slate"
        >
          <div className="space-y-3">
            {activity.slice(0, 5).map((item) => (
              <div key={item.id} className="rounded-2xl bg-white p-4">
                <p className="text-sm font-medium text-slate-900">{item.message}</p>
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
        </InfoCard>
      </section>
    </div>
  );
}
