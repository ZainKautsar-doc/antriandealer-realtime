import { HiCheckCircle, HiExclamationCircle, HiInformationCircle } from "react-icons/hi2";
import { useToast } from "../hooks/useToast";

const icons = {
  info: HiInformationCircle,
  success: HiCheckCircle,
  warning: HiExclamationCircle,
  error: HiExclamationCircle,
};

const tones = {
  info: "border-brand-200 bg-brand-50 text-brand-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  error: "border-rose-200 bg-rose-50 text-rose-900",
};

export default function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = icons[toast.tone] ?? icons.info;

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-3xl border p-4 shadow-soft ${tones[toast.tone] ?? tones.info}`}
          >
            <div className="flex items-start gap-3">
              <Icon className="mt-0.5 text-xl" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{toast.title}</p>
                <p className="mt-1 text-sm">{toast.message}</p>
              </div>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="text-sm font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
