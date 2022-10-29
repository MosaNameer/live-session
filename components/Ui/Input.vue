
<template>
    <label flex flex-col text-xs text-white gap-1>
        {{ label }}
        <input text="white" :value="modelValue" :placeholder="label" @input="input($event.target.value)" px="6px" py="12px" bg="primary" border="2px secondary focus:secondary/75s" class="focus:outline-none focus:ring-2 focus:ring-secondary" />
    </label>
</template>

<script setup>
const props = defineProps(['label', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const input = useDebounceFn((value) => {
    emit('update:modelValue', value)
}, 250)
</script>