<template>
  <section class="skills-section">
    <div class="container">
      <h2 class="section-title" ref="titleRef">Áreas de Expertise</h2>
      <div class="skills-grid">
        <SkillCard v-for="(skill, index) in skills" :key="index" :skill="skill" :index="index" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SkillCard from './SkillCard.vue'

interface Skill {
  icon: string
  title: string
  description: string
}

const titleRef = ref<HTMLElement>()

const skills: Skill[] = [
  {
    icon: '💻',
    title: 'Desarrollo Web',
    description: 'WordPress, PHP, JavaScript, HTML/CSS con enfoque en performance y UX',
  },
  {
    icon: '🎓',
    title: 'Educación Digital',
    description: 'Diseño instruccional, e-learning, metodologías innovadoras de enseñanza',
  },
  {
    icon: '🤝',
    title: 'Comunicación Inclusiva',
    description: 'Lengua de señas, accesibilidad digital, inclusión tecnológica',
  },
  {
    icon: '💡',
    title: 'Consultoría',
    description: 'Estrategia digital, optimización de procesos, transformación tecnológica',
  },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  if (titleRef.value) {
    observer.observe(titleRef.value)
  }
})
</script>

<style scoped>
.skills-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 4rem;
  color: #212121;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.section-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
</style>
