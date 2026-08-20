import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

const useSocket = () => {
    const refSocket = useRef()
    const { accessToken } = useAuthStore()

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

        return () => {
            socket.disconnect();
        };
    }, [accessToken])

    return refSocket.current
}

export default useSocket