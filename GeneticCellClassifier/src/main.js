import { createApp, onMounted } from 'vue'
import { createPinia } from 'pinia'

import FileHandler from './FileHandler.vue';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(onMounted);
app.component("file-handler", FileHandler);

app.mount('#app')
