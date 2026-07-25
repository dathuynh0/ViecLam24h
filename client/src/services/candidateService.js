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
    },

    updateMyProfile: async (fullName, bio, skill, phone, location, major) => {
        const response = await api.put('/candidates/me', {
            fullName, bio, skill, phone, location, major
        }, { withCredentials: true });

        return response.data;
    },

    updateAvatar: async (avatar) => {
        const formData = new FormData();
        formData.append('avatar', avatar);

        const response = await api.patch('/candidates/avatar', formData, { withCredentials: true });

        return response.data;
    },

    updateCV: async (cv) => {
        const formData = new FormData();
        formData.append('cv', cv);

        const response = await api.patch('/candidates/cv', formData, { withCredentials: true });

        return response.data;
    }
}