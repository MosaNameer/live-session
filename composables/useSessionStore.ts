import { Session } from "~~/types/session"
import { SocketDataType } from "~~/types/socket-data"

export const useSessionStore = defineStore('session-store', {
    state: () => ({
        socket: null,
        session: null as Session,
        slides: null,
        slideContent: null,
    }),
    
    getters: {
        getSocket: (state) => state.socket,
        getSession: (state) => state.session,
        getSlides: (state) => state.slides,
        getCurrentSlide: (state) => state.slides.find(s => s._path === state.session?.slide),
        getSlideContent: (state) => state.slideContent,
        
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
            
            // If session not found, return
            if (!this.session) return false

            // get session slides
            await this.fetchSlides()

            // If session slide is not set, set it
            if (!this.session.slide){
                await this.setSlide(this.slides[0]?._path)
            }

            // set slide content
            this.setSlideContent()

            sessionCookie.value = session
        },


        async fetchSlides(){
            this.slides = await queryContent(this.session?.lesson?.value).where({
                _type: "markdown"
            }).only(['_path', 'title', 'type']).find()
        },

        async setSlide(slide){
            const { params: { session } } = useRoute()

            await $fetch(`/api/session/${session}/set-slide`, {
                method: 'POST',
                body: JSON.stringify({
                    slide: slide
                })
            })
        },

        async setSlideContent(){
            const { data: slideRender } = await useAsyncData('slide-renderer-' + this.getCurrentSlide._path, () => queryContent(this.getCurrentSlide._path).findOne())
            this.slideContent = slideRender.value
        },


        // DATA RECEIVED TRANSLATOR
        async socketDataReceived(socketData: SocketDataType){
            const { type, data } = socketData
            switch (type) {
                case 'statue':
                    // this.session = data.data
                    break
                case 'slide':
                    this.session.slide = data
                    this.setSlideContent()
                    break
                default:
                    console.log('unknown data type', data)
                    break
            }
        }
    },
})