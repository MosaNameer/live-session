<template>
    <div flex="~ col" pr="4" h="0" overflow-y="auto" text="whitesec">
        <div flex="~ gap-2" mb="4">
            <div v-for="(_, index) in store.getSelectedSlide?.questions" :key="index" @click="selectedQuestion = _" :class="{ 'bg-secondary': _ == selectedQuestion }" flex="~" bg="hover:secondary" cursor="pointer" items="center" justify="center" border="~ secondary" h="10" w="10">
                {{ index + 1 }}
            </div>
            <div @click="() => { newState = true, selectedQuestion = null}" flex="~" bg="hover:secondary" cursor="pointer" items="center" justify="center" border="~ secondary" h="10" w="10">
                <Icon name="material-symbols:add" size="25" />
            </div>
        </div>

        <MakerTypeQuestionNew v-if="newState || selectedQuestion || store.getSelectedSlide?.questions?.length < 1" :stateFunction="() => {newState = false, selectedQuestion = null}" :question="selectedQuestion" />

        <br /><br />
    </div>
</template>


<script setup>
const store = useMaker()
const selectedQuestion = ref(null)
const [newState, newToggle] = useToggle(false)
</script>