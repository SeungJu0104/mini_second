<template>
	<div class="container">
		<h3>게시글 상세</h3>
		<table class="table table-striped-columns">
			<tbody>
				<tr>
				  <td>게시글 번호</td>
				  <td>{{post.postNo}}</td>
				</tr>
				<tr>
				  <td>게시판 종류</td>
				  <td>{{post.boardName}}</td>
				</tr>
				<tr>
				  <td>제목</td>
				  <td>{{post.title}}</td>
				</tr>
				<tr>
				  <td>작성자</td>
				  <td>{{post.id}}</td>
				</tr>
				<tr>
				  <td>조회수</td>
				  <td>{{post.views}}</td>
				</tr>
				<tr>
				  <td>작성일</td>
				  <td>{{post.createdAt}}</td>
				</tr>
			  </tbody>
		</table>
		
		<p>내용</p>
		<div id="boardDetail_content"> {{post.content}} </div>
		<div id="boardUCBtn">
			<div class="d-flex justify-content-center gap-2 mt-4" >
				<button class="btn btn-outline-success boardDetail " @click="movePostUpdate" v-if="authPost()">수정</button>
				<button class="btn btn-outline-danger boardDetail " @click="postDelete" v-if="authPost()">삭제</button>
			</div>
		</div>
  <goBack/>
	</div>
</template>

<script setup>
import {onMounted, inject, ref} from 'vue'
import {useRoute} from 'vue-router'
import goBack from '@/components/goBack.vue'

    const route = useRoute();
    const axios = inject('axios');
    const router = inject('router');
    const reverseTitleMap = inject('reverseTitleMap');
    const post = ref({});

    const authPost = () => {
        return ((post.value.id === localStorage.getItem('userId')) || (localStorage.getItem('boardAuth') === 'Y'));
    }

    const movePostUpdate = () => {
        if(post.value.title === null || post.value.title.trim === '') alert("제목은 필수 항목입니다.");
        if(post.value.content === null || post.value.content.trim === '') alert("내용은 필수 항목입니다.");
        router.push({name : 'postUpdate', params : route.params.postNo});
    }

    const postDelete = () => {

        const password = prompt("비밀번호를 입력하세요.");

        if (!password) {
            alert("비밀번호를 입력하지 않았습니다.");
            return;
        }

        if (!(/^\d{4}$/.test(password))) {
            alert("숫자 4자리 비밀번호만 입력 가능합니다.");
            return;
        }

        post.value.password = password;
        const category = reverseTitleMap[post.value.boardName];

        axios.axiosFetch({
            type: 'post',
            route: '/board/delete',
            data: post.value,
            success: (response) => {
                alert(response.data?.msg);
                router.push({name: 'postList', params: {category}});
            }
        });
    }

    onMounted(() => {
      axios.axiosFetch({
          type: 'get',
          route: `/board/detail/${route.params.postNo}`,
          success: (response) => {

            if(route.query.view === 'true'){
              axios.axiosFetch({
                  type: 'get',
                  route: `/board/view/${route.params.postNo}`      
              });       
            }          
            post.value = response.data?.post;
          },
          fail: () => {
            router.push({name: 'home'});
          }
      });


    })
</script>