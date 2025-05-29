<template>
  <div class="container">
    <h3>회원 정보 수정</h3>
    <form id="updateForm" @submit.prevent="updateMember">
        <div class="mb-3">
          <label for="userid" class="form-label">아이디</label>
          <input type="text" class="form-control" id="userid" name="id" :value="updateData.id" readonly>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">비밀번호</label>
          <input type="password" class="form-control pwChk" id="password" name="password" placeholder="비밀번호" v-model="updateData.password" required>
          <input type="password" class="form-control mt-2 pwChk" id="passwordValid" placeholder="비밀번호확인" v-model="passwordChk" required>
          <small class="pwInfo" style="display : none">비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.</small>
          <small class="pwInfo2" style="display : none">비밀번호와 비밀번호 확인이 일치하지 않습니다.</small>
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">이름</label>
          <input type="text" class="form-control" id="name" name="name" v-model="updateData.name" required>
        </div>
        <div class="mb-3">
          <label for="handphone" class="form-label">전화번호</label>
          <input type="tel" class="form-control" id="handphone" name="phoneNumber" v-model="updateData.phoneNumber" required maxlength="13">
          <small class="phoneInfo" style="display : none">010-0000-0000 형식으로 입력해주세요.</small>
        </div>
        <div class="mb-3">
            <label for="post_code" class="form-label">우편번호</label>
            <input type="text" class="form-control" id="postCode" name="postCode" v-model="updateData.postCode" required maxlength="5">
        </div>
        <div class="mb-3">
            <label for="address" class="form-label">주소</label>
            <input type="text" class="form-control" id="address" name="address" v-model="updateData.address" required>
        </div>
        <div class="mb-3">
            <label for="detail_address" class="form-label">상세 주소</label>
            <input type="text" class="form-control" id="detailAddress" name="detailAddress" v-model="updateData.detailAddress" required>
        </div>
        <div class="d-flex flex-column align-items-center gap-2 mt-4">
          <button type="submit" class="btn btn-primary col-6" id="memberUpdate">수정</button>
        </div>
    </form>
  </div>    
</template>

<script setup>
import { userData } from '@/util/login';
import {ref, onMounted} from 'vue';
import router from '@/router'
import axios from 'axios'

    const updateData = ref({});
    const passwordChk = ref('');

    const updateInit = () => {
        const uData = userData();
        updateData.value = uData.shareUserData();
    }

    const updateMember = () => {

        axios
        .put('/mini2/member/memberUpdate', updateData.value)
        .then((response) => {
            if(response.status === 200) router.push({name : 'memberDetail'});
        })
        .catch((err) => {
            (err.response.data?.msg) ? (alert(err.response.data?.msg)) : (alert('알 수 없는 오류가 발생했습니다.'));
        })

    }


    
    


    onMounted(() => {
        updateInit();
    })

</script>