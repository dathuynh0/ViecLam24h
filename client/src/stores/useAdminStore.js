import { adminService } from "@/services/adminService";
import { toast } from "sonner";
import { create } from "zustand";

export const useAdminStore = create((set, get) => ({
    categories: [],
    totalPageCategory: null,
    jobs: [],
    totalPageJob: null,
    applications: [],
    companies: [],
    totalPageCompany: null,
    candidates: [],
    totalPageCandidate: null,
    adminLoading: false,

    getAllCategory: async (page) => {
        try {
            set({ adminLoading: true });

            const { categories, totalPage } = await adminService.getAllCategory(page);
            set({ categories, totalPageCategory: totalPage })
        } catch (error) {
            console.error('Lỗi khi gọi API getAllCategory ', error);
        } finally {
            set({ adminLoading: false });
        }
    },

    createCategory: async (title) => {
        try {
            set({ adminLoading: true });

            await adminService.createCategory(title);

            toast.success('Tạo danh mục thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API createCategory ', error);
            toast.error('Tạo danh mục thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    getAllJob: async (query) => {
        try {
            set({ adminLoading: true });

            const { jobs, totalPage } = await adminService.getAllJob(query);
            
            set({ jobs, totalPageJob: totalPage });
        } catch (error) {
            console.error('Lỗi khi gọi api getAllJob ', error)
        } finally {
            set({ adminLoading: false });
        }
    },

    rejectJob: async (jobId) => {
        try {
            set({ adminLoading: true });

            await adminService.rejectJob(jobId);

            toast.success('Từ chối duyệt thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api rejectJob ', error)
            toast.error('Từ chối thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    activeJob: async (jobId) => {
        try {
            set({ adminLoading: true });

            await adminService.activeJob(jobId);

            toast.success('Duyệt bài đăng tuyển dụng thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api activeJob ', error)
            toast.error('Duyệt bài đăng tuyển dụng thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    deleteJob: async (jobId) => {
        try {
            set({ adminLoading: true });

            await adminService.deleteJob(jobId);
            const { getAllJob } = useAdminStore.getState();
            await getAllJob();

            toast.success('Xóa bài đăng tuyển dụng thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api deleteJob ', error)
            toast.error('Xóa bài đăng tuyển dụng thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    getApplicationByJob: async (jobId) => {
        try {
            set({ adminLoading: true });
            
            const { applications } = await adminService.getApplicationByJob(jobId);
            set({ applications });
        } catch (error) {
            console.error('Lỗi khi gọi api getApplicationByJob ', error);
        } finally {
            set({ adminLoading: false });
        }
    },

    getAllCompany: async (query) => {
        try {
            set({ adminLoading: true });

            const { company, totalPage } = await adminService.getAllCompany(query);

            set({ companies: company, totalPageCompany: totalPage })
        } catch (error) {
            console.error('Lỗi khi gọi API getAllCompany ', error);
        } finally {
            set({ adminLoading: false });
        }
    },

    rejectCompany: async (companyId, query) => {
        try {
            set({ adminLoading: true });

            await adminService.rejectCompany(companyId);
            const { getAllCompany } = useAdminStore.getState();
            await getAllCompany(query);

            toast.success('Từ chối duyệt thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api rejectCompany ', error)
            toast.error('Từ chối duyệt thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    activeCompany: async (companyId, query) => {
        try {
            set({ adminLoading: true });

            await adminService.activeCompany(companyId);
            const { getAllCompany } = useAdminStore.getState();
            await getAllCompany(query);

            toast.success('Mở khóa công ty thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api activeCompany ', error)
            toast.error('Mở khóa công ty thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    blockLoginCompany: async (companyId, query) => {
       try {
            set({ adminLoading: true });

            await adminService.blockLoginCompany(companyId);
            const { getAllCompany } = useAdminStore.getState();
            await getAllCompany(query);

            toast.success('Khóa đăng nhập công ty thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api blockLoginCompany ', error)
            toast.error('Khóa đăng nhập công ty thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    deleteCompany: async (companyId) => {
        try {
            set({ adminLoading: true });

            await adminService.deleteCompany(companyId);
            const { getAllCompany } = useAdminStore.getState();
            await getAllCompany();

            toast.success('Xóa công ty thành công')
        } catch (error) {
            console.error('Lỗi khi gọi api deleteCompany ', error)
            toast.error('Xóa công ty thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },


    getAllCandidate: async (query) => {
        try {
            set({ adminLoading: true });

            const { candidates, totalPage } = await adminService.getAllCandidate(query);
            set({ candidates, totalPageCandidate: totalPage });
        } catch (error) {
            console.error('Lỗi khi gọi API getAllCandidate ', error);
        } finally {
            set({ adminLoading: false });
        }
    },

    activeCandidate: async (candidateId) => {
        try {
            set({ adminLoading: true });

            await adminService.activeCandidate(candidateId);
            const { getAllCandidate } = useAdminStore.getState();
            await getAllCandidate();

            toast.success('Mở khóa tài khoản thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API activeCandidate ', error);
            toast.error('Mở khóa tài khoản thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    blockLoginCandidate: async (userId) => {
        try {
            set({ adminLoading: true });

            await adminService.blockLoginCandidate(userId);
            const { getAllCandidate } = useAdminStore.getState();
            await getAllCandidate();

            toast.success('Khóa tài khoản thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API blockLoginCandidate ', error);
            toast.error('Khóa tài khoản thất bại')
        } finally {
            set({ adminLoading: false });
        }
    },

    deleteCandidate: async (candidateId) => {
        try {
            set({ adminLoading: true });

            await adminService.deleteCandidate(candidateId);
            const { getAllCandidate } = useAdminStore.getState();
            await getAllCandidate();

            toast.success('Xóa tài khoản thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API deleteCandidate ', error);
            toast.error('Xóa tài khoản thất bại')
        } finally {
            set({ adminLoading: false });
        }
    }
}))