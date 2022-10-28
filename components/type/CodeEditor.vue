<template>
    <div h="full" w="full">
        <Transition>
            <div v-if="!isLoading" h="full" flex="~ col">
                <!-- Tabs -->
                <div flex="grow">
                    <UiTabGroup h="full" :tabs="['html', 'css', 'js']" :selected="store.selectedTab" @selected="store.sendSelectedTab($event)">
                        <template #tab-1>
                            <MonacoEditor w="full" h="full" @keyup="sendCode($event)" v-model="store.code.html" lang="html" :options="{ fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly, minimap: { enabled: false } }" />
                        </template>

                        <template #tab-2>
                            <MonacoEditor w="full" h="full" @keyup="sendCode($event)" v-model="store.code.css" lang="css" :options="{ fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly, minimap: { enabled: false } }" />
                        </template>

                        <template #tab-3>
                            <MonacoEditor w="full" h="full" @keyup="sendCode($event)" v-model="store.code.javascript" lang="javascript" :options="{ fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly, minimap: { enabled: false } }" />
                        </template>
                    </UiTabGroup>
                </div>

                <div position="relative" flex="basis-1/2" bg="primary">
                    <div class="opacity-0 hover:opacity-100" transition="~ duration-100 ease-in-out" flex="~" items="center" justify="center" h="3" bg="secondaryOp dark:secondary" cursor="n-resize" w="full" top="-1.5" left="0" position="absolute">
                        <span rounded="full" w="2" h="2" bg="tertiary dark:tertiaryOp"></span>
                    </div>

                    <iframe overflow-scroll h="full" w="full" ref="previewRef" border="0" bg-white></iframe>
                </div>
            </div>
            <div v-else h="full" w="full" flex="~" items="center" justify="center" text-whitesec>
                <Icon size="50" name="line-md:loading-twotone-loop" />
            </div>
        </Transition>
    </div>
</template>

<script setup>
// Initiate store
const store = useSessionStore()

const isLoading = ref(true)

// Preview Panel Reference
const previewRef = ref(null)

const updatePreview = async () => {
    const { html, css, javascript } = { ...store.getCode }


    // Get element of iframe
    const preview = previewRef.value?.contentDocument || previewRef.value?.contentWindow?.document;

    if (!preview) return false

    preview.open();
    preview.write(`<style>${css ?? ''}</style>${html ?? ''}`);

    const scriptEl = document.createElement('script');
    const newContent = document.createRange().createContextualFragment(javascript ?? '');
    scriptEl.append(newContent)
    preview.body.appendChild(scriptEl);
    preview.close();

}

const sendCode = useDebounceFn(async (e) => {
    if (!store.isAdmin && store.isReadOnly) return false
    const prevents = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 91, 92, 93, 112, 113, 114, 115, , 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183]
    if (prevents.includes(e.which)) {
        console.log('not a letter')
        return false
    }

    store.storeCode()
}, 100)


// Listen for writes in editors
watch(() => store.getCode, () => updatePreview(), { deep: true })

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)

    setTimeout(() => {
        updatePreview()
    }, 1250)
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
    transform: translateY(20px);
    opacity: 0;
}

</style>