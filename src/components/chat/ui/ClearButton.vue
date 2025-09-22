<!--
ClearButton.vue
Botón reutilizable para limpiar conversaciones.
Props: { disabled?: boolean }
Emits: 'click'
@author Germán
@version 1.0.0
-->

<template>
  <button
    class="clear-btn"
    type="button"
    :disabled="disabled"
    :aria-disabled="disabled"
    @click="onClick"
  >
    <span class="clear-button__icon material-symbols-outlined">delete</span>
    <span class="clear-button__label"><slot>Limpiar</slot></span>
  </button>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

// Definición de props con valor por defecto
const props = withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  { disabled: false },
)

// Extraemos como refs para poder usarlos reactivamente
const { disabled } = toRefs(props)

// Emite un evento 'click' hacia el padre
const emit = defineEmits<{
  (e: 'click'): void
}>()

function onClick() {
  // Si está deshabilitado no emitimos
  if (disabled.value) return
  emit('click')
}
</script>

<style lang="scss" scoped>
.clear-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid var(--color-button-secondary-border);
  color: var(--color-button-secondary-text);
  padding: 8px 12px;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease-in;

  &:hover:not(:disabled) {
    border-color: var(--color-button-secondary-border-hover);
    color: var(--color-button-secondary-text-hover);
    background: transparent;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid var(--color-gray900);
    outline-offset: 1px;
  }

  &__icon {
    font-size: 1.2rem;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
