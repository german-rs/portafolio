<template>
  <div v-if="error" class="error-message">
    <div class="error-message__content">
      <span class="error-message__icon material-symbols-outlined">chat_error</span>
      <span class="error-message__text">{{ error }}</span>
    </div>

    <button
      @click="$emit('dismiss')"
      class="error-message__close"
      aria-label="Cerrar mensaje de error"
      type="button"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  error: string
}

defineProps<Props>()

defineEmits<{
  dismiss: []
}>()
</script>

<style lang="scss" scoped>
.error-message {
  background-color: var(--color-background-alert-message);
  color: var(--color-text-alert-message);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: slideDown 0.3s ease-out;

  &__content {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  &__text {
    line-height: 1.4;
  }

  &__close {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: var(--color-text-alert-message);
    padding: 4px;
    margin-left: 8px;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    flex-shrink: 0;

    &:hover {
      background-color: var(--color-background-alert-message-hover);
    }

    &:focus {
      outline: 2px solid var(--color-red400);
      outline-offset: 1px;
    }
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
