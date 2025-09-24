<!--
  MessageItem.vue

  Componente responsable de renderizar un único mensaje en la lista
  de conversación: avatar, contenido y timestamp.

  Props:
    - message: {
        id?: string | number,
        role: 'user' | 'model',
        parts: string,
        timestamp: string | Date
      }

  No emite eventos. Está diseñado para mostrar **texto plano** y mantener
  la seguridad evitando `v-html`. Si necesitas renderizar Markdown/HTML,
  hazlo en el servidor o con una librería que incluya sanitización.

  Uso:
    <MessageItem :message="message" />

  @author Germán
  @version 1.0.0
-->

<template>
  <article :class="['message', message.role]" :aria-label="ariaLabel">
    <!-- Avatar -->
    <div class="message-avatar" aria-hidden="true">
      <span v-if="message.role === 'user'" class="material-symbols-outlined">person</span>
      <span v-else>
        <img class="chat__logo" src="/chat-logo.webp" alt="Asistente" />
      </span>
    </div>

    <!-- Contenido -->
    <div class="message-content">
      <!-- Texto (texto plano) -->
      <div class="message-text" :title="tooltipText">{{ message.parts }}</div>

      <!-- Timestamp accesible -->
      <time class="message-time" :datetime="isoTimestamp">{{ formattedTime }}</time>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Definición simple de la prop message
const props = defineProps<{
  message: {
    id?: string | number
    role: 'user' | 'model'
    parts: string
    timestamp: string | Date
  }
}>()

// Convertir timestamp a Date y formato ISO para el atributo datetime
const isoTimestamp = computed(() => {
  const t = props.message.timestamp
  const date = typeof t === 'string' ? new Date(t) : t instanceof Date ? t : new Date(t as any)
  return isNaN(date.getTime()) ? '' : date.toISOString()
})

// Formato legible de la hora (ej. 14:05)
const formattedTime = computed(() => {
  const t = props.message.timestamp
  const date = typeof t === 'string' ? new Date(t) : t instanceof Date ? t : new Date(t as any)
  if (isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
})

// Texto para tooltip (evita HTML largo sin scroll)
const tooltipText = computed(() => props.message.parts)

// aria-label para el artículo, da contexto a lectores de pantalla
const ariaLabel = computed(() => {
  const who = props.message.role === 'user' ? 'Usuario' : 'Asistente'
  return `${who} — ${formattedTime.value}`
})
</script>

<style scoped>
.message {
  display: flex;
  margin-bottom: 16px;
  animation: fadeIn 0.28s ease-out;
}

/* Alineación para mensajes del usuario */
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

/* Avatar del usuario a la derecha */
.message.user .message-avatar {
  background-color: var(--color-background-user-chat);
  order: 2;
  margin-left: 12px;
}

/* Avatar del modelo a la izquierda */
.message.model .message-avatar {
  background-color: var(--color-background-model-chat);
  margin-right: 12px;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.message-content {
  max-width: 70%;
  background: var(--color-White);
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

/* Estilo distinto para burbuja del usuario */
.message.user .message-content {
  background-color: var(--color-background-message-user);
  color: var(--color-text-message-user);
}

.message-text {
  margin-bottom: 6px;
  line-height: 1.5;
  word-wrap: break-word;
  white-space: pre-wrap; /* preserva saltos de línea */
}

.message-time {
  display: block;
  font-size: 0.75rem;
  opacity: 0.75;
  text-align: right;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .message-content {
    max-width: 85%;
  }
}
</style>
