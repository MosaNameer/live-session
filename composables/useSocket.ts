export default function () {
    return useState('socket', () => {
        if (process.client) {
            const { socketUrl } = useRuntimeConfig().public
            const name = useCookie('name')
            const session = useCookie('session')
            const userId = useCookie('userId')
            if (name.value && session.value) {
                const s = useWebSocket(`ws://${socketUrl}:33333`, {
                    autoReconnect: true,
                    protocols: [
                        session.value,
                        name.value,
                        userId.value
                    ],
                })
                return s
            } else {
                const router = useRouter()
                router.push('/')
            }
        }
    })
}