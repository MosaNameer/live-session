<template>
    <div h="full" flex="~">
        <!-- left -->
        <div flex="~ col basis-1/2">
            <!-- <iframe border="0" id="preview" flex="grow" w="full" ref="previewRef"></iframe> -->
            <span>Is Admin: {{ isAdmin }}</span>
            <span>
                Read Only: {{ sessionData?.readOnly }} <UiButton @click="toggleSessionState" w="fit">Toggle State</UiButton>
            </span>
        </div>


        <!-- right -->
        <div flex="~ col gap-4 basis-1/2" border="l-2 secondary dark:secondaryOp">
            <!-- Tabs -->
            <UiTabGroup flex="basis-1/2" :tabs="['html', 'css', 'js']">
                <template #tab-1>
                    <MonacoEditor w="full" h="full" v-model="code.html" lang="html" :options="{ theme: 'vs-dark', fontSize: '20px', readOnly: !isAdmin && sessionData?.readOnly }" />
                </template>

                <template #tab-2>
                    <MonacoEditor w="full" h="full" v-model="code.css" lang="css" :options="{ theme: 'vs-dark', fontSize: '20px', readOnly: !isAdmin && sessionData?.readOnly }" />
                </template>

                <template #tab-3>
                    <MonacoEditor w="full" h="full" v-model="code.javascript" lang="javascript" :options="{ theme: 'vs-dark', fontSize: '20px', readOnly: !isAdmin && sessionData?.readOnly }" />
                </template>
            </UiTabGroup>
            <div flex="~ basis-1/2">
                <iframe h="full" w="full" ref="previewRef" border="0"></iframe>
            </div>
        </div>
    </div>

</template>

<script setup>
const router = useRouter()
// Session ID & Person Name
const { params } = useRoute()
const { session } = params
const name = useCookie('name')
const userId = useCookie('userId')
// IFrame Reference
const previewRef = ref(null)
// Current Selected Language
const selectedLanguage = ref('html')

const socket = useSocket()

const sessionData = ref(null)
const isAdmin = computed(() => sessionData.value?.adminId === userId?.value)

// Code with initated values
const code = ref(null)

// Languages
const languages = [
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'JS', value: 'javascript' },
]

// Update preview
const updatePreview = useDebounceFn(async () => {
    const { html, css, javascript } = code.value

    // Get element of iframe
    const preview = previewRef.value.contentDocument || previewRef.value.contentWindow.document;

    preview.open();
    preview.write(`<style scoped>${css ?? ''}</style>${html ?? ''}`);

    const scriptEl = document.createElement('script');
    const newContent = document.createRange().createContextualFragment(javascript ?? '');
    scriptEl.append(newContent)
    preview.body.appendChild(scriptEl);
    preview.close();

}, 250)

const sendCode = useDebounceFn(async () => {
    await $fetch('/api/code', {
        method: 'POST',
        body: JSON.stringify({
            message: code.value,
        })
    })
}, 250)

watch(() => JSON.parse(socket.value.data), async (data) => {
    const { type, data: receivedData } = data
    if (type == "code") {
        code.value = receivedData
    } else if (type == "refresh") {
        sessionData.value = await $fetch(`/api/session/${session}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
    } else {
        console.log(data.value)
    }
}, { deep: true })

// Update preview on mounted
    // Send to the web socket server 
    // $socket.send("test")
    try {
        sessionData.value = await $fetch(`/api/session/${session}`)
    } catch (e) {
        router.push('/')
    }
    if (sessionData.value?.data.type == "code"){
        code.value = sessionData.value?.data.data
        updatePreview()
    }



// Listen for writes in editors
watch(() => code.value, () => { updatePreview(), sendCode() }, { deep: true })




const toggleSessionState = async () => {
    await $fetch(`/api/session/${session}/toggleState`, {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache'
        }
    })
}

</script>