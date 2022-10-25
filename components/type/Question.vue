<template>
    <div flex="~ col" h="full" bg="primary">
        <h1 text="white">{{selectedQuestion+1}} / {{questions?.length}}</h1>
        <div flex="~ gap-2">
            <span 
            v-for="(question, index) in questions" :key="question.question"
            @click="selectedQuestion = index"
            :class="[
                selectedQuestion == index
                ? 'bg-white'
                : 'bg-whitesec'
            ]" flex="~" items="center" justify="center" w="10" h="10" text="xl" cursor="pointer">{{ index }}</span>
        </div>

        <Question :question="questions[selectedQuestion]" />
    </div>
</template>

<script setup>
const store = useSessionStore()
const questions = store?.getQuestions

const selectedQuestion = ref(0)


watch(() => questions, () => {
    store.storeQuestions(questions)
}, {deep: true})
</script>