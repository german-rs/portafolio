<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/SidebarComponent.vue'
import HeaderComponent from './components/HeaderComponent.vue'
const sidebarOpen = ref(false)
</script>

<template>
  <!-- 
   - En la parte Superior de la aplicación poner el icono de accesibilidad deslizable hacia abajo.
  - Opcion de cambio de fuente open dislexic
  - agrandar/reducir el texto
  - Modo claro y oscuro

-->

  <!-- Sidebar -->
  <Sidebar :isOpen="sidebarOpen" @toggle="sidebarOpen = !sidebarOpen" />

  <!-- Contenedor principal -->
  <main class="app-main" :class="{ shifted: sidebarOpen }">
    <HeaderComponent />
    <router-view />
  </main>
</template>

<style lang="scss" scoped>
$sidebar-width-closed: 50px;
$sidebar-width-open: 200px;
$main-padding: 20px;
$transition-duration: 0.3s;

.app-main {
  margin-left: $sidebar-width-closed;
  padding: $main-padding;
  transition: margin-left $transition-duration ease;

  &.shifted {
    margin-left: $sidebar-width-open;
  }
}
</style>
