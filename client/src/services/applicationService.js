import api from "@/lib/api"

export const applicationService = {
    getApplicationByCandidate: async (status) => {
        const response = await api.get('/applications/candidate/me', { params: status, withCredentials: true });

        return response.data;
    }
}