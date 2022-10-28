<template>
    <div flex="~ col gap-2" h="full" text="whitesec">
        <MakerTypeQuestionNew v-if="newState" :stateFunction="newToggle" />
        <div flex="~ gap-2" v-else>
            <div v-for="(_, index) in store.getSelectedSlide?.questions" :key="index" @click="selectedQuestion = _" :class="{ 'bg-secondary': _ == selectedQuestion }" flex="~" bg="hover:secondary" cursor="pointer" items="center" justify="center" border="~ secondary" h="10" w="10">
                {{ index + 1 }}
            </div>
            <div @click="newState = true" flex="~" bg="hover:secondary" cursor="pointer" items="center" justify="center" border="~ secondary" h="10" w="10">
                <Icon name="material-symbols:add" size="25" />
            </div>
        </div>

        {{ selectedQuestion }}
    </div>
</template>


<script setup>
const store = useMaker()
const selectedQuestion = ref(null)
const [newState, newToggle] = useToggle(false)
</script>