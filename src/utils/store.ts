import { create } from "zustand";

type Store = {
  color_id: string 
  setColorId: (id: string) => void
}

export const useStore = create<Store>()((set) => ({
  color_id: '',
  setColorId: (id) => set({ color_id: id }),
}))