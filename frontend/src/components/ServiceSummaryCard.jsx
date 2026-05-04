import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import InfoCard from "./InfoCard";
import { formatDateTime } from "../lib/queue-utils";

export default function ServiceSummaryCard({ user, queueEntry }) {
  return (
    <InfoCard
      eyebrow="Detail Servis"
      title="Data pelanggan & motor"
      icon={HiOutlineClipboardDocumentCheck}
      accent="emerald"
    >
      <div className="space-y-4 text-sm text-slate-700">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Jenis Motor
            </p>
            <p className="mt-2 text-base font-medium text-slate-900">{user.motorType}</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Plat Nomor
            </p>
            <p className="mt-2 text-base font-medium text-slate-900">
              {user.licensePlate || "-"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Keperluan Servis
          </p>
          <p className="mt-2 text-base font-medium text-slate-900">{user.serviceType}</p>
        </div>

        <div className="rounded-2xl bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Pengambilan Antrian
          </p>
          <p className="mt-2 text-base font-medium text-slate-900">
            {queueEntry ? formatDateTime(queueEntry.createdAt) : "Belum mengambil antrian hari ini"}
          </p>
        </div>
      </div>
    </InfoCard>
  );
}
