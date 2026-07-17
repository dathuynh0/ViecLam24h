import { applicationService } from "@/services/applicationService";
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
    }


}))