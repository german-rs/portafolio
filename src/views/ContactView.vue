<template>
  <main class="main">
    <!-- Header Section -->
    <header class="main__header">
      <h1 class="main__title">Contacto</h1>
      <div class="main__divider"></div>
    </header>

    <!-- Contact Section -->
    <section class="main__contact">
      <div class="main__content">
        <div class="main__card">
          <h2 class="main__subtitle">Hablemos</h2>
          <p class="main__text">
            Para cualquier consulta o propuesta, siéntete libre de enviarme un correo electrónico
            utilizando el botón a continuación. Estoy disponible para discutir oportunidades de
            colaboración o responder tus preguntas.
          </p>
          <ContactButton />
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts">
import ContactButton from '@/components/ContactButton.vue'
</script>
<style lang="scss" scoped>
.main {
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  text-align: center;

  &__container {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  &__header {
    // border: 1px solid green;
    text-align: center;
    margin-bottom: 1rem;
  }

  &__title {
    // border: 1px solid red;
    font-size: 2rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: var(--color-gray700);
    margin: 0 0 1rem 0;
    letter-spacing: -0.02em;
  }

  &__contact {
    // border: 1px solid green;
    // display: grid;
    // grid-template-columns: 1fr 2fr;
    // gap: 3rem;
    // align-items: start;
    display: flex;
    max-width: 500px;
    align-self: center;
  }

  &__img-container {
    // border: 1px solid green;
    position: relative;
    display: flex;
    justify-content: center;
  }

  &__img {
    border: 3px solid var(--color-gray800);
    border-radius: 12px;
    width: 200px;
  }

  &__content {
    // border: 1px solid green;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__card {
    background-color: var(--color-white);
    padding: 2rem;
    border-radius: 12px;
    border: 3px solid var(--color-gray800);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    position: relative;
  }

  &__subtitle {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--color-gray800);
    margin: 0 0 1rem 0;
    border-bottom: 2px solid var(--color-gray300);
    padding-bottom: 0.5rem;
  }

  &__text {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--color-gray800);
    margin: 0;
  }

  &__text strong {
    color: var(--color-gray900);
    font-weight: 600;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .main__profile {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
