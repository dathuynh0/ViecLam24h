import { companyService } from "@/services/companyService";
import { create } from "zustand";

export const useCompanyStore = create((set, get) => ({
    featuredCompany: [],
    companyLoading: false,

    getFeaturedCompany: async () => {
        try {
            set({ companyLoading: true });
            const { featuredCompany } = await companyService.getFeaturedCompany();

            set({ featuredCompany });
        } catch (error) {
            console.error('Lỗi khi gọi API getFeaturedCompany ', error);
        } finally {
            set({ companyLoading: false });
        }
    }
}))