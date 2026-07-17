import api from "@/lib/api"

export const applicationService = {
    getApplicationByCandidate: async (status) => {
        const response = await api.get('/applications/candidate/me', { params: status, withCredentials: true });

        return response.data;
    },

    applyJob: async (jobId, cv, introduction) => {
        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('cv', cv);
        formData.append('introduction', introduction);

        const response = await api.post('/applications', formData, { withCredentials: true });

        return response.data;
    }
}