<template>
  <div class="container">
    <h3>회원가입</h3>
    <form id="memberForm" @submit.prevent="memberRegister">
        <div class="mb-3">
          <label for="userid" class="form-label">아이디</label>
          <div class = "input-group">
          	<input type="text" class="form-control" id="userid" name="id" placeholder="아이디" v-model="registerData.id" @change="idOnChange">
            <button class="btn btn-outline-success me-2 " id="idDupChk" @click="idDupChk" type="button">중복확인</button>
          </div>
          <div v-show=""><small class="idInfo">아이디는 8~10자이며, 영문자와 숫자만 포함해야 합니다.</small></div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">비밀번호</label>
          <input type="password" class="form-control pwChk" id="password" name="password" placeholder="비밀번호" v-model="registerData.password" required>
          <input type="password" class="form-control mt-2 pwChk" id="passwordValid" placeholder="비밀번호확인" v-model="passwordChk" required>
          <div v-show="watchChk.pwRegexChk"><small class="pwInfo">비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.</small></div>
          <div v-show="!watchChk.pwInvalidChk"><small class="pwInfo">비밀번호와 비밀번호 확인이 일치하지 않습니다.</small></div>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">이름</label>
          <input type="text" class="form-control" id="name" name="name" placeholder="이름" v-model="registerData.name" required>
        </div>
        <div class="mb-3">
          <label for="handphone" class="form-label">전화번호</label>
          <input type="tel" class="form-control" id="handphone" name="phoneNumber" placeholder="010-0000-0000" maxlength="13" v-model="registerData.phoneNumber" required>
          <div v-show="watchChk.phoneRegexChk"><small class="phoneInfo">010-0000-0000 형식으로 입력해주세요.</small></div>
        </div>
        <div class="mb-3">
            <label for="post_code" class="form-label">우편번호</label>
            <input type="text" class="form-control" id="postCode" name="postCode" placeholder="우편번호" v-model="registerData.postCode" required maxlength="5">
            <div v-show="watchChk.postCodeRegexChk"><small class="postCodeInfo">우편번호는 5자리 숫자입니다.</small></div>
          </div>
        <div class="mb-3">
            <label for="address" class="form-label">주소</label>
            <input type="text" class="form-control" id="address" name="address" placeholder="주소" v-model="registerData.address" required>
        </div>
        <div class="mb-3">
            <label for="detail_address" class="form-label">상세 주소</label>
            <input type="text" class="form-control" id="detail_address" name="detailAddress" placeholder="상세 주소" v-model="registerData.detailAddress" required>
        </div>
        <div class="mb-3">
            <label for="birthdate" class="form-label">생년월일</label>
            <input type="date" class="form-control" id="birthDate" name="birthDate" :min="'1950-01-01'" :max="today" v-model="registerData.birthDate" required>
        </div>
        <div class="d-flex flex-column align-items-center gap-2 mt-4">
          <button type="submit" class="btn btn-outline-success" id="memberRegister">전송</button>
        </div>
    </form>
    <goBack/>
  </div>    
</template>

<script setup>
import {ref, reactive} from 'vue';
import {inject} from 'vue';
import goBack from '@/components/goBack.vue'

  const mr = inject('mr');
  const mic = inject('mic');
  const axios = inject('axios');
  const router = inject('router');

  const registerData = ref({});
  const passwordChk = ref('');
  const watchChk = reactive({
    idDupChk : false,
    idRegexChk : false,
    pwInvalidChk : false,
    pwRegexChk : false,
    phoneRegexChk : false,
    postCodeRegexChk : false
  });

  const loc = {
    'idLoc' : document.querySelector("#id"),
    'pwLoc' : document.querySelector("#password"),
    'phoneLoc' : document.querySelector("#phoneNumber"),
    'postCodeLoc' : document.querySelector("#postCode")
  }
  const today = new Date().toISOString().split('T')[0];

  function idDupChk() {

    if(!watchChk.idRegexChk) mic.idDupChk(registerData, watchChk)
    else alert(mr.idErrMsg.value);

  }

  function idOnChange() {
    mic.idOnChange(watchChk);
  }  

  const memberRegister = () => {

    if(!confirm("회원가입을 하시겠습니까?"));
    if(!mr.memberInputChk(loc, watchChk)) return;

    axios.axiosFetch({
      route: '/member/register',
      type: 'post',
      data: registerData.value,
      success: () => {router.push({name: 'home'});}
    });

  }

  mic.idInputChk(registerData, watchChk);
  mic.pwInputChk(registerData, passwordChk, watchChk);
  mic.phoneNoInputChk(registerData, watchChk);
  mic.postCodeInputChk(registerData, watchChk);

</script>