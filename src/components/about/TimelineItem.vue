<template>
  <div class="timeline-item" ref="itemRef" @mouseenter="onHover" @mouseleave="onLeave">
    <div class="timeline-dot" :class="{ hovered: isHovered }"></div>
    <div class="timeline-content" :class="contentClass">
      <h3 class="job-title">{{ job.title }}</h3>
      <p class="job-period">{{ job.period }}</p>
      <p class="job-description">{{ job.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Job {
  title: string
  period: string
  description: string
}

interface Props {
  job: Job
  index: number
}

const props = defineProps<Props>()
const itemRef = ref<HTMLElement>()
const isHovered = ref(false)

const contentClass = computed(() => {
  return props.index % 2 === 0 ? 'content-left' : 'content-right'
})

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
          }, props.index * 200)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' },
  )

  if (itemRef.value) {
    observer.observe(itemRef.value)
  }
})
</script>

<style scoped>
.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.8s ease;
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.timeline-content {
  position: relative;
  width: 45%;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.content-left {
  left: 0;
  text-align: right;
  padding-right: 3rem;
}

.content-right {
  right: 0;
  text-align: left;
  padding-left: 3rem;
  left: 55%;
}

.timeline-dot {
  position: absolute;
  left: 50%;
  top: 2rem;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #616161, #424242);
  border: 4px solid white;
  border-radius: 50%;
  transform: translateX(-50%);
  z-index: 2;
  transition: all 0.3s ease;
}

.timeline-dot.hovered {
  transform: translateX(-50%) scale(1.2);
  background: linear-gradient(135deg, #424242, #212121);
}

.job-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #212121;
  margin-bottom: 0.5rem;
}

.job-period {
  font-size: 0.9rem;
  color: #757575;
  margin-bottom: 1rem;
  font-weight: 500;
}

.job-description {
  color: #424242;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .content-left,
  .content-right {
    width: calc(100% - 80px);
    left: 80px;
    right: auto;
    text-align: left;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  .timeline-dot {
    left: 30px;
  }
}
</style>
