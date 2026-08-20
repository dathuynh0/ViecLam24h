import api from "@/lib/api"

export const notificationService = {
    getAllNotification: async (userId) => {
        const response = await api.get(`/notifications/${userId}`, { withCredentials: true })

        return response.data
    }
}