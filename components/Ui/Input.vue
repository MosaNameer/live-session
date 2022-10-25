
<template>
    <label flex flex-col text-xs text-white gap-1>
      {{ label }}
          <input text="white" :value="modelValue" :placeholder="label" @input="onInput" px="6px" py="12px" bg="primary" border="2px secondary focus:secondary/75s" class="focus:outline-none focus:ring-2 focus:ring-secondary"/>
    </label>
</template>

<script>
export default {
    name: 'InputText',
    emits: ['update:modelValue'],
    props: {
        label: "",
        modelValue: null
    },
    methods: {
        onInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    },
};
</script>