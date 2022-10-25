<template>
    <div h="full" flex="~ col">
        <!-- Tabs -->
        <div v-if="codeRender" flex="grow">
            <UiTabGroup h="full" :tabs="['html', 'css', 'js']">
                <template #tab-1>
                    <MonacoEditor w="full" h="full" @keyup="sendCode($event)" v-model="store.code.html" lang="html" :options="{ theme: 'vs-dark', fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly }" />
                </template>

                <template #tab-2>
                    <MonacoEditor w="full" h="full" @keyup="sendCode($event)" v-model="store.code.css" lang="css" :options="{ theme: 'vs-dark', fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly }" />
                </template>

                <template #tab-3>
                    <MonacoEditor w="full" h="full" @keyup="sendCode($event)" v-model="store.code.javascript" lang="javascript" :options="{ theme: 'vs-dark', fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly }" />
                </template>
            </UiTabGroup>
        </div>

        <div position="relative" flex="basis-1/2" bg="primary">
            <div class="opacity-0 hover:opacity-100" transition="~ duration-100 ease-in-out" flex="~" items="center" justify="center" h="3" bg="secondaryOp dark:secondary" cursor="n-resize" w="full" top="-1.5" left="0" position="absolute">
                <span rounded="full" w="2" h="2" bg="tertiary dark:tertiaryOp"></span>
            </div>

            <iframe h="full" w="full" ref="previewRef" border="0" bg-white></iframe>
        </div>
    </div>
</template>

<script setup>
// Initiate store
const store = useSessionStore()

// Preview Panel Reference
const previewRef = ref(null)
const codeRender = ref(true)

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
    const prevents = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 91, 92, 93, 112, 113, 114, 115, , 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183]
    if (prevents.includes(e.which)) {
        console.log('not a letter')
        return false
    }

    store.storeCode()
}, 100)


// Listen for writes in editors
watchDebounced(() => store.getCode, () => updatePreview(), { deep: true, immediate: true, flush: true, debounce: 100, maxWait: 1000 })

watch(() => store.getCodeForceRender, async (value) => {
    if (value == false) {
        // For force render code editor 
        codeRender.value = false;
        await nextTick();
        codeRender.value = true;
        store.codeForceRender = true
    }
})

</script>