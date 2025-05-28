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
    import {inject} from 'vue';
    import {reactive, ref} from 'vue'

    const axios = inject('axios');
    const util = inject('util');
    const idRegex = ref(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/);
    const pwRegex = ref(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/);
    const form = reactive({id : "", password : ""})

    const login = async () => {

        if(util.regex(idRegex.value, form.id, "아이디는 8~10자 사이이며, 영문자와 숫자만 포함해야 합니다.")) return;
        if(util.regex(pwRegex.value, form.password, "비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.")) return;        

        axios.axiosFetch('/mini2/member/login', form, '/', 'null');
    }


</script>