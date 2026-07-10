import { authService } from "@/services/authService";
import { create } from "zustand";
import { toast } from "sonner";

export const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    authLoading: false,

    signUp: async (fullName, username, email, password, role) => {
        try {
            await authService.signUp(fullName, username, email, password, role);

            toast.success('Tạo tài khoản thành công');
        } catch (error) {
            toast.error('Tạo tài khoản thất bại')
            console.error('Lỗi khi gọi signUp ', error);
        }
    },

    signIn: async (username, password) => {
        try {
            set({ authLoading: true })
            const { accessToken } = await authService.signIn(username, password);

            set({ accessToken });
            toast.success('Đăng nhập thành công')
        } catch (error) {
            toast.error('Đăng nhập không thành công')
            console.error('Lỗi khi gọi signIn ', error);
        }
        finally {
            set({ authLoading: false });
        }
    }
}))