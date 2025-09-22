<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
<template>
  <header class="header">
    <h1 class="header__title">Germán Riveros</h1>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <RouterLink class="header__nav-link" to="/">Home</RouterLink>
        </li>
        <li class="header__nav-item">
          <RouterLink class="header__nav-link" to="/about">About</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  padding: 1em;

  &__title {
    font-size: 1.125rem;
  }
}

.header__nav {
  display: flex;
}

.header__nav-list {
  list-style-type: none;
  display: flex;
  gap: 0.5em;
  margin: 0;
  padding: 0;
}
.header__nav-item {
  margin: 0;
  padding: 0.5em;

  &:hover {
    background-color: var(--color-link-background-hover);
    border-radius: 5px;
  }
}

.header__nav-link {
  text-decoration: none;
  color: var(--color-link-text);
}
</style>
