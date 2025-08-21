import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    items: [] as Array<{ id: number; quantity: number }>,
  }),

  getters: {
    totalCount(state) {
      return state.items.length;
    },
  },

  actions: {
    addItem(item: { id: number; quantity: number }) {
      this.items.push(item);
    },
    removeItem(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId);
    },
    clearCart() {
      this.items = [];
    },
  },
});
