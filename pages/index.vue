<template>
    <NuxtLayout>
        <div flex="~" w="screen" h="screen" items="center" justify="center" dir="rtl">
            <div w="md" flex="~ col gap-6">
                <span text="center 5xl primaryOp dark:primary" mb="6">ElitesLiveSessions</span>
                <UiInput v-model="session" size="md" label="معرف الجلسة" />
                <UiInput v-model="nameCookie" size="md" label="الأسم" />
                <UiButton :disabled="nameCookie == '' || session == ''" :to="`/${session}`" size="md" color="success" mt="4">دخول</UiButton>

                <div h="1px" w="full" bg="secondary dark:secondaryOp" my="6"></div>

                <UiButton to="/new-session" size="md" color="secondary" mt="4">انشاء جلسة جديدة</UiButton>
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

const join = async () => {
    router
}
</script>