<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
</script>

<template>
  <main class="main">
    <!-- <h1 class="main__title">Inicio</h1> -->
    <ChatComponent />
  </main>
</template>
<style lang="scss" scoped>
.main {
  padding: 1em;

  &__title {
    font-size: 2rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: var(--color-gray700);
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
    margin-top: 0.3em;
    margin-bottom: 1em;
  }
}
</style>
