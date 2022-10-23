<template>
    <NuxtLayout>
        <div flex="~" w="screen" h="screen" items="center" justify="center" dir="rtl">
            <div w="md" flex="~ col gap-6">
                <span text="center 5xl primaryOp dark:primary">ElitesLiveSessions</span>
                <span text="center sm primaryOp dark:primary" mb="6">{{ userIdCookie }}</span>

                <UiInput v-model="session" size="md" label="معرف الجلسة" />
                <UiInput v-model="name" size="md" label="الأسم" />
                <div flex="~">
                    <span flex="basis-2/3">{{lesson}}</span>
                    <UiDropdown flex="basis-1/3" v-model="lesson" :list="lessons" size="md" />
                </div>
                <UiButton @click="join()" size="md" color="success" mt="4">دخول</UiButton>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const session = ref('')
const name = ref('')
const router = useRouter()
const sessionCookie = useCookie('session')
const nameCookie = useCookie('name')
const userIdCookie = useCookie('userId')

const { data: lessonsNavs } = await useAsyncData('navigation', () => fetchContentNavigation())
const lessons = computed( () => lessonsNavs.value.map(lesson => ({
    name: lesson.title,
    value: lesson._path
})))
const lesson = ref(null)


const join = async () => {
    if (session.value && name.value) {
        sessionCookie.value = session.value
        nameCookie.value = name.value

        try {
            const data = await $fetch('/api/new-session', {
                method: 'POST',
                body: JSON.stringify({
                    message: session.value,
                    name: name.value
                })
            })
            router.push(`/${session.value}`)

        } catch(e) {
            if (confirm("هذه الجلسة موجود هل تريد الانضمام؟")) {
                router.push(`/${session.value}`)
            }
        }

    }
}
</script>