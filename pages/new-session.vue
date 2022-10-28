<template>
    <NuxtLayout>
        <div flex="~" w="screen" h="screen" items="center" justify="center" dir="rtl">
            <div w="md" flex="~ col gap-6">
                <span text="center 5xl white dark:white" mb="6">ElitesLiveSessions</span>

                <UiInput v-model="session" label="معرف الجلسة" />

                <UiInput v-model="nameCookie" label="معرف الدخول" />

                <UiDropdown v-model="lesson" placeholder="الدرس" :options="lessons">
                </UiDropdown>
                
                <span v-if="error" text="center sm errorOp dark:error" mt="6">{{ error }}</span>

                <!-- <h1>{{ lesson }}</h1> -->
                
                <UiButton @click="create()" mt="4">إنشاء</UiButton>


                <div h="1px" w="full" bg="secondary dark:secondaryOp" my="4"></div>

                <UiButton to="/" mt="4">الدخول الى جلسة موجودة</UiButton>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const router = useRouter()
const userIdCookie = useCookie('userId')
const session = useCookie('session')
const nameCookie = useCookie('name')


const { data: lessonsNavs } = await useAsyncData('navigation', () => fetchContentNavigation())
const lessons = computed( () => lessonsNavs.value.map(lesson => ({
    name: lesson.title,
    value: lesson._path
})))
const lesson = ref(null)

const error = ref(null)


const create = async () => {
    if (!lesson.value) {
        error.value = "الرجاء اختيار الدرس"
        return
    }

    if (!nameCookie.value) {
        error.value = "الرجاء ادخال معرف الدخول"
        return
    }

    if (!session.value) {
        error.value = "الرجاء ادخال معرف الجلسة"
        return
    }

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