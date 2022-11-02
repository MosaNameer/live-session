<template>
    <div h="[calc(100%-2rem)]" position="relative">
        <Transition>
            <div v-if="saving" z="10" position="absolute" text="whitesec" bottom="7" right="7" flex="~ gap-1" items="center">
                <Icon size="20" name="line-md:loading-twotone-loop" />
                <span text="sm">Saving...</span>
            </div>
        </Transition>
        <Transition>
            <MonacoEditor v-if="store.slideMarkdown && !isLoading" w="full" h="full" @keyup="saveMarkdown($event)" v-model="store.slideMarkdown" lang="markdown" :options="{ fontSize: '20px', minimap: { enabled: false } }" />

            <div v-else h="full" w="full" flex="~" items="center" justify="center" text-whitesec>
                <Icon size="50" name="line-md:loading-twotone-loop" />
            </div>
        </Transition>

        <Teleport to="body">
            <UiModal v-model="stateModal" @cancel="modalCanceled">
                <div>
                    <div class="">
                        <h1>How to use Markdown</h1>
                        <p>Here is a cheatsheet of Markdown to help you format.</p>
                        <h3 mt="3">Basic inline formatting with Markdown</h3>
                        <ol>
                            <li><strong>Bold</strong> – Type <code><span>**text**</span></code> or <code><span>__text__</span></code>,</li>
                            <li><em>Italic</em> – Type <code><span>*text*</span></code> or <code><span>_text_</span></code>,</li>
                            <li><code><span>Code</span></code> – Type <code><span>`text`</span></code>,</li>
                            <li><s>Strikethrough</s> – Type <code><span>~~text~~</span></code>.</li>
                        </ol>
                        <h3 mt="3">Block formatting with Markdown</h3>
                        <ol>
                            <li><strong>Headings</strong> – Start a line with <code><span>#</span></code> or <code><span>##</span></code> or <code><span>###</span></code> followed by a space to create a heading 1, heading 2 or heading 3 (up to heading 6 if {@link module:heading/heading~​HeadingConfig#options} defines more headings).</li>
                            <li><strong>Bulleted list</strong> – Start a line with <code><span>* </span></code> or <code><span>-</span></code> followed by a space.</li>
                            <li><strong>Numbered list</strong> – Start a line with <code><span>1.</span></code> or <code><span>1)</span></code> followed by a space.</li>
                            <li><strong>To-do list</strong> – Start a line with <code><span>[ ]</span></code> followed by a space.</li>
                            <li><strong>Block quote</strong> – Start a line with <code><span>&gt;</span></code> followed by a space.</li>
                            <li><strong>Code block</strong> – Start a line with <code><span>```</span></code>.</li>
                            <li><strong>Horizontal line</strong> – Start a line with <code><span>---</span></code>.</li>
                        </ol>
                        <h3>Keyboard Shortcuts</h3>
                        <p>If you like to mix and match using Markdown with accessible keyboard shortcuts, then here is a cheatsheet of CKEditor 5 keyboard shortcuts.</p>
                        <table class="keyboard-shortcuts">
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th>PC</th>
                                    <th>Mac</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Copy</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>C</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>C</kbd></td>
                                </tr>
                                <tr>
                                    <td>Paste</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>V</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>V</kbd></td>
                                </tr>
                                <tr>
                                    <td>Paste plain text and inherit target formatting</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd></td>
                                </tr>
                                <tr>
                                    <td>Undo</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>Z</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>Z</kbd></td>
                                </tr>
                                <tr>
                                    <td>Redo</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>Y</kbd><br><kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>Y</kbd><br><kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd></td>
                                </tr>
                                <tr>
                                    <td>Select all</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>A</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>A</kbd></td>
                                </tr>
                                <tr>
                                    <td>Bold</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>B</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>B</kbd></td>
                                </tr>
                                <tr>
                                    <td>Italic</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>I</kbd></td>
                                    <td><kbd>⌘</kbd> + <kbd>I</kbd></td>
                                </tr>
                                <tr>
                                    <td>Link</td>
                                    <td><kbd>Ctrl</kbd> + <kbd>K</kbd></td>
                                    <td><kbd>⌘</kbd> +<kbd>K</kbd></td>
                                </tr>
                                <tr>
                                    <td>Insert a hard break (e.g. a new paragraph)</td>
                                    <td colspan="2"><kbd>Enter</kbd></td>
                                </tr>
                                <tr>
                                    <td>Insert a soft break (i.e. a<code>&lt;br&gt;</code>)</td>
                                    <td colspan="2"><kbd>Shift</kbd> + <kbd>Enter</kbd></td>
                                </tr>
                                <tr>
                                    <td>Nest the current list item (when in a list)</td>
                                    <td colspan="2"><kbd>Tab</kbd></td>
                                </tr>
                                <tr>
                                    <td>Move out of link or inline style</td>
                                    <td colspan="2"><kbd>←</kbd><kbd>←</kbd> / <kbd>→</kbd><kbd>→</kbd></td>
                                </tr>
                                <tr>
                                    <th colspan="3">When a widget is selected (for example: image, table, horizontal line, etc.)</th>
                                </tr>
                                <tr>
                                    <td>Insert a new paragraph directly after a widget</td>
                                    <td colspan="2"><kbd>Enter</kbd></td>
                                </tr>
                                <tr>
                                    <td>Insert a new paragraph directly before a widget</td>
                                    <td colspan="2"><kbd>Shift</kbd> + <kbd>Enter</kbd></td>
                                </tr>
                                <tr>
                                    <td>Display the caret to allow typing directly before a widget</td>
                                    <td colspan="2"><kbd>↑</kbd> / <kbd>←</kbd></td>
                                </tr>
                                <tr>
                                    <td>Display the caret to allow typing directly after a widget</td>
                                    <td colspan="2"><kbd>↓ </kbd> / <kbd>→</kbd></td>
                                </tr>
                                <tr>
                                    <th colspan="3">In a table cell</th>
                                </tr>
                                <tr>
                                    <td>Move the selection to the next cell</td>
                                    <td colspan="2"><kbd>Tab</kbd></td>
                                </tr>
                                <tr>
                                    <td>Move the selection to the previous cell</td>
                                    <td colspan="2"><kbd>Shift </kbd> + <kbd>Tab</kbd></td>
                                </tr>
                                <tr>
                                    <td>Insert a new table row (when in the last cell of a table)</td>
                                    <td colspan="2"><kbd>Tab</kbd></td>
                                </tr>
                                <tr>
                                    <td>Navigate through the table</td>
                                    <td colspan="2"><kbd>↑ </kbd> / <kbd>→ </kbd> / <kbd>↓ </kbd> / <kbd>←</kbd></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </UiModal>
        </Teleport>
        <div z="10" @click="toggleModal()" cursor="pointer" position="absolute" text="whitesec" bottom="7" left="7" flex="~ gap-1" items="center">
            <Icon size="30" name="ant-design:question-circle-twotone" />
        </div>
    </div>
</template>

<script setup>
const store = useMaker()
const isLoading = ref(true)

watch(() => store.getSelectedSlide, () => {
    store.fetchSlideMarkdown()
}, { deep: true, immediate: true })

const saving = ref(false)

const saveMarkdown = useDebounceFn(async (e) => {
    const prevents = [16, 17, 18, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 44, 45, 91, 92, 93, 112, 113, 114, 115, , 116, 117, 118, 119, 120, 121, 122, 123, 144, 145, 173, 174, 175, 181, 182, 183]
    if (prevents.includes(e.which)) return false

    saving.value = true
    await store.saveSlideMarkdown()
    setTimeout(() => saving.value = false, 2500)
}, 1000, { maxWait: 5000 })


onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 250)
})

const [stateModal, toggleModal] = useToggle(false);

const modalCanceled = () => {
    stateModal.value = false;
};
</script>


<style scoped>
.v-enter-active {
    transition: all 0.15s ease-in-out;
}

.v-leave-active {
    transition: all 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(20px);
    opacity: 0;
}
</style>
