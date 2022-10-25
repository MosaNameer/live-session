<template>
  <label flex flex-col text-xs text-white gap-1>
    {{ placeholder }}
    <div relative w="100%" @blur="open = !open">
    <div bg-primary border="2px secondary" text="white md" px="4px" py="10px" cursor-pointer :class="{ open: open }" @click="open = !open">
      {{ selected.name }}
    </div>
    <div :class="open ? '' : 'hidden'" w="100%" mt="4px" z-1 absolute text-white overflow-hidden border="2px secondary">
      <div 
        bg="primary hover:secondary"
        cursor-pointer
        px="2px"
        py="10px"
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = !open;
          $emit('update:modelValue', option);
        "
      >
        {{ option.name }}
      </div>
    </div>
  </div>
  </label>
</template>


<script>
export default {
  emits: ['update:modelValue'],
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      required: false,
      default: null,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false,
    };
  },
  mounted() {
    this.$emit("update:modelValue", this.selected);
  },
};
</script>
