<!--
  WelcomeMessage.vue

  Componente estático que muestra el mensaje de bienvenida cuando
  no hay mensajes en la conversación.

  No recibe props ni emite eventos.
  Es accesible y fácil de reutilizar dentro de MessagesContainer.vue.

  @author Germán
  @version 1.0.0
-->

<template>
  <div class="welcome-message" role="region" aria-label="Mensaje de bienvenida del chat">
    <div class="welcome-icon" aria-hidden="true">
      <div class="sidebar__logo-container">
        <img class="sidebar__logo" src="/sidebar-logo.webp" alt="Logo" />
      </div>
    </div>

    <h3 class="welcome-message__title">¡Hola! Soy Germán Riveros</h3>
    <p class="welcome-message__text">
      ¿Con qué puedo ayudarte? Escribe tu pregunta y presiona <kbd>Ctrl</kbd>+<kbd>Enter</kbd> para
      enviarla.
    </p>
  </div>
</template>

<script setup lang="ts">
// Componente estático — no props ni emits
</script>

<style lang="scss" scoped>
.welcome-message {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text);
}

.welcome-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.sidebar__logo {
  width: 25px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.welcome-message__title {
  margin: 0 0 8px 0;
  color: var(--color-text-heading);
  font-size: 1.25rem;
}

.welcome-message__text {
  margin: 0;
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

kbd {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.85rem;
}
</style>
