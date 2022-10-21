<template>
    <div h="full" flex="~">
        <!-- left -->
        <div flex="~ col basis-1/2">
            <iframe border="0" id="preview" flex="grow" w="full" ref="previewRef"></iframe>
            <div h="200px" bg="secondary dark:secondaryOp">
                {{ logMessages }}
            </div>
        </div>


        <!-- right -->
        <div flex="~ col gap-4 basis-1/2" border="l-2 secondary dark:secondaryOp">
            <!-- Tabs -->
            <UiTabGroup h="full" :tabs="['html', 'css', 'js']">
                <template #tab-1>
                    <MonacoEditor w="full" h="full" v-model="code.html" lang="html" :options="{ theme: 'vs-dark', fontSize: '20px' }" />
                </template>

                <template #tab-2>
                    <MonacoEditor w="full" h="full" v-model="code.css" lang="css" :options="{ theme: 'vs-dark', fontSize: '20px'}" />
                </template>

                <template #tab-3>
                    <MonacoEditor w="full" h="full" v-model="code.javascript" lang="javascript" :options="{ theme: 'vs-dark', fontSize: '20px'}" />
                </template>
            </UiTabGroup>
            </div>
            <div flex="~ basis-1/2">
                <iframe h="full" w="full" ref="previewRef" border="l secondary dark:secondaryOp"></iframe>
            </div>
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
    const preview = previewRef.value.contentDocument || previewRef.value.contentWindow.document;

    preview.open();
    preview.write(`<style scoped>${css ?? ''}</style>${html ?? ''}`);

    const scriptEl = document.createElement('script');
    const newContent = document.createRange().createContextualFragment(javascript ?? '');
    scriptEl.append(newContent)
    preview.body.appendChild(scriptEl);
    preview.close();

    


    // const c = previewRef.value?.contentWindow?.console
    // console.log(c.log())
    // if (c) {
    //     c.log = (...args) => {
    //         frameConsole.value = args
    //     }
    // }
}, 100)


var logBackup = console.log;
var logMessages = ref([]);


// Update preview on mounted
onMounted( () => {
    

    

    // console.log(previewRef.value.contentWindow.console.log)
    // previewRef.value?.contentWindow.console.log = function(val) {
    //     frameConsole.value.appendChild(document.createTextNode(val));
    // }

    // previewRef.value.contentWindow.console.log = function() {
    //     logMessages.value.push.apply(logMessages.value, arguments);
    //     logBackup.apply(console, arguments);
    // };

   

    // window.addEventListener('message', function(event){
    //     console.log(event.data)
    //             //REM: Just appending it to the body.. lazy
    //     // document.body.appendChild(document.createTextNode(event.data))
    // }, false);
    updatePreview()
})




// Listen for writes in editors
watch(() => code.value, () => updatePreview(), { deep: true })
</script>