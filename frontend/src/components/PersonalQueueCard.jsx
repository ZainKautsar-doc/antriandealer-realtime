import { HiOutlineClock, HiOutlineQueueList, HiOutlineXMark } from "react-icons/hi2";
import InfoCard from "./InfoCard";
import StatusBadge from "./StatusBadge";

export default function PersonalQueueCard({
  queueEntry,
  queueAheadCount,
  onCancel,
  canCancel,
}) {
  return (
    <InfoCard
      eyebrow="Queue Saya"
      title="Nomor antrian pribadi"
      icon={HiOutlineQueueList}
      accent="amber"
      action={
        queueEntry && canCancel ? (
          <button type="button" onClick={onCancel} className="secondary-button w-full">
            <HiOutlineXMark />
            Batalkan Antrian
          </button>
        ) : null
      }
    >
      {queueEntry ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-3xl bg-white p-5">
            <div>
              <p className="text-sm text-slate-500">Nomor aktif hari ini</p>
              <p className="mt-2 text-4xl font-semibold tracking-[0.18em] text-slate-900">
                {queueEntry.queueNumber}
              </p>
            </div>
            <StatusBadge status={queueEntry.status} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Posisi
              </p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {queueAheadCount} antrean di depan
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                <HiOutlineClock />
                Status layanan
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {queueEntry.status === "waiting" &&
                  "Silakan pantau dashboard. Nomor Anda akan berubah otomatis saat dipanggil."}
                {queueEntry.status === "called" &&
                  "Petugas sedang memanggil Anda ke area service bay."}
                {queueEntry.status === "completed" &&
                  "Servis untuk nomor ini sudah selesai."}
                {queueEntry.status === "cancelled" &&
                  "Antrian dibatalkan dan tidak bisa diambil ulang sampai hari berikutnya."}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-brand-200 bg-white p-6 text-sm text-slate-600">
          Belum ada nomor aktif untuk akun ini pada hari ini. Lengkapi profil lalu ambil
          nomor antrian dari halaman profil.
        </div>
      )}
    </InfoCard>
  );
}
