<template>
  <div style="padding: 20px; max-width: 600px; margin: 0 auto">
    <h2>Prueba Gemini AI</h2>

    <div style="margin-bottom: 15px">
      <input
        v-model="prompt"
        type="text"
        placeholder="Escribe tu pregunta aquí..."
        style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px"
        @keyup.enter="testGemini"
      />
    </div>

    <div style="margin-bottom: 15px">
      <button
        @click="testGemini"
        :disabled="isLoading || !prompt.trim()"
        style="
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        "
      >
        {{ isLoading ? 'Generando...' : 'Enviar' }}
      </button>
    </div>

    <div v-if="response" style="margin-top: 20px">
      <h3>Respuesta:</h3>
      <div
        style="
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #007bff;
        "
      >
        {{ response }}
      </div>
    </div>

    <div v-if="error" style="margin-top: 20px">
      <h3 style="color: #dc3545">Error:</h3>
      <div
        style="
          background: #f8d7da;
          padding: 15px;
          border-radius: 5px;
          border-left: 4px solid #dc3545;
          color: #721c24;
        "
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { geminiService } from '@/services/gemini'

// Estado reactivo
const prompt = ref('Explica cómo funciona la IA en pocas palabras')
const response = ref('')
const error = ref('')
const isLoading = ref(false)

// Función para probar Gemini
const testGemini = async () => {
  if (!prompt.value.trim()) return

  isLoading.value = true
  response.value = ''
  error.value = ''

  try {
    const result = await geminiService.generateContent(prompt.value)

    if (result.success) {
      response.value = result.text
      console.log('Respuesta:', result.text)
    } else {
      error.value = result.error || 'Error desconocido'
      console.error('Error:', result.error)
    }
  } catch (err) {
    error.value = 'Error de conexión'
    console.error('Error de conexión:', err)
  } finally {
    isLoading.value = false
  }
}
</script>
