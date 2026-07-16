import api from "@/lib/api"

export const authService = {
    filterUser: (user) => {
        const { candidate, company, ...userInfo } = user;

        const profile = candidate  || company

        const { id: profileId, userId, createdAt: profileCreatedAt, updatedAt: profileUpdatedAt, ...profileRest } = profile;

        return {
            ...userInfo,
            profileId,
            ...profileRest
        }
    },


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
    },

    fetchMe: async () => {
        const response = await api.get('/users/me', { withCredentials: true });

        return response.data;
    },

    refresh: async () => {
        const response = await api.post('/auth/refresh', {}, { withCredentials: true });

        return response.data;
    },

    signOut: async () => {
        await api.post('/auth/signout', {}, { withCredentials: true });
    }
}