import { create } from 'zustand';

interface ColorModeState {
  mode: 'light' | 'dark';
  toggle: () => void;
}

export const useColorModeStore = create<ColorModeState>((set) => ({
  mode: 'dark',
  toggle: () => set((s) => ({ mode: s.mode === 'light' ? 'dark' : 'light' })),
})); 
