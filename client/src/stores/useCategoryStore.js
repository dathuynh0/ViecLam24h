import { categoryService } from "@/services/categoryService";
import { create } from "zustand";

export const useCategoryStore = create((set, get) => ({
    categories: [],
    category: null,
    categoryLoading: false,

    getAllCategory: async () => {
        const { categories } = await categoryService.getAllCategory();

        set({ categories });
    },

    getCategoryBySlug: async (slug) => {
        try {
            set({ categoryLoading: true });

            const { category } = await categoryService.getCategoryBySlug(slug);

            set({ category });
        } catch (error) {
            console.error('Lỗi khi gọi API getCategoryBySlug ', error);
        } finally {
            set({ categoryLoading: false });
        }
    }
}))