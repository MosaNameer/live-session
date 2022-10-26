<template>
    <div v-for="(user, index) in store.getUsers" :key="user.id" flex="~ col gap-2" text="lg">
        <div flex="~" justify="between">
            <div flex="~ gap-2" items="center" text-whitesec>
                <span>{{index+1}}.</span>
                <span>{{user.name}}</span>
                <span v-if="store.getSession?.adminId == user.id">(Host)</span>
                <span w="2.5" h="2.5" rounded="full" :class="[user.online ? 'bg-success' : 'bg-whitesec']"></span>
            </div>

            <div v-if="store.isAdmin" text="sm" flex="~ gap-2" items="center">
                <span @click="store.getUserCode(user.id)" text-whitesec cursor="pointer" v-if="store.getCurrentSlide?.type == 'CodeEditor'">[SHOW CODE]</span>
                <span @click="store.questionsUserId = user.id" text-whitesec cursor="pointer" v-if="store.getCurrentSlide?.type == 'Question'">[SHOW]</span>
                <div @click="() => {}" text-whitesec flex="~ col" cursor="pointer" v-if="store.getCurrentSlide?.type == 'Question'">
                    <span>
                        {{store.getCorrectQuestionsByUserId(user.id)?.filter(q => q.choice?.length > 0 ?? q.choice)?.length}}
                        /
                        {{ store.getQuestions?.length }}
                    </span>
                    <span>
                        (
                            {{store.getCorrectQuestionsByUserId(user.id)?.filter(q => q.result)?.length}} correct
                            and {{store.getCorrectQuestionsByUserId(user.id)?.filter(q => q.type=="text")?.length}} not auto correct
                        )
                    </span>
                </div>
            </div>


        </div>
    </div>
</template>

<script setup>
// Initalize store
const store = useSessionStore()

// Get users, correctQuestions every 5 seconds
setInterval(() => {
    store.fetchUsers()
    store.fetchCorrectQuestions()
}, 5000)

await store.fetchUsers()
await store.fetchCorrectQuestions()


// For code editor type
// const setMyCode = () => store.code = store.getMyCode
const setProdcastedCode = () => store.code = store.getProdcastedCode

</script>