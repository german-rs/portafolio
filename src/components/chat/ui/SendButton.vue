<!--
  SendButton.vue

  Botón reutilizable para enviar mensajes.
  Props: { disabled?: boolean, loading?: boolean }
  Emits: 'click'

  Muestra un icono de envío o un indicador de carga.

  @author Germán
  @version 1.0.0
-->

<template>
  <button
    class="send-btn"
    type="button"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading"
    :aria-busy="loading"
    @click="onClick"
  >
    <span
      v-if="loading"
      class="send-button__icon send-button__icon--loading material-symbols-outlined"
      aria-hidden="true"
      >hourglass_empty</span
    >
    <span v-else class="send-button__icon material-symbols-outlined" aria-hidden="true">send</span>
    <!-- Texto accesible para lectores de pantalla -->
    <span class="send-button__label send-button__label--sr-only"><slot>Enviar</slot></span>
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    loading?: boolean
  }>(),
  { disabled: false, loading: false },
)

const { disabled, loading } = toRefs(props)

const emit = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
  // No emitimos si está deshabilitado o en loading
  if (disabled.value || loading.value) return
  emit('click')
}
</script>

<style lang="scss" scoped>
.send-btn {
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--color-button-primary-background);
  color: var(--color-button-primary-text);
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 0;
  font-size: 1.1rem;

  &:hover:not(:disabled) {
    background-color: var(--color-button-primary-background-hover);
  }

  &:disabled {
    background-color: var(--color-button-disable-background);
    color: var(--color-button-disable-text);
    cursor: not-allowed;
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 3px solid rgba(59, 130, 246, 0.25);
    outline-offset: 2px;
  }

  &__icon {
    font-size: 1.1rem;
    line-height: 1;
  }
}

.send-button__label--sr-only {
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
</style>
