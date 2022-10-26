<template>
    <div>
        {{question?.question}}
        {{question?.type}}
        <div v-if="question?.type =='multiple'">
            <div v-for="(answer, index) in question?.answers" :key="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                <label>{{answer.title}}</label>
                <input v-if="!store.isAdmin" :name="question.question" v-model="question.choice[index]" :value="answer.title" type="checkbox">
                <span v-else bg="whitesec">{{ Boolean(question.choice[index]) }}</span>
            </div>
        </div>

        <div v-if="question?.type =='one'">
            <div v-for="(answer, index) in question?.answers" :key="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                <label>{{answer.title}}</label>
                <input v-if="!store.isAdmin" :name="question.question" v-model="question.choice" :value="answer.title" type="radio">
            </div>
            <span v-if="userId !== store?.questionsUserId" bg="whitesec">{{ question.choice }}</span>
        </div>

        <div v-if="question?.type =='text'" :key="`text-${store?.questionsUserId}-${question.question}`">
            <textarea v-if="!store.isAdmin" v-model.lazy="question.choice"></textarea>
            <p v-else>{{ question.choice }}</p>
        </div>

        <div text-whitesec v-if="question?.type !== 'text' && store.isAdmin">Question Result = {{ Boolean(question?.result) }}</div>
    </div>
</template>

<script setup>
const store = useSessionStore()
const props = defineProps(['question'])
const userId = useCookie('userId')

// Initiate data for checkbox
if (!props.question?.choice && props.question?.type == "multiple") props.question.choice = []
</script>