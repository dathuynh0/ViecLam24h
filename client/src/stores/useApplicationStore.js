import { applicationService } from "@/services/applicationService";
import { toast } from "sonner";
import { create } from "zustand";

export const useApplicationStore = create((set, get) => ({
    applications: [],
    applicationLoading: false,

    getApplicationByCandidate: async (status) => {
        try {
            set({ applicationLoading: true });

            const { applications } = await applicationService.getApplicationByCandidate(status);
            set({ applications });
        } catch (error) {
            console.error('Lỗi khi gọi API getApplicationByCandidate ', error);
        } finally {
            set({ applicationLoading: false });
        }
    },

    applyJob: async (jobId, cv, introduction) => {
        try {
            set({ applicationLoading: true });

            await applicationService.applyJob(jobId, cv, introduction);

            toast.success('Ứng tuyển công việc thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API applyJob ', error);
            toast.error('Ứng tuyển công việc thất bại');
        } finally {
            set({ applicationLoading: false });
        }
    }
}))