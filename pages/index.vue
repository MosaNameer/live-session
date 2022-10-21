<template>
    <div flex="~" w="screen" h="screen" items="center" justify="center" dir="rtl">
        <div w="md" flex="~ col gap-6">
            <span text="center 5xl primaryOp dark:primary" mb="6">ElitesLiveSessions</span>
            <UiInput v-model="session" size="md" label="معرف الجلسة" />
            <UiInput v-model="name" size="md" label="الأسم" />
            <UiButton @click="join()" size="md" color="success" mt="4">دخول</UiButton>
        </div>
    </div>
</template>

<script setup>
const session = ref('')
const name = ref('')
const router = useRouter()
const sessionCookie = useCookie('session')
const nameCookie = useCookie('name')

const join = () => {
    if (session.value && name.value) {
        sessionCookie.value = session.value
        nameCookie.value = name.value

        router.push(`/${session.value}`)
    }
}
</script>