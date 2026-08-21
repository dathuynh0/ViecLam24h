import { useAuthStore } from "@/stores/useAuthStore";
import { useNotification } from "@/stores/useNotification";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    const refSocket = useRef()
    const { accessToken } = useAuthStore()
    const { addNotification } = useNotification()

    useEffect(() => {
        if (!accessToken) {
            return
        }

        const socket = io(import.meta.env.VITE_BACKEND_URL, {
            auth: { token: accessToken }
        })

        refSocket.current = socket

        socket.on('connect', () => {
            console.log("Socket connected:", socket.id);
        })

        socket.on('new_notification', (notification) => {
            addNotification(notification)
        })

        return () => {
            socket.disconnect();
        };
    }, [accessToken, addNotification])

    return refSocket.current
}

export default useSocket