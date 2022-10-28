<template>
    <div class="nuxt-content">
        <p text-lg>{{question?.question}} ({{question?.type}})</p>
        <div v-if="question?.type =='multiple'">
            <div v-for="(answer, index) in question?.answers" :key="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                    <input v-if="!store.isAdmin" class="hidden" :id="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`" :name="question.question" v-model="question.choice[index]" :value="answer.title" type="checkbox">
                    <label v-if="!store.isAdmin" py="12px" px="6px" text-center w-full block cursor-pointer my-2 border="1px secondary" :bg="Boolean(question.choice[index]) ? 'secondary' : ''" :for="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                        <div flex><Icon :name="Boolean(question.choice[index]) ? 'mdi:checkbox-blank' : 'mdi:checkbox-blank-outline'" mx-2/> {{answer.title}}</div>
                        </label>
                    <p v-else>{{answer.title}} <Icon :name="Boolean(question.choice[index]) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(question.choice[index]) ? 'success' : 'error'" /></p>
            </div>
        </div>

        <div v-if="question?.type =='one'">
            <div v-for="(answer, index) in question?.answers" :key="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                <input class="hidden" v-if="!store.isAdmin" :name="question.question" v-model="question.choice" :value="answer.title" :id="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`" type="radio">
                <label v-if="!store.isAdmin" py="12px" px="6px" text-center w-full block cursor-pointer my-2 border="1px secondary" :bg="question.choice == answer.title ? 'secondary' : ''" :for="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                    <div flex><Icon :name="question.choice == answer.title ? 'mdi:checkbox-blank-circle' : 'mdi:checkbox-blank-circle-outline'" mx-2/> {{answer.title}}</div>
                </label>
            </div>
            <span v-if="userId !== store?.questionsUserId" bg="whitesec">{{ question.choice }}</span>
        </div>

        <div v-if="question?.type =='text'" :key="`text-${store?.questionsUserId}-${question.question}`">
            <textarea text="sm whitesec" bg="primary focus:secondary/50" class="focus:outline-none focus:ring-2 focus:ring-secondary" w-full rows="4" p-2 border="secondary" placeholder="answer here" v-if="!store.isAdmin" v-model.lazy="question.choice"></textarea>
            <p v-else>{{ question.choice }}</p>
        </div>

        <div text-whitesec v-if="question?.type !== 'text' && store.isAdmin">Question Result = <Icon :name="Boolean(question?.result) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(question?.result) ? 'success' : 'error'" /></div>
    </div>
</template>

<script setup>
const store = useSessionStore()
const props = defineProps(['question'])
const userId = useCookie('userId')

// Initiate data for checkbox
if (!props.question?.choice && props.question?.type == "multiple") props.question.choice = []
</script>