import { notificationService } from "@/services/notificationService"
import { create } from "zustand"

export const useNotification = create((set, get) => ({
    notifications: [],
    unReadCount: 0,

    reset: () => {
        set({
            notifications: [],
            unReadCount: 0
        })
    },

    getAllNotification: async (userId) => {
        try {
            const { notifications } = await notificationService.getAllNotification(userId)
            set({ 
                notifications,
                unReadCount: notifications.filter(n => !n.read).length
            })
        } catch (error) {
            console.error('Loi khi goi API getAllNotification', error)
        }
    },

    addNotification: (notification) => {
        set((state) => ({
            notifications: [notification, ...state.notification],
            unReadCount: state.unReadCount + 1
        }))
    },

}))