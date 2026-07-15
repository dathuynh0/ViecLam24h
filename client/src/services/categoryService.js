import api from "@/lib/api"


export const categoryService = {
    getAllCategory: async () => {
        const response = await api.get('/categories');

        return response.data;
    },

    getCategoryBySlug: async (slug) => {
        const response = await api.get(`/categories/${slug}`);

        return response.data;
    }
}