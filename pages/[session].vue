<template>
    <div h="full" flex="~">
        <!-- left -->
        <div flex="~ basis-1/2">
            <div h="full" w="full" v-html="codeMerge">

            </div>
        </div>


        <!-- right -->
        <div flex="~ col gap-4 basis-1/2" border="l secondary dark:secondaryOp">
            <!-- Tabs -->
            <UiTabGroup h="full" :tabs="['html', 'css', 'js']">
                <template #tab-1>
                    <MonacoEditor w="full" h="full" v-model="code.html" lang="html" :options="{ theme: 'vs-dark'}" />
                </template>

                <template #tab-2>
                    <MonacoEditor w="full" h="full" v-model="code.css" lang="css" :options="{ theme: 'vs-dark'}" />
                </template>

                <template #tab-3>
                    <MonacoEditor w="full" h="full" v-model="code.javascript" lang="javascript" :options="{ theme: 'vs-dark'}" />
                </template>
            </UiTabGroup>

        </div>
    </div>
</template>

<script async :src="code.javascript"></script>

<script setup>
const code = ref({
    html: '<span>Hello World</span><button onclick="hello()">Alert hello</button>',
    css: 'span { color: red; }',
    javascript: 'function hello() {alert("hi")}'
})

const languages = [
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'JS', value: 'javascript' },
]

const codeMerge = computed(() => {
    const { html, css, javascript } = code.value
    return `
        <style scoped>
            ${css ?? ''}
        </style>
        ${html ?? ''}
    `
})

const selectedLanguage = ref('html')

const { params } = useRoute()
const { session } = params
const name = useCookie('name')



</script>