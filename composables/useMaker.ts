
export const useMaker = defineStore('maker-store', {
    state: () => ({
        lessons: [],

        // SLIDES
        slides: [],
        selectedSlide: null,
        slideMarkdown: null,

        selectedTab: 1,
    }),

    getters: {
        getLessons: (state) => state.lessons,

        getSlides: (state) => state.slides,
        getSelectedSlide: (state) => state.selectedSlide,
        getSlideMarkdown: (state) => state.slideMarkdown,

        getSelectedTab: (state) => state.selectedTab,
    },

    actions: {
        async fetchLessons() {
            this.lessons = await $fetch('/api/maker/lessons')
        },
        async newLesson(lessonName) {
            try {
                await $fetch('/api/maker/new-lesson', {
                    method: 'POST',
                    body: JSON.stringify({ name: lessonName.replace(/\s/g, '') })
                })
                await this.fetchLessons()
            } catch (error) {
                console.log(error)
            }
        },

        async fetchSlides() {
            const { params: { lesson } } = useRoute()
            if (!lesson) return false
            this.slides = (await queryContent(lesson?.split('.')?.pop()).where({
                _type: "markdown"
            }).find())
            if (this.slides?.length <= 0) {
                await this.newSlide()
            }

            if (this.selectedSlide == null) {
                this.selectedSlide = this.slides?.[0]
                console.log(this.slides?.[0])
            }
        },

        async newSlide() {
            const { params: { lesson } } = useRoute()
            if (!lesson) return false
            try {
                await $fetch('/api/maker/new-slide', {
                    method: 'POST',
                    body: JSON.stringify({ lessonPath: lesson })
                })
                await this.fetchSlides()
            } catch (error) {
                console.log(error)
            }
        },

        async fetchSlideMarkdown(){
            this.slideMarkdown =  await $fetch('/api/maker/get-slide', {
                method: 'POST',
                body: JSON.stringify({ file: this.selectedSlide?._file  })
            })
        },

        async saveSlideMarkdown(){
            await $fetch('/api/maker/save-slide-content', {
                method: 'POST',
                body: JSON.stringify({ file: this.selectedSlide?._file, content: this.slideMarkdown })
            })
        },

        async updateSlideAttribute(key, value){
            await $fetch('/api/maker/update-slide', {
                method: 'POST',
                body: JSON.stringify({ file: this.selectedSlide?._file, key, value })       
            })  
            // await this.fetchSlides()
        },

        selectSlide(slide) {
            this.selectedSlide = slide
        },

        sendSelectedTab(tab) {
            this.selectedTab = tab
        }
    }
})