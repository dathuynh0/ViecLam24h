import { applicationService } from "@/services/applicationService";
import { toast } from "sonner";
import { create } from "zustand";

export const useApplicationStore = create((set, get) => ({
    applications: [],
    applicationOfJob: [],
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
    },

    getApplicationOfJob: async (jobId) => {
        try {
            set({ applicationLoading: true });

            const { applications } = await applicationService.getApplicationOfJob(jobId);
            set({ applicationOfJob: applications })
        } catch (error) {
            console.error('Lỗi khi gọi API getApplicationOfJob ', error);
        } finally {
            set({ applicationLoading: false });
        }
    },

    acceptedApplication: async (applicationId, jobId) => {
        try {
            set({ applicationLoading: true });

            await applicationService.acceptedApplication(applicationId);
            const { getApplicationOfJob } = useApplicationStore.getState();
            await getApplicationOfJob(jobId)

            toast.success('Chập nhận ứng viện thành công');
        } catch (error) {
            console.error('Lỗi khi gọi API acceptApplication ', error);
            toast.error('Chấp nhận ứng viên thất bại')
        } finally {
            set({ applicationLoading: false });
        }
    },

    rejectedApplication: async (applicationId, jobId) => {
        try {
            set({ applicationLoading: true });

            await applicationService.rejectedApplication(applicationId);
            const { getApplicationOfJob } = useApplicationStore.getState();
            await getApplicationOfJob(jobId)

            toast.success('Từ chối ứng viên thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API rejectedApplication ', error);
            toast.error('Từ chối ứng viên thất bại')
        } finally {
            set({ applicationLoading: false });
        }
    }
}))