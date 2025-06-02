<template>
  <div class="container">
    <h3>게시글 등록</h3>
    <form @submit.prevent="postRegister" id="postRegister">
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          v-model="post.title"
          type="text"
          class="form-control"
          id="boardTitle"
          name="title"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <div class="mb-3">
        <label for="board" class="form-label">게시판</label>
        <select
          v-model="post.boardName"
          class="form-select form-select-sm"
          id="boardSelect"
          name="board"
          required
        >
          <option disabled value="">게시판을 선택하세요</option>
          <option v-for="(label, key) in titleMap" :key="key" :value="key">
            {{ label }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          v-model="post.content"
          class="form-control"
          id="boardContent"
          name="content"
          rows="10"
          placeholder="내용을 입력하세요"
          required
        ></textarea>
      </div>

      <div class="mb-3 row align-items-center">
        <label for="postPassword" class="col-auto col-form-label">게시물 비밀번호</label>
        <div class="col-auto">
          <input
            v-model="post.password"
            type="password"
            id="postPassword"
            name="password"
            class="form-control"
            maxlength="4"
            required
          />
        </div>
        <div class="col-auto">
          <span class="form-text">비밀번호는 숫자 4자리입니다.</span>
        </div>
      </div>
      <div class="d-flex flex-column align-items-center gap-2 mt-4">
        <button type="submit" class="btn btn-outline-success">게시글 등록</button>
      </div>
    </form>
    <goBack/>
  </div>
</template>

<script setup>
import { ref, inject, reactive } from 'vue'
import { useRoute } from 'vue-router'
import goBack from '@/components/goBack.vue'

    const route = useRoute();
    const titleMap = inject('titleMap');
    const axios = inject('axios');
    const router = inject('router');
    const post = reactive({
        boardName: route.params.board || '',
        title: '',
        content: '',
        password: '',
        id: localStorage.getItem('userId')
    })

    const postRegister = () => {

        if(post.title === null || post.title.trim() === '') alert("제목은 필수항목입니다.");
        if(post.content === null || post.content.trim() === '') alert("내용은 필수 항목입니다.");

        if (!/^\d{4}$/.test(post.password)) {
            alert('비밀번호는 숫자 4자리여야 합니다.');
            return;
        }

        const category = post.boardName;
        post.boardName = titleMap[category];

        axios.axiosFetch({
            type: 'post',
            route: '/board/register',
            data: post,
            success: (response) => {
                alert(response.data?.msg);
                router.push({name: 'postList', params: { category: category }});
            }
        });
        
    }

</script>