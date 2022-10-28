<template>
    <div h="full" position="relative">
        <Transition>
            <div v-if="saving" z="10"  position="absolute" text="whitesec" bottom="7" right="7" flex="~ gap-1" items="center">
                <Icon size="20" name="line-md:loading-twotone-loop" />
                <span text="sm">Saving...</span>
            </div>
        </Transition>
        <UiTabGroup h="full" :tabs="['html', 'css', 'js']">
            <template #tab-1>
                <MonacoEditor w="full" h="full" @keyup="saveCode($event)" v-model="store.getSelectedSlide.html" lang="html" :options="{ fontSize: '20px', minimap: { enabled: false } }" />
            </template>

            <template #tab-2>
                <MonacoEditor w="full" h="full" @keyup="saveCode($event)" v-model="store.getSelectedSlide.css" lang="css" :options="{ fontSize: '20px', minimap: { enabled: false } }" />
            </template>

            <template #tab-3>
                <MonacoEditor w="full" h="full" @keyup="saveCode($event)" v-model="store.getSelectedSlide.javascript" lang="javascript" :options="{ fontSize: '20px', minimap: { enabled: false } }" />
            </template>
        </UiTabGroup>
    </div>
</template>

<script setup>
const store = useMaker()

const saving = ref(false)

const saveCode = useDebounceFn(async (e) => {
    const prevents = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 91, 92, 93, 112, 113, 114, 115, , 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183]
    if (prevents.includes(e.which)) return false

    saving.value = true
    
    setTimeout(() => {
        if (store.getSelectedSlide.html) store.updateSlideAttribute('html', store.getSelectedSlide.html)
    }, 500)
    setTimeout(() => {
        if (store.getSelectedSlide.css) store.updateSlideAttribute('css', store.getSelectedSlide.css)
    }, 1000)
    setTimeout(() => {
        if (store.getSelectedSlide.javascript) store.updateSlideAttribute('javascript', store.getSelectedSlide.javascript)
    }, 1500)
    
    setTimeout(() => saving.value = false, 2500)
}, 5000, { maxWait: 5000 })

</script>