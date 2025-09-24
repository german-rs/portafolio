<!--
  TypingIndicator.vue

  Indicador reutilizable que muestra que el asistente está escribiendo.

  Props:
    - show?: boolean (por defecto true)

  No emite eventos.

  Uso recomendado:
    - Importar y usar con v-if: <TypingIndicator v-if="isLoading" />
    - O con prop: <TypingIndicator :show="isLoading" />

  Nota sobre el fix: este componente ahora contiene las reglas CSS necesarias
  para que se muestre con el mismo layout que los mensajes (avatar a la
  izquierda, burbuja de contenido con borde redondeado). El problema anterior
  venía de haber movido el HTML a un componente separado mientras los estilos
  principales de `.message`, `.message-avatar` y `.message-content` estaban
  definidos *scoped* en `ChatComponent.vue` — por lo tanto ya no aplicaban al
  DOM del componente hijo. Para resolverlo he incluido aquí las reglas
  necesarias y las animaciones.

  @author Germán
  @version 1.1.0 (fix layout)
-->

<template>
  <div
    v-if="show"
    class="typing-indicator message model"
    role="status"
    aria-live="polite"
    aria-label="El asistente está escribiendo"
  >
    <div class="message-avatar" aria-hidden="true">
      <span>
        <img class="chat__logo" src="/chat-logo.webp" alt="Logo del asistente" />
      </span>
    </div>

    <div class="message-content">
      <div class="typing-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="sr-only">El asistente está escribiendo...</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    show?: boolean
  }>(),
  { show: true },
)
</script>

<style scoped>
.typing-indicator {
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;
  animation: fadeIn 0.22s ease-out;
}

.typing-indicator .message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-right: 12px;
  background: var(--color-background-model-chat, transparent);
}

.typing-indicator .message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.typing-indicator .message-content {
  max-width: 70%;
  background: #e9ecef;
  border-radius: 12px;
  padding: 10px 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
}

.typing-indicator .typing-dots {
  display: flex;
  gap: 6px;
  padding: 6px 0;
  align-items: center;
}

.typing-indicator .typing-dots span {
  width: 8px;
  height: 8px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.2s infinite ease-in-out;
  display: inline-block;
}

.typing-indicator .typing-dots span:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-indicator .typing-dots span:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.9;
  }
  30% {
    transform: translateY(-6px);
    opacity: 1;
  }
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .typing-indicator .message-content {
    max-width: 85%;
  }
}
</style>
