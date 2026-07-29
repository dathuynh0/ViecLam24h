import { authService } from "@/services/authService";
import { create } from "zustand";
import { toast } from "sonner";


export const useAuthStore = create((set, get) => ({
    user: null,
    accessToken: null,
    authLoading: false,

    clearState: () => {
        set({ user: null, accessToken: null });
    },

    setAccessToken: async (token) => {
        set({ accessToken: token });
        const { fetchMe } = useAuthStore.getState();
        await fetchMe();
    },

    signUp: async (fullName, username, email, password, role) => {
        try {
            set({ authLoading: true })
            await authService.signUp(fullName, username, email, password, role);

            toast.success('Tạo tài khoản thành công');

            return true;
        } catch (error) {
            toast.error('Tạo tài khoản thất bại')
            console.error('Lỗi khi gọi signUp ', error);
            return false;
        } finally {
            set({ authLoading: false })
        }
    },

    signIn: async (username, password) => {
        try {
            set({ authLoading: true })
            const { accessToken } = await authService.signIn(username, password);

            set({ accessToken });
            toast.success('Đăng nhập thành công')
            return true;
        } catch (error) {
            toast.error('Đăng nhập không thành công')
            console.error('Lỗi khi gọi signIn ', error);
            return false;
        } finally {
            set({ authLoading: false });
        }
    },

    fetchMe: async () => {
        try {
            set({ authLoading: true });
            
            const { user } = await authService.fetchMe();
            const filterUser = authService.filterUser(user);

            set({ user: filterUser });
        } catch (error) {
            console.error('Lỗi khi gọi API fetchMe ', error);
        } finally {
            set({ authLoading: false });
        }
    },

    refresh: async () => {
        try {
            set({ authLoading: true });

            const { accessToken } = await authService.refresh();

            set({ accessToken });

            const { user, fetchMe } = useAuthStore.getState();
            if(!user) {
                await fetchMe();
            }

        } catch (error) {
            console.error('Lỗi khi gọi API refresh ', error);
        } finally {
            set({ authLoading: false });
        }
    },

    signOut: async () => {
        try {
            set({ authLoading: true });

            await authService.signOut();
            useAuthStore.getState().clearState();

            toast.success('Đăng xuất thành công');
        } catch (error) {
            console.error('Lỗi khi gọi API đăng xuất ', error);
            toast.error('Đăng xuất không thành công');
        } finally {
            set({ authLoading: false });
        }
    }
}))