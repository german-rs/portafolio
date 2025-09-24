<template>
  <div
    class="skill-card"
    ref="cardRef"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    :class="{ hovered: isHovered }"
  >
    <div class="skill-icon">{{ skill.icon }}</div>
    <h3 class="skill-title">{{ skill.title }}</h3>
    <p class="skill-description">{{ skill.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Skill {
  icon: string
  title: string
  description: string
}

interface Props {
  skill: Skill
  index: number
}

const props = defineProps<Props>()
const cardRef = ref<HTMLElement>()
const isHovered = ref(false)

const onHover = () => {
  isHovered.value = true
}

const onLeave = () => {
  isHovered.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-in')
          }, props.index * 100)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  if (cardRef.value) {
    observer.observe(cardRef.value)
  }
})
</script>

<style scoped>
.skill-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.skill-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.skill-card.hovered {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.skill-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #e0e0e0, #bdbdbd);
  border-radius: 50%;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.skill-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 0.5rem;
}

.skill-description {
  color: #616161;
  font-size: 0.9rem;
}
</style>
