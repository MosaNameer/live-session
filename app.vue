<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

// Registering unique user id
const userId = useCookie('userId')
userId.value = userId.value || uuidv4()


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
</script>