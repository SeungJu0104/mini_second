<template>
	<div class="container">
		<h3>회원 목록</h3>
		<Search ref="searchRef" @loaded="handleLoaded" @paging="handlePaging"/>
		<table class="table table-striped">
			<thead>
				<tr>
					<th>회원 번호</th>
					<th>아이디</th>
					<th>이름</th>
					<th>전화번호</th>
					<th>우편번호</th>
					<th>주소</th>
					<th>상세 주소</th>
					<th>가입일</th>
					<th>잠금</th>
					<th>권한</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="pageResponse.list?.length === 0">
					<tr>
						<td colspan="10">검색결과가 없습니다.</td>
					</tr>
				</template>
				<template v-else v-for="item in pageResponse.list" :key="item.memberNo">
					<tr>
						<td>{{ item.memberNo }}</td>
						<td>{{ item.id }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.phoneNumber }}</td>
						<td>{{ item.postCode }}</td>
						<td>{{ item.address }}</td>
						<td>{{ item.detailAddress }}</td>
						<td>{{ item.createdAt }}</td>
						<td>
							<input class="lockYn" type="checkbox" :checked="item.lockYn === 'Y'" :value="item.memberNo" @change="(e) => lockChange(e, item)" />
						</td>
						<td>{{ item.boardAuth }}</td>
					</tr>
				</template>
			</tbody>
		</table>
		<goBack/>
		<Footer :pageResponse="pageResponse" @changePage="handlePageChange"/>
	</div>
</template>

<script setup>
    import {ref, inject} from 'vue'
	import Footer from '@/components/Footer.vue'
	import Search from '@/components/Search.vue'
	import goBack from '@/components/goBack.vue'
	
	const axios = inject('axios');
	const searchRef = ref(null);

	// 서버 응답
	const pageResponse = ref({
		list: [],
		pageNo: 1,
		totalPages: 0,
		startPage: 1,
		endPage: 1,
		next: false,
		prev: false
	});

	const handlePageChange = (pageNo) => {

		if (searchRef.value?.handlePageChange) {
			searchRef.value.handlePageChange(pageNo);
		}		

	};

	const handleLoaded = (data) => {
		pageResponse.value = data;
	};

	const handlePaging = (data) => {
		pageResponse.value = data;
	};

	// 회원 잠금
	// Watcher를 사용하면 다수의 item을 동시에 감시해야하므로, 인라인을 사용하더라도 @change하는 것이 더 적절하다.
	const lockChange = async (e, item) => {

		let lockYn = (e.target.checked) ?  'Y' : 'N';

		axios.axiosFetch({
			type: 'put',
			route: '/member/lockYn',
			data: {
				lockYn: lockYn,
				memberNo: e.target.value				
			},
			success: (response) => {
				item.lockYn = lockYn;		
			},
			fail: (err) => {
				e.target.checked = !lockYn;				
			}
		});

	};

</script>