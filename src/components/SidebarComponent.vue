<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['toggle'])
</script>

<template>
  <!-- Sidebar siempre existe -->
  <div class="sidebar" :class="{ open: isOpen, closed: !isOpen }">
    <img src="../../public/sidebar-logo.webp" alt="" />

    <!-- Botón para abrir/cerrar -->
    <button @click="emit('toggle')" class="toggle-btn">
      <span class="material-symbols-outlined">
        {{ isOpen ? 'left_panel_close' : 'left_panel_open' }}
      </span>
    </button>

    <!-- Menú solo visible si está abierto -->
    <nav v-if="isOpen" class="nav">
      <ul>
        <li>
          <RouterLink class="navbar__link" to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink class="navbar__link" to="/about">About</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
.sidebar {
  position: fixed;
  border-right: 1px solid black;
  top: 0;
  left: 0;
  height: 100vh; /* ocupa todo el alto */
  background: #f9fbff;
  /* box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); */
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 1000;
}

/* cuando está abierta */
.sidebar.open {
  width: 250px;
}

/* cuando está cerrada */
.sidebar.closed {
  width: 60px; /* ancho mínimo, solo para mostrar el botón */
}

.toggle-btn {
  display: block;
  margin: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: blue;
}

.nav {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
</style>
