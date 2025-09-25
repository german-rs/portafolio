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
          <RouterLink class="sidebar__nav-link" to="/">Inicio</RouterLink>
        </li>
        <li class="sidebar__nav-item">
          <RouterLink class="sidebar__nav-link" to="/about">Acerca de</RouterLink>
        </li>
        <li class="sidebar__nav-item">
          <RouterLink class="sidebar__nav-link" to="/contact">Contacto</RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  padding-top: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  position: fixed;
  border-radius: 12px;
  border-right: 3px solid var(--color-gray800);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  top: 0;
  left: 0;
  height: 100vh;
  background: var(--color-sidebar-background);
  overflow: hidden;
  transition: width 0.3s ease;
  z-index: 1000;

  /* cuando está abierta */
  &.open {
    width: 250px;
    align-items: start;
    padding-left: 0.5em;
  }

  /* cuando está cerrada */
  &.closed {
    width: 60px;
    background-color: var(--color-background);
  }
}

// Logo
.sidebar__logo-container {
  padding: 0.5em;

  &:hover {
    background-color: var(--color-link-background-hover);
    border-radius: 5px;
  }
}

.sidebar__logo {
  cursor: pointer;
}

// botón
.sidebar__toggle {
  display: block;
  margin: 0;
  padding: 0.5em;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-icon-default);

  &:hover {
    color: var(--color-icon-hover);
    background-color: var(--color-link-background-hover);
    border-radius: 5px;
  }
}

// Enlaces
.sidebar__nav {
  width: 95%;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.sidebar__nav-list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  margin: 0;
  padding: 0;
}
.sidebar__nav-item {
  margin: 0;
  padding: 0.5em;

  &:hover {
    background-color: var(--color-link-background-hover);
    border-radius: 5px;
  }
}

.sidebar__nav-link {
  text-decoration: none;
  color: var(--color-link-text);
}
</style>
