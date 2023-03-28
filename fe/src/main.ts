import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Toast, Dialog, Loading, RadioGroup, Radio } from 'vant'

const app = createApp(App)

app.use(router)
app.use(store)

app.use(Toast)
app.use(Dialog)
app.use(Loading)
app.use(RadioGroup)
app.use(Radio)

app.mount('#app')
