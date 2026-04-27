import { create } from 'zustand';

export const useUIStore = create((set) => ({
  modal: null,
  confirm: null,

  openModal: (title, message, onClose) =>
    set({
      modal: { title, message, onClose },
    }),

  closeModal: () => set({ modal: null }),

  openConfirm: ({ title, message, onClose, onCancel, onConfirm }) =>
    set({
      confirm: { title, message, onClose, onCancel, onConfirm },
    }),

  closeConfirm: () => set({ confirm: null }),
}));
