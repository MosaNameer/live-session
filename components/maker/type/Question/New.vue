<template>
    <div flex="~ col gap-2" border="~ secondary" w="md" p="4" text="whitesec">
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
            <div v-for="(answer, index) in newQuestion?.answers" :key="`${answer.title}-${index}`">
                <input class="hidden" :id="`input-${answer.title}-${index}`" v-model="answer.correct" :value="answer.title" type="checkbox">
                <label py="12px" px="6px" text-center flex gap-8 justify-between cursor-pointer my-2 border="1px secondary" :for="`input-${answer.title}-${index}`">
                    <div flex grow items-center justify-between>
                        <span>{{ index + 1 }}. {{ answer.title }}</span>
                        <Icon :name="Boolean(answer.correct) ? 'ion:checkmark-round' : 'fa6-solid:xmark'" :text="Boolean(answer.correct) ? 'success' : 'error'" />
                    </div>
                    <UiButton @click="newQuestion.answers = newQuestion.answers.filter(x => x.title !== answer.title)" w="50px">
                        <Icon size="20" name="material-symbols:delete" />
                    </UiButton>
                </label>
            </div>
            <UiButton @click="newQuestion.answers.push({ title: 'Title', correct: false })" w="50px" mt="4">
                <Icon size="20" name="fa6-solid:plus" />
            </UiButton>

        </div>

        <div flex items-center w="full" gap-4 mt="4">
            <UiButton @click="deleteQuestion()" v-if="isEdit" w="50px">
                <Icon size="18" name="material-symbols:delete" />
            </UiButton>
            <UiButton grow @click="() => { insertQuestion(), stateFunction() }">
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

const newQuestion = props.question ?? ref({
    question: '',
    type: 'multiple',
    answers: [
        { title: "This is the correct answer", correct: true },
        { title: "This is the wrong answer", correct: false },
        { title: "This is could also be correct answer", correct: true },
    ]
})

const isEdit = computed(() => Boolean(props.question))

const insertQuestion = () => {
    if (store.getSelectedSlide?.questions && !isEdit.value)
        store.getSelectedSlide.questions.push(newQuestion.value)
    else if (!store.getSelectedSlide?.questions)
        store.getSelectedSlide.questions = [newQuestion.value]

    store.updateSlideAttribute('questions', JSON.stringify(store.getSelectedSlide.questions))
}

const deleteQuestion = () => {
    store.selectedSlide.questions = store.selectedSlide.questions.filter(x => x.question !== newQuestion.question)
    store.updateSlideAttribute('questions', JSON.stringify(store.getSelectedSlide.questions))
    props.stateFunction()
}
</script>