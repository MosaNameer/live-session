<template>
    <NuxtLayout>
        
        <div flex="~ col">
            <span>{{ store.getSession }}</span>
            <div flex="~ col " my="4">
                <div v-for="slide in store.getSlides" :key="slide._path" @click="store.setSlide(slide._path)" cursor="pointer" :class="[store.getCurrentSlide._path == slide._path ? 'bg-blue' : '']">
                    {{slide.title}}
                </div>
            </div>

        </div>
        <ContentRenderer :value="slideRender">
            <ContentRendererMarkdown :value="slideRender" />
        </ContentRenderer>
    </NuxtLayout>
</template>

<script setup>
// Initalize store
const store = useSessionStore()

// Get session data
await store.sessionConnect()

// If session not exists
if (!store.getSession) {
    navigateTo('/')
}

// Connect to socket
await store.socketConnect()

const { data: slideRender } = await useAsyncData('slide-renderer-' + store.getSession.slide, () => queryContent(store.getSession?.slide).findOne())




// WATCH SOCKET DATA
watch(() => store.getSocketData, (data) => {
    console.log(data)
}, { deep: true })
</script>