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
    <div class="welcome-message__logo-container" aria-hidden="true">
      <img class="welcome-message__logo" src="/sidebar-logo.webp" alt="Logo" />
    </div>

    <h2 class="welcome-message__title">¡Hola! Soy Germán Riveros</h2>
    <h3 class="welcome-message__subtitle">¿Con qué puedo ayudarte?</h3>
    <!-- <p class="welcome-message__text">
      Escribe tu pregunta y presiona <kbd class="welcome-message__key">Ctrl</kbd>+<kbd
        class="welcome-message__key"
        >Enter</kbd
      >
      para enviarla.
    </p> -->
    <!-- Encontrar una forma mas limpia de indicar Ctrl+Enter pero solo en desktop -->
  </div>
</template>

<script setup lang="ts">
// Componente estático — sin props ni emits
</script>

<style lang="scss" scoped>
.welcome-message {
  text-align: center;
  padding: 40px 20px;
  color: var(--color-text);

  &__title {
    margin: 0 0 8px 0;
    color: var(--color-text-heading);
    font-size: 1.5rem;
  }

  &__subtitle {
    margin: 0 0 8px 0;
    color: var(--color-gray800);
    font-size: 1.3rem;
    font-weight: 600;
  }

  &__text {
    margin: 0;
    font-size: 0.95rem;
    color: var(--color-text-muted);
  }

  &__key {
    background-color: var(--color-background-soft);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.85rem;
  }

  &__logo-container {
    font-size: 3rem;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
  }

  &__logo {
    width: 25px;
    height: auto;
    object-fit: contain;
    border-radius: 8px;
  }
}
</style>
