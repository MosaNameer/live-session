<template>
    <div h="screen" w="screen" flex="~ col gap-4" bg-primary justify-center items-center>
        <div flex justify-between w-4xl items-end>
            <span text-white text-6xl font-bold>Lesson Maker</span>
            <div flex gap-2 items-end>
                <UiInput w="200px" v-model="lessonName" label="Lesson Name" />
                <UiButton w="50px" mb="0.5" @click="newLesson">
                    <svg width="24" height="24" viewBox="0 0 448 512"><path fill="#888888" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                </UiButton>
            </div>
        </div>
        <div border="~ secondary" flex flex-col gap-2 p-4 h-md text-whitesec w-4xl overflow-y="auto">
            <NuxtLink :to="`/maker/${lesson}`" flex items-center gap-2 decoration-none p-2 hover:bg-secondary text-whitesec 
                v-for="(lesson, index) in store.getLessons" :key="lesson.title">
                <span bg-secondary py-1 px-3>
                    {{ index+1 }}
                </span>
                <span>
                    {{ formatName(lesson) }}
                </span>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { splitByCase, upperFirst } from 'unkit/string'

const store = useMaker()

await store.fetchLessons()

// const lessons = store.getLessons
const lessonName = ref('')
const newLesson = () => {
    store.newLesson(lessonName.value)
}

const formatName = (name) => {
    return name.split('.')[1].split('-').map((_) => upperFirst(_)).join(' ')
}
</script>
    