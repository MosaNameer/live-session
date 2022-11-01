<template>
    <div flex="~ col" p="x-8 y-4" border="l secondary" h="full">
        <span mb="6" text-white>Markdown Preview</span>
        <div class="nuxt-content" h="[calc(100vh-5rem)]" overflow-y="scroll">
            <RenderHtml :html="html" />
        </div>
    </div>
</template>

<script setup>
import { marked } from 'marked';
const store = useMaker()
const html = ref(null)

watch(() => store.getSlideMarkdown, (markdown) => {
    html.value = markdown ? marked.parse(markdown) : '<div></div>';
}, { deep: true, immediate: true })
</script>