<template>
    <NuxtLayout>
        {{ store.getSession }}
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





console.log(store.getSession)



// WATCH SOCKET DATA
watch( () => store.getSocketData, (data) => {
    console.log(data)
}, { deep: true })
</script>