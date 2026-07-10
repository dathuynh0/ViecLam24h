import { companyService } from "@/services/companyService";
import { create } from "zustand";

export const useCompanyStore = create((set, get) => ({
    featuredCompany: [],

    getFeaturedCompany: async () => {
        try {
            const { featuredCompany } = await companyService.getFeaturedCompany();

            set({ featuredCompany });
        } catch (error) {
            console.error('Lỗi khi gọi API getFeaturedCompany ', error);
        }
    }
}))