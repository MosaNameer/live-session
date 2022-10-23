import { Session } from "~~/types/session"

export const useSessionStore = defineStore('session-store', {
    state: () => ({
        socket: null,
        session: null as Session,
    }),
    
    getters: {
        getSocket: (state) => state.socket,
        getSession: (state) => state.session,

        isAdmin: (state) => state.session?.adminId == useCookie('userId')?.value,

        // Socket
        getSocketState: (state) => state.socket?.status,
        getSocketData: (state) => state.socket?.data,
    },

    actions: {
        async socketConnect(){
            if (process.server) return

            // Get SOCKET_URL from .env
            const { socketUrl } = useRuntimeConfig().public
            
            // Get name, session, and userId from cookies
            const name = useCookie('name')
            const session = useCookie('session')
            const userId = useCookie('userId')

            // If name and session and user id are set, connect to the socket
            if (name.value && session.value && userId.value) {
                this.socket = useWebSocket(`ws://${socketUrl}:33333`, {
                    autoReconnect: true,
                    protocols: [
                        session.value,
                        name.value,
                        userId.value
                    ],
                })
            } 
            
            // If name and session and user id are not set, redirect to the home page
            else {
                const router = useRouter()
                router.push('/')
            }
        },
        
        async sessionConnect(){
            const session = useCookie('session')
            this.session = $fetch(`/api/session/${session.value}`)
        }
    },
})