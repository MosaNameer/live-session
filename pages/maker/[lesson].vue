<template>
    <div flex="~" w="screen" h="screen" bg-primary>
        <!-- Left -->
        <div flex="~ basis-1/2 gap-4" p="4">
            <!-- SLIDES NAVIGATION -->
            <div h="full" flex="~ col gap-2" items="center" text="white">
                <a href="/maker" flex="~" items="center" justify="center" bg="hover:secondary" cursor="pointer" border="2 secondary" h="10" w="10"></a>
                <div v-for="(_, index) in store.getSlides" :key="index" @click="store.selectSlide(_)" :class="{ 'bg-secondary': _._path == store.getSelectedSlide?._path }" flex="~" bg="hover:secondary" cursor="pointer" items="center" justify="center" border="~ secondary" h="10" w="10">
                    {{ index + 1 }}
                </div>
                <div @click="store.newSlide()" flex="~" items="center" justify="center" bg="hover:secondary" cursor="pointer" border="~ secondary" h="10" w="10">
                    <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888888" d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"/></svg>
                </div>
            </div>

            <!-- SLIDE CONTROL -->
            <div v-if="store.getSelectedSlide" flex="~ col gap-4 grow">
                <UiInput v-if="editTitle" @keyup.enter="() => { store.updateSlideAttribute('title', store.selectedSlide.title), editTitle = false}" v-model="store.selectedSlide.title" />
                <span @click="editTitle = true" v-else text="white xl" mt="2">
                    {{ store.getSelectedSlide?.title }}
                </span>
                <UiTabGroup flex="grow" w="full" :tabs="['TEXT', 'TYPE']" @selected="store.sendSelectedTab($event)">
                    <template #tab-1>
                        <MakerMarkdown />
                    </template>
    
                    <template #tab-2>
                        <MakerType />
                    </template>
                </UiTabGroup>
            </div>
        </div>

        <!-- Right -->
        <div flex="basis-1/2" h="full" w="full">
            <MakerMarkdownPreview v-if="store.getSelectedTab == 1" />
            <div h="full" v-if="store.getSelectedTab == 2">
                <MakerTypeCodeEditorPreview v-if="store.getSelectedSlide?.type == 'CodeEditor'" />
                <MakerTypeCanvasEditorPreview v-else-if="store.getSelectedSlide?.type == 'Canvas'" />
                <div v-else>
                    Type Preview
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const { params: { lesson } } = useRoute()
const store = useMaker()

await store.fetchSlides()

const editTitle = ref(false)
</script>