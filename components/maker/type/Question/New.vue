<template>
    <div flex="~ col gap-2" border="~ secondary" w="md" p="4" text="whitesec">
        {{backupQuestion}}

        <div flex justify-between>
            <h4 v-if="isEdit" text="white">Edit Question</h4>
            <h4 v-else text="white">New Question</h4>
            <UiButton w="10" @click="stateFunction()">
                <Icon name="material-symbols:close" size="20" />
            </UiButton>
        </div>
        <div flex="~ gap-6">
            <div v-for="_type in types" :key="_type">
                <input :id="_type" v-model="newQuestion.type" :value="_type" class="hidden" type="radio">
                <label :for="_type" py="12px" px="6px" text-center w-full block cursor-pointer my-2 border="1px secondary" :bg="newQuestion.type == _type ? 'secondary' : ''">
                    <div flex items-center>
                        <Icon :name="newQuestion.type == _type ? 'mdi:checkbox-blank-circle' : 'mdi:checkbox-blank-circle-outline'" mx-2 />
                        <span capitalize>{{ _type }}</span>
                    </div>
                </label>
            </div>
        </div>
        <UiInput v-model="newQuestion.question" label="Title" />




        <!-- Multiple -->
        <div v-if="newQuestion?.type == 'multiple'">
            <span text="sm white">Multiple Answers</span>
            <div v-for="(answer, index) in newQuestion?.answers" :key="`${answer.title}-${index}`" flex gap-2 items-center justify-between cursor-pointer my-1>
                <UiInput grow v-model="answer.title" />

                <input class="hidden" :id="`input-${answer.title}-${index}`" v-model="answer.correct" :value="answer.title" type="checkbox">
                <label cursor="pointer" bg="secondary hover:secondary/75s focus:secondary/75s" py="12px" w="50px" text-center :for="`input-${answer.title}-${index}`" text-sm>
                    <Icon :name="Boolean(answer.correct) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(answer.correct) ? 'success' : 'error'" />
                </label>
                
                <UiButton @click="newQuestion.answers = newQuestion.answers.filter(x => x.title !== answer.title)" w="50px">
                        <Icon name="material-symbols:delete" />
                    </UiButton>
            </div>
            <UiButton @click="newQuestion.answers.push({ title: 'Title', correct: false })" w="50px" mt="2">
                <Icon size="20" name="fa6-solid:plus" />
            </UiButton>
        </div>

        <!-- One -->
        <div v-if="newQuestion?.type == 'one'">
            <span text="sm white">One Answer</span>
            <div v-for="(answer, index) in newQuestion?.answers" :key="`one-${answer.title}-${index}`">
                <div text-center flex gap-2 justify-between items-center cursor-pointer my-1>
                    <UiInput grow v-model="answer.title" />
                    
                    <UiButton @click.stop="oneSelect(answer)" w="50px">
                        <Icon :name="Boolean(answer.correct) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(answer.correct) ? 'success' : 'error'" />
                    </UiButton>

                    <UiButton @click.stop="newQuestion.answers = newQuestion.answers.filter(x => x.title !== answer.title)" w="50px">
                        <Icon name="material-symbols:delete" />
                    </UiButton>
                </div>
            </div>

            
            <UiButton @click="newQuestion.answers.push({ title: `Title ${newQuestion.answers?.length+1}`, correct: false })" w="50px" mt="2">
                <Icon size="20" name="fa6-solid:plus" />
            </UiButton>
        </div>


        <!-- Text -->
        <div v-if="newQuestion?.type =='text'" flex>
            <textarea text="sm whitesec" bg="primary focus:secondary/50" class="focus:outline-none focus:ring-2 focus:ring-secondary" w-full rows="4" p-2 border="secondary" placeholder="Example of text" disabled="true"></textarea>
        </div>




        <div v-if="error" text="error">
            {{ error }}
        </div>



        <div flex items-center w="full" gap-4>
            <UiButton @click="deleteQuestion()" v-if="isEdit" w="50px">
                <Icon size="18" name="material-symbols:delete" />
            </UiButton>
            <UiButton grow @click="insertQuestion()">
                <span v-if="isEdit">Edit Question</span>
                <span v-else>Add Question</span>
            </UiButton>
        </div>
    </div>
</template>


<script setup>
const props = defineProps(['stateFunction', 'question'])
const store = useMaker()
const types = ['multiple', 'one', 'text']


const newQuestion = ref(props.question ?? {
    question: '',
    type: 'multiple',
    answers: [
        { title: "This is the correct answer", correct: true },
        { title: "This is the wrong answer", correct: false },
        { title: "This is could also be correct answer", correct: true },
    ]
})

watch (() => props.question, (q) => {
    if (props.question) newQuestion.value = q
}, { deep: true })

const isEdit = computed(() => Boolean(props.question))

const error = ref(null)

const insertQuestion = () => {
    if (newQuestion.value.question == '') {
        error.value = 'Title is required'
        return
    }

    if (newQuestion.value.type == 'multiple' || newQuestion.value.type == 'one') {
        if (newQuestion.value.answers.some(x => x.title?.trim() == '')) {
            error.value = 'All answers should be with title'
            return
        }
    }

    if (newQuestion.value.type == 'multiple') {
        if (newQuestion.value.answers.filter(x => x.correct).length != 1) {
            error.value = 'Multiple answers must have at least 1 correct answers'
            return
        }
    }

    if (newQuestion.value.type == 'one') {
        if (newQuestion.value.answers.filter(x => x.correct).length != 1) {
            error.value = 'One answer must have 1 correct answer'
            return
        }
    }

    if (newQuestion.value.type == 'text') {
        newQuestion.value.answers = null
    }


    if (store.getSelectedSlide?.questions && !isEdit.value)
        store.getSelectedSlide.questions.push(newQuestion.value)
    else if (!store.getSelectedSlide?.questions)
        store.getSelectedSlide.questions = [newQuestion.value]

    store.updateSlideAttribute('questions', JSON.stringify(store.getSelectedSlide.questions))

    props.stateFunction()
}


const deleteQuestion = () => {
    store.selectedSlide.questions = store.selectedSlide.questions.filter(x => x.question !== newQuestion.value.question)
    store.updateSlideAttribute('questions', JSON.stringify(store.getSelectedSlide.questions))
    props.stateFunction()
}



const oneSelect = (answer) => {
    newQuestion.value.answers = newQuestion.value.answers.map((a, i) => {
        if (a == answer) return { ...a, correct: true }
        else return { ...a, correct: false }
    })
}

watch(() => newQuestion.value?.type, (type) => {
    if (type == "one") {
        newQuestion.value.answers = newQuestion.value.answers.map((a, i) => {
            if (i == 0) return { ...a, correct: true }
            else return { ...a, correct: false }
        })
    }
}, {
    deep: true
})
</script>