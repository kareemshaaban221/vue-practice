// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import "vue-toastification/dist/index.css";

import router from './router';
import Toast from "vue-toastification";

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(Toast)
  .mount('#app')
