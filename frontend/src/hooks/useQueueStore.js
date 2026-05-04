import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { seededCurrentQueueId, seededQueueEntries } from "../data/mockData";
import { emitRealtimeEvent } from "../lib/socket";
import {
  createActivityLog,
  formatQueueNumber,
  getCurrentQueue,
  getNextQueue,
  getNextQueueIndex,
  getNextSortIndex,
  getQueueForUserToday,
  getTodayKey,
  hasQueueToday,
  sortQueueEntries,
} from "../lib/queue-utils";

const createSeedState = () => ({
  businessDate: getTodayKey(),
  entries: seededQueueEntries,
  currentQueueId: seededCurrentQueueId,
  lastResetAt: new Date().toISOString(),
  lastEvent: {
    type: "queue:seeded",
    message: "Dummy antrian aktif berhasil dimuat.",
    createdAt: new Date().toISOString(),
  },
  activity: [
    createActivityLog(
      "queue:seeded",
      "Dummy antrian aktif berhasil dimuat untuk simulasi realtime.",
    ),
  ],
  connectionState: "connecting",
  lastHeartbeatAt: null,
});

const createEmptyState = (message = "Antrian harian sudah direset.") => ({
  businessDate: getTodayKey(),
  entries: [],
  currentQueueId: null,
  lastResetAt: new Date().toISOString(),
  lastEvent: {
    type: "queue:reset",
    message,
    createdAt: new Date().toISOString(),
  },
  activity: [createActivityLog("queue:reset", message)],
});

const appendActivity = (activity, event, message, tone = "info") =>
  [createActivityLog(event, message, tone), ...activity].slice(0, 10);

const buildSnapshot = (state) => ({
  businessDate: state.businessDate,
  entries: state.entries,
  currentQueueId: state.currentQueueId,
  lastResetAt: state.lastResetAt,
  lastEvent: state.lastEvent,
  activity: state.activity,
});

const broadcastState = (get, event, message) => {
  emitRealtimeEvent(event, {
    snapshot: buildSnapshot(get()),
    meta: {
      message,
      sentAt: new Date().toISOString(),
    },
  });
};

const ensureCurrentBusinessDate = (state) => {
  const today = getTodayKey();
  if (state.businessDate === today) {
    return state;
  }

  return {
    ...state,
    ...createEmptyState("Tanggal berganti, antrian otomatis direset."),
  };
};

export const useQueueStore = create(
  persist(
    (set, get) => ({
      ...createSeedState(),
      syncBusinessDate() {
        let didReset = false;

        set((state) => {
          if (state.businessDate === getTodayKey()) {
            return state;
          }

          didReset = true;
          return {
            ...state,
            ...createEmptyState("Tanggal berganti, antrian otomatis direset."),
          };
        });

        if (didReset) {
          broadcastState(
            get,
            "queue:reset",
            "Tanggal berganti, antrian otomatis direset.",
          );
        }
      },
      setConnectionState(connectionState) {
        set({ connectionState });
      },
      recordHeartbeat(payload) {
        set((state) => ({
          lastHeartbeatAt: payload.sentAt,
        }));
      },
      applyRemoteQueueEvent(event, payload) {
        if (!payload?.snapshot) {
          return;
        }

        set((state) => ({
          ...state,
          ...payload.snapshot,
          activity: appendActivity(
            payload.snapshot.activity ?? state.activity,
            event,
            payload.meta?.message ?? "State antrian diperbarui dari channel realtime.",
          ),
        }));
      },
      takeQueue(profile) {
        let result = null;

        set((state) => {
          const safeState = ensureCurrentBusinessDate(state);

          if (hasQueueToday(safeState.entries, profile.id, safeState.businessDate)) {
            result = {
              ok: false,
              message: "User ini sudah memiliki antrian untuk hari ini.",
            };
            return safeState;
          }

          const queueIndex = getNextQueueIndex(safeState.entries);
          const queueEntry = {
            id: `queue-${Date.now()}`,
            queueNumber: formatQueueNumber(queueIndex),
            profileId: profile.id,
            businessDate: safeState.businessDate,
            name: profile.name,
            phone: profile.phone,
            address: profile.address,
            age: Number(profile.age),
            motorType: profile.motorType,
            licensePlate: profile.licensePlate.toUpperCase(),
            serviceType: profile.serviceType,
            status: "waiting",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sortIndex: getNextSortIndex(safeState.entries),
            skipCount: 0,
          };

          result = {
            ok: true,
            entry: queueEntry,
            message: `${queueEntry.queueNumber} berhasil masuk antrian.`,
          };

          return {
            ...safeState,
            entries: sortQueueEntries([...safeState.entries, queueEntry]),
            lastEvent: {
              type: "queue:updated",
              message: result.message,
              createdAt: new Date().toISOString(),
            },
            activity: appendActivity(safeState.activity, "queue:updated", result.message),
          };
        });

        if (result?.ok) {
          broadcastState(get, "queue:updated", result.message);
        }

        return result;
      },
      cancelQueue(userId) {
        let result = null;

        set((state) => {
          const safeState = ensureCurrentBusinessDate(state);
          const targetEntry = getQueueForUserToday(
            safeState.entries,
            userId,
            safeState.businessDate,
          );

          if (!targetEntry || targetEntry.status === "completed" || targetEntry.status === "cancelled") {
            result = {
              ok: false,
              message: "Tidak ada antrian aktif yang bisa dibatalkan.",
            };
            return safeState;
          }

          const nextEntries = safeState.entries.map((entry) =>
            entry.id === targetEntry.id
              ? {
                  ...entry,
                  status: "cancelled",
                  updatedAt: new Date().toISOString(),
                }
              : entry,
          );

          result = {
            ok: true,
            entry: targetEntry,
            message: `${targetEntry.queueNumber} dibatalkan oleh user.`,
          };

          return {
            ...safeState,
            entries: sortQueueEntries(nextEntries),
            currentQueueId:
              safeState.currentQueueId === targetEntry.id ? null : safeState.currentQueueId,
            lastEvent: {
              type: "queue:updated",
              message: result.message,
              createdAt: new Date().toISOString(),
            },
            activity: appendActivity(safeState.activity, "queue:updated", result.message),
          };
        });

        if (result?.ok) {
          broadcastState(get, "queue:updated", result.message);
        }

        return result;
      },
      adminNextQueue() {
        let result = null;

        set((state) => {
          const safeState = ensureCurrentBusinessDate(state);
          const currentQueue = getCurrentQueue(safeState.entries);
          let nextEntries = [...safeState.entries];

          if (currentQueue) {
            nextEntries = nextEntries.map((entry) =>
              entry.id === currentQueue.id
                ? {
                    ...entry,
                    status: "completed",
                    updatedAt: new Date().toISOString(),
                  }
                : entry,
            );
          }

          const nextQueue = getNextQueue(nextEntries);

          if (!nextQueue) {
            result = {
              ok: Boolean(currentQueue),
              message: currentQueue
                ? `${currentQueue.queueNumber} selesai. Tidak ada antrian menunggu berikutnya.`
                : "Belum ada antrian menunggu untuk dipanggil.",
            };

            return {
              ...safeState,
              entries: sortQueueEntries(nextEntries),
              currentQueueId: null,
              lastEvent: {
                type: "queue:completed",
                message: result.message,
                createdAt: new Date().toISOString(),
              },
              activity: appendActivity(
                safeState.activity,
                "queue:completed",
                result.message,
                currentQueue ? "success" : "warning",
              ),
            };
          }

          nextEntries = nextEntries.map((entry) =>
            entry.id === nextQueue.id
              ? {
                  ...entry,
                  status: "called",
                  updatedAt: new Date().toISOString(),
                }
              : entry,
          );

          result = {
            ok: true,
            entry: nextQueue,
            message: `${nextQueue.queueNumber} sekarang dipanggil ke service bay.`,
          };

          return {
            ...safeState,
            entries: sortQueueEntries(nextEntries),
            currentQueueId: nextQueue.id,
            lastEvent: {
              type: "queue:called",
              message: result.message,
              createdAt: new Date().toISOString(),
            },
            activity: appendActivity(safeState.activity, "queue:called", result.message),
          };
        });

        if (result?.ok) {
          broadcastState(get, "queue:called", result.message);
        }

        return result;
      },
      adminCompleteCurrent() {
        let result = null;

        set((state) => {
          const safeState = ensureCurrentBusinessDate(state);
          const currentQueue = getCurrentQueue(safeState.entries);

          if (!currentQueue) {
            result = {
              ok: false,
              message: "Tidak ada antrian aktif untuk ditandai selesai.",
            };
            return safeState;
          }

          const nextEntries = safeState.entries.map((entry) =>
            entry.id === currentQueue.id
              ? {
                  ...entry,
                  status: "completed",
                  updatedAt: new Date().toISOString(),
                }
              : entry,
          );

          result = {
            ok: true,
            entry: currentQueue,
            message: `${currentQueue.queueNumber} sudah ditandai selesai.`,
          };

          return {
            ...safeState,
            entries: sortQueueEntries(nextEntries),
            currentQueueId: null,
            lastEvent: {
              type: "queue:completed",
              message: result.message,
              createdAt: new Date().toISOString(),
            },
            activity: appendActivity(
              safeState.activity,
              "queue:completed",
              result.message,
              "success",
            ),
          };
        });

        if (result?.ok) {
          broadcastState(get, "queue:completed", result.message);
        }

        return result;
      },
      adminSkipCurrent() {
        let result = null;

        set((state) => {
          const safeState = ensureCurrentBusinessDate(state);
          const currentQueue = getCurrentQueue(safeState.entries);

          if (!currentQueue) {
            result = {
              ok: false,
              message: "Tidak ada antrian aktif untuk dilewati.",
            };
            return safeState;
          }

          const movedSortIndex = getNextSortIndex(safeState.entries);
          let nextEntries = safeState.entries.map((entry) =>
            entry.id === currentQueue.id
              ? {
                  ...entry,
                  status: "waiting",
                  sortIndex: movedSortIndex,
                  skipCount: (entry.skipCount ?? 0) + 1,
                  updatedAt: new Date().toISOString(),
                }
              : entry,
          );

          const nextQueue = getNextQueue(nextEntries);
          if (nextQueue) {
            nextEntries = nextEntries.map((entry) =>
              entry.id === nextQueue.id
                ? {
                    ...entry,
                    status: "called",
                    updatedAt: new Date().toISOString(),
                  }
                : entry,
            );
          }

          result = {
            ok: true,
            entry: nextQueue,
            message: nextQueue
              ? `${currentQueue.queueNumber} dilewati. ${nextQueue.queueNumber} dipanggil berikutnya.`
              : `${currentQueue.queueNumber} dilewati dan belum ada antrian lain.`,
          };

          return {
            ...safeState,
            entries: sortQueueEntries(nextEntries),
            currentQueueId: nextQueue?.id ?? null,
            lastEvent: {
              type: "queue:called",
              message: result.message,
              createdAt: new Date().toISOString(),
            },
            activity: appendActivity(safeState.activity, "queue:called", result.message),
          };
        });

        if (result?.ok) {
          broadcastState(get, "queue:called", result.message);
        }

        return result;
      },
      adminResetQueue() {
        const message = "Admin mereset seluruh antrian hari ini.";

        set((state) => ({
          ...state,
          ...createEmptyState(message),
          activity: appendActivity(state.activity, "queue:reset", message, "warning"),
        }));

        broadcastState(get, "queue:reset", message);
        return { ok: true, message };
      },
    }),
    {
      name: "antriandealer-queue",
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        businessDate: state.businessDate,
        entries: state.entries,
        currentQueueId: state.currentQueueId,
        lastResetAt: state.lastResetAt,
        lastEvent: state.lastEvent,
        activity: state.activity,
      }),
    },
  ),
);
