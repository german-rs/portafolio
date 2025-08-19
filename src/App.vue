<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/SidebarComponent.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <!-- Sidebar -->
  <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />

  <!-- Contenedor principal -->
  <main :class="{ shifted: sidebarOpen }">
    <router-view />
  </main>
</template>

<style scoped>
main {
  margin-left: 60px; /* espacio mínimo cuando el sidebar está cerrado */
  padding: 20px;
  transition: margin-left 0.3s ease;
}

main.shifted {
  margin-left: 250px; /* empuja el contenido cuando el sidebar está abierto */
}
</style>
