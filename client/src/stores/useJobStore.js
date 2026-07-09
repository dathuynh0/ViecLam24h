import { jobService } from "@/services/jobService";
import { create } from "zustand";

export const useJobStore = create((set, get) => ({
    featuredJob: [],

    getFeaturedJob: async () => {
        try {
            const { featuredJob } = await jobService.getFeaturedJob();

            set({ featuredJob });
        } catch (error) {
            console.error('Lỗi khi gọi API getFeaturedJob ', error)
        }
    }
}))