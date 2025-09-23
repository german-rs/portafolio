<!--
  ChatHeader.vue

  Header del chat que muestra el estado y un botón para limpiar conversación.

  Props:
    - messagesCount: number
    - isLoading: boolean

  Emits:
    - clear-chat

  Usa: ClearButton.vue (componente UI reutilizable)

  @author Germán
  @version 1.0.0
-->

<template>
  <header class="chat-header" role="banner" aria-label="Cabecera del chat">
    <div class="chat-title">
      <div class="chat-header__meta" aria-live="polite">
        <span
          class="chat-header__status"
          :class="{
            'chat-header__status--online': !isLoading,
            'chat-header__status--loading': isLoading,
          }"
        >
          {{ isLoading ? 'Escribiendo...' : 'En línea' }}
        </span>
      </div>
    </div>

    <div class="chat-header__actions">
      <ClearButton :disabled="messagesCount === 0" @click="onClear"> Limpiar </ClearButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import { toRefs, withDefaults } from 'vue'
import ClearButton from './ui/ClearButton.vue'

const props = withDefaults(
  defineProps<{
    messagesCount?: number
    isLoading?: boolean
  }>(),
  {
    messagesCount: 0,
    isLoading: false,
  },
)

const { messagesCount, isLoading } = toRefs(props)

const emit = defineEmits<{
  (e: 'clear-chat'): void
}>()

function onClear() {
  emit('clear-chat')
}
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-divider);

  &__meta {
    font-size: 0.85rem;
    color: var(--color-text-muted);
    margin-top: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__status--online {
    color: var(--color-green400);
  }

  &__status--loading {
    color: var(--color-orange400);
  }

  &__actions {
    display: flex;
    gap: 8px;
    align-items: center;
  }
}
</style>
