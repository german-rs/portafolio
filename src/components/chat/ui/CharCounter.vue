<template>
  <!-- Contador de caracteres -->
  <div class="char-counter" :class="{ warning: isOverLimit }">{{ current }}/{{ max }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// Definir qué props recibe el componente
interface Props {
  current: number // Caracteres actuales
  max: number // Máximo permitido
  warningThreshold?: number // Porcentaje para warning (opcional)
}

// Configurar props con valores por defecto
const props = withDefaults(defineProps<Props>(), {
  warningThreshold: 0.8, // Por defecto, warning al 80%
})

// Lógica: calcular si debe mostrar warning
const isOverLimit = computed(() => props.current > props.max * props.warningThreshold)
</script>

<style lang="scss" scoped>
$char-counter-color: var(--color-gray700);
$char-counter-warning: var(--color-text-alert);

.char-counter {
  font-size: 0.75rem;
  text-align: right;
  margin-top: 0.25rem;
  color: $char-counter-color;
  transition: color 0.2s ease-in-out;

  &.warning {
    color: $char-counter-warning;
    font-weight: 500;
  }
}
</style>
