<template>
    <div v-for="(user, index) in store.getUsers" :key="user.id" flex="~ col gap-2" text="lg">
        <div flex="~" justify="between">
            <div flex="~ gap-2" items="center" text-whitesec>
                <span>{{index+1}}.</span>
                <span>{{user.name}}</span>
                <span v-if="store.getSession?.adminId == user.id">(Host)</span>
                <span w="2.5" h="2.5" rounded="full" :class="[user.online ? 'bg-success' : 'bg-whitesec']"></span>
            </div>

            <div v-if="store.isAdmin && user.id !== userId" text="sm" flex="~ gap-2" items="center">
                <!-- CODE -->
                <span @click="store.getUserCode(user.id)" text-whitesec cursor="pointer" v-if="store.getCurrentSlide?.type == 'CodeEditor'">[SHOW CODE]</span>
                
                <!-- QUESTION -->
                <span @click="store.questionsUserId = user.id" text-whitesec cursor="pointer" v-if="store.getCurrentSlide?.type == 'Question' && user">[SHOW]</span>
                <div @click="() => {}" text-whitesec text-center flex="~" cursor="pointer" v-if="store.getCurrentSlide?.type == 'Question'">
                    <span>
                        {{store.getCorrectQuestionsByUserId(user.id)?.filter(q => q.choice?.length > 0 ?? q.choice)?.length}}
                        /
                        {{ store.getQuestions?.length }}
                        
                    </span>
                    <span>
                        (
                            {{store.getCorrectQuestionsByUserId(user.id)?.filter(q => q.result)?.length}} <svg width="16" height="16" viewBox="0 0 512 512"><path d="M448 71.9c-17.3-13.4-41.5-9.3-54.1 9.1L214 344.2l-99.1-107.3c-14.6-16.6-39.1-17.4-54.7-1.8-15.6 15.5-16.4 41.6-1.7 58.1 0 0 120.4 133.6 137.7 147 17.3 13.4 41.5 9.3 54.1-9.1l206.3-301.7c12.6-18.5 8.7-44.2-8.6-57.5z" fill="#888888"/></svg>
                            and {{store.getCorrectQuestionsByUserId(user.id)?.filter(q => q.type=="text")?.length}} <svg width="16" height="16" viewBox="0 0 32 32"><path fill="#888888" d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Zm0 26a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"/><path fill="currentColor" d="M11.5 11a2.5 2.5 0 1 0 2.5 2.5a2.48 2.48 0 0 0-2.5-2.5zm9 0a2.5 2.5 0 1 0 2.5 2.5a2.48 2.48 0 0 0-2.5-2.5z"/></svg>
                        )
                    </span>
                </div>
            </div>
            <div v-else text="sm" flex="~ gap-2" items="center">
                <span @click="store.getUserCode(userId)" text-whitesec cursor="pointer" v-if="store.getCurrentSlide?.type == 'CodeEditor'">[SHOW CODE]</span>
                <span @click="store.questionsUserId = user.id" text-whitesec cursor="pointer" v-if="store.getCurrentSlide?.type == 'Question' && user">[RETURN]</span>

            </div>


        </div>
    </div>
</template>

<script setup>
// Initalize store
const store = useSessionStore()
const userId = useCookie('userId')
// Get users, correctQuestions every 5 seconds
setInterval(() => {
    store.fetchUsers()
    if (store.isAdmin) store.fetchCorrectQuestions()
}, 5000)

await store.fetchUsers()

if (store.isAdmin) await store.fetchCorrectQuestions()



// For code editor type
// const setMyCode = () => store.code = store.getMyCode
const setProdcastedCode = () => store.code = store.getProdcastedCode

</script>