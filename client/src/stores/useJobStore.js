import { jobService } from "@/services/jobService";
import { toast } from "sonner";
import { create } from "zustand";

export const useJobStore = create((set, get) => ({
    featuredJob: [],
    jobDetail: null,
    jobOfCategory: [],
    searchJob: [],
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
    },

    getSearchJob: async (params) => {
        try {
            set({ jobLoading: true });

            const { jobs } = await jobService.getSearchJob(params);
            set({ searchJob: jobs });
        } catch (error) {
            console.error('Lỗi khi gọi API searchJob ', error);
        } finally {
            set({ jobLoading: false });
        }
    },

    createJob: async (
        categoryId,
        title,
        jobRequirement,
        description,
        candidateRequirement,
        benefit,
        salaryMin,
        salaryMax,
        location,
        workTime,
        workType,
        workArrangement,
        quantity,
        expiredAt
    ) => {
        try {
            set({ jobLoading: true });

            await jobService.createJob(
                categoryId,
                title,
                jobRequirement,
                description,
                candidateRequirement,
                benefit,
                salaryMin,
                salaryMax,
                location,
                workTime,
                workType,
                workArrangement,
                quantity,
                expiredAt
            );

            toast.success('Tạo bài tuyển dụng thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API createJob ', error);
            toast.error('Tạo bài đăng tuyển dụng thất bại')
        } finally {
            set({ jobLoading: false });
        }
    }
}))