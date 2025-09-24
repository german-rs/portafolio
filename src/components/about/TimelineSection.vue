<template>
  <section class="timeline-section">
    <div class="container">
      <h2 class="section-title" ref="titleRef">Mi Trayectoria Profesional</h2>
      <div class="timeline">
        <TimelineItem v-for="(job, index) in jobs" :key="index" :job="job" :index="index" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TimelineItem from './TimelineItem.vue'

interface Job {
  title: string
  period: string
  description: string
}

const titleRef = ref<HTMLElement>()

const jobs: Job[] = [
  {
    title: 'Desarrollador WordPress',
    period: 'Actualidad',
    description:
      'Especializado en el desarrollo de sitios web personalizados, temas a medida y plugins. Enfoque en performance, SEO y experiencia de usuario.',
  },
  {
    title: 'Emprendedor & Consultor Independiente',
    period: 'Dic. 2023 - May. 2025',
    description:
      'Desarrollo de soluciones tecnológicas personalizadas y consultoría estratégica para pequeñas y medianas empresas.',
  },
  {
    title: 'Voluntariado',
    period: 'Mar. 2023 - Nov. 2023',
    description:
      'Contribución activa en proyectos comunitarios, aplicando habilidades técnicas y educativas para el beneficio social.',
  },
  {
    title: 'Ejecutivo Nivel Avanzado - Lengua de Señas',
    period: 'Nov. 2021 - Feb. 2023',
    description:
      'Especialización en comunicación accesible, bridging the communication gap y promoviendo la inclusión digital.',
  },
  {
    title: 'Docencia Virtual',
    period: 'Ago. 2020 - Oct. 2021',
    description:
      'Adaptación y desarrollo de contenidos educativos para plataformas digitales, pionero en metodologías de enseñanza online.',
  },
  {
    title: 'Docencia Presencial',
    period: 'Abr. 2014 - Dic. 2019',
    description:
      'Formación de nuevos talentos en tecnología, desarrollo de curricula educativa y mentoring de estudiantes.',
  },
  {
    title: 'Facilitador de Instrucción',
    period: 'Nov. 2016 - Mar. 2018',
    description:
      'Diseño e implementación de programas de capacitación técnica, optimización de procesos de aprendizaje.',
  },
  {
    title: 'Docencia Inicial',
    period: 'Mar. 2016 - Dic. 2016',
    description:
      'Inicio en el mundo educativo, desarrollando habilidades pedagógicas y metodologías de enseñanza efectivas.',
  },
  {
    title: 'Especialista en Soporte Técnico',
    period: 'Feb. 2009 - Mar. 2014',
    description:
      'Fundación sólida en tecnología, resolución de problemas complejos y atención al cliente. Desarrollo de expertise en sistemas y troubleshooting.',
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
.timeline-section {
  padding: 8rem 0;
  background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
  position: relative;
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

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #e0e0e0, #9e9e9e, #e0e0e0);
  transform: translateX(-50%);
}

@media (max-width: 768px) {
  .timeline::before {
    left: 30px;
  }
}
</style>
