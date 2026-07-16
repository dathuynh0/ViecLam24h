import { candidateService } from "@/services/candidateService";
import { toast } from "sonner";
import { create } from "zustand";

export const useCandidateStore = create((set, get) => ({
    jobSaves: null,
    candidateLoading: false,

    saveJob: async (jobId) => {
        try {
            set({ candidateLoading: true });

            await candidateService.saveJob(jobId);

            toast.success('Lưu bài tuyển dụng thành công');
        } catch (error) {
            console.error('Lỗi khi gọi API saveJob ', error);
            toast.error('Lưu bài đăng không thành công');
        } finally {
            set({ candidateLoading: false });
        }
    },


    getAllJobSave: async () => {
        try {
            set({ candidateLoading: true });

            const { jobSaves } = await candidateService.getAllJobSave();
            set({ jobSaves });
        } catch (error) {
            console.error('Lỗi khi gọi API getAllJobSave ', error);
        } finally {
            set({ candidateLoading: false });
        }
    },

    deleteJobSave: async (jobsaveId) => {
        try {
            set({ candidateLoading: true });

            await candidateService.deleteJobSave(jobsaveId);
            const { getAllJobSave } = useCandidateStore.getState();
            await getAllJobSave();

            toast.success('Xóa thành công')
        } catch (error) {
            console.error('Lôi khi gọi API deleteJobSave ', error);
            toast.error('Xóa không thành công')
        } finally {
            set({ candidateLoading: false });
        }
    }
}))