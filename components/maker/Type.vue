<template>
    <div flex="~ col gap-2" h="[calc(100%-4rem)]" text="whitesec">

        <div flex="~ gap-6">
            <div v-for="_type in types" :key="_type">
                <input :id="_type" v-model="store.selectedSlide.type" :value="_type" class="hidden" type="radio">
                <label :for="_type" py="12px" px="6px" text-center w-full block cursor-pointer my-2 border="1px secondary" :bg="store.getSelectedSlide?.type == _type ? 'secondary' : ''">
                    <div flex items-center>
                        <Icon :name="store.getSelectedSlide?.type == _type ? 'mdi:checkbox-blank-circle' : 'mdi:checkbox-blank-circle-outline'" mx-2 />
                        <span>{{ _type }}</span>
                    </div>
                </label>
            </div>
        </div>

        <MakerTypeCodeEditor flex="grow" v-if="store.getSelectedSlide?.type == 'CodeEditor'" />
    </div>
</template>

<script setup>
const store = useMaker()
const types = ['CodeEditor', 'Question']

watch(() => store.getSelectedSlide?.type, (_type) => {
    store.updateSlideAttribute('type', _type)
}, { deep: true })
</script>