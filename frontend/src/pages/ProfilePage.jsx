import { HiOutlineQueueList, HiOutlineUserCircle } from "react-icons/hi2";
import ProfileForm from "../components/ProfileForm";
import InfoCard from "../components/InfoCard";
import { selectCurrentUser, useAuthStore } from "../hooks/useAuthStore";
import { useQueueStore } from "../hooks/useQueueStore";
import { getQueueForUserToday } from "../lib/queue-utils";
import { useToast } from "../hooks/useToast";

export default function ProfilePage() {
  const currentUser = useAuthStore(selectCurrentUser);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const businessDate = useQueueStore((state) => state.businessDate);
  const entries = useQueueStore((state) => state.entries);
  const takeQueue = useQueueStore((state) => state.takeQueue);
  const queueEntry = getQueueForUserToday(entries, currentUser.id, businessDate);
  const { pushToast } = useToast();

  const handleSaveProfile = (profileValues) => {
    updateProfile(currentUser.id, profileValues);
    pushToast({
      title: "Profil tersimpan",
      message: "Data pelanggan berhasil diperbarui.",
      tone: "success",
    });
  };

  const handleSaveAndQueue = (profileValues) => {
    const updatedUser = updateProfile(currentUser.id, profileValues);
    const result = takeQueue(updatedUser);

    if (!result.ok) {
      pushToast({
        title: "Ambil antrian gagal",
        message: result.message,
        tone: "warning",
      });
      return;
    }

    pushToast({
      title: "Nomor berhasil dibuat",
      message: `${result.entry.queueNumber} masuk ke antrian hari ini.`,
      tone: "success",
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <ProfileForm
        initialValues={currentUser}
        onSaveProfile={handleSaveProfile}
        onSaveAndQueue={handleSaveAndQueue}
        queueLocked={Boolean(queueEntry)}
      />

      <div className="space-y-6">
        <InfoCard
          eyebrow="Akun Saya"
          title="Ringkasan profil"
          icon={HiOutlineUserCircle}
          accent="slate"
        >
          <div className="space-y-4 text-sm text-slate-700">
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
              <p className="mt-2 font-medium text-slate-900">{currentUser.email}</p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Nomor HP</p>
              <p className="mt-2 font-medium text-slate-900">
                {currentUser.phone || "Belum diisi"}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Alamat</p>
              <p className="mt-2 text-slate-900">
                {currentUser.address || "Belum diisi"}
              </p>
            </div>
          </div>
        </InfoCard>

        <InfoCard
          eyebrow="Status Hari Ini"
          title="Hak pengambilan nomor"
          icon={HiOutlineQueueList}
          accent="blue"
        >
          <div className="rounded-3xl bg-white p-5 text-sm text-slate-700">
            {queueEntry ? (
              <>
                <p className="font-semibold text-slate-900">
                  Anda sudah mengambil nomor {queueEntry.queueNumber}.
                </p>
                <p className="mt-3 leading-6">
                  Sesuai aturan phase 1, satu user hanya bisa memiliki satu antrian per hari.
                  Tombol pengambilan antrian baru akan aktif kembali setelah reset harian atau
                  reset oleh admin.
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-slate-900">
                  Anda masih bisa mengambil satu nomor antrian hari ini.
                </p>
                <p className="mt-3 leading-6">
                  Simpan profil lalu gunakan tombol "Simpan & Ambil Nomor Antrian" untuk
                  membuat nomor baru dengan format berurutan.
                </p>
              </>
            )}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
