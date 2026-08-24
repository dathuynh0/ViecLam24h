import api from "@/lib/api"

export const notificationService = {
    getAllNotification: async () => {
        const response = await api.get(`/notifications/`, { withCredentials: true })

        return response.data
    },

    readNotification: async (notificationId) => {
        const response = await api.patch(`/notifications/${notificationId}/read`, {}, { withCredentials: true })

        return response.data
    }
}