<!-- HeroSection.vue - Versión modificada con imagen -->
<template>
  <section class="hero" ref="heroRef">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text" :class="{ animate: isVisible }">
          <h1>Sobre Mí</h1>
          <p class="subtitle">Desarrollador & Educador Apasionado</p>
          <p class="intro">
            Con más de 15 años de experiencia en tecnología y educación, he desarrollado una
            trayectoria única que combina la expertise técnica con la pasión por enseñar y ayudar a
            otros. Mi camino me ha llevado desde el soporte técnico hasta convertirme en
            desarrollador WordPress, pasando por roles en educación, consultoría y emprendimiento.
          </p>
        </div>
        <div class="hero-image" :class="{ animate: isVisible }">
          <!-- AQUÍ SE INTEGRA TU IMAGEN -->
          <div class="profile-image">
            <img
              class="profile-img"
              loading="lazy"
              src="/esta_si.webp"
              alt="Foto de perfil estilo springfield/los simpson"
            />
          </div>
          <FloatingCard icon="💻" text="Desarrollador" position="card-1" delay="0s" />
          <FloatingCard icon="🎓" text="Educador" position="card-2" delay="1s" />
        </div>
      </div>
    </div>
    <ScrollIndicator />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import FloatingCard from './FloatingCard.vue'
import ScrollIndicator from './ScrollIndicator.vue'

const heroRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)

const initializeAnimations = (): void => {
  setTimeout(() => {
    isVisible.value = true
  }, 500)
}

const handleScroll = (): void => {
  const scrolled = window.pageYOffset
  const hero = heroRef.value

  if (hero) {
    const heroContent = hero.querySelector('.hero-content') as HTMLElement
    if (heroContent && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`
      hero.style.opacity = String(1 - scrolled / hero.offsetHeight)
    }
  }
}

onMounted(() => {
  initializeAnimations()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
}

.hero-text {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 1s ease-out;
}

.hero-text.animate {
  opacity: 1;
  transform: translateX(0);
}

.hero-image {
  opacity: 0;
  transform: translateX(50px);
  transition: all 1s ease-out;
  transition-delay: 0.2s;
  position: relative;
}

.hero-image.animate {
  opacity: 1;
  transform: translateX(0);
}

/* ESTILOS MODIFICADOS PARA INCLUIR LA IMAGEN */
.profile-image {
  width: 100%;
  max-width: 400px;
  height: 500px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  /* Removemos el background gradient ya que ahora tenemos imagen */
}

.profile-image:hover {
  transform: translateY(-10px);
}

.profile-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  transition: transform 0.6s;
  z-index: 2;
}

.profile-image:hover::before {
  transform: translateX(100%);
}

/* NUEVOS ESTILOS PARA LA IMAGEN */
.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #212121 0%, #424242 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  font-size: 1.25rem;
  color: #616161;
  margin-bottom: 2rem;
  font-weight: 300;
}

.intro {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #424242;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-text {
    order: 2;
  }

  .hero-image {
    order: 1;
  }

  h1 {
    font-size: 2.5rem;
  }

  .profile-image {
    max-width: 300px;
    height: 400px;
    margin: 0 auto;
  }
}
</style>
