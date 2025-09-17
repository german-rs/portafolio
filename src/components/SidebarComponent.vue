<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{ isOpen: boolean }>()
const emit = defineEmits(['toggle'])
</script>

<template>
  <!-- Sidebar siempre existe -->
  <div class="sidebar" :class="{ open: isOpen, closed: !isOpen }">
    <div class="sidebar__logo-container">
      <img @click="emit('toggle')" class="sidebar__logo" src="/sidebar-logo.webp" alt="" />
    </div>

    <!-- Botón para abrir/cerrar -->
    <button @click="emit('toggle')" class="sidebar__toggle">
      <span class="sidebar__toggle-icon material-symbols-outlined">
        {{ isOpen ? 'left_panel_close' : 'left_panel_open' }}
      </span>
    </button>

    <!-- Menú solo visible si está abierto -->
    <nav v-if="isOpen" class="sidebar__nav">
      <ul class="sidebar__nav-list">
        <li class="sidebar__nav-item">
          <RouterLink class="sidebar__nav-link" to="/">Home</RouterLink>
        </li>
        <li class="sidebar__nav-item">
          <RouterLink class="sidebar__nav-link" to="/about">About</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  border-right: 1px solid black;
  top: 0;
  left: 0;
  height: 100vh;
  background: #f5f5f5;
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 1000;

  /* cuando está abierta */
  &.open {
    width: 250px;
  }

  /* cuando está cerrada */
  &.closed {
    width: 60px; /* ancho mínimo, solo para mostrar el botón */
  }

  &__logo-container {
    padding: 0.5em;
  }
}

.sidebar__toggle {
  display: block;
  margin: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #8b8b8b;

  &:hover {
    background: #f5f5f5;
    border-radius: 5px;
  }
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.sidebar__nav-link {
  text-decoration: none;
}
.sidebar__nav-list {
  list-style-type: none;
}

.sidebar__logo {
  cursor: pointer;
}
</style>
