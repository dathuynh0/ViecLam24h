import api from "@/lib/api"

export const candidateService = {
    saveJob: async (jobId) => {
        const response = await api.post('/candidates/job-save', {
            jobId
        }, { withCredentials: true });

        return response.data;
    },

    getAllJobSave: async () => {
        const response = await api.get('/candidates/job-save/me', { withCredentials: true });

        return response.data;
    },

    deleteJobSave: async (jobsaveId) => {
        const response = await api.delete(`/candidates/job-save/${jobsaveId}`, { withCredentials: true })

        return response.data;
    }
}