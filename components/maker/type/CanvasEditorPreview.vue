<template>
    <div ref="previewRef" overflow-scroll h="full" w="full" border="0" bg-white></div>
</template>

<script setup>
import p5 from 'p5'

const store = useMaker()

const previewRef = ref(null)

const updatePreview = async () => {
    previewRef.value.innerHTML = ""

    const code = new Function('p', store.getSelectedSlide?.canvas)
    new p5(code, previewRef.value)
}


watch(() => store.getSelectedSlide?.canvas, () => updatePreview(), { deep: true })

onMounted(() => {
    updatePreview()
})

</script>