<template>
    <div h="screen">
        <div>
            <button @click="test1">test 1</button>
            <button @click="test2">test 2</button>
            {{code}}
        </div>
        <MonacoEditor h="full" v-model="code" lang="html" :options="{ theme: 'vs-dark', fontSize: '20px' }" />
    </div>
</template>

<script setup>
const code = ref(null)

const test1 = () => {
    code.value = `<div>test 1</div>`
}

const test2 = () => {
    code.value = `<div>test 2</div>`
}

onMounted(() => {
    const monaco = useMonaco()
    monaco.editor.defineTheme("custom-theme", {
        base: "vs-dark",
        inherit: true,
        rules: [
            { token: "comment", foreground: "ffa500", fontStyle: "italic underline" },
            { token: "keyword", foreground: "ff0000", fontStyle: "bold" },
            { token: "number", foreground: "098658" },
            { token: "regexp", foreground: "800080" }
        ],
        colors: {
            "editor.background": "#000000"
        }
    })
    monaco.editor.setTheme("custom-theme")
})
</script>
