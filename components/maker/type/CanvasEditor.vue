<template>
    <div h="full" position="relative">
        <Transition>
            <div v-if="saving" z="10"  position="absolute" text="whitesec" bottom="7" right="7" flex="~ gap-1" items="center">
                <Icon size="20" name="line-md:loading-twotone-loop" />
                <span text="sm">Saving...</span>
            </div>
        </Transition>
        <MonacoEditor w="full" h="full" @keyup="saveCode($event)" v-model="store.getSelectedSlide.canvas" lang="javascript" :options="{ fontSize: '20px', minimap: { enabled: false } }" />
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
        if (store.getSelectedSlide.canvas) store.updateSlideAttribute('canvas', store.getSelectedSlide.canvas)
    }, 1500)
    
    setTimeout(() => saving.value = false, 2500)
}, 5000, { maxWait: 5000 })

</script>