const tabId = `tab-${Math.random().toString(36).slice(2, 10)}`;
const clients = new Map();
const heartbeatMs = 4000;
let heartbeatTimer = null;

const channel =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel("antriandealer-realtime")
    : null;

const triggerClient = (client, event, payload) => {
  const handlers = client.handlers.get(event) ?? new Set();
  handlers.forEach((handler) => handler(payload));
};

const ensureHeartbeat = () => {
  if (heartbeatTimer || clients.size === 0) {
    return;
  }

  heartbeatTimer = window.setInterval(() => {
    const payload = {
      connectedClients: clients.size,
      sentAt: new Date().toISOString(),
    };

    clients.forEach((client) => {
      if (client.connected) {
        triggerClient(client, "socket:heartbeat", payload);
      }
    });

    channel?.postMessage({
      kind: "heartbeat",
      originTabId: tabId,
      payload,
    });
  }, heartbeatMs);
};

const clearHeartbeatIfIdle = () => {
  if (clients.size !== 0 || !heartbeatTimer) {
    return;
  }

  window.clearInterval(heartbeatTimer);
  heartbeatTimer = null;
};

channel?.addEventListener("message", (messageEvent) => {
  const { kind, originTabId, event, payload } = messageEvent.data ?? {};

  if (originTabId === tabId) {
    return;
  }

  if (kind === "heartbeat") {
    clients.forEach((client) => {
      if (client.connected) {
        triggerClient(client, "socket:heartbeat", payload);
      }
    });

    return;
  }

  if (kind === "broadcast") {
    clients.forEach((client) => {
      if (client.connected) {
        triggerClient(client, event, payload);
      }
    });
  }
});

export const broadcastMockEvent = (event, payload) => {
  channel?.postMessage({
    kind: "broadcast",
    originTabId: tabId,
    event,
    payload,
  });
};

export const createMockSocket = () => {
  const socketId = `socket-${Math.random().toString(36).slice(2, 10)}`;
  const client = {
    id: socketId,
    connected: false,
    handlers: new Map(),
    connect() {
      if (client.connected) {
        return client;
      }

      client.connected = true;
      clients.set(socketId, client);
      ensureHeartbeat();
      window.setTimeout(() => triggerClient(client, "connect"), 100);
      return client;
    },
    disconnect() {
      if (!client.connected) {
        return client;
      }

      client.connected = false;
      clients.delete(socketId);
      clearHeartbeatIfIdle();
      triggerClient(client, "disconnect", "io client disconnect");
      return client;
    },
    on(event, handler) {
      const handlers = client.handlers.get(event) ?? new Set();
      handlers.add(handler);
      client.handlers.set(event, handlers);
      return client;
    },
    off(event, handler) {
      if (!client.handlers.has(event)) {
        return client;
      }

      if (!handler) {
        client.handlers.delete(event);
        return client;
      }

      const handlers = client.handlers.get(event);
      handlers.delete(handler);
      if (handlers.size === 0) {
        client.handlers.delete(event);
      }
      return client;
    },
    emit(event, payload) {
      console.info("[mock-socket emit]", event, payload);
      return client;
    },
  };

  return client;
};
