import { Session } from "~~/types/session"

export const useSessionStore = defineStore('session-store', {
    state: () => ({
        socket: null,
        session: null as Session,
        slides: null
    }),
    
    getters: {
        getSocket: (state) => state.socket,
        getSession: (state) => state.session,
        getSlides: (state) => state.slides,

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
            const { params: { session } } = useRoute()
            const sessionCookie = useCookie('session')
            this.session = await $fetch(`/api/session/${session}`)
            
            if (!this.session) return false

            if (!this.session.slide && process.client){
                await this.fetchSlides()
                this.session.slide = this.slides[0]?._path
            }

            sessionCookie.value = session
        },


        async fetchSlides(){
            this.slides = await queryContent(this.session?.lesson?.value).where({
                _type: "markdown"
            }).only(['_path', 'title', 'type']).find()
        }
    },
})