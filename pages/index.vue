<template>
    <NuxtLayout>
        <div flex="~" w="screen" h="screen" items="center" text="white" justify="center" dir="rtl">
            <div w="md" flex="~ col gap-6">
<<<<<<< Updated upstream
                <span text="center 5xl primaryOp dark:primary" mb="6">ElitesLiveSessions</span>
                <UiInput v-model="sessionCookie" size="md" label="معرف الجلسة" />
                <UiInput v-model="nameCookie" size="md" label="معرف الدخول" />
                <UiButton @click="join()" size="md" color="success" mt="4">دخول</UiButton>
=======
                <span text="center 5xl white dark:white" mb="6">ElitesLiveSessions</span>
                <UiInput v-model="session" label="معرف الجلسة" />
                <UiInput v-model="nameCookie" label="معرف الدخول" />
                <UiButton @click="join()" mt="4">دخول</UiButton>
>>>>>>> Stashed changes

                <span v-if="error" text="center sm errorOp dark:error" mt="4">{{ error }}</span>

                <div h="1px" w="full" bg="secondary dark:secondaryOp" my="4"></div>

                <UiButton to="/new-session" mt="4">انشاء جلسة جديدة</UiButton>

            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
<<<<<<< Updated upstream
=======
const session = useCookie('session')
>>>>>>> Stashed changes
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