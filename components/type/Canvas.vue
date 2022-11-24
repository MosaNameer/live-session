<template>
    <div h="full" w="full">
        <Transition>
            <div v-if="!isLoading" h="full" flex="~ col">
                <!-- Tabs -->
                <div :style="{
                    height: `${dividerPosition}%`
                }">
                    <MonacoEditor py="2" w="full" h="full" @keyup="sendCode($event)" v-model="store.canvas" lang="javascript" :options="{ fontSize: '20px', readOnly: !store.isAdmin && store.isReadOnly, minimap: { enabled: false } }" />
                </div>
                <div position="relative" bg="primary" :style="{
                    height: `${100 - dividerPosition}%`
                }">
                    <div @mousedown="startDragging()" class="opacity-0 hover:opacity-100" transition="~ duration-100 ease-in-out" flex="~" items="center" justify="center" h="3" bg="secondaryOp dark:secondary" cursor="n-resize" w="full" :top="dividerPosition" absolute left="0">
                        <span rounded="full" w="2" h="2" bg="tertiary dark:tertiaryOp"></span>
                    </div>
                    <div ref="previewRef" overflow-scroll h="full" w="full" border="0" bg-white></div>
                </div>
            </div>
            <div v-else h="full" w="full" flex="~" items="center" justify="center" text-whitesec>
                <Icon size="50" name="line-md:loading-twotone-loop" />
            </div>
        </Transition>
    </div>
</template>

<script setup>
import p5 from 'p5'

const store = useSessionStore()

const isLoading = ref(true)
const previewRef = ref(null)

const dividerPosition = ref(50)
const { x, y, sourceType } = useMouse()
const { width, height } = useWindowSize()

const updatePreview = async () => {
    previewRef.value.innerHTML = ""

    const code = new Function('p', store.getCanvas)
    new p5(code, previewRef.value)
}

watch(() => store.getCanvas, () => updatePreview(), { deep: true })

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)

    setTimeout(() => {
        updatePreview()
    }, 1250)
})


const sendCode = useDebounceFn(async (e) => {
    if (!store.isAdmin && store.isReadOnly) return false
    const prevents = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 91, 92, 93, 112, 113, 114, 115, , 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183]
    if (prevents.includes(e.which)) {
        console.log('not a letter')
        return false
    }

    store.storeCanvas()
}, 100)




function handleDragging () {
    let percentage = (y.value / height.value) * 100
    if (percentage >= 10 && percentage <= 90) {
        dividerPosition.value = percentage.toFixed(2)
    }
    document.addEventListener.call(window, "mouseup", ()=> {
        document.removeEventListener.call(window, "mousemove", handleDragging)
        document.removeEventListener.call(window, "mouseup", handleDragging)
    });
}

function startDragging () {
    document.addEventListener.call(window, "mousemove", handleDragging);
}


</script>