export default defineNuxtPlugin(() => {
    const { socketUrl } = useRuntimeConfig().public
    const s = useWebSocket(`ws://${socketUrl}:33333`, {
        autoReconnect: true,
    })
    
    return {
        provide: {
            socket: s
        }
    }
})