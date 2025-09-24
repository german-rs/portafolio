<template>
  <div class="floating-card" :class="[positionClass]" :style="{ animationDelay: `${delay}s` }">
    <div class="skill-icon">{{ icon }}</div>
    <div>{{ text }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  icon: string
  text: string
  position: 'top-right' | 'bottom-left'
  delay: number
}

const props = defineProps<Props>()

const positionClass = computed(() => {
  return props.position === 'top-right' ? 'card-top-right' : 'card-bottom-left'
})
</script>

<style scoped>
.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: float 3s ease-in-out infinite;
}

.card-top-right {
  top: 10%;
  right: -20px;
}

.card-bottom-left {
  bottom: 15%;
  left: -30px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@media (max-width: 768px) {
  .floating-card {
    display: none;
  }
}
</style>
