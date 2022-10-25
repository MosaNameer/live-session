<template>
    <div>
        {{question.question}}
        {{question.type}}
        <div v-if="question.type =='multiple'">
            <div v-for="answer in question.answers" :key="answer.title">
                <label>{{answer.title}}</label>
                <input :name="question.question" type="checkbox">
            </div>
        </div>

        <div v-if="question.type =='one'">
            <div v-for="answer in question.answers" :key="answer.title">
                <label>{{answer.title}}</label>
                <input :name="question.question" type="radio">
            </div>
        </div>

        <div v-if="question.type =='text'">
            <textarea></textarea>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['question'])

</script>