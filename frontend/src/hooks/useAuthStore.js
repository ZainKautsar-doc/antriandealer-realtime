import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { adminAccount, dummyUsers } from "../data/mockData";
import { isProfileComplete } from "../lib/queue-utils";

const storageKey = "antriandealer-auth";

const seedUsers = [adminAccount, ...dummyUsers];

const normalizeProfile = (profile) => ({
  ...profile,
  email: profile.email ? profile.email.trim().toLowerCase() : "",
  licensePlate: profile.licensePlate ? profile.licensePlate.toUpperCase().trim() : "",
  profileComplete: isProfileComplete(profile),
});

export const useAuthStore = create(
  persist(
    (set, get) => ({
      users: seedUsers.map(normalizeProfile),
      currentUserId: null,
      loginWithPreset(userId) {
        const selectedUser = get().users.find((user) => user.id === userId);

        if (!selectedUser) {
          return {
            ok: false,
            message: "Akun preset tidak ditemukan.",
          };
        }

        set({ currentUserId: selectedUser.id });
        return { ok: true, user: selectedUser };
      },
      loginWithCredentials({ email, password, name, role = "user" }) {
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = get().users.find((user) => user.email === normalizedEmail);

        if (existingUser) {
          if (existingUser.password !== password) {
            return {
              ok: false,
              message: "Password tidak cocok untuk akun tersebut.",
            };
          }

          set({ currentUserId: existingUser.id });
          return { ok: true, user: existingUser };
        }

        if (role === "admin") {
          return {
            ok: false,
            message: "Akun admin hanya tersedia melalui kredensial yang sudah disediakan.",
          };
        }

        const newUser = normalizeProfile({
          id: `user-${Date.now()}`,
          role: "user",
          name: name?.trim() || normalizedEmail.split("@")[0],
          email: normalizedEmail,
          password,
          phone: "",
          address: "",
          age: "",
          motorType: "",
          licensePlate: "",
          serviceType: "",
          profileComplete: false,
          provider: "manual",
        });

        set((state) => ({
          users: [...state.users, newUser],
          currentUserId: newUser.id,
        }));

        return { ok: true, user: newUser, isNewUser: true };
      },
      loginWithMockGoogle() {
        const candidates = get().users.filter((user) => user.role === "user");
        const randomUser = candidates[Math.floor(Math.random() * candidates.length)];

        set({ currentUserId: randomUser.id });
        return { ok: true, user: randomUser };
      },
      updateProfile(userId, profileData) {
        let updatedUser = null;

        set((state) => ({
          users: state.users.map((user) => {
            if (user.id !== userId) {
              return user;
            }

            updatedUser = normalizeProfile({
              ...user,
              ...profileData,
            });

            return updatedUser;
          }),
        }));

        return updatedUser;
      },
      logout() {
        set({ currentUserId: null });
      },
    }),
    {
      name: storageKey,
      storage: createJSONStorage(() => window.localStorage),
      partialize: (state) => ({
        users: state.users,
        currentUserId: state.currentUserId,
      }),
    },
  ),
);

export const selectCurrentUser = (state) =>
  state.users.find((user) => user.id === state.currentUserId) ?? null;
