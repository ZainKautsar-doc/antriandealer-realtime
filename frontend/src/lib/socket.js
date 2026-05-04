import { io } from "socket.io-client";
import { broadcastMockEvent, createMockSocket } from "./mockSocket";

const useRealSocket =
  import.meta.env.VITE_ENABLE_REAL_SOCKET === "true" &&
  Boolean(import.meta.env.VITE_API_URL);

let socketInstance = null;

export const getQueueSocket = () => {
  if (socketInstance) {
    return socketInstance;
  }

  socketInstance = useRealSocket
    ? io(import.meta.env.VITE_API_URL, {
        autoConnect: false,
        transports: ["websocket"],
      })
    : createMockSocket();

  return socketInstance;
};

export const emitRealtimeEvent = (event, payload) => {
  if (useRealSocket) {
    const socket = getQueueSocket();
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit(event, payload);
    return;
  }

  broadcastMockEvent(event, payload);
};

export const isMockSocketMode = !useRealSocket;
