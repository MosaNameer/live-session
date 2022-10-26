import { Session } from "~~/types/session"
import { SocketDataType } from "~~/types/socket-data"
import { User } from "~~/types/user"

export const useSessionStore = defineStore('session-store', {
    state: () => ({
        socket: null,

        session: null as Session,

        slides: null,
        slideContent: null,


        users: [] as User[],
        
        /* SLIDE TYPES */
        // CODE
        code: { html: '<html><body><span>test</span></body></html>', css: 'span{color:red}', javascript: '' },

        // QUESTION
        questions: [],
        correctQuestions: [],
        questionsUserId: useCookie('userId')?.value,

    }),
    
    getters: {
        getSocket: (state) => state.socket,
        getSocketState: (state) => state.socket?.status,
        getSocketData: (state) => state.socket?.data,

        getSession: (state) => state.session,
        isReadOnly: (state) => state.session?.readOnly,
        isProdcast: (state) => state.session?.prodcast,
        isAdmin: (state) => state.session?.adminId == useCookie('userId')?.value,

        getSlides: (state) => state.slides,
        getCurrentSlide: (state) => state.slides?.find(s => s._path === state.session?.slide) ?? state.slides[0],
        getSlideContent: (state) => state.slideContent,
        getSlideData(){
            return () => this.getSession?.slidesData
                ?.find(s => s.slide === this.getCurrentSlide?._path)?.storage
                ?.find(user => user.userId == useCookie('userId')?.value)?.data
        },
        hasPrevSlide: (state) => state.slides.findIndex(s => s._path === state.session?.slide) > 0,
        hasNextSlide: (state) => state.slides.findIndex(s => s._path === state.session?.slide) < state.slides.length - 1,
        


        // Users
        getUsers: (state) => state.users,
        getUserById: (state) => (id: string) => state.users.find(u => u.id === id),

        /* Slide Types */
        // CODE
        getCode: (state) => state.code,
        getProdcastedCode: (state) => state.session?.prodcastedData,

        // QUESTION
        getQuestions: (state) => state.questions,
        getCorrectQuestions: (state) => state.correctQuestions,
        getCorrectQuestionsByUserId: (state) => (userId: string) => state.correctQuestions?.find(q => q.userId === userId)?.data,
        getMyCorrectQuestion: (state) => state.correctQuestions?.find(q => q.userId === state.questionsUserId)?.data,
        
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
            await this.setSlideContent()

            sessionCookie.value = session as string
        },


        async fetchSlides(){
            this.slides = await queryContent(this.session?.lesson?.value).where({
                _type: "markdown"
            }).only(['_path', 'title', 'type', 'chapter', '_dir', 'html', 'css', 'javascript', 'questions']).find()
        },

        async nextSlide(){
            const index = this.slides.findIndex(s => s._path === this.session?.slide)
            const nextSlide = this.slides[index - 1]
            if (nextSlide) {
                await this.setSlide(nextSlide._path)
            }
        },

        async prevSlide(){
            const index = this.slides.findIndex(s => s._path === this.session?.slide)
            const prevSlide = this.slides[index + 1]
            if (prevSlide) {
                await this.setSlide(prevSlide._path)
            }
        },

        async setSlide(slide){
            const { params: { session } } = useRoute()

            await $fetch(`/api/session/${session}/slide`, {
                method: 'POST',
                body: JSON.stringify({
                    slide: slide
                })
            })
        },

        async setSlideContent(){
            // Render markdown
            const { data: slideRender } = await useAsyncData('slide-renderer-' + this.getCurrentSlide?._path, () => queryContent(this.getCurrentSlide?._path).findOne())
            this.slideContent = slideRender.value

            /******************************/
            /*  CHECK IF CODE IN SESSION  */
            /******************************/
            const type = this.getCurrentSlide?.type
            const prodcastedData = this.session?.prodcastedData

            // GET CURRENT VALUES FROM STORAGE
            if (prodcastedData){
                switch (type) {
                    case 'CodeEditor':
                        this.code = {...prodcastedData}
                        break;
                    case 'Question':
                        this.questions = {...prodcastedData}
                        break;
                }
            }
            
            // SET DEFAULT VALUES
            else {
                switch (type) {
                    case 'CodeEditor':
                        this.code.html = this.getCurrentSlide?.html
                        this.code.css = this.getCurrentSlide?.css
                        this.code.javascript = this.getCurrentSlide?.javascript
                        break;
                    case 'Question':
                        const userQuestions = this.getSlideData()
                        if (userQuestions)
                            this.questions = userQuestions
                        else
                            this.questions = this.getCurrentSlide?.questions
                        break;
                }
            }
        },



        async fetchUsers(){
            this.users = await $fetch(`/api/session/${this.session.id}/users`)
        },



        async toggleReadOnly(){
            const { params: { session } } = useRoute()
            await $fetch(`/api/session/${session}/toggle-read`, {
                method: 'POST'
            })
        },

        async toggleProdcast(){
            const { params: { session } } = useRoute()
            await $fetch(`/api/session/${session}/toggle-prodcast`, {
                method: 'POST'
            })
        },


        async storeCode(){
            const { params: { session } } = useRoute()
            await $fetch(`/api/session/${session}/store-code`, {
                method: 'POST',
                body: JSON.stringify({
                    data: this.code
                })
            })

            if (this.isProdcast){
                this.session.prodcastedData = {...this.code}
            }
        },
        async getUserCode(user_id){
            const { params: { session } } = useRoute()
            const code = await $fetch(`/api/session/${session}/get-code`, {
                method: 'POST',
                body: JSON.stringify({
                    user_id: user_id
                })
            })
            this.setCode(code ?? this.session?.prodcastedData ?? {
                html: this.getCurrentSlide.html,
                css: this.getCurrentSlide.css,
                javascript: this.getCurrentSlide.javascript
            })
        },
        async setCode(code: any){
            this.code = {...code}
        },

        restoreCode(){
            this.code = {...this.session?.prodcastedData}
        },


        async storeQuestions(){
            const { params: { session } } = useRoute()
            await $fetch(`/api/session/${session}/store-question`, {
                method: 'POST',
                body: JSON.stringify({
                    data: this.questions
                })
            })
        },

        async fetchCorrectQuestions(){
            if (this.getCurrentSlide?.type !== 'Question') return false

            const { params: { session } } = useRoute()
            const corrects = await $fetch(`/api/session/${session}/correct-question`, {
                method: 'POST',
                body: JSON.stringify({
                    slide: this.getCurrentSlide._path,
                })
            })

            this.correctQuestions = corrects
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
                    this.session.prodcastedData = null
                    this.setSlideContent()
                    break
                case 'read-only':
                    this.session.readOnly = data
                    break
                case 'prodcast':
                    this.session.prodcast = data
                    break
                case 'code':
                    this.code = {...data}
                    this.session.prodcastedData = {...data}
                    break
                case 'admin':
                    console.log(data)
                    break
                default:
                    console.log('unknown data type', data)
                    break
            }
        }
    },
})