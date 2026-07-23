import { jobService } from "@/services/jobService";
import { toast } from "sonner";
import { create } from "zustand";

export const useJobStore = create((set, get) => ({
    featuredJob: [],
    jobDetail: null,
    jobOfCategory: [],
    searchJob: [],
    jobCreated: [],
    relatedJob: [],
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
    },

    getJobCreated: async (page) => {
        try {
            set({ jobLoading: false });

            const { jobs } = await jobService.getJobCreated(page);

            set({ jobCreated: jobs });
        } catch (error) {
            console.error('Lỗi khi gọi API getJobCreated ', error);
        } finally {
            set({ jobLoading: false });
        }
    },

    updateJob: async (
        jobId,
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

            await jobService.updateJob(
                jobId,
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

            toast.success('Cập nhật bài đăng thành công');
        } catch (error) {
            console.error('Lỗi khi gọi API updateJob ', error);
            toast.error('Cập nhập thất bại')
        } finally {
            set({ jobLoading: false });
        }
    },

    deleteJob: async (jobId, page) => {
        try {
            set({ jobLoading: true });

            await jobService.deleteJob(jobId);
            const { getJobCreated } = useJobStore.getState();
            await getJobCreated(page)

            toast.success('Xóa bài đăng thành công')
        } catch (error) {
            console.error('Lỗi khi gọi API deleteJob ', error);
            toast.error('Xóa bài đăng thất bại')
        } finally {
            set({ jobLoading: false });
        }
    },

    getRelatedJob: async (jobId) => {
        try {
            set({ jobLoading: true });

            const { relatedJobs } = await jobService.getRelatedJob(jobId);
            set({ relatedJob: relatedJobs })
        } catch (error) {
            console.error('Lỗi khi gọi API getRelatedJob ', error);
        } finally {
            set({ jobLoading: false });
        }
    }
}))