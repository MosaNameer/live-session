<template>
    <div h="full" bg="primary">
        {{store?.getQuestions}}
    </div>
</template>

<script setup>
const store = useSessionStore()

</script>