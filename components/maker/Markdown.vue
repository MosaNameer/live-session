<template>
    <div h="[calc(100%-2rem)]" position="relative">
        <Transition>
            <div v-if="saving" z="10" position="absolute" text="whitesec" bottom="7" right="7" flex="~ gap-1" items="center">
                <Icon size="20" name="line-md:loading-twotone-loop" />
                <span text="sm">Saving...</span>
            </div>
        </Transition>
        <Transition>
            <MonacoEditor v-if="store.slideMarkdown && !isLoading" w="full" h="full" @keyup="saveMarkdown($event)" v-model="store.slideMarkdown" lang="markdown" :options="{ fontSize: '20px', minimap: { enabled: false } }" />

            <div v-else h="full" w="full" flex="~" items="center" justify="center" text-whitesec>
                <Icon size="50" name="line-md:loading-twotone-loop" />
            </div>
        </Transition>
    </div>
</template>

<script setup>
const store = useMaker()
const isLoading = ref(true)

watch(() => store.getSelectedSlide, () => {
    store.fetchSlideMarkdown()
}, { deep: true, immediate: true })

const saving = ref(false)

const saveMarkdown = useDebounceFn(async (e) => {
    const prevents = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 91, 92, 93, 112, 113, 114, 115, , 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183]
    if (prevents.includes(e.which)) return false

    saving.value = true
    await store.saveSlideMarkdown()
    setTimeout(() => saving.value = false, 2500)
}, 1000, { maxWait: 5000 })


onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 250)
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
