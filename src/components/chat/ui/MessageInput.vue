<!--
  MessageInput.vue

  Textarea reutilizable para escribir mensajes.
  Props:
    - modelValue: string
    - disabled?: boolean
    - maxlength?: number 
    - placeholder?: string 
    - maxHeight?: number (alto máximo en px para auto-resize)

  Emits:
    - update:modelValue (string)
    - send

  Comportamiento:
    - auto-resize hasta maxHeight
    - Ctrl/Cmd+Enter emite 'send'
    - expone método `focus()` para que el padre pueda enfocar el textarea

  @author Germán
  @version 1.0.0
-->

<template>
  <textarea
    ref="textarea"
    class="message-input"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    rows="1"
    aria-label="Escribe tu mensaje"
    @input="onInput"
    @keydown="onKeydown"
  ></textarea>
</template>

<script setup lang="ts">
import { ref, toRefs, nextTick, onMounted, watch } from 'vue'

// Props y valores por defecto
const props = withDefaults(
  defineProps<{
    modelValue: string
    disabled?: boolean
    maxlength?: number
    placeholder?: string
    maxHeight?: number
  }>(),
  {
    modelValue: '',
    disabled: false,
    maxlength: 2000,
    placeholder: 'Escribe tu mensaje aquí...',
    maxHeight: 120,
  },
)

const { modelValue, disabled, maxlength, placeholder, maxHeight } = toRefs(props)

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()

// Referencia al textarea
const textarea = ref<HTMLTextAreaElement | null>(null)

// Ajusta la altura del textarea según su contenido (auto-resize)
async function adjustHeight() {
  await nextTick()
  const el = textarea.value
  if (!el) return
  el.style.height = 'auto'
  const newHeight = Math.min(el.scrollHeight, maxHeight.value)
  el.style.height = `${newHeight}px`
}

// Maneja el input: emite update:modelValue y ajusta altura
function onInput(event: Event) {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:modelValue', value)
  adjustHeight()
}

// Maneja teclas: Ctrl/Cmd+Enter => enviar
function onKeydown(event: KeyboardEvent) {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault()
    // No enviar si está deshabilitado o el contenido está vacío
    if (disabled.value) return
    if (!modelValue.value.trim()) return
    emit('send')
  }
}

// Exponer método focus() para que el padre pueda enfocar el textarea
function focus() {
  textarea.value?.focus()
}

defineExpose({ focus })

// Ajustar altura cuando cambie el valor inicial desde el padre
onMounted(() => {
  adjustHeight()
})

watch(
  () => modelValue.value,
  () => {
    adjustHeight()
  },
)
</script>

<style lang="scss" scoped>
.message-input {
  width: 100%;
  border: 1px solid #e5e7eb;
  padding: 12px;
  font-family: inherit;
  font-size: 1rem;
  resize: none;
  min-height: 20px;
  max-height: 120px;
  line-height: 1.4;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--color-gray900);
  }

  &:disabled {
    background: #f3f4f6;
    cursor: not-allowed;
  }
}

@media (max-width: 768px) {
  .message-input {
    padding: 10px;
  }
}
</style>
