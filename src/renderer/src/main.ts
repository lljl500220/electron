import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import 'default-passive-events'
import {createPinia} from "pinia";

const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.use(createPinia)
app.mount('#app')
