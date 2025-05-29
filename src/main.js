import './assets/main.css'
import './assets/mini.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from './util/axios';
import util from './util/util';
import {createPinia} from 'pinia'; 

createApp(App)
    .use(router)
    .use(createPinia())
    .provide('axios', axios)
    .provide('util', util)
    .mount('#app')
