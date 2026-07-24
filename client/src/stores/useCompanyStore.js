import { companyService } from "@/services/companyService";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useCompanyStore = create((set, get) => ({
    featuredCompany: [],
    company: null,
    follows: [],
    companies: [],
    totalPageCompany: null,
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

            await companyService.followCompany(companyId);
            const { countFollow } = useCompanyStore.getState();
            await countFollow(companyId);

            toast.success('Theo dõi công ty thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API followCompany ', error);
            toast.error('Theo dõi công ty không thành công');
        } finally {
            set({ companyLoading: false });
        }
    },

    countFollow: async (companyId) => {
        try {
            const { follows } = await companyService.countFollow(companyId);
            set({ follows });
        } catch (error) {
            console.error('Lỗi khi gọi API followCompany ', error);
        }
    },

    unFollow: async (companyId) => {
        try {
            set({ companyLoading: true });

            await companyService.unFollow(companyId);
            const { countFollow } = useCompanyStore.getState();
            await countFollow(companyId);

            toast.success('Bỏ theo dõi thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API unFollow ', error);
            toast.error('Bỏ theo dõi không thành công')
        } finally {
            set({ companyLoading: false });
        }
    },

    updateMyCompany: async (
        companyName, description, address, taxCode, companySize, website, field
    ) => {
        try {
            set({ companyLoading: true });

            await companyService.updateMyCompany(companyName, description, address, taxCode, companySize, website, field);

            toast.success('Cập nhập thông tin thành công')
        } catch (error) {
            console.error('Lỗi khi goi API updateMyCompany ', error);
            toast.error('Cập nhập thông tin thất bại')
        } finally {
            set({ companyLoading: false });
        }
    },

    updateLogo: async (logo) => {
        try {
            set({ companyLoading: true });

            await companyService.updateLogo(logo);
            const { fetchMe } = useAuthStore.getState();
            await fetchMe();

            toast.success('Cập nhập logo công ty thành công')
        } catch (error) {
            console.error('Lỗi khi goi API updateLogo ', error);
            toast.error('Cập nhập logo công ty thất bại')
        } finally {
            set({ companyLoading: false });
        }
    },

    getAllCompany: async (query) => {
        try {
            set({ companyLoading: true });

            const { totalPage, company } = await companyService.getAllCompany(query);
            set({ totalPageCompany: totalPage, companies: company });
        } catch (error) {
            console.error('Lỗi khi gọi API getAllCompany ', error);
        } finally {
            set({ companyLoading: false });
        }
    }
}))