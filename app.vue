<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

const userId = useCookie('userId')
userId.value = userId.value || uuidv4()
</script>