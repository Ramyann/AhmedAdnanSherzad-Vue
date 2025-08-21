import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favoriteStore", {
  state: () => ({
    items: [] as Array<{ id: number; name: string }>,
  }),

  getters: {
    totalFavorites(state) {
      return state.items.length;
    },
    isFavorite: (state) => (id: number) => {
      return state.items.some((item) => item.id === id);
    },
  },

  actions: {
    addFavorite(item: { id: number; name: string }) {
      if (!this.items.some((i) => i.id === item.id)) {
        this.items.push(item);
      }
    },
    removeFavorite(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId);
    },
    toggleFavorite(item: { id: number; name: string }) {
      if (this.isFavorite(item.id)) {
        this.removeFavorite(item.id);
      } else {
        this.addFavorite(item);
      }
    },
    clearFavorites() {
      this.items = [];
    },
  },
});
