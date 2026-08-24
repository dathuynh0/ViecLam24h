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

    getAllNotification: async () => {
        try {
            const { notifications } = await notificationService.getAllNotification()
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
            notifications: [notification, ...state.notifications],
            unReadCount: state.unReadCount + 1
        }))
    },

    readNotification: async (notificationId) => {
        set((state) => ({
            notifications: state.notifications.map(n => n.id === notificationId ? {...n, read: true} : n),
            unReadCount: state.unReadCount - 1
        }))
        
        try {
            await notificationService.readNotification(notificationId)
        } catch (error) {
            console.error('Loi khi goi API getAllNotification', error)
        }
    }
}))