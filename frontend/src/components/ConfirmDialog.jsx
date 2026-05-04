export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
      <div
        className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-soft"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <h2 id="dialog-title" className="text-2xl font-semibold text-slate-900">
          {title}
        </h2>
        <p className="mt-3 text-sm text-slate-600">{description}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="secondary-button">
            Batal
          </button>
          <button type="button" onClick={onConfirm} className="primary-button bg-rose-600 hover:bg-rose-700">
            Ya, lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
}
