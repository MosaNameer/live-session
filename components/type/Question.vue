<template>
    <div flex justify-center h-screen mt-10 class="nuxt-content">
    <div v-if="store.isAdmin && userId == store.questionsUserId">
        <div v-if="store.getCorrectQuestions?.length > 0" flex="~ col gap-2">
            <div v-for="user in store.getCorrectQuestions" :key="user.userId" flex="~ col gap-1" text-whitesec p-4 border="1px secondary">
                <div text-lg>Name: {{ store.getUserById(user.userId)?.name }} - Points: {{ user.points }}</div>
                <div v-for="question in user.data" :key="`${user.userId}-${question.question}`" flex="~ gap-2">
                    <span>Question: {{ question.question }}</span>
                    <span v-if="question.type == 'text'"><Icon name="tabler:text-caption"/>: {{ question.choice }}</span>
                    <Icon v-else :name="question.result ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="question.result ? 'success' : 'error'" />
                </div>
            </div>
        </div>
        <div v-else text="white lg">
            No One Connected
        </div>

        <!-- <div v-for="question in store.getCorrectQuestions" :key="`admin-questions-${store?.questionsUserId}-${question.question}-${index}`">
            {{ question }}
        </div> -->
    </div>
    <div v-else-if="(!store.isAdmin && !store.isReadOnly) || store.isAdmin" flex="~ col" h="full" bg="primary" content-center>
        <!-- <h1 text="white">{{selectedQuestion+1}} / {{questions?.length}}</h1> -->
        <div flex="~ gap-2" justify="center" my-4>
            <span v-for="(question, index) in store?.getQuestions" :key="`questions-${store?.questionsUserId}-${question.question}-${index}`" @click="selectedQuestion = index" :class="[
                store.getMyCorrectQuestion?.[index]?.choice?.length > 0
                    && store.getMyCorrectQuestion?.[index]?.choice
                    ? 'border-1 border-success'
                    : (selectedQuestion == index
                        ? 'bg-secondary border-1 border-scondary'
                        : 'bg-primary border-1 border-scondary')
            ]" flex="~" items="center" justify="center" w="10" h="10" text="xl" cursor="pointer">
                <span text-whitesec>{{ index }}</span>
            </span>
        </div>
        <!-- 1
        {{ store.getMyCorrectQuestion?.[selectedQuestion] }}
        <br />
        <br />
        2
        {{ store.getQuestions?.[selectedQuestion] }}
        <br />
        <br /> -->
        <Question v-if="store.getMyCorrectQuestion?.[selectedQuestion]" :question="store.getMyCorrectQuestion?.[selectedQuestion]" />

        <Question v-else-if="store.getQuestions?.[selectedQuestion]" :question="store.getQuestions?.[selectedQuestion]" />
    </div>

    <!-- Either stopped or not started yet -->
    <div v-else text="white lg">
        Sorry you can't complete answers
    </div>
    </div>
</template>

<script setup>
const store = useSessionStore()
const userId = useCookie('userId')

const selectedQuestion = ref(0)



watch(() => store.getQuestions, () => {
    store.storeQuestions()
}, { deep: true })
</script>