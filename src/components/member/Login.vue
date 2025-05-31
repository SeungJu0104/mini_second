<template>
	<div class="container">
        <h3>로그인</h3>
        <form id="loginForm" @submit.prevent="login">
            <div class="form-group">
                <label for="login_id" class="col-form-label">아이디</label>
                <input type="text" id="login_id" name="id" class="form-control" v-model="form.id" required>
            </div>           
            <div class="form-group">
                <label for="login_password" class="col-form-label">비밀번호</label>
                <input type="password" id="login_password" name="password" class="form-control" v-model="form.password" required>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-outline-success col-3" id="login">로그인</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import router from '@/router';
import { userData } from '@/util/login';
import axios from 'axios';
    import {inject} from 'vue';
    import {reactive, ref} from 'vue'

    // const axios2 = inject('axios');
    const util = inject('util');
    const form = reactive({id : "", password : ""})
    const uData = userData();

    const login = async () => {

        if(util.regex({regex: util.idRegex.value, val: form.id, msg: util.idErrMsg.value})) return;
        if(util.regex({regex: util.pwRegex.value, val: form.password, msg: util.pwErrMsg.value})) return;        

        // axios2.axiosFetch('/mini2/member/login', form, '/', 'null');

        axios
        .post('/mini2/member/login', form)
        .then((response) => {
            if(response.status === 200) {
                uData.login(response.data?.userId, response.data?.boardAuth, response.data?.lockYn);
                router.push({name : 'home'});
            }
        })
        .catch((err) => {
            (err.response.data?.msg) ? (alert(err.response.data?.msg)) : (alert('알 수 없는 오류가 발생했습니다.'));
        })

    }


</script>