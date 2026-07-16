import { jobService } from "@/services/jobService";
import { toast } from "sonner";
import { create } from "zustand";

export const useJobStore = create((set, get) => ({
    featuredJob: [],
    jobDetail: null,
    jobOfCategory: [],
    jobLoading: false,

    getFeaturedJob: async () => {
        try {
            set({ jobLoading: true });
            const { featuredJob } = await jobService.getFeaturedJob();

            set({ featuredJob });
        } catch (error) {
            console.error('Lỗi khi gọi API getFeaturedJob ', error)
        } finally {
            set({ jobLoading: false });
        }
    },

    getJobBySlug: async (slug) => {
        try {
            set({ jobLoading: true });

            const { job } = await jobService.getJobBySlug(slug);
            set({ jobDetail: job });
        } catch (error) {
            console.error('Lỗi khi gọi API getJobBySlug ', error);
        } finally {
            set({ jobLoading: false });
        }
    },

    getJobByCategory: async (slug, filter) => {
        try {
            set({ loading: true });

            const { jobs } = await jobService.getJobByCategory(slug, filter);
            set({ jobOfCategory: jobs });
        } catch (error) {
            console.error('Lỗi khi gọi API getJobBySlug ', error);
        } finally {
            set({ jobLoading: false });
        }
    }
}))