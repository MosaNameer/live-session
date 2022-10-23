<template>
    <div v-for="(user, index) in store.getUsers" :key="user.id" flex="~ col gap-2" text="lg">
        <div flex="~" justify="between">
            <div flex="~ gap-2" items="center">
                <span class="secondary dark:secondaryOp">{{index+1}}.</span>
                <span>{{user.name}}</span>
                <span v-if="store.getSession?.adminId == user.id">(Host)</span>
                <span w="2.5" h="2.5" rounded="full" :class="[user.online ? 'bg-success' : 'bg-secondaryOp dark:bg-secondary']"></span>
            </div>
        </div>
    </div>
</template>

<script setup>
// Initalize store
const store = useSessionStore()

// Get users every 5 seconds
setInterval(() => store.fetchUsers(), 5000)

await store.fetchUsers()
</script>