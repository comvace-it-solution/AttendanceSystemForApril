import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    lastClickedAt: '',
  }),
  actions: {
    increment() {
      this.count += 1
      this.lastClickedAt = new Date().toLocaleTimeString()
    },
  },
})
