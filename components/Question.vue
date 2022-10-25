<template>
    <div>
        {{question.question}}
        {{question.type}}
        <div v-if="question.type =='multiple'">
            <div v-for="(answer, index) in question.answers" :key="answer.title">
                <label>{{answer.title}}</label>
                <input :name="question.question" v-model="question.choice[index]" :value="answer.title" type="checkbox">
            </div>
        </div>

        <div v-if="question.type =='one'">
            <div v-for="answer in question.answers" :key="answer.title">
                <label>{{answer.title}}</label>
                <input :name="question.question" v-model="question.choice" :value="answer.title" type="radio">
            </div>
        </div>

        <div v-if="question.type =='text'">
            <textarea v-model.lazy="question.choice"></textarea>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['question'])

// Initiate data for checkbox
if (!props.question.choice && props.question.type == "multiple") props.question.choice = []
</script>