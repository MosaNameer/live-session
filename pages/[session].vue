<template>
    <div>
        <Suspense>
            <NuxtLayout name="two-sections">
                <div flex="~ col" w="full" p="4" position="relative">
                    <span text="lg whitesec dark:whitesec">{{ store.getCurrentSlide?.chapter }}</span>
                    <span text="xl white dark:white" mb="6">{{ store.getCurrentSlide?.title }}</span>

                    <!-- CONTENT -->
                    <div class="nuxt-content" v-show="selectedTab === 'settings'">
                        Settings
                    </div>

                    <div class="nuxt-content" v-show="selectedTab === 'users'">
                        <Users />
                    </div>

                    <div v-show="selectedTab == null" overflow="y-auto" mb="30">
                        <ContentRenderer class="nuxt-content" :value="content">
                            <template #empty>
                                <p>No content found.</p>
                            </template>
                        </ContentRenderer>
                    </div>

                    <div flex="~ col" position="absolute" left="0" bottom="0" w="full">
                        <div flex="~" justify="between" text="white" bg="secondary dark:secondaryOp" p="y-2 x-4">
                            <span>{{ store.getSession?.id }}</span>
                            <div flex="~ gap-2">
                                <span>{{ store.getUsers?.length }}</span>
                                <Icon name="ic:round-people-alt" />
                            </div>
                        </div>
                        <div v-if="store.isAdmin" flex="~" justify="between" p="4" bg="tertiary" text="white 2xl">
                            <div flex="~ gap-3">
                                <span text="hover:whitesec" cursor="pointer">
                                    <Icon name="ic:twotone-fullscreen" />
                                </span>
                                <span text="hover:whitesec" @click="selectTab('settings')" cursor="pointer">
                                    <Icon name="ic:baseline-settings" />
                                </span>
                                <span text="hover:whitesec" @click="selectTab('users')" cursor="pointer">
                                    <Icon name="ic:round-supervisor-account" />
                                </span>
                            </div>
                            <div flex="~ gap-6">
                                <span text="hover:whitesec" :class="{ 'text-error': store.hasNextSlide }" @click="store.nextSlide()" cursor="pointer">
                                    <Icon name="ic:baseline-arrow-circle-left" />
                                </span>
                                <span text="hover:whitesec" :class="{ 'text-error': store.hasPrevSlide }" @click="store.prevSlide()" cursor="pointer">
                                    <Icon name="ic:baseline-arrow-circle-right" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>



                <!-- Right Panel -->
                <template #rightpanel>
                    <div flex="~ col" position="relative" w="full" h="full" bg="primary dark:primary">
                        <div position="absolute" right="0" flex="~" bg="primary dark:primary" text-white>
                            <div text="hover:whitesec" v-if="store.isAdmin" @click="store.toggleReadOnly" cursor="pointer" px="4px" py="12px">
                                <Icon :name="store.isReadOnly ? 'ic:baseline-edit-off' : 'ic:baseline-edit'" />
                            </div>
                            <div text="hover:whitesec" v-if="store.isAdmin" @click="store.toggleProdcast" cursor="pointer" px="4px" py="12px">
                                <Icon :name="store.isProdcast ? 'mdi:broadcast' : 'mdi:broadcast-off'" />
                            </div>
                            <div text="hover:whitesec" v-if="store.getCurrentSlide?.type == 'CodeEditor' && store.getProdcastedCode && !store.isProdcast" @click="store.restoreCode()" cursor="pointer" px="4px" py="12px">
                                <Icon name="material-symbols:settings-backup-restore" />
                            </div>
                            <div text="hover:whitesec" v-if="store.getCurrentSlide?.type == 'CodeEditor'" @click="store.setCode({ html: store.getCurrentSlide?.html, css: store.getCurrentSlide?.css, javascript: store.getCurrentSlide?.javascript })" cursor="pointer" px="4px" py="12px">
                                <Icon name="material-symbols:restore-page-rounded" />
                            </div>
                        </div>

                        <!-- SLIDE TYPE -->
                        <div flex="grow">
                            <Transition>
                                <TypeCodeEditor v-if="store.getCurrentSlide?.type == 'CodeEditor'" />
                                <TypeQuestion v-else-if="store.getCurrentSlide?.type == 'Question'" />
                            </Transition>
                        </div>
                    </div>
                </template>
            </NuxtLayout>

            <template #fallback>
                <div>Loading...</div>
            </template>
        </Suspense>
    </div>
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

// set slide content
await store.setSlideContent()

// Connect to socket
await store.socketConnect()



const content = store.getSlideContent


// WATCH SOCKET DATA
watch(() => store.getSocketData, (data) => store.socketDataReceived(JSON.parse(data)), { deep: true })


// UI
const selectedTab = ref(null)
const selectTab = (tab) => {
    if (selectedTab.value == tab) selectedTab.value = null
    else selectedTab.value = tab
}
</script>

<style scoped>
.v-enter-active {
    transition: all 0.15s ease-in-out;
}

.v-leave-active {
    transition: all 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>
