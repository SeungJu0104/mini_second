<template>
	<div class="container">
		<h3>게시글 수정</h3>
		<form id="updatePost" @submit.prevent="postUpdate">
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
                    <td><input name="title" id="postTitle" v-model="post.title" required></td>
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
            <div class="mb-3">
                <label for="postContent" class="form-label">내용</label>
                <textarea class="form-control" rows="10" id="postContent" name="content" v-model="post.content" required></textarea>
            </div>
            <div class="d-flex flex-column align-items-center gap-2 mt-4">
                <button class="btn btn-outline-success" type="submit">수정</button>
            </div>
		</form>
        <goBack/>
	</div>
</template>

<script setup>
import {onMounted, inject, ref} from 'vue'
import {useRoute} from 'vue-router'
import router from '@/router'
import goBack from '@/components/goBack.vue'

    const axios = inject('axios');
    const post = ref({});
    const route = useRoute();
    const reverseTitleMap = inject('reverseTitleMap');

    const category = reverseTitleMap[post.value.boardName];

    const postUpdate = () => {
        axios.axiosFetch({
            type: 'put',
            route: `/board/update`,
            data: post.value,
            success: (response) => {
                router.push({name: 'postDetail', params: route.params.postNo});
            },
            fail: () => {
                router.push({name: 'postDetail', params: route.params.postNo});
            }    
        });        
    }

    onMounted(() => {
        axios.axiosFetch({
            type: 'get',
            route: `/board/detail/${route.params.postNo}`,
            success: (response) => {
                post.value = response.data?.post;
            },
            fail: () => {
                router.push({name: 'postList', params: {category}});
            }       
        });
    });

</script>