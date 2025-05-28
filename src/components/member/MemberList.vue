<template>
	<div class="container">
		<h3>회원 목록</h3>
		<form id="searchForm" class="d-flex align-items-center gap-2 mb-3 flex-wrap" @submit.prevent="search">
			<input type="hidden" name="pageNo" id="pageNo" :value="form.pageNo" />
			<input type="hidden" name="type" id="type" value="member" />

			<div class="input-group" style="width: 250px;">
				<input type="text" id="searchValue" name="searchValue" class="form-control" v-model="form.searchValue" placeholder="아이디를 입력해주세요."/>
				<button class="btn btn-outline-success" type="submit">검색</button>
			</div>

			<select name="size" id="size" class="form-select form-select-sm w-auto" v-model="form.size" @change="sizeChange">
				<option v-for="option in items" :key="option" :value="option">{{ option }}</option>
			</select>
		</form>

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
				<template v-if="pageResponse.list.length === 0">
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
		<Footer :pageResponse="pageResponse" @changePage="handlePageChange"/>
	</div>
</template>

<script setup>
    import {reactive, ref, inject, onMounted, watch} from 'vue'
    import {useRouter} from 'vue-router'
    import axios from 'axios'
	import Footer from '@/components/Footer.vue'

    // 배열과 boolean 타입은 ref로 반응형 객체 만들어야한다.
    const items = ref([10, 30, 50]);
    // const lockYn = ref(false);

	// 사용자 입력용
	const form = reactive({
		searchValue: '',
		pageNo: 1,
		size: 10
	});

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

	const createDTO = () => ({
		pageNo: String(form.pageNo),
		searchValue: form.searchValue || "",
		size: String(form.size)
	});

	const paging = (dto) => {

		axios
		.post('/mini2/member/memberList', dto)
		.then((response) => {
			if (response.status === 200 && response.data?.pageResponse !== null) {
				pageResponse.value = response.data.pageResponse;
			} else {
				alert(response.data?.msg);
			}
		})
		.catch((error) => {
			alert(error.response.data?.msg);
		});

	};

	const handlePageChange = (pageNo) => {
		form.pageNo = pageNo;
		paging(createDTO());
	};

	
	const sizeChange = () => {
		form.pageNo = 1;
		paging(createDTO());
	};

	const search = () => {
		console.log(createDTO());
		axios
		.post('/mini2/member/search', createDTO())
		.then((response) => {
			if (response.status === 200 && response.data?.pageResponse !== null) {
				pageResponse.value = response.data.pageResponse;
			} else {
				alert(response.data?.msg);
			}
		})
		.catch((error) => {
			alert(error.response.data?.msg);
		});
	}

	// 회원 잠금
	// Watcher를 사용하면 다수의 item을 동시에 감시해야하므로, 인라인을 사용하더라도 @change하는 것이 더 적절하다.
	const lockChange = async (e, item) => {

		let lockYn = (e.target.checked) ?  'Y' : 'N';

		axios
		.put('/mini2/member/lockYn', {
			lockYn: lockYn,
			memberNo: e.target.value
		})
		.then((response) => {
			if (response.status === 200 && response.data?.status === 'success') item.lockYn = lockYn
			else {
				e.target.checked = !lockYn;
				alert(response.data?.msg);
			}
		})
		.catch((error) => {
			e.target.checked = !lockYn;
			alert(error.response.data?.msg);
		});

	};

	onMounted(() => {paging(createDTO())});

</script>