import { candidateService } from "@/services/candidateService";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useCandidateStore = create((set, get) => ({
    jobSaves: null,
    candidateLoading: false,

    saveJob: async (jobId) => {
        try {
            set({ candidateLoading: true });

            await candidateService.saveJob(jobId);
            const { getAllJobSave } = useCandidateStore.getState();
            await getAllJobSave();

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
    },

    updateMyProfile: async (fullName, bio, skill, phone, location, major)  => {
        try {
            set({ candidateLoading: true });

            await candidateService.updateMyProfile(fullName, bio, skill, phone, location, major);
            const { fetchMe } = useAuthStore.getState();
            await fetchMe();

            toast.success('Cập nhật thông tin thành công');
        } catch (error) {
            console.error('Lỗi khi gọi API upadateMyProfile ', error);
            toast.error('Cập nhật thông tin thất bại')
        } finally {
            set({ candidateLoading: false });
        }
    },

    updateAvatar: async (avatar) => {
        try {
            set({ candidateLoading: true });

            await candidateService.updateAvatar(avatar);
            const { fetchMe } = useAuthStore.getState();
            await fetchMe();

            toast.success('Cập nhật avatar thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API updateAvatar ', error);
            toast.error('Cập nhật avatar thất bại')
        } finally {
            set({ candidateLoading: false });
        }
    },

    updateCV: async (cv) => {
        try {
            set({ candidateLoading: true });

            await candidateService.updateCV(cv);
            const { fetchMe } = useAuthStore.getState();
            await fetchMe();

            toast.success('Cập nhật CV thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API updateCV ', error);
            toast.error('Cập nhật CV thất bại')
        } finally {
            set({ candidateLoading: false });
        }
    }
}))