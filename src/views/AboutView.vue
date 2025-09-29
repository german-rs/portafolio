<template>
  <main class="main">
    <!-- Header Section -->
    <header class="main__header">
      <!-- <h1 class="main__title">Acerca de</h1> -->
      <div class="main__divider"></div>
    </header>

    <!-- Profile Section -->
    <section class="main__profile">
      <div class="main__img-container">
        <img
          class="main__img"
          loading="lazy"
          src="/logo-portafolio.webp"
          alt="Foto de perfil estilo springfield/los simpson"
        />
        <div class="main__img-border"></div>
      </div>

      <div class="main__content">
        <div class="main__card">
          <h2 class="main__subtitle">Experiencia</h2>
          <p class="main__text">
            Profesional en informática con más de <strong>15 años de experiencia</strong>
            en distintas áreas, incluyendo soporte, programación y docencia. A lo largo de mi
            trayectoria he combinado conocimientos técnicos con la capacidad de enseñar, acompañar a
            las personas y mejorar procesos para hacerlos más simples y eficientes.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.main {
  // border: 1px solid black;
  padding: 2rem 1rem;

  &__container {
    // border: 1px solid green;
    max-width: 800px;
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
    margin-bottom: 1em;
  }

  /* Profile Section */
  &__profile {
    // border: 1px solid green;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    align-items: start;
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
    gap: 1.5rem;
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

  &__text a {
    text-decoration: none;
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
