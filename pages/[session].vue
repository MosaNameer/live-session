<template>
    <NuxtLayout>

    </NuxtLayout>
</template>

<script setup>
// Initalize store
const store = useSessionStore()

// Connect to socket
store.socketConnect()

// Get session data
store.sessionConnect()





// WATCH SOCKET DATA
watch( () => store.getSocketData, (data) => {
    console.log(data)
}, { deep: true })
</script>