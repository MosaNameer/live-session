<template>
    <div class="nuxt-content">
        <p text-lg>{{question?.question}} ({{question?.type}})</p>
        <div v-if="question?.type =='multiple'">
            <div v-for="(answer, index) in question?.answers" :key="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`" :bg="question.choice[index] ? 'secondary' : ''" cursor-pointer p-4 my-2 border="1px secondary">
                <label >{{answer.title}}</label>
                <input v-if="!store.isAdmin" :name="question.question" v-model="question.choice[index]" :value="answer.title" type="checkbox">
                <Icon v-else :name="Boolean(question.choice[index]) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(question.choice[index]) ? 'success' : 'error'" />
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
            <textarea text="sm whitesec" bg="primary focus:secondary" class="focus:outline-none focus:ring-2 focus:ring-secondary" w-full rows="4" p-2 border="secondary" placeholder="answer here" v-if="!store.isAdmin" v-model.lazy="question.choice"></textarea>
            <p v-else>{{ question.choice }}</p>
        </div>

        <div text-whitesec v-if="question?.type !== 'text' && store.isAdmin">Question Result = <Icon :name="Boolean(question?.result) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(question?.result) ? 'success' : 'error'" /></div>
    </div>
</template>

<script setup>
const store = useSessionStore()
const props = defineProps(['question'])
const userId = useCookie('userId')

onBeforeMount(() => {
    if (props.question?.type === 'multiple') {
        props.question.choice = props.question.choice || []
    }
})

// Initiate data for checkbox
// if (!props.question?.choice && props.question?.type == "multiple") props.question.choice = []
</script>