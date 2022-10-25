<template>
    <div cursor="pointer" text="center md" w="max" min-w="60px" font="medium" px="4px" py="12px" :class="[
        active
        ? 'bg-primary dark:primary dark:text-white text-white border-l-1 border-r-1 border-secondary'
        : 'bg-transparent border-b-1 border-secondary',

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
