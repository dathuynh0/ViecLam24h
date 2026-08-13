import api from "@/lib/api"

export const jobService = {
    getFeaturedJob: async (location) => {
        const response = await api.get(`/jobs/featured/${location}`);

        return response.data;
    },

    getJobBySlug: async (slug) => {
        const response = await api.get(`/jobs/${slug}/slug`);

        return response.data;
    },

    getJobByCategory: async (slug, filter) => {
        const response = await api.get(`/jobs/${slug}/category`, { params: filter});

        return response.data;
    },

    getSearchJob: async (params) => {
        const response = await api.get('/jobs/search', { params: params, withCredentials: true })

        return response.data;
    },

    createJob: async (
        categoryId,
        title,
        jobRequirement,
        description,
        candidateRequirement,
        benefit,
        salaryMin,
        salaryMax,
        location,
        workTime,
        workType,
        workArrangement,
        quantity,
        expiredAt
    ) => {
        const response = await api.post('/jobs', {
            categoryId,
            title,
            jobRequirement,
            description,
            candidateRequirement,
            benefit,
            salaryMin,
            salaryMax,
            location,
            workTime,
            workType,
            workArrangement,
            quantity,
            expiredAt
        }, { withCredentials: true });

        return response.data;
    },

    getJobCreated: async (page) => {
        const response = await api.get(`/jobs/created`, { params: { page }, withCredentials: true });

        return response.data;
    },

    updateJob: async (
        jobId,
        categoryId,
        title,
        jobRequirement,
        description,
        candidateRequirement,
        benefit,
        salaryMin,
        salaryMax,
        location,
        workTime,
        workType,
        workArrangement,
        quantity,
        expiredAt
    ) => {
        const response = await api.put(`/jobs/${jobId}`, {
            categoryId,
            title,
            jobRequirement,
            description,
            candidateRequirement,
            benefit,
            salaryMin,
            salaryMax,
            location,
            workTime,
            workType,
            workArrangement,
            quantity,
            expiredAt
        }, { withCredentials: true });


        return response.data;
    },

    deleteJob: async (jobId) => {
        const response = await api.delete(`/jobs/${jobId}`, { withCredentials: true });

        return response.data;
    },

    getRelatedJob: async (jobId) => {
        const response = await api.get(`/jobs/${jobId}/related`, { withCredentials: true });

        return response.data;
    },

    toggleJobStatus: async (jobId) => {
        const response = await api.patch(`/jobs/${jobId}/toggle-status`, {}, { withCredentials: true });

        return response.data;
    }
}