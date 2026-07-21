import { adminService } from "@/services/adminService";
import { toast } from "sonner";
import { create } from "zustand";

export const useAdminStore = create((set, get) => ({
    categories: [],
    totalPageCategory: null,
    jobs: [],
    totalPageJob: null,
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
    }
}))