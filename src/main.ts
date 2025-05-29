import { createApp } from 'vue'
import App from './App.vue'
import { install as VarletUI } from '@varlet/ui'
import '@varlet/ui/es/style'

const app = createApp(App)
// Register Varlet UI components globally
app.use(VarletUI)
// Mount the Vue app
app.mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
