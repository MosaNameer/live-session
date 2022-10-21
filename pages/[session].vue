<template>
    <div h="full" flex="~">
        <!-- left -->
        <div flex="~ basis-1/2">
            <iframe h="full" w="full" ref="previewRef"></iframe>
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

<script setup>
// Session ID & Person Name
const { params } = useRoute()
const { session } = params
const name = useCookie('name')

// IFrame Reference
const previewRef = ref(null)
// Current Selected Language
const selectedLanguage = ref('html')

// Code with initated values
const code = ref({
    html: '<span>Hello World</span><button onclick="hello()">Alert hello</button>',
    css: 'span { color: red; }',
    javascript: 'function hello() {alert("hi")}'
})

// Languages
const languages = [
    { name: 'HTML', value: 'html' },
    { name: 'CSS', value: 'css' },
    { name: 'JS', value: 'javascript' },
]

// Update preview
const updatePreview = useDebounceFn(() => {
    const { html, css, javascript } = code.value

    // Get element of iframe
    var preview = previewRef.value.contentDocument || previewRef.value.contentWindow.document;

    preview.open();
    preview.write(`<style scoped>${css ?? ''}</style>${html ?? ''}`);

    const scriptEl = document.createElement('script');
    const newContent = document.createRange().createContextualFragment(javascript ?? '');
    scriptEl.append(newContent)
    preview.body.appendChild(scriptEl);
    preview.close();
}, 100)


// Listen for writes in editors
watch(() => code.value, () => updatePreview(), { deep: true })

</script>