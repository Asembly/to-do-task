import { create } from "zustand"

type Store = {
  active: boolean 
  setActive: () => void
}

export const useStore = create<Store>()((set) => ({
  active: false,
  setActive: () => set((state) => ({ active: !state.active })),
}))

