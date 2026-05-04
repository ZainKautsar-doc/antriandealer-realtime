import { ToastProvider } from "./ToastContext";
import ToastViewport from "../components/ToastViewport";
import { useRealtimeQueue } from "../hooks/useRealtimeQueue";

export default function AppProviders({ children }) {
  useRealtimeQueue();

  return (
    <ToastProvider>
      {children}
      <ToastViewport />
    </ToastProvider>
  );
}
