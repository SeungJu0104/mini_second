<template>
    <button class="btn btn-outline-success me-2" id="historyBack" @click="goBack">
		&#8592; 이전
	</button>
</template>

<script setup>
import {inject} from 'vue'

    const router = inject('router');

    const goBack = () => {
        router.go(-1);
    }
    
</script>