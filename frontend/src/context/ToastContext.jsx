import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (toastId) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );
  };

  const pushToast = ({ title, message, tone = "info" }) => {
    const toastId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const nextToast = { id: toastId, title, message, tone };

    setToasts((currentToasts) => [nextToast, ...currentToasts].slice(0, 4));
    window.setTimeout(() => removeToast(toastId), 3600);
  };

  return (
    <ToastContext.Provider value={{ toasts, pushToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext harus dipakai di dalam ToastProvider.");
  }

  return context;
};
