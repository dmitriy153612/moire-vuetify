import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'

const vuetify = createVuetify()

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
