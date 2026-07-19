import api from "@/lib/api"

export const jobService = {
    getFeaturedJob: async () => {
        const response = await api.get('/jobs/featured');

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
        const response = await api.post('/jobs/', {
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
    }
}