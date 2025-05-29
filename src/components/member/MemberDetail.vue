<template>
	<div class="container">
		<h3>내 정보</h3>
		<table class="table table-striped-columns">
			<tbody>
				<tr>
				  <td>회원 번호</td>
				  <td>{{item.memberNo}}</td>
				</tr>
				<tr>
				  <td>아이디</td>
				  <td>{{item.id}}</td>
				</tr>
				<tr>
				  <td>이름</td>
				  <td>{{item.name}}</td>
				</tr>
				<tr>
				  <td>전화번호</td>
				  <td>{{item.phoneNumber}}</td>
				</tr>
				<tr>
				  <td>우편번호</td>
				  <td>{{item.postCode}}</td>
				</tr>
				<tr>
				  <td>주소</td>
				  <td>{{item.address}}</td>
				</tr>
				<tr>
					<td>상세 주소</td>
					<td>{{item.detailAddress}}</td>
				</tr>
				<tr>
					<td>가입일</td>
					<td>{{item.createdAt}}</td>
				</tr>				  				
			  </tbody>
		</table>
		<div class="text-center my-2 boardReg">
			<button class="btn btn-outline-success me-2 login" id="updateMember" @click="sendUserData">정보수정</button>
			<button type="button" class="btn btn-outline-danger" id="memberDel" @click="deleteMember">탈퇴</button>
		</div>
	</div>    
</template>

<script setup>
import axios from 'axios';
import {ref} from 'vue';
import { userData } from '@/util/login';
import router from '@/router'

	const item = ref({});
	const uData = userData();

	axios
	.get(`/mini2/member/memberDetail/${uData.userId}`)
	.then((response) => {
		if(response.status === 200) item.value = response.data?.item;
	})
	.catch((err) => {
		(err.response.data?.msg) ? (alert(err.response.data?.msg)) : (alert('알 수 없는 오류가 발생했습니다.'));
	})

	const sendUserData = () => {
		uData.sendUserData(item);
		router.push({name : 'memberUpdateForm'});
	}

	const deleteMember = () => {

		if(!confirm('탈퇴하시겠습니까?')) return;

		axios
		.delete(`/mini2/member/memberDelete/${uData.userId}`)
		.then((response) => {
			if(response.status === 200) {
				uData.logout();
				router.push({name : 'home'})
			}
		})
		.catch((err) => {
			(err.response.data?.msg) ? (alert(err.response.data?.msg)) : (alert('알 수 없는 오류가 발생했습니다.'));
		})

	}

</script>