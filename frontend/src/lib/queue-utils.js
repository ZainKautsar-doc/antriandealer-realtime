export const QUEUE_PREFIX = "A";

export const statusMeta = {
  waiting: {
    label: "Menunggu",
    tone: "text-amber-700 bg-amber-100 border-amber-200",
  },
  called: {
    label: "Dipanggil",
    tone: "text-sky-700 bg-sky-100 border-sky-200",
  },
  completed: {
    label: "Selesai",
    tone: "text-emerald-700 bg-emerald-100 border-emerald-200",
  },
  cancelled: {
    label: "Dibatalkan",
    tone: "text-rose-700 bg-rose-100 border-rose-200",
  },
};

export const getTodayKey = (date = new Date()) => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 10);
};

export const formatQueueNumber = (queueIndex) =>
  `${QUEUE_PREFIX}-${String(queueIndex).padStart(3, "0")}`;

export const parseQueueNumber = (queueNumber) =>
  Number(queueNumber.replace(`${QUEUE_PREFIX}-`, "")) || 0;

export const getStatusMeta = (status) => statusMeta[status] ?? statusMeta.waiting;

export const formatDateTime = (value) =>
  new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

export const formatTimeOnly = (value) =>
  new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));

export const isActiveStatus = (status) => status === "waiting" || status === "called";

export const sortQueueEntries = (entries) => {
  const rank = {
    called: 0,
    waiting: 1,
    completed: 2,
    cancelled: 3,
  };

  return [...entries].sort((left, right) => {
    if (left.status !== right.status) {
      return rank[left.status] - rank[right.status];
    }

    if (left.status === "completed" || left.status === "cancelled") {
      return new Date(right.updatedAt) - new Date(left.updatedAt);
    }

    return left.sortIndex - right.sortIndex;
  });
};

export const getCurrentQueue = (entries) =>
  sortQueueEntries(entries).find((entry) => entry.status === "called") ?? null;

export const getNextQueue = (entries) =>
  [...entries]
    .filter((entry) => entry.status === "waiting")
    .sort((left, right) => left.sortIndex - right.sortIndex)[0] ?? null;

export const getQueueForUserToday = (entries, userId, businessDate) =>
  [...entries]
    .filter((entry) => entry.profileId === userId && entry.businessDate === businessDate)
    .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))[0] ?? null;

export const hasQueueToday = (entries, userId, businessDate) =>
  entries.some((entry) => entry.profileId === userId && entry.businessDate === businessDate);

export const getNextQueueIndex = (entries) => {
  const currentMax = entries.reduce(
    (highest, entry) => Math.max(highest, parseQueueNumber(entry.queueNumber)),
    0,
  );

  return currentMax + 1;
};

export const getNextSortIndex = (entries) =>
  entries.reduce((highest, entry) => Math.max(highest, entry.sortIndex ?? 0), 0) + 1;

export const getQueueAheadCount = (entries, queueEntry) => {
  if (!queueEntry) {
    return 0;
  }

  const currentQueue = getCurrentQueue(entries);
  const waitingAhead = entries.filter(
    (entry) =>
      entry.status === "waiting" &&
      entry.sortIndex < queueEntry.sortIndex &&
      entry.businessDate === queueEntry.businessDate,
  ).length;

  const currentOffset =
    currentQueue && currentQueue.sortIndex < queueEntry.sortIndex ? 1 : 0;

  return waitingAhead + currentOffset;
};

export const profileFields = [
  "name",
  "phone",
  "address",
  "age",
  "motorType",
  "licensePlate",
  "serviceType",
];

export const isProfileComplete = (profile) =>
  profileFields.every((field) => Boolean(profile?.[field]));

export const createActivityLog = (event, message, tone = "info") => ({
  id: `${event}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  event,
  message,
  tone,
  createdAt: new Date().toISOString(),
});
