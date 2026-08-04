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
    },

    getApplicationOfJob: async (jobId, page) => {
        const response = await api.get(`/applications/job/${jobId}`, { params: { page }, withCredentials: true });

        return response.data;
    },

    acceptedApplication: async (applicationId) => {
        const response = await api.patch(`/applications/${applicationId}/accepted`, {}, { withCredentials: true });

        return response.data;
    },

    rejectedApplication: async (applicationId) => {
        const response = await api.patch(`/applications/${applicationId}/rejected`, {}, { withCredentials: true });

        return response.data;
    },

    deleteApplication: async (applicationId) => {
        const response = await api.delete(`/applications/${applicationId}`, { withCredentials: true });
        
        return response.data;
    }
}