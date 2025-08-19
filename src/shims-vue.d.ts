/**
 * Este código es un archivo de declaración de tipos
 * para que TypeScript entienda qué es un archivo .vue
 * en el proyecto.
 */

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

/**
 * Este código le dice explícitamente a TypeScript dónde
 * encontrar las declaraciones de vuex.
 */

declare module 'vuex' {
  export * from 'vuex/types/index.d.ts'
}
