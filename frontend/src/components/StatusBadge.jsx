import { getStatusMeta } from "../lib/queue-utils";

export default function StatusBadge({ status }) {
  const meta = getStatusMeta(status);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${meta.tone}`}
    >
      {meta.label}
    </span>
  );
}
