import { companyService } from "@/services/companyService";
import { toast } from "sonner";
import { create } from "zustand";

export const useCompanyStore = create((set, get) => ({
    featuredCompany: [],
    company: null,
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
    },

    getCompanyBySlug: async (slug) => {
        try {
            set({ companyLoading: true });

            const { company } = await companyService.getCompanyBySlug(slug);
            set({ company });
        } catch (error) {
            console.error('Lỗi khi gọi API getCompanyBySlug ', error);
        } finally {
            set({ companyLoading: false });
        }
    },

    followCompany: async (companyId) => {
        try {
            set({ companyLoading: true });

            const { company } = await companyService.followCompany(companyId);
            set({ company });

            toast.success('Theo dõi công ty thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API followCompany ', error);
            toast.error('Theo dõi công ty không thành công');
        } finally {
            set({ companyLoading: false });
        }
    }
}))