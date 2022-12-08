import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import lazyload from "@/directives/lazyload"
import "@/styles/colors.css";

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.directive('lazyload', lazyload)

app.mount('#app')
