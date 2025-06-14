import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/components/board/Home.vue'
import PostList from '@/components/board/PostList.vue'
import Login from '@/components/member/Login.vue'
import MemberRegisterForm from '@/components/member/MemberRegisterForm.vue'
import MemberList from '@/components/member/MemberList.vue'
import MemberUpdateForm from '@/components/member/MemberUpdateForm.vue'
import MemberDetail from '@/components/member/MemberDetail.vue'
import PostDetail from '@/components/board/PostDetail.vue'
import PostUpdate from '@/components/board/PostUpdate.vue'
import PostRegister from '@/components/board/PostRegister.vue'

const router = createRouter({
    history : createWebHistory(),
    routes : [
        // 게시판
        {path: '/', name: 'home', component: Home},
        {path: '/board/:category', name: 'postList', component: PostList},
        {path: '/board/detail/:postNo', name: 'postDetail', component: PostDetail },
        {path: '/board/update/:postNo', name: 'postUpdate', component: PostUpdate },
        {path: '/board/register/:board', name: 'postRegister', component: PostRegister },

        // 회원
        {path: '/member/login', name: 'login', component: Login},
        {path: '/member/registerForm', name: 'memberRegisterForm', component: MemberRegisterForm},
        {path: '/member/updateForm', name: 'memberUpdateForm', component: MemberUpdateForm},
        {path: '/member/memberList', name: 'memberList', component: MemberList},
        {path: '/member/memberDetail', name : 'memberDetail', component : MemberDetail}

    ]
})

export default router;