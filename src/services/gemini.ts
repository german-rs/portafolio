// Interfaz para las opciones de generación
interface GenerateOptions {
  model?: string
  temperature?: number
  maxTokens?: number
}

// Interfaz para la respuesta
interface GeminiResponse {
  text: string
  success: boolean
  error?: string
}

// Interfaz para la respuesta de la API de Gemini
interface GeminiApiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string
      }>
    }
  }>
}

class GeminiService {
  private readonly apiKey: string
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta'
  private readonly defaultModel = 'gemini-2.5-flash'

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!this.apiKey) {
      console.error('VITE_GEMINI_API_KEY no está configurada')
    }
  }

  /**
   * Genera contenido usando la API REST de Gemini
   * @param prompt - El texto de entrada para generar contenido
   * @param options - Opciones adicionales para la generación
   * @returns Promise con la respuesta de Gemini
   */
  async generateContent(prompt: string, options: GenerateOptions = {}): Promise<GeminiResponse> {
    try {
      // Validar que existe la API key
      if (!this.apiKey) {
        throw new Error('VITE_GEMINI_API_KEY no está configurada')
      }

      const model = options.model || this.defaultModel
      const url = `${this.baseUrl}/models/${model}:generateContent`

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 2048,
        },
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-goog-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          `HTTP ${response.status}: ${errorData.error?.message || response.statusText}`,
        )
      }

      const data: GeminiApiResponse = await response.json()

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No se generó contenido')
      }

      const text = data.candidates[0]?.content?.parts?.[0]?.text || ''

      return {
        text,
        success: true,
      }
    } catch (error) {
      console.error('Error al generar contenido con Gemini:', error)

      return {
        text: '',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }
    }
  }

  /**
   * Genera una conversación continua (chat)
   * @param messages - Array de mensajes de la conversación
   * @param options - Opciones adicionales
   * @returns Promise con la respuesta de Gemini
   */
  async generateChat(
    messages: Array<{ role: 'user' | 'model'; parts: string }>,
    options: GenerateOptions = {},
  ): Promise<GeminiResponse> {
    try {
      if (!this.apiKey) {
        throw new Error('VITE_GEMINI_API_KEY no está configurada')
      }

      const model = options.model || this.defaultModel
      const url = `${this.baseUrl}/models/${model}:generateContent`

      // Convertir mensajes al formato de la API
      const contents = messages.map((message) => ({
        role: message.role === 'model' ? 'model' : 'user',
        parts: [
          {
            text: message.parts,
          },
        ],
      }))

      const requestBody = {
        contents,
        generationConfig: {
          temperature: options.temperature || 0.7,
          maxOutputTokens: options.maxTokens || 2048,
        },
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'x-goog-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
          `HTTP ${response.status}: ${errorData.error?.message || response.statusText}`,
        )
      }

      const data: GeminiApiResponse = await response.json()

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No se generó contenido')
      }

      const text = data.candidates[0]?.content?.parts?.[0]?.text || ''

      return {
        text,
        success: true,
      }
    } catch (error) {
      console.error('Error al generar chat con Gemini:', error)

      return {
        text: '',
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }
    }
  }

  /**
   * Verifica si la API key está configurada correctamente
   * @returns boolean indicando si la configuración es válida
   */
  isConfigured(): boolean {
    return !!this.apiKey
  }

  /**
   * Prueba la conexión con la API
   * @returns Promise<boolean> indicando si la API responde correctamente
   */
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.generateContent('Test', { maxTokens: 10 })
      return result.success
    } catch {
      return false
    }
  }
}

// Exportar una instancia singleton del servicio
export const geminiService = new GeminiService()

// Exportar también la clase para casos de uso específicos
export default GeminiService
