import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入英文语言包

import { Toast, Dialog, Loading, RadioGroup, Radio, Form, Field, CellGroup,Locale } from 'vant'
import enUS from 'vant/es/locale/lang/en-US';
import 'vant/lib/index.css';
Locale.use('en-US', enUS);
const app = createApp(App)

app.use(router)
app.use(store)

app.use(Toast)
app.use(Dialog)
app.use(Loading)
app.use(RadioGroup)
app.use(Radio)
app.use(Form);
app.use(Field);
app.use(CellGroup);
app.mount('#app')
