<template>
    <NuxtLayout>
        {{ store.getSession }}
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

const { data: slideRender } = await useAsyncData('page-data', () => queryContent(store.getSession?.slide).findOne())






// WATCH SOCKET DATA
watch(() => store.getSocketData, (data) => {
    console.log(data)
}, { deep: true })
</script>