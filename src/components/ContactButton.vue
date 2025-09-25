<template>
  <a class="contact-button" href="mailto:german.riveross@gmail.cl">
    <span class="contact-button__icon material-symbols-outlined" aria-hidden="true">mail</span>
    <!-- Texto accesible para lectores de pantalla - QUITAR PALABRA CONTACTAR-->
    <span class="contact-button__label send-button__label--sr-only"><slot>Contactar</slot></span>
  </a>
</template>
<style lang="scss" scoped>
.contact-button {
  margin-top: 1em;
  text-decoration: none;
  width: 120px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2em;
  border: none;
  background-color: var(--color-button-primary-background);
  color: var(--color-button-primary-text);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background-color: var(--color-button-primary-background-hover);
  }
}

.contact-button__label--sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>
