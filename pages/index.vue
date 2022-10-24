<template>
    <NuxtLayout>
        <div flex="~" w="screen" h="screen" items="center" justify="center" dir="rtl">
            <div w="md" flex="~ col gap-6">
                <span text="center 5xl primaryOp dark:primary" mb="6">ElitesLiveSessions</span>
                <UiInput v-model="sessionCookie" size="md" label="معرف الجلسة" />
                <UiInput v-model="nameCookie" size="md" label="معرف الدخول" />
                <UiButton @click="join()" size="md" color="success" mt="4">دخول</UiButton>

                <span v-if="error" text="center sm errorOp dark:error" mt="6">{{ error }}</span>

                <div h="1px" w="full" bg="secondary dark:secondaryOp" my="6"></div>

                <UiButton to="/new-session" size="md" color="secondary" mt="4">انشاء جلسة جديدة</UiButton>

            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
const router = useRouter()
const nameCookie = useCookie('name')
const sessionCookie = useCookie('session')

const onlyEnglish = (str) => /^[A-Za-z0-9]*$/.test(str)

const error = ref(null)

const join = async () => {
    if (!onlyEnglish(nameCookie.value)) {
        error.value = "بالحروف الانجليزية وبدون مسافة"
        return
    }

    const sessionExists = await $fetch(`/api/session/${sessionCookie?.value}`)
    if (!sessionExists) {
        error.value = "الجلسة غير موجودة"
        return
    }

    router.push(`/${sessionCookie.value}`)
}
</script>