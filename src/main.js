import './assets/main.css'
import './assets/mini.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/'
import axios from '@/util/axios';
import mr from '@/util/MemberRegex';
import mic from '@/util/MemberInputChk'
import {titleMap, reverseTitleMap} from '@/util/mini'
import {createPinia} from 'pinia'; 

createApp(App)
    .use(router)
    .use(createPinia())
    .provide('axios', axios)
    .provide('router', router)
    .provide('mr', mr)
    .provide('mic', mic)
    .provide('titleMap', titleMap)
    .provide('reverseTitleMap', reverseTitleMap)
    .mount('#app')
