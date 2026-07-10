import api from "@/lib/api"

export const companyService = {
    getFeaturedCompany: async () => {
        const response = await api.get('/companies/featured');

        return response.data;
    }
}