declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // const component: DefineComponent<{}, {}, any>
  const Component: ReturnType<typeof defineComponent>
  export default component
}
