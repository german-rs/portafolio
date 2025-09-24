<template>
  <div class="profile-image" @mouseenter="onHover" @mouseleave="onLeave">
    <div class="shine" :class="{ active: isHovered }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isHovered = ref(false)

const onHover = () => {
  isHovered.value = true
}

const onLeave = () => {
  setTimeout(() => {
    isHovered.value = false
  }, 600)
}
</script>

<style scoped>
.profile-image {
  width: 100%;
  max-width: 400px;
  height: 500px;
  background: linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.profile-image:hover {
  transform: translateY(-10px);
}

.shine {
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
}

.shine.active {
  transform: translateX(100%);
}
</style>
