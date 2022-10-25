<template>
    <div flex="~" :class="{ 'flex-col w-96' : col }">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    col: {
        type: Boolean,
        default: false,
    }
})
</script>
