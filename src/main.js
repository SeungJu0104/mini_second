import './assets/main.css'
import './assets/mini.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './util/axios';
import util from './util/util';

createApp(App)
    .use(router)
    .provide('axios', axios)
    .provide('util', util)
    .mount('#app')
