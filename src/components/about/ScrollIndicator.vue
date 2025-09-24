<template>
  <div class="scroll-indicator">
    <div class="scroll-line"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
}

.scroll-line {
  width: 2px;
  height: 30px;
  background: #9e9e9e;
  margin: 0 auto;
  border-radius: 2px;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}
</style>
