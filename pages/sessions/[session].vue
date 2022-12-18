<template>
    <div>
        <Suspense>
            <NuxtLayout v-if="store.getCurrentSlide?.type == 'JustSlide'">
                <div flex="~ col" w="full" p="4">
                    <span text="lg whitesec dark:whitesec">{{ store.getCurrentSlide?.chapter }}</span>
                    <span text="xl white dark:white" mb="6">{{ store.getCurrentSlide?.title }}</span>

                    <!-- CONTENT -->
                    <div class="nuxt-content" v-show="selectedTab === 'settings'">
                        Settings
                    </div>

                    <div class="nuxt-content" v-show="selectedTab === 'users'">
                        <Users />
                    </div>

                    <div class="nuxt-content" v-show="selectedTab === 'log'" pr="4" h="[calc(100vh-14rem)]" overflow-y="auto" flex="~ col gap-2">
                        <!-- {{ store.getLogs }} -->
                        <div v-for="(log, index) in store.getLogs" :key="log?.timestamp" flex="~" justify="between">
                            <div flex="~ gap-2">
                                <span>{{ index + 1 }}.</span>
                                <span>{{ log?.title }}</span>
                            </div>
                            <span>{{ new Date(log?.timestamp)?.toLocaleTimeString("en-US") }}</span>
                        </div>
                    </div>


                    <div v-if="content" v-show="selectedTab == null" overflow="y-auto" pr="2" mb="30">
                        <ContentRenderer class="nuxt-content prose" :value="content">
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
                                <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" fill-rule="evenodd" d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h3c.55 0 1-.45 1-1v-2c0-2.18-3.57-3.47-6.33-3.87z"/><circle cx="9" cy="8" r="4" fill="currentColor" fill-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 1c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"/></svg>
                            </div>
                        </div>
                        <div v-if="store.isAdmin" flex="~" justify="between" p="4" bg="tertiary" text="white 2xl">
                            <div flex="~ gap-3">
                                <UiToolTip text="Full Screen">
                                    <span @click="toggleFullscreen()" text="hover:whitesec" cursor="pointer">
                                        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                                    </span>
                                </UiToolTip>
                                <UiToolTip text="Settings">
                                    <span :class="{ 'text-whitesec': selectedTab == 'settings'}" text="hover:whitesec" @click="selectTab('settings')" cursor="pointer">
                                        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/></svg>
                                    </span>
                                </UiToolTip>
                                <UiToolTip text="Users">
                                    <span :class="{ 'text-whitesec': selectedTab == 'users'}" text="hover:whitesec" @click="selectTab('users')" cursor="pointer">
                                        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7a2.5 2.5 0 0 0 0 5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5S6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"/></svg>
                                    </span>
                                </UiToolTip>
                                <UiToolTip text="Logs">
                                    <span :class="{ 'text-whitesec': selectedTab == 'log'}" text="hover:whitesec" @click="selectTab('log')" cursor="pointer">
                                        <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M17 21H7c-1.654 0-3-1.346-3-3V6c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v12c0 1.654-1.346 3-3 3zM7 5c-.551 0-1 .449-1 1v12c0 .551.449 1 1 1h10c.551 0 1-.449 1-1V6c0-.551-.449-1-1-1H7zm9 6H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1zm0-3H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1zm0 6H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1zm0 3H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1z"/></svg>
                                    </span>
                                </UiToolTip>


                            </div>
                            <div flex="~ gap-6">
                                <span text="hover:whitesec" :class="{ 'text-error': store.hasNextSlide }" @click="store.nextSlide()" cursor="pointer">
                                    <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12zm10-1h4v2h-4v3l-4-4l4-4v3z"/></svg>
                                </span>
                                <span text="hover:whitesec" :class="{ 'text-error': store.hasPrevSlide }" @click="store.prevSlide()" cursor="pointer">
                                    <svg width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10zm-10 1H8v-2h4V8l4 4l-4 4v-3z"/></svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </NuxtLayout>

            <NuxtLayout v-else name="two-sections">
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

                    <div class="nuxt-content" v-show="selectedTab === 'log'" pr="4" h="[calc(100vh-14rem)]" overflow-y="auto" flex="~ col gap-2">
                        <!-- {{ store.getLogs }} -->
                        <div v-for="(log, index) in store.getLogs" :key="log?.timestamp" flex="~" justify="between">
                            <div flex="~ gap-2">
                                <span>{{ index + 1 }}.</span>
                                <span>{{ log?.title }}</span>
                            </div>
                            <span>{{ new Date(log?.timestamp)?.toLocaleTimeString("en-US") }}</span>
                        </div>
                    </div>


                    <div v-if="content" v-show="selectedTab == null" overflow="y-auto" pr="2" mb="30">
                        <ContentRenderer class="nuxt-content prose" :value="content">
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
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" fill-rule="evenodd" d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h3c.55 0 1-.45 1-1v-2c0-2.18-3.57-3.47-6.33-3.87z"/><circle cx="9" cy="8" r="4" fill="currentColor" fill-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 1c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4z"/></svg>
                            </div>
                        </div>
                        <div v-if="store.isAdmin" flex="~" justify="between" p="4" bg="tertiary" text="white 2xl">
                            <div flex="~ gap-3">
                                <UiToolTip text="Full Screen">
                                    <span @click="toggleFullscreen()" text="hover:whitesec" cursor="pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                                    </span>
                                </UiToolTip>
                                <UiToolTip text="Settings">
                                    <span :class="{ 'text-whitesec': selectedTab == 'settings'}" text="hover:whitesec" @click="selectTab('settings')" cursor="pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M19.14 12.94c.04-.3.06-.61.06-.94c0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6s3.6 1.62 3.6 3.6s-1.62 3.6-3.6 3.6z"/></svg>
                                    </span>
                                </UiToolTip>
                                <UiToolTip text="Users">
                                    <span :class="{ 'text-whitesec': selectedTab == 'users'}" text="hover:whitesec" @click="selectTab('users')" cursor="pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7a2.5 2.5 0 0 0 0 5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5S6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"/></svg>
                                    </span>
                                </UiToolTip>
                                <UiToolTip text="Logs">
                                    <span :class="{ 'text-whitesec': selectedTab == 'log'}" text="hover:whitesec" @click="selectTab('log')" cursor="pointer">
                                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M17 21H7c-1.654 0-3-1.346-3-3V6c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v12c0 1.654-1.346 3-3 3zM7 5c-.551 0-1 .449-1 1v12c0 .551.449 1 1 1h10c.551 0 1-.449 1-1V6c0-.551-.449-1-1-1H7zm9 6H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1zm0-3H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1zm0 6H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1zm0 3H8a.5.5 0 0 1 0-1h8a.5.5 0 0 1 0 1z"/></svg>
                                    </span>
                                </UiToolTip>


                            </div>
                            <div flex="~ gap-6">
                                <span text="hover:whitesec" :class="{ 'text-error': store.hasNextSlide }" @click="store.nextSlide()" cursor="pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12zm10-1h4v2h-4v3l-4-4l4-4v3z"/></svg>
                                </span>
                                <span text="hover:whitesec" :class="{ 'text-error': store.hasPrevSlide }" @click="store.prevSlide()" cursor="pointer">
                                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10s10-4.48 10-10zm-10 1H8v-2h4V8l4 4l-4 4v-3z"/></svg>
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
                                <svg v-if="store.isReadOnly" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"/></svg>
                                <svg else width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="m12.126 8.125l1.937-1.937l3.747 3.747l-1.937 1.938zM20.71 5.63l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83l3.75 3.75L20.71 7a1 1 0 0 0 0-1.37zM2 5l6.63 6.63L3 17.25V21h3.75l5.63-5.62L18 21l2-2L4 3L2 5z"/></svg>
                            </div>
                            <div text="hover:whitesec" v-if="store.isAdmin" @click="store.toggleProdcast" cursor="pointer" px="4px" py="12px">
                                <svg v-if="store.isProdcast" width="32" height="32" viewBox="0 0 24 24"><path fill="#888888" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m6 2c0-3.3-2.7-6-6-6s-6 2.7-6 6c0 2.2 1.2 4.1 3 5.2l1-1.7c-1.2-.7-2-2-2-3.4c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.8 2.8-2 3.4l1 1.7c1.8-1 3-3 3-5.2M12 2C6.5 2 2 6.5 2 12c0 3.7 2 6.9 5 8.6l1-1.7c-2.4-1.4-4-4-4-6.9c0-4.4 3.6-8 8-8s8 3.6 8 8c0 3-1.6 5.5-4 6.9l1 1.7c3-1.7 5-4.9 5-8.6c0-5.5-4.5-10-10-10Z"/></svg>
                                <svg else width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M17.6 14.2c.3-.7.4-1.4.4-2.2c0-3.3-2.7-6-6-6c-.8 0-1.6.2-2.2.4L11.4 8h.6c2.2 0 4 1.8 4 4c0 .2 0 .4-.1.6l1.7 1.6M12 4c4.4 0 8 3.6 8 8c0 1.4-.4 2.6-1 3.7l1.5 1.5c.9-1.5 1.5-3.3 1.5-5.2c0-5.5-4.5-10-10-10c-1.9 0-3.7.5-5.2 1.5L8.3 5c1.1-.7 2.3-1 3.7-1M3.3 2.5L2 3.8l2.1 2.1C2.8 7.6 2 9.7 2 12c0 3.7 2 6.9 5 8.6l1-1.7c-2.4-1.4-4-4-4-6.9c0-1.8.6-3.4 1.5-4.7L7 8.8c-.6.9-1 2-1 3.2c0 2.2 1.2 4.1 3 5.2l1-1.7c-1.2-.7-2-2-2-3.4c0-.6.2-1.2.4-1.8l1.6 1.6v.2c0 1.1.9 2 2 2h.2l7.5 7.5l1.3-1.3L4.3 3.5l-1-1Z"/></svg>
                            </div>
                            <div text="hover:whitesec" v-if="store.getCurrentSlide?.type == 'CodeEditor' && store.getProdcastedCode && !store.isProdcast" @click="store.restoreCode()" cursor="pointer" px="4px" py="12px">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M12 14q-.825 0-1.412-.588Q10 12.825 10 12t.588-1.413Q11.175 10 12 10t1.413.587Q14 11.175 14 12q0 .825-.587 1.412Q12.825 14 12 14Zm0 7q-3.475 0-6.025-2.288Q3.425 16.425 3.05 13H5.1q.35 2.6 2.312 4.3Q9.375 19 12 19q2.925 0 4.962-2.038Q19 14.925 19 12t-2.038-4.963Q14.925 5 12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475Q9.95 3 12 3q1.875 0 3.513.712q1.637.713 2.85 1.925q1.212 1.213 1.925 2.85Q21 10.125 21 12t-.712 3.512q-.713 1.638-1.925 2.85q-1.213 1.213-2.85 1.926Q13.875 21 12 21Z"/></svg>
                            </div>
                            <div text="hover:whitesec" v-if="store.getCurrentSlide?.type == 'CodeEditor'" @click="store.setCode({ html: store.getCurrentSlide?.html, css: store.getCurrentSlide?.css, javascript: store.getCurrentSlide?.javascript })" cursor="pointer" px="4px" py="12px">
                                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M18 22H6q-.825 0-1.412-.587Q4 20.825 4 20V4q0-.825.588-1.413Q5.175 2 6 2h7.175q.4 0 .763.15q.362.15.637.425l4.85 4.85q.275.275.425.637q.15.363.15.763V20q0 .825-.587 1.413Q18.825 22 18 22Zm-6-4.25q1.95 0 3.35-1.4q1.4-1.4 1.4-3.35q0-1.95-1.4-3.35q-1.4-1.4-3.35-1.4q-.95 0-1.775.35t-1.475.95v-.8q0-.325-.212-.538Q8.325 8 8 8q-.325 0-.537.212q-.213.213-.213.538v2.5q0 .425.287.712q.288.288.713.288h2.5q.325 0 .538-.213q.212-.212.212-.537q0-.325-.212-.538q-.213-.212-.538-.212H9.7q.425-.45 1.025-.725q.6-.275 1.275-.275q1.35 0 2.3.95q.95.95.95 2.3q0 1.35-.95 2.3q-.95.95-2.3.95q-.975 0-1.738-.512q-.762-.513-1.187-1.338q-.075-.175-.25-.287Q8.65 14 8.45 14q-.475 0-.712.325q-.238.325-.038.725q.575 1.2 1.725 1.95q1.15.75 2.575.75Z"/></svg>
                            </div>
                        </div>

                        <!-- SLIDE TYPE -->
                        <div flex="grow">
                            <Transition>
                                <TypeCodeEditor v-if="store.getCurrentSlide?.type == 'CodeEditor'" />
                                <TypeQuestion v-else-if="store.getCurrentSlide?.type == 'Question'" />
                                <TypeCanvas v-else-if="store.getCurrentSlide?.type == 'Canvas'" />
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
const { isFullscreen, enter, exit, toggle: toggleFullscreen } = useFullscreen()

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



const content = computed(() => store.getSlideContent ?? null)


// WATCH SOCKET DATA
watch(() => store.getSocketData, (data) => store.socketDataReceived(JSON.parse(data)), { deep: true })


// UI
const selectedTab = ref(null)
const selectTab = (tab) => {
    if (selectedTab.value == tab) selectedTab.value = null
    else selectedTab.value = tab
}

onKeyStroke('ArrowLeft', (e) => {
  e.preventDefault()
  store.nextSlide()
})

onKeyStroke('ArrowRight', (e) => {
  e.preventDefault()
  store.prevSlide()
})
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
