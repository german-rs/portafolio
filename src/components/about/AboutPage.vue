<template>
  <div class="about-page">
    <HeroSection />
    <TimelineSection />
    <SkillsSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './HeroSection.vue'
import TimelineSection from './TimelineSection.vue'
import SkillsSection from './SkillsSection.vue'
</script>

<style scoped>
.about-page {
  overflow-x: hidden;
}
</style>
