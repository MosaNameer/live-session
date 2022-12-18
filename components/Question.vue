<template>
    <div class="nuxt-content">
        <p text-lg>{{question?.question}} ({{question?.type}})</p>
        <div v-if="question?.type =='multiple'">
            <div v-for="(answer, index) in question?.answers" :key="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                    <input v-if="!store.isAdmin" class="hidden" :id="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`" :name="question.question" v-model="question.choice[index]" :value="answer.title" type="checkbox">
                    <label v-if="!store.isAdmin" py="12px" px="6px" text-center w-full block cursor-pointer my-2 border="1px secondary" :bg="Boolean(question.choice[index]) ? 'secondary' : ''" :for="`multiple-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                        <div flex><svg v-if="Boolean(question.choice[index])" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"/></svg><svg v-else width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M19 3H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14Z"/></svg> {{answer.title}}</div>
                        </label>
                    <p v-else>{{answer.title}} <svg v-if="Boolean(question.choice[index])" width="16" height="16" viewBox="0 0 512 512"><path d="M448 71.9c-17.3-13.4-41.5-9.3-54.1 9.1L214 344.2l-99.1-107.3c-14.6-16.6-39.1-17.4-54.7-1.8-15.6 15.5-16.4 41.6-1.7 58.1 0 0 120.4 133.6 137.7 147 17.3 13.4 41.5 9.3 54.1-9.1l206.3-301.7c12.6-18.5 8.7-44.2-8.6-57.5z" fill="#888888"/></svg> <svg v-else width="16" height="16" viewBox="0 0 320 512"><path fill="#888888" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7L54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256L9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256l105.3-105.4z"/></svg></p>
            </div>
        </div>

        <div v-if="question?.type =='one'">
            <div v-for="(answer, index) in question?.answers" :key="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                <input class="hidden" v-if="!store.isAdmin" :name="question.question" v-model="question.choice" :value="answer.title" :id="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`" type="radio">
                <label v-if="!store.isAdmin" py="12px" px="6px" text-center w-full block cursor-pointer my-2 border="1px secondary" :bg="question.choice == answer.title ? 'secondary' : ''" :for="`one-${store?.questionsUserId}-${question.question}-${answer.title}-${index}`">
                    <div flex><svg v-if="question.choice == answer.title" width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/></svg> <svg v-else width="16" height="16" viewBox="0 0 24 24"><path fill="#888888" d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/></svg> {{answer.title}}</div>
                </label>
            </div>
            <span v-if="userId !== store?.questionsUserId" bg="whitesec">{{ question.choice }}</span>
        </div>

        <div v-if="question?.type =='text'" :key="`text-${store?.questionsUserId}-${question.question}`">
            <textarea text="sm whitesec" bg="primary focus:secondary/50" class="focus:outline-none focus:ring-2 focus:ring-secondary" w-full rows="4" p-2 border="secondary" placeholder="answer here" v-if="!store.isAdmin" v-model.lazy="question.choice"></textarea>
            <p v-else>{{ question.choice }}</p>
        </div>

        <div text-whitesec v-if="question?.type !== 'text' && store.isAdmin">Question Result = <svg v-if="Boolean(question?.result)" width="16" height="16" viewBox="0 0 512 512"><path d="M448 71.9c-17.3-13.4-41.5-9.3-54.1 9.1L214 344.2l-99.1-107.3c-14.6-16.6-39.1-17.4-54.7-1.8-15.6 15.5-16.4 41.6-1.7 58.1 0 0 120.4 133.6 137.7 147 17.3 13.4 41.5 9.3 54.1-9.1l206.3-301.7c12.6-18.5 8.7-44.2-8.6-57.5z" fill="#888888"/></svg> <svg v-else width="16" height="16" viewBox="0 0 320 512"><path fill="#888888" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7L54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256L9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256l105.3-105.4z"/></svg></div>
    </div>
</template>

<script setup>
const store = useSessionStore()
const props = defineProps(['question'])
const userId = useCookie('userId')

// Initiate data for checkbox
if (!props.question?.choice && props.question?.type == "multiple") props.question.choice = []
</script>