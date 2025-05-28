<template>
    <nav class="page_navigation" aria-label="page_navigation">
        <ul class="pagination" id="page-items">
            <template v-if="pageResponse.prev">
                <li class="page-item">
                    <button class="page-link" aria-label="Previous" @click="goToPage(start - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
            </template>
            <li class="page-item" v-for="pageNum in paging" :key="pageNum">
                <button class="page-link" @click="goToPage(pageNum)">
                    <template v-if="Number(pageNum) === Number(pageResponse.pageNo)">
                        <b>{{ pageNum }}</b>
                    </template>
                    <template v-else>
                        {{ pageNum }}
                    </template>
                </button>
            </li>
            <template v-if="pageResponse.next">
                <li class="page-item">
                    <button class="page-link" aria-label="Next" @click="goToPage(end + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </template>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue';

    const props = defineProps({
        pageResponse : Object
    });
   
    const start = computed(() => props.pageResponse?.startPage ?? 1);
    const end = computed(() => props.pageResponse?.endPage ?? 1);

    const paging = computed(() => {
        const range = [];

        for (let i = start.value; i <= end.value; i++) {
            range.push(i);
        }

        return range; // paging 자체가 배열. paging.range 아니다.
    });

    const emit = defineEmits(['changePage']);

    const goToPage = pageNo => {
        emit('changePage', pageNo);
    }
    
</script>