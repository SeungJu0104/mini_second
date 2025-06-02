<template>
	<div class="container">
		<Search ref="searchRef" @loaded="handleLoaded" @paging="handlePaging"/>
		<h3>{{titleMap[category]}}</h3>
		<table class="table table-striped">
			<thead>
				<tr>
					<th scope="col">번호</th>
					<th scope="col">제목</th>
					<th scope="col">게시판</th>
					<th scope="col">작성자</th>
					<th scope="col">조회수</th>
					<th scope="col">작성 일시</th>
				</tr>
			</thead>
			<tbody>
				<template v-if="pageResponse.list?.length === 0">
					<tr>
						<td colspan="7" >검색결과가 없습니다.</td>
					</tr>
				</template>
				<template v-for="(list, index) in pageResponse.list" :key="list.postNo">
					<tr class="rows" @click="movePostDetail(list.postNo)">
						<td id="postNum">{{ getPostNumber(index) }}</td>
						<td>{{list.title}}</td>
						<td>{{list.boardName}}</td>
						<td>{{list.id}}</td>
						<td>{{list.views}}</td>
						<td>{{list.createdAt}}</td>
					</tr>
				</template>
			</tbody>
		</table>
		<div class="text-start my-2 boardReg" v-if="uData.getUserInfo">
			<button class="btn btn-outline-success" type="button" @click="postWrite" v-if="authPostWrite()">게시글 작성</button>
		</div>
	</div>
    <Footer :pageResponse="pageResponse" @changePage="handlePageChange"/>  
</template>

<script setup>

import {ref, watch, inject, computed} from 'vue'
import Footer from '@/components/Footer.vue'
import {useRoute} from 'vue-router'
import Search from '@/components/Search.vue'
import { userData } from '@/util/login';

	const route = useRoute();
	const searchRef = ref(null);
	const router = inject('router');
	const titleMap = inject('titleMap');
	const uData = userData();

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

	const category = computed(() => route.params.category);
	
	const getPostNumber = (index) => {
		const totalCount = pageResponse.value.totalCount ?? 0;
		const pageNo = pageResponse.value.pageNo ?? 1;
		const size = pageResponse.value.size ?? 10;

		return totalCount - ((pageNo - 1) * size + index);
	};

	const handlePageChange = (pageNo) => {
		if (searchRef.value?.handlePageChange) {
			searchRef.value.handlePageChange(pageNo);
		}		
	}

	const handleLoaded = (data) => {
		pageResponse.value = data;
	}

	const handlePaging = (data) => {
		pageResponse.value = data;
	}

	const movePostDetail = (postNo) => {
		router.push({name: 'postDetail', params: {postNo}, query: { view: 'true' }});
	}

	const authPostWrite = () => {
		return uData.getUserInfo
	}

	const postWrite = () => {
		const board = route.params.category;
		router.push({name: 'postRegister', params: {board}});
	}

	watch(category, (newVal) => {
		if (searchRef.value?.searchData) {
			searchRef.value.searchData(); // 게시판 바뀔 때마다 Search로 다시 요청 보내서 가져온다.
		}	
	});

</script>



