import api from "@/lib/api"

export const authService = {
    signUp: async (fullName, username, email, password, role) => {
        const response = await api.post('/auth/signup', {
            fullName,
            username,
            email,
            password,
            role
        }, { withCredentials: true });

        return response.data;
    },

    signIn: async (username, password) => {
        const response = await api.post('/auth/signin', {
            username,
            password
        }, { withCredentials: true });


        return response.data;
    }
}