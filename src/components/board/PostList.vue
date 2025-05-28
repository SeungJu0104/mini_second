 <template>
	<div class="container">
	<!-- <h3>${pageResponse.board}</h3>
	<form name="searchForm" id="searchForm" class="d-flex align-items-center gap-2 mb-3 flex-wrap">
		<input type="hidden" name="board" id="board" :value="pageResponse.board">
		<input type="hidden" name="pageNo" id="pageNo" :value="pageResponse.pageNo">
		<input type="hidden" name="type" :value="board">
		<div class="input-group" style="width: 250px;">
			<input type="text" id="searchValue" name="searchValue" class="form-control" 
					value="${param.searchValue}" placeholder="내용을 입력해주세요.">
			<button class="btn btn-outline-success" type="submit">검색</button>
		</div>
		<select name="size" id="size" class="form-select form-select-sm w-auto" v-model="selectedSize" @change="onSizeChange">
			<option v-for="size in sizes" :key="size" :value="size"></option>
		</select>
  	</form>   -->
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
                <template v-if="pageResponse.list === null">
                    <tr>
						<td colspan="7" >검색결과가 없습니다.</td>
					</tr>
                </template>
				<template v-for="(list, index) in pageResponse">
				    <tr class="rows">
				    	<td id="postNum">{{pageResponse.totalCount - ((pageResponse.pageNo - 1) * pageResponse.size + index.count) + 1}}</td>
				        <td>{{pageResponse.list.title}}</td>
						<td>{{pageResponse.list.boardName}}</td>
				        <td>{{pageResponse.list.id}}</td>
				        <td>{{pageResponse.list.views}}</td>
				        <td>{{pageResponse.list.createdAt}}</td>
				    </tr>
				</template>
			</tbody>
		</table>
		<div class="text-start my-2 boardReg">
			<button class="btn btn-outline-success" type="button">게시글 작성</button>
		</div>
	</div>
    <Footer/>  
 </template>

 <script setup>
    import {ref, watch} from 'vue'
    import Footer from '@/components/Footer.vue'
    import axios from 'axios'

    const sizes = [10, 20, 30]
    const props = defineProps({
        currentSize: {
            default: 10
        }
    })

    const emit = defineEmits(['sizeChange'])
    function onSizeChange(){
        emit('sizeChange', selectedSize.value)
    }

    const selectedSize = ref(props.currentSize)

    watch(() => (props.currentSize), (newVal) => {
        selectedSize.value = newVal
    })
    // const BASEURI = useRoute();
    // const pageResponse = null;
    // const fetch = async () => {
    //     try{
    //         const response = axios.get(BASEURI + `/${selectedSize.value}`);
    //         if(response.status === '200') pageResponse = ref(response.data);
    //         else alert("데이터 조회 실패");
    //     } catch(error){
    //         alert("다시 시도해주세요.");
    //     }
    // }


</script>