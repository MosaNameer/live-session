<template>
    <NuxtLayout name="two-sections">
        <div flex="~ col" p="4" position="relative">
            <span text="lg tertiaryOp dark:tertiary">{{ store.getCurrentSlide.chapter }}</span>
            <span text="xl primaryOp dark:primary">{{ store.getCurrentSlide.title }}</span>

            <ContentRenderer :value="store.getSlideContent" mt="6">
                <template #empty>
                    <p>No content found.</p>
                </template>
            </ContentRenderer>

            <br /><br />

            <div flex="~ col" position="absolute" left="0" bottom="0" w="full">
                <div flex="~" justify="between" bg="secondary dark:secondaryOp" p="y-2 x-4">
                    <span>{{ store.getSession?.id }}</span>
                    <div flex="~ gap-2">
                        <span>{{ store.getUsers?.length }}</span>
                        <IconUsers w="24px" />
                    </div>
                </div>
                <div flex="~" justify="between" p="4">
                    <div flex="~ gap-3">
                        <IconArrowUp w="24px" />
                        <IconArrowUp w="24px" />
                        <IconArrowUp w="24px" />
                    </div>
                    <div flex="~ gap-6">
                        <IconArrowUp transform="~ rotate-270" w="24px" />
                        <IconArrowUp transform="~ rotate-90" w="24px" />
                    </div>
                </div>
            </div>
        </div>



        <!-- Right Panel -->
        <template #rightpanel>
            <div position="relative" w="full" h="full">
                <div position="absolute" right="0" flex="~" bg="secondary dark:secondaryOp">
                    <div border="~">TEST 1</div>
                    <div border="~">TEST 1</div>
                </div>
                <div flex="~ col">
                    <span>{{ store.getSession }}</span>
                    <div flex="~ col " my="4">
                        <div v-for="slide in store.getSlides" :key="slide._path" @click="store.setSlide(slide._path)" cursor="pointer" :class="[store.getCurrentSlide._path == slide._path ? 'bg-blue' : '']">
                            {{ slide.title }}
                        </div>
                    </div>
    
                    <div>
                        <!-- getUsers -->
                        <div v-for="user in store.getUsers" :key="user.id" flex="~ col gap-2">
                            <span>{{ user.name }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </template>
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


setInterval(() => {
    store.fetchUsers()
}, 2500)



// WATCH SOCKET DATA
watch(() => store.getSocketData, (data) => store.socketDataReceived(JSON.parse(data)), { deep: true })
</script>