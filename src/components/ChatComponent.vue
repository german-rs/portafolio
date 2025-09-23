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
      <div v-if="messages.length === 0" class="welcome-message">
        <div class="welcome-icon">
          <div class="sidebar__logo-container">
            <img class="sidebar__logo" src="/sidebar-logo.webp" alt="" />
          </div>
        </div>
        <h3 class="welcome-message__title">¡Hola! Soy Germán Riveros</h3>
        <p class="welcome-message__text">¿Con qué puedo ayudarte?</p>
      </div>

      <!-- Lista de mensajes -->
      <div v-for="(message, index) in messages" :key="index" class="message" :class="message.role">
        <!-- Avatar del mensaje -->
        <div class="message-avatar">
          <span v-if="message.role === 'user'" class="material-symbols-outlined"> person </span>
          <span v-else>
            <img class="chat__logo" src="/chat-logo.webp" alt="" />
          </span>
        </div>

        <!-- Contenido del mensaje -->
        <div class="message-content">
          <div class="message-text">{{ message.parts }}</div>
          <div class="message-time">{{ formatTime(message.timestamp) }}</div>
        </div>
      </div>

      <!-- Indicador de escritura -->
      <div v-if="isLoading" class="message model typing-indicator">
        <div class="message-avatar">
          <span>
            <img class="chat__logo" src="/chat-logo.webp" alt="" />
          </span>
        </div>
        <div class="message-content">
          <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <ChatInput :isLoading="isLoading" @send-message="handleSendMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
import { geminiService } from '@/services/gemini'
import CharCounter from './chat/ui/CharCounter.vue'
import ErrorMessage from './chat/ui/ErrorMessage.vue'
import SendButton from './chat/ui/SendButton.vue'
import MessageInput from './chat/ui/MessageInput.vue'
import ChatHeader from './chat/ChatHeader.vue'
import ChatInput from './chat/ChatInput.vue'

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

<style scoped>
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

.welcome-message {
  text-align: center;
  padding: 40px 20px;
}

.welcome-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.welcome-message__title {
  margin: 0 0 8px 0;
  color: var(--color-text-heading);
}

.welcome-message__text {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text);
}

/* ==================== MENSAJES ==================== */

.message {
  display: flex;
  margin-bottom: 16px;
  animation: fadeIn 0.3s ease-out;
}

.message.user {
  justify-content: flex-end;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background-color: var(--color-background-user-chat);
  order: 2;
  margin-left: 12px;
}

.message.model .message-avatar {
  background-color: var(--color-background-model-chat);
  margin-right: 12px;
}

.message-content {
  max-width: 70%;
  background: var(--color-White);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message.user .message-content {
  background-color: var(--color-background-message-user);
  color: var(--color-text-message-user);
}

.message-text {
  margin-bottom: 4px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
}

/* ==================== INDICADOR DE ESCRITURA ==================== */

.typing-indicator .message-content {
  background: #e5e7eb;
}

.typing-dots {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-dots span {
  width: 8px;
  height: 8px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
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

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
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
