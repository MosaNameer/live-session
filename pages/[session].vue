<template>
    <Suspense>
        <NuxtLayout name="two-sections">
            <div flex="~ col" w="full" p="4" position="relative">
                <span text="lg tertiaryOp dark:tertiary">{{ store.getCurrentSlide.chapter }}</span>
                <span text="xl primaryOp dark:primary" mb="6">{{ store.getCurrentSlide.title }}</span>

                <!-- CONTENT -->
                <div v-show="selectedTab === 'settings'">
                    Settings
                </div>

                <div v-show="selectedTab === 'users'">
                    <Users />
                </div>

                <div v-show="selectedTab == null">
                    <ContentRenderer :value="store.getSlideContent">
                        <template #empty>
                            <p>No content found.</p>
                        </template>
                    </ContentRenderer>
                </div>

                <br /><br />

                <div flex="~ col" position="absolute" left="0" bottom="0" w="full">
                    <div flex="~" justify="between" bg="secondary dark:secondaryOp" p="y-2 x-4">
                        <span>{{ store.getSession?.id }}</span>
                        <div flex="~ gap-2">
                            <span>{{ store.getUsers?.length }}</span>
                            <IconUsers w="24px" />
                        </div>
                    </div>
                    <div v-if="store.isAdmin" flex="~" justify="between" p="4">
                        <div flex="~ gap-3">
                            <span cursor="pointer">Full Screen</span>
                            <span @click="selectTab('settings')" cursor="pointer">Settings</span>
                            <span @click="selectTab('users')" cursor="pointer">Users</span>
                        </div>
                        <div flex="~ gap-6">
                            <span :class="{ 'text-error': store.hasNextSlide }" @click="store.nextSlide()" cursor="pointer">Left</span>
                            <span :class="{ 'text-error': store.hasPrevSlide }" @click="store.prevSlide()" cursor="pointer">Right</span>
                        </div>
                    </div>
                </div>




            </div>



            <!-- Right Panel -->
            <template #rightpanel>
                <div flex="~ col" position="relative" w="full" h="full">
                    <div position="absolute" right="0" flex="~" bg="secondary dark:secondaryOp">
                        <div v-if="store.isAdmin" @click="store.toggleReadOnly" cursor="pointer" border="~" p="2">{{ store.isReadOnly ? "READ ONLY" : "READ WRITE" }}</div>
                        <div v-if="store.isAdmin" @click="store.toggleProdcast" cursor="pointer" border="~" p="2">{{ store.isProdcast ? "PRODCASTING" : "NOT PRODCASTING" }}</div>
                        <div v-if="store.getCurrentSlide?.type == 'CodeEditor' && store.getProdcastedCode && !store.isProdcast" @click="store.setCode(store.getSession?.prodcastedData)" cursor="pointer" border="~" p="2">Restore Prodcasted Code</div>
                        <div v-if="store.getCurrentSlide?.type == 'CodeEditor'" @click="store.setCode({html: store.getCurrentSlide?.html, css: store.getCurrentSlide?.css, javascript: store.getCurrentSlide?.javascript})" cursor="pointer" border="~" p="2">Initial Code</div>
                    </div>

                    <!-- SLIDE TYPE -->
                    <div flex="grow">
                        <TypeCodeEditor v-if="store.getCurrentSlide.type == 'CodeEditor'" />
                    </div>

                </div>
            </template>
        </NuxtLayout>

        <template #fallback>
            Loading...
        </template>
    </Suspense>
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






// WATCH SOCKET DATA
watch(() => store.getSocketData, (data) => store.socketDataReceived(JSON.parse(data)), { deep: true })


// UI
const selectedTab = ref(null)
const selectTab = (tab) => {
    if (selectedTab.value == tab) selectedTab.value = null
    else selectedTab.value = tab
}
</script>