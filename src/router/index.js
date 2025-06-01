import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/board/Home.vue'
import PostList from '@/components/board/PostList.vue'
import Login from '@/components/member/Login.vue'
import MemberRegisterForm from '@/components/member/MemberRegisterForm.vue'
import MemberList from '@/components/member/MemberList.vue'
import MemberUpdateForm from '@/components/member/MemberUpdateForm.vue'
import MemberDetail from '@/components/member/MemberDetail.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        {path: '/', name: 'home', component: Home},
        {path: '/board/:category', name: 'postList', component: PostList},
        {path: '/member/login', name: 'login', component: Login},
        {path: '/member/registerForm', name: 'memberRegisterForm', component: MemberRegisterForm},
        {path: '/member/updateForm', name: 'memberUpdateForm', component: MemberUpdateForm},
        {path: '/member/memberList', name: 'memberList', component: MemberList},
        {path: '/member/memberDetail', name : 'memberDetail', component : MemberDetail}
    ]
})

export default router;