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
        const response = await api.patch(`/companies/${companyId}/follow`, {}, { withCredentials: true });

        return response.data;
    }
}