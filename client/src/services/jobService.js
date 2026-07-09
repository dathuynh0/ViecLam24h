import api from "@/lib/api"

export const jobService = {
    getFeaturedJob: async () => {
        const response = await api.get('/jobs/featured');

        return response.data;
    }
}