import { categoryService } from "@/services/categoryService";
import { create } from "zustand";

export const useCategoryStore = create((set, get) => ({
    categories: [],

    getAllCategory: async () => {
        const { categories } = await categoryService.getAllCategory();

        set({ categories });
    }
}))