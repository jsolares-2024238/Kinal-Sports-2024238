import { create } from "zustand";

export const useUIStore = create((set) => ({
    model: null,
    confirm: null,

    openModal: (title, message, onClose) =>
        set({
            modal: { title, message, onClose }
        }),

    closeModal: () => set({ modal: null }),

    openConfirm: ({ title, message, onClose, onCancel }) =>
        set({
        modal: { title, message, onClose, onCancel }
    }),

    closeConfirm: () => set({confirm: null})
}))