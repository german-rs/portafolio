<!--
  MessagesContainer.vue

  Contenedor de la lista de mensajes. Responsabilidades:
    - Renderizar MessageItem por cada mensaje
    - Mostrar WelcomeMessage cuando no hay mensajes
    - Mostrar TypingIndicator cuando isLoading === true
    - Control de scroll: auto-scroll condicional y emitir load-more
    - Exponer método scrollToBottom() para el padre

  Props:
    - messages: Array de mensajes (ChatMessage[])
    - isLoading?: boolean
    - autoScroll?: boolean (default true)

  Emits:
    - load-more  -> cuando el usuario hace scroll al tope superior

  NOTAS:
    - Este componente **no** transforma la data de mensajes (solo la muestra).
    - No asume que los mensajes tengan `id`; usa el índice como key (como pediste).

  @author Germán
  @version 1.0.0
-->

<template>
  <div ref="container" class="messages-container" role="log" aria-live="polite" @scroll="onScroll">
    <!-- Welcome cuando no hay mensajes -->
    <WelcomeMessage v-if="messages.length === 0" />

    <!-- Lista de mensajes -->
    <MessageItem v-for="(message, index) in messages" :key="index" :message="message" />

    <!-- Indicador de escritura al final -->
    <TypingIndicator v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount, toRefs, withDefaults } from 'vue'
import MessageItem from './messages/MessageItem.vue'
import WelcomeMessage from './messages/WelcomeMessage.vue'
import TypingIndicator from './messages/TypingIndicator.vue'

// Props
const props = withDefaults(
  defineProps<{
    messages: Array<{ role: 'user' | 'model'; parts: string; timestamp: string | Date }>
    isLoading?: boolean
    autoScroll?: boolean
  }>(),
  { isLoading: false, autoScroll: true },
)

const { messages, isLoading, autoScroll } = toRefs(props)

// Emits
const emit = defineEmits<{
  (e: 'load-more'): void
}>()

// Referencia al contenedor con scroll
const container = ref<HTMLElement | null>(null)

// Threshold en px para detectar "pegado al fondo" o top
const BOTTOM_THRESHOLD = 80
const TOP_THRESHOLD = 60

// Estado interno para saber si el usuario está mirando arriba (pausar auto-scroll)
let userScrolledUp = false

// Throttle simple para el handler de scroll (para no ejecutar lógica en cada pixel)
let scrollThrottleTimer: number | null = null
function onScroll() {
  if (!container.value) return

  // throttle
  if (scrollThrottleTimer !== null) return
  scrollThrottleTimer = window.setTimeout(() => {
    scrollThrottleTimer && clearTimeout(scrollThrottleTimer)
    scrollThrottleTimer = null

    const el = container.value!
    const scrollTop = el.scrollTop
    const clientHeight = el.clientHeight
    const scrollHeight = el.scrollHeight

    // detectar si el usuario no está pegado al fondo
    userScrolledUp = scrollTop + clientHeight < scrollHeight - BOTTOM_THRESHOLD

    // detectar tope superior para paginación
    if (scrollTop <= TOP_THRESHOLD) {
      emit('load-more')
    }
  }, 120)
}

// Método: scrollToBottom
async function scrollToBottom() {
  await nextTick()
  const el = container.value
  if (!el) return
  el.scrollTop = el.scrollHeight
}

// Exponer método al padre
defineExpose({ scrollToBottom })

// Cuando llegan nuevos mensajes, hacer auto-scroll condicional
watch(
  () => messages.value.length,
  async (newLen, oldLen) => {
    // si no hay cambio o autoScroll está desactivado, no hacer nada
    if (!autoScroll.value) return

    // si antes había menos mensajes y ahora más, es una nueva inserción
    if (newLen > oldLen) {
      // si el usuario no ha scrolleado arriba, forzamos scroll
      if (!userScrolledUp) {
        await scrollToBottom()
      }
    }
  },
)

// Asegurarnos de posicionar al fondo al montar (si hay mensajes y autoScroll)
onMounted(async () => {
  if (autoScroll.value && messages.value.length > 0) {
    await nextTick()
    await scrollToBottom()
  }
})

onBeforeUnmount(() => {
  if (scrollThrottleTimer) {
    clearTimeout(scrollThrottleTimer)
    scrollThrottleTimer = null
  }
})
</script>

<style scoped>
.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* Si necesitas ajustar el espacio entre mensajes, modifícalo aquí */
.messages-container .message {
  margin-bottom: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .messages-container {
    padding: 16px;
  }
}
</style>
