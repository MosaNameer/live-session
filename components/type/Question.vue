<template>
    <div v-if="store.isAdmin && userId == store.questionsUserId">
        YOU CAN"T ANSWER QUESTIONS
    </div>
    <div v-else flex="~ col" h="full" bg="primary">
        <!-- <h1 text="white">{{selectedQuestion+1}} / {{questions?.length}}</h1> -->
        <div flex="~ gap-2">
            <span 
            v-for="(question, index) in questions" :key="`questions-${store?.questionsUserId}-${question.question}-${index}`"
            @click="selectedQuestion = index"
            :class="[
                store.getMyCorrectQuestion?.[index]?.choice?.length > 0
                && store.getMyCorrectQuestion?.[index]?.choice
                ? 'bg-success'
                : ( selectedQuestion == index
                ? 'bg-white'
                : 'bg-whitesec' )
            ]" flex="~" items="center" justify="center" w="10" h="10" text="xl" cursor="pointer">
                {{ index }}
            </span>
        </div>
        
        <Question :question="store.getMyCorrectQuestion?.[selectedQuestion]" />
    </div>
</template>

<script setup>
const store = useSessionStore()
const userId = useCookie('userId')
const questions = store?.getQuestions

const selectedQuestion = ref(0)



watch(() => questions, () => {
    store.storeQuestions(questions)
}, {deep: true})
</script>