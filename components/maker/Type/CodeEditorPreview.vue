<template>
    <iframe overflow-scroll h="full" w="full" ref="previewRef" border="0" bg-white></iframe>
</template>

<script setup>
const store = useMaker()

const previewRef = ref(null)

const updatePreview = async () => {
    // Get element of iframe
    const preview = previewRef.value?.contentDocument || previewRef.value?.contentWindow?.document;

    if (!preview) return false

    preview.open();
    preview.write(`<style>${store.getSelectedSlide?.css ?? ''}</style>${store.getSelectedSlide?.html ?? ''}`);

    const scriptEl = document.createElement('script');
    const newContent = document.createRange().createContextualFragment(store.getSelectedSlide?.javascript ?? '');
    scriptEl.append(newContent)
    preview?.body?.appendChild(scriptEl);
    preview.close();

}

watch(() => store.getSelectedSlide?.html, () => updatePreview(), { deep: true })
watch(() => store.getSelectedSlide?.css, () => updatePreview(), { deep: true })
watch(() => store.getSelectedSlide?.javascript, () => updatePreview(), { deep: true })

onMounted(() => {
    updatePreview()
})

</script>