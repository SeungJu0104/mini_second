<template>
	<div class="container">
        <h3>로그인</h3>
        <form id="loginForm" @submit.prevent="login">
            <div class="form-group">
                <label for="login_id" class="col-form-label">아이디</label>
                <input type="text" id="login_id" name="id" class="form-control" v-model="loginVal.id" required>
            </div>           
            <div class="form-group">
                <label for="login_password" class="col-form-label">비밀번호</label>
                <input type="password" id="login_password" name="password" class="form-control" v-model="loginVal.password" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-outline-success col-3" id="login">로그인</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { userData } from '@/util/login';
import {inject} from 'vue';
import {reactive, ref} from 'vue'

    const axios = inject('axios');
    const mr = inject('mr');
    const router = inject('router');
    const loginVal = reactive({id : "", password : ""})
    const uData = userData();

    const login = async () => {

        if(mr.regex({regex: mr.idRegex.value, val: loginVal.id, msg: mr.idErrMsg.value})) return;
        if(mr.regex({regex: mr.pwRegex.value, val: loginVal.password, msg: mr.pwErrMsg.value})) return;        

        axios.axiosFetch({
            type: 'post',
            route: '/member/login',
            data: loginVal,
            success: (response) => {
                uData.login(response.data?.userId, response.data?.boardAuth, response.data?.lockYn);
                router.push({name : 'home'});
            }           
        });

    }


</script>