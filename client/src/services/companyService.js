import api from "@/lib/api"

export const companyService = {
    getFeaturedCompany: async () => {
        const response = await api.get('/companies/featured');

        return response.data;
    },

    getCompanyBySlug: async (slug) => {
        const response = await api.get(`/companies/${slug}`, { withCredentials: true });

        return response.data;
    },

    followCompany: async (companyId) => {
        const response = await api.post(`/companies/${companyId}/follow`, {}, { withCredentials: true });

        return response.data;
    },

    countFollow: async (companyId) => {
        const response = await api.get(`/companies/${companyId}/count`, { withCredentials: true });

        return response.data;
    },

    unFollow: async (companyId) => {
        const response = await api.delete(`/companies/${companyId}/unfollow`, { withCredentials: true });

        return response.data;
    }
}