// store/store.js
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  // 🗂️ State : données globales
  state: () => ({
    id_entreprise: null,
    clients: [],
    loading: false,
    error: null,
    campagne:null,
  }),

  actions: {
    setLoading(value) {
      this.loading = value;
    }
  },
})