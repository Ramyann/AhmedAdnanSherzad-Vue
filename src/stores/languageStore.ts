import { defineStore } from "pinia";

export const useLanguageStore = defineStore("languageStore", {
  state: () => ({
    selected: "EN",
    available: [
      { code: "EN", name: "English" },
      { code: "AR", name: "Arabic" },
      { code: "KU", name: "Kurdish" },
    ] as Array<{ code: string; name: string }>,
  }),

  getters: {
    selectedLanguageName(state) {
      const lang = state.available.find((l) => l.code === state.selected);
      return lang ? lang.name : "Unknown";
    },
  },

  actions: {
    setLanguage(code: string) {
      if (this.available.some((l) => l.code === code)) {
        this.selected = code;
      } else {
        console.warn(`Language code "${code}" is not available`);
      }
    },
  },
});
