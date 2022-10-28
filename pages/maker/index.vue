<template>
    <div flex="~ gap-10">
        <div text-whitesec flex="~ col gap-2">
            <NuxtLink :to="`/maker/${lesson}`" text-whitesec v-for="lesson in store.getLessons" :key="lesson.title">{{lesson}}</NuxtLink>
        </div>

        <div>
            <input type="text" v-model="lessonName" />
            <button @click="newLesson">Add Lesson</button>
        </div>
    </div>
</template>

<script setup>
const store = useMaker()
await store.fetchLessons()

// const lessons = store.getLessons
const lessonName = ref('')
const newLesson = () => {
    store.newLesson(lessonName.value)
}
</script>
    