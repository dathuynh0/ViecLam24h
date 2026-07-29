import api from "@/lib/api"

export const adminService = {
    getAllCategory: async (page) => {
        const response = await api.get(`/admin/categories`, { params: { page }, withCredentials: true });

        return response.data;
    },

    createCategory: async (title) => {
        const response = await api.post('/admin/categories', {
            title
        }, { withCredentials: true });

        return response.data;
    },

    getAllJob: async (query) => {
        const response = await api.get('/admin/jobs', { params: query, withCredentials: true });

        return response.data;
    },

    rejectJob: async (jobId) => {
        const response = await api.patch(`/admin/jobs/${jobId}/reject`, {}, { withCredentials: true });

        return response.data;
    },

    activeJob: async (jobId) => {
        const response = await api.patch(`/admin/jobs/${jobId}/active`, {}, { withCredentials: true });

        return response.data;
    },

    deleteJob: async (jobId) => {
        const response = await api.delete(`/admin/jobs/${jobId}`, { withCredentials: true });

        return response.data;
    },

    getApplicationByJob: async (jobId) => {
        const response = await api.get(`/admin/applications/${jobId}`, { withCredentials: true });

        return response.data;
    },

    getAllCompany: async (query) => {
        const response = await api.get('/admin/companies', { params: query, withCredentials: true });

        return response.data;
    },

    rejectCompany: async (companyId) => {
        const response = await api.patch('/admin/companies/reject', {
            companyId
        }, { withCredentials: true });

        return response.data;
    },

    activeCompany: async (companyId) => {
        const response = await api.patch('/admin/companies/active', {
            companyId
        }, { withCredentials: true });

        return response.data;
    },

    blockLoginCompany: async (companyId) => {
        const response = await api.patch(`/admin/companies/block`, { companyId } ,{ withCredentials: true });

        return response.data;
    },

    deleteCompany: async (companyId) => {
        const response = await api.delete(`/admin/companies/${companyId}`, { withCredentials: true });

        return response.data;
    },

    getAllCandidate: async (query) => {
        const response = await api.get('/admin/candidates', { params: query, withCredentials: true })

        return response.data;
    },

    activeCandidate: async (candidateId) => {
        const response = await api.patch('/admin/candidates/active', {
            candidateId
        }, { withCredentials: true });

        return response.data;
    },

    blockLoginCandidate: async (userId) => {
        const response = await api.patch('/admin/candidates/block', {
            userId
        }, { withCredentials: true });

        return response.data;
    },

    deleteCandidate: async (candidateId) => {
        const response = await api.delete(`/admin/candidates/${candidateId}`, { withCredentials: true });

        return response.data;
    }
}