import StatusBadge from "./StatusBadge";
import { formatTimeOnly } from "../lib/queue-utils";

export default function QueueTable({ entries }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/40">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-200">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.2em] text-slate-400">
            <tr>
              <th className="px-5 py-4">Nomor</th>
              <th className="px-5 py-4">Nama</th>
              <th className="px-5 py-4">Motor</th>
              <th className="px-5 py-4">Plat</th>
              <th className="px-5 py-4">Keperluan</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Waktu</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-5 py-10 text-center text-slate-400">
                  Belum ada antrian hari ini.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="border-t border-white/5">
                  <td className="px-5 py-4 font-semibold text-white">{entry.queueNumber}</td>
                  <td className="px-5 py-4">{entry.name}</td>
                  <td className="px-5 py-4">{entry.motorType}</td>
                  <td className="px-5 py-4">{entry.licensePlate}</td>
                  <td className="px-5 py-4">{entry.serviceType}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={entry.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    {formatTimeOnly(entry.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
