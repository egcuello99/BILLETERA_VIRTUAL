import { create } from "zustand";
import { AuthStatus } from "../../domain/entities/auth.status";
import { StorageAdapter } from "../../config/adapters/storage-adapter";
import { User, UserLogin } from "../../domain/entities/user";
import { authlogins } from "../../actions/auth.actions";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  setUser: (user: User) => void;
  login: (formData: UserLogin) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<void>; // Modificamos el tipo
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  setUser: (user: User) => set({ user }),

  login: async (formData: UserLogin) => {
    const resp = await authlogins(formData);
    if (!resp) {
      set({ status: "unauthenticated", token: undefined, user: undefined });
      return false;
    }

    const user = { cedula: formData.cedula, role: resp.role };

    await StorageAdapter.setItem("user", JSON.stringify(user));
    set({ status: "authenticated", user: user.role });
    return true;
  },

  logout: async () => {
    await StorageAdapter.removeItem("token");
    await StorageAdapter.removeItem("user");

    set({ status: "unauthenticated", token: undefined, user: undefined });
  },

  checkSession: async () => {
    const user = await StorageAdapter.getItem("user");
    if (user) {
      set({
        status: "authenticated",
        user: JSON.parse(user) as User,
      });
    } else {
      set({ status: "unauthenticated", token: undefined, user: undefined });
    }
  },

  // Nueva función para la autenticación biométrica
  authenticateWithBiometrics: async () => {
    const storedUser = await StorageAdapter.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser) as User; // Parseamos el usuario guardado
      set({ status: "authenticated", user: user }); // Cambiamos estado a authenticated usando el usuario guardado
    } else {
      set({ status: "unauthenticated", token: undefined, user: undefined });
    }
  },
}));
