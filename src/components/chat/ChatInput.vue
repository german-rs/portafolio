<!--
  ChatInput.vue

  Componente que agrupa la zona de entrada completa del chat:
    - Mensaje de error (ErrorMessage)
    - Textarea reutilizable (MessageInput)
    - Botón de envío (SendButton)
    - Contador de caracteres (CharCounter)

  Props:
    - isLoading?: boolean  -> indica si hay una llamada en curso
    - maxLength?: number  -> longitud máxima de mensaje

  Emits:
    - 'send-message' (message: string) -> cuando el usuario envía un mensaje

  Comportamiento:
    - Mantiene su propio estado local `message` (cadena)
    - Valida que el mensaje no esté vacío y no exceda maxLength
    - Muestra errores mediante ErrorMessage
    - Al enviar emite 'send-message' con el texto limpio
    - Mantiene el foco en el MessageInput luego de enviar

  Integración recomendada:
    - Reemplazar la sección de input del componente padre (ChatComponent.vue)
      por <ChatInput :isLoading="isLoading" @send-message="handleSendMessage" />
    - El handler `handleSendMessage` en el padre recibirá el texto y será
      responsable de añadir el mensaje de usuario al historial y llamar al servicio AI.

  @author Germán
  @version 1.0.0
-->

<template>
  <div class="input-container">
    <!-- Error visible si hay algún problema al validar/envío -->
    <ErrorMessage v-if="localError" :error="localError" @dismiss="localError = ''" />

    <div class="input-group">
      <!-- MessageInput es el textarea reutilizable que expone update:modelValue y send -->
      <MessageInput
        ref="messageInputRef"
        v-model="message"
        :disabled="isLoading"
        :maxlength="maxLength"
        @send="onSend"
      />

      <!-- SendButton maneja estado visual de loading y deshabilitado -->
      <SendButton :disabled="!message.trim() || isLoading" :loading="isLoading" @click="onSend" />
    </div>

    <!-- Contador de caracteres reutilizable -->
    <CharCounter :current="message.length" :max="maxLength" :warning-threshold="0.75" />
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, nextTick } from 'vue'
import ErrorMessage from './ui/ErrorMessage.vue'
import MessageInput from './ui/MessageInput.vue'
import SendButton from './ui/SendButton.vue'
import CharCounter from './ui/CharCounter.vue'

// Props con valores por defecto
const props = withDefaults(
  defineProps<{
    isLoading?: boolean
    maxLength?: number
  }>(),
  {
    isLoading: false,
    maxLength: 2000,
  },
)

const { isLoading, maxLength } = toRefs(props)

// Emit que notifica al padre que hay un mensaje para enviar
const emit = defineEmits<{
  (e: 'send-message', message: string): void
}>()

// Estado local
const message = ref('')
const localError = ref('')
const messageInputRef = ref<any>(null)

// Validación y envío
async function onSend() {
  // Evitar envíos múltiples
  if (isLoading.value) return

  const text = message.value || ''
  const trimmed = text.trim()

  if (!trimmed) {
    localError.value = 'Escribe un mensaje antes de enviar.'
    // enfocamos para mejorar UX
    await focusInput()
    return
  }

  if (trimmed.length > maxLength.value) {
    localError.value = `El mensaje supera el máximo de ${maxLength.value} caracteres.`
    await focusInput()
    return
  }

  // Emitir el mensaje al padre
  emit('send-message', trimmed)

  // Borrar input local y devolver el foco
  message.value = ''
  await nextTick()
  await focusInput()
}

async function focusInput() {
  await nextTick()
  // MessageInput expone focus() con defineExpose; si no existe, intentamos el focus directo
  if (messageInputRef.value?.focus) {
    messageInputRef.value.focus()
  } else if (messageInputRef.value instanceof HTMLTextAreaElement) {
    messageInputRef.value.focus()
  }
}
</script>

<style lang="scss" scoped>
.input-container {
  padding: 16px 20px;
  border-top: 1px solid var(--color-divider);
}

.input-group {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

@media (max-width: 768px) {
  .input-container {
    padding: 12px 16px;
  }

  .input-group {
    gap: 8px;
  }
}
</style>
