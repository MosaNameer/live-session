<template>
    <NuxtLayout>
        <div flex="~" w="screen" h="screen" items="center" justify="center" dir="rtl">
            <div w="md" flex="~ col gap-6">
                <span text="center 5xl white dark:white">ElitesLiveSessions</span>
                <span text="center sm white dark:white" mb="6">{{ userIdCookie }}</span>

                <UiInput v-model="session" label="معرف الجلسة" />

                <UiDropdown v-model="lesson" placeholder="الدرس" :options="lessons">
                </UiDropdown>
                <h1>{{ lesson }}</h1>
                
                <UiButton @click="create()" mt="4">إنشاء</UiButton>


                <span text="center sm errorOp dark:error" mt="6">{{ error }}</span>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const router = useRouter()
const userIdCookie = useCookie('userId')
const session = ref(null)

const { data: lessonsNavs } = await useAsyncData('navigation', () => fetchContentNavigation())
const lessons = computed( () => lessonsNavs.value.map(lesson => ({
    name: lesson.title,
    value: lesson._path
})))
const lesson = ref(null)

const error = ref(null)


const create = async () => {
    try {
        const data = await $fetch('/api/new-session', {
            method: 'POST',
            body: JSON.stringify({
                id: session.value,
                adminId: userIdCookie.value,
                lesson: lesson.value,
            })
        })
        
        router.push(`/${session.value}`)
        
    } catch(e) {
        error.value = "حدث خطأ! اما معرف الجلسة موجود او انك لم تدخل جميع المطلوبات."
    }
}
</script>