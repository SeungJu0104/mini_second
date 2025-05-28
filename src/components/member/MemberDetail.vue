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
			<button class="btn btn-outline-success me-2 login" id="updateMember"><router-link class="route" to="/member/UpdateForm">정보수정</router-link></button>
			<button type="button" class="btn btn-outline-danger" id="memberDel">탈퇴</button>
		</div>
	</div>    
</template>

<script setup>
import axios from 'axios';

	const item = ref({});

	axios('/mini2/member/memberDetail')
	.then((response) => {
		if(response.status === 200 && response.data?.status === 'success') item.value = response.data?.item;

	})
</script>