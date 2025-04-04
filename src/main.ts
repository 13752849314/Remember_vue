import {createApp} from 'vue'
import './style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// @ts-ignore
import App from './App.vue'
import router from "./router";

const pinia = createPinia().use(piniaPluginPersistedstate)
createApp(App)
    .use(ElementPlus)
    .use(router)
    .use(pinia)
    .mount('#app')
