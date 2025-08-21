import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: null as null | {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    },
    isLoggedIn: false,
  }),

  getters: {
    displayName(state) {
      return state.user ? state.user.name : "Guest";
    },
  },

  actions: {
    login(userData: {
      id: number;
      name: string;
      email: string;
      avatar?: string;
    }) {
      this.user = userData;
      this.isLoggedIn = true;
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
    updateUser(
      updates: Partial<{ name: string; email: string; avatar?: string }>,
    ) {
      if (this.user) {
        this.user = { ...this.user, ...updates };
      }
    },
  },
});
