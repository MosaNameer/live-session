<template>
    <div cursor="pointer" text="center md" w="max" min-w="60px" font="medium" px="4px" py="12px" :class="[
        active
        ? 'bg-tertiary dark:tertiary dark:text-white text-white'
        : 'bg-transparent',

        'text-white hover:text-whitesec dark:text-white dark:hover:text-whitesec'
    ]">
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    active: {
        type: Boolean,
        default: false,
    }
})
</script>
