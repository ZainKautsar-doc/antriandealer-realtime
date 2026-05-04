import { useEffect } from "react";
import { getQueueSocket } from "../lib/socket";
import { useQueueStore } from "./useQueueStore";

export const useRealtimeQueue = () => {
  const setConnectionState = useQueueStore((state) => state.setConnectionState);
  const recordHeartbeat = useQueueStore((state) => state.recordHeartbeat);
  const applyRemoteQueueEvent = useQueueStore((state) => state.applyRemoteQueueEvent);
  const syncBusinessDate = useQueueStore((state) => state.syncBusinessDate);

  useEffect(() => {
    const socket = getQueueSocket();

    const handleConnect = () => setConnectionState("connected");
    const handleDisconnect = () => setConnectionState("disconnected");
    const handleHeartbeat = (payload) => recordHeartbeat(payload);
    const handleQueueUpdated = (payload) => applyRemoteQueueEvent("queue:updated", payload);
    const handleQueueCalled = (payload) => applyRemoteQueueEvent("queue:called", payload);
    const handleQueueCompleted = (payload) =>
      applyRemoteQueueEvent("queue:completed", payload);
    const handleQueueReset = (payload) => applyRemoteQueueEvent("queue:reset", payload);

    syncBusinessDate();
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("socket:heartbeat", handleHeartbeat);
    socket.on("queue:updated", handleQueueUpdated);
    socket.on("queue:called", handleQueueCalled);
    socket.on("queue:completed", handleQueueCompleted);
    socket.on("queue:reset", handleQueueReset);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("socket:heartbeat", handleHeartbeat);
      socket.off("queue:updated", handleQueueUpdated);
      socket.off("queue:called", handleQueueCalled);
      socket.off("queue:completed", handleQueueCompleted);
      socket.off("queue:reset", handleQueueReset);
    };
  }, [applyRemoteQueueEvent, recordHeartbeat, setConnectionState, syncBusinessDate]);
};
