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
</script>