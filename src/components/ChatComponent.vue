<!--
  ChatComponent.vue
  
  Componente de chat interactivo que permite mantener conversaciones
  continuas con Gemini AI. Incluye interfaz
  de usuario moderna y manejo de estados.
  
  @Germán Riveros Sepúlveda
  @version 1.0.0
-->

<template>
  <div class="chat-container">
    <ChatHeader :messagesCount="messages.length" :isLoading="isLoading" @clear-chat="clearChat" />

    <!-- Área de mensajes -->
    <div class="messages-container" ref="messagesContainer">
      <!-- Mensaje de bienvenida cuando no hay mensajes -->
      <WelcomeMessage v-if="messages.length === 0" />

      <!-- Lista de mensajes -->
      <MessageItem v-for="(message, index) in messages" :key="index" :message="message" />

      <!-- Indicador de escritura -->
      <TypingIndicator v-if="isLoading" />
    </div>

    <ChatInput :isLoading="isLoading" @send-message="handleSendMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { geminiService } from '@/services/gemini'
import ChatHeader from './chat/ChatHeader.vue'
import ChatInput from './chat/ChatInput.vue'
import WelcomeMessage from './chat/messages/WelcomeMessage.vue'
import TypingIndicator from './chat/messages/TypingIndicator.vue'
import MessageItem from './chat/messages/MessageItem.vue'

/**
 * Interfaz para los mensajes del chat
 */
interface ChatMessage {
  role: 'user' | 'model'
  parts: string
  timestamp: Date
}

// ==================== ESTADO REACTIVO ====================

/** Lista de mensajes de la conversación */
const messages = ref<ChatMessage[]>([])

/** Mensaje actual que está escribiendo el usuario */
const currentMessage = ref('')

/** Indica si se está procesando una respuesta */
const isLoading = ref(false)

/** Mensaje de error si existe */
const error = ref('')

/** Referencia al contenedor de mensajes para scroll automático */
const messagesContainer = ref<HTMLElement>()

/** Referencia al input de mensaje */
// const messageInput = ref<HTMLTextAreaElement>()
const messageInput = ref<{ focus?: () => void } | null>(null)

// ==================== MÉTODOS PRINCIPALES ====================

/**
 * Envía un mensaje al chat y obtiene respuesta de Gemini
 */

const handleSendMessage = (message: string) => {
  // asignar message a currentMessage y luego llamar a sendMessage()
  currentMessage.value = message
  sendMessage()
}

const sendMessage = async (): Promise<void> => {
  // Validar que hay contenido
  if (!currentMessage.value.trim()) return

  // Limpiar error anterior
  error.value = ''

  // Agregar mensaje del usuario al historial
  const userMessage: ChatMessage = {
    role: 'user',
    parts: currentMessage.value.trim(),
    timestamp: new Date(),
  }

  messages.value.push(userMessage)

  // Limpiar input y activar loading
  const messageToSend = currentMessage.value
  currentMessage.value = ''
  isLoading.value = true

  // Scroll hacia abajo después de agregar mensaje
  await scrollToBottom()

  try {
    // Enviar conversación completa a Gemini
    const result = await geminiService.generateChat(
      messages.value.map((m) => ({ role: m.role, parts: m.parts })),
    )

    if (result.success && result.text) {
      // Agregar respuesta de Gemini
      const geminiMessage: ChatMessage = {
        role: 'model',
        parts: result.text,
        timestamp: new Date(),
      }

      messages.value.push(geminiMessage)
      await scrollToBottom()
    } else {
      // Mostrar error
      error.value = result.error || 'No se pudo obtener respuesta'
      console.error('Error de Gemini:', result.error)
    }
  } catch (err) {
    error.value = 'Error de conexión. Inténtalo de nuevo.'
    console.error('Error al enviar mensaje:', err)
  } finally {
    isLoading.value = false
    // Enfocar input después de enviar
    focusInput()
  }
}

/**
 * Limpia toda la conversación
 */
const clearChat = (): void => {
  if (messages.value.length === 0) return

  if (confirm('¿Estás seguro de que quieres limpiar toda la conversación?')) {
    messages.value = []
    error.value = ''
    focusInput()
  }
}

// ==================== MÉTODOS DE UTILIDAD ====================

/**
 * Hace scroll automático hacia el último mensaje
 */
const scrollToBottom = async (): Promise<void> => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

/**
 * Enfoca el input de mensaje
 */
const focusInput = (): void => {
  nextTick(() => {
    ;(messageInput.value?.focus ?? messageInput.value?.focus)?.()
  })
}

/**
 * Formatea la hora del mensaje
 */
const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Limpia el mensaje de error
 */
const clearError = (): void => {
  error.value = ''
}

// ==================== CICLO DE VIDA ====================

/**
 * Configuración inicial del componente
 */
onMounted(() => {
  focusInput()
})
</script>

<style lang="scss" scoped>
/* ==================== ESTILOS PRINCIPALES ==================== */

.chat-container {
  border: 1px solid black; /* ----- bandera ---- */
  display: flex;
  flex-direction: column;
  height: 550px;
  max-width: 100%;
  margin: 0 auto;
  background-color: var(--color-background);
  overflow: hidden;
}

/* ==================== ÁREA DE MENSAJES ==================== */

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* ==================== ANIMACIONES ==================== */

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ==================== RESPONSIVE ==================== */

@media (max-width: 768px) {
  .chat-container {
    border-radius: 0;
  }

  .message-content {
    max-width: 85%;
  }

  .input-group {
    gap: 8px;
  }

  .message-input {
    padding: 10px;
  }
}
</style>
