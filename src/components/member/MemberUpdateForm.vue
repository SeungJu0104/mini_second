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
          <input type="password" class="form-control pwChk" id="password" name="password" placeholder="비밀번호" v-model="updateData.password" min-length="8" max-length="12" required>
          <input type="password" class="form-control mt-2 pwChk" id="passwordValid" placeholder="비밀번호확인" min-length="8" max-length="12" v-model="passwordChk" required>          
          <div v-show="watchChk.pwRegexChk"><small class="pwInfo">비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.</small></div>
          <div v-show="!watchChk.pwInvalidChk"><small class="pwInfo">비밀번호와 비밀번호 확인이 일치하지 않습니다.</small></div>
          <!--template은 실제 렌더링시 제거되므로, template에 v-show를 붙이면 제거되어 동작하지 않는다.-->
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">이름</label>
          <input type="text" class="form-control" id="name" name="name" v-model="updateData.name" required>
        </div>
        <div class="mb-3">
          <label for="handphone" class="form-label">전화번호</label>
          <input type="tel" class="form-control" id="handphone" name="phoneNumber" v-model="updateData.phoneNumber" required maxlength="13">
          <!--비밀번호 불일치시 왜 phone이 focus 되는지 디버깅하기-->   
          <div v-show="watchChk.phoneRegexChk"><small class="phoneInfo">010-0000-0000 형식으로 입력해주세요.</small></div>             
        </div>
        <div class="mb-3">
            <label for="post_code" class="form-label">우편번호</label>
            <input type="text" class="form-control" id="postCode" name="postCode" v-model="updateData.postCode" required maxlength="5">
            <div v-show="watchChk.postCodeRegexChk"><small class="postCodeInfo">우편번호는 5자리 숫자입니다.</small></div>
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
    <goBack/>
  </div>    
</template>

<script setup>
import { userData } from '@/util/login';
import {ref, onMounted, reactive} from 'vue';
import {inject} from 'vue';
import goBack from '@/components/goBack.vue'

  const mr = inject('mr');
  const mic = inject('mic');
  const axios = inject('axios');
  const router = inject('router');

  const updateData = ref({});
  const passwordChk = ref('');
  const watchChk = reactive({
    pwInvalidChk : false,
    pwRegexChk : false,
    phoneRegexChk : false,
    postCodeRegexChk : false
  });
  const loc = {
    'pwLoc': document.querySelector('#password'), 
    'phoneLoc': document.querySelector('#handphone'),
    'postCodeLoc' : document.querySelector("#postCodeLoc")
  }

  const updateInit = () => {
      const uData = userData();
      updateData.value = uData.shareUserData();
  }

  const updateMember = () => {

    if(!confirm("수정하시겠습니까?")) return;

    if(!mr.memberInputChk(loc, watchChk)) return;

    axios.axiosFetch({
      type: 'put',
      route: '/member/update',
      data: updateData.value,
      success: (response) => {
        router.push({name : 'memberDetail'});
      } 
    });

  }

  mic.pwInputChk(updateData, passwordChk, watchChk);
  mic.phoneNoInputChk(updateData, watchChk);
  mic.postCodeInputChk(updateData, watchChk);

  onMounted(() => {
      updateInit();
  })

</script>