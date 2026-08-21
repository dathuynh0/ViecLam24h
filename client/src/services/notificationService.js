import api from "@/lib/api"

export const notificationService = {
    getAllNotification: async () => {
        const response = await api.get(`/notifications/`, { withCredentials: true })

        return response.data
    }
}