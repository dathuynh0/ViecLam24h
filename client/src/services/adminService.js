import api from "@/lib/api"

export const adminService = {
    getAllCategory: async (page) => {
        const response = await api.get(`/admin/categories`, { params: { page }, withCredentials: true });

        return response.data;
    },

    createCategory: async (title) => {
        const response = await api.post('/admin/categories', {
            title
        }, { withCredentials: true });

        return response.data;
    },

    getAllJob: async (query) => {
        const response = await api.get('/admin/jobs', { params: query, withCredentials: true });

        return response.data;
    },

    rejectJob: async (jobId) => {
        const response = await api.patch(`/admin/jobs/${jobId}/reject`, {}, { withCredentials: true });

        return response.data;
    },

    activeJob: async (jobId) => {
        const response = await api.patch(`/admin/jobs/${jobId}/active`, {}, { withCredentials: true });

        return response.data;
    },

    deleteJob: async (jobId) => {
        const response = await api.delete(`/admin/jobs/${jobId}`, { withCredentials: true });

        return response.data;
    }
}