<template>
    <form id="searchForm" class="d-flex align-items-center gap-2 mb-3 flex-wrap" @submit.prevent="searchData">
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
</template>

<script setup>
import {reactive, ref, onMounted, nextTick, inject} from 'vue'
import {useRoute} from 'vue-router'

    const route = useRoute();
    const axios = inject('axios');
    const baseRoute = '/' + route.path.split('/')[1];

    // 배열과 boolean 타입은 ref로 반응형 객체 만들어야한다.
    const items = ref([10, 30, 50]);    

	const form = reactive({
		searchValue: '',
		pageNo: 1,
		size: 10
	});

	const pageResponse = ref({
		list: [],
		pageNo: 1,
		totalPages: 0,
		startPage: 1,
		endPage: 1,
		next: false,
		prev: false
	});

    const emit = defineEmits(['loaded', 'paging']);

    const createDTO = () => ({
		pageNo: String(form.pageNo),
		searchValue: form.searchValue || "", // form.searchValue가 falsy(null, false 등)한 값이면 "" 사용
		size: String(form.size)
	});

	const sizeChange = () => {
		form.pageNo = 1;
		paging(createDTO());
	};

    const routeSetting = () => {
        let axiosRoute = null;

        if(baseRoute === '/member') axiosRoute = `${baseRoute}/search`
        else axiosRoute = `${route.path}/search?searchValue=${form.searchValue}`;

        return axiosRoute;
    }

	const search = () => {
		axios.axiosFetch({
			type: 'post',
			route: routeSetting(),
			data: createDTO(),
			success: (response) => {

				if (response.data?.pageResponse !== null) {
					pageResponse.value = response.data.pageResponse;
                    emit('loaded', pageResponse.value);
				}	

			}
		});		

	}

	const paging = () => {

		axios.axiosFetch({
			type: 'post',
			route: routeSetting(),
			data: createDTO(),
			success: (response) => {

				if (response.data?.pageResponse !== null) {
					pageResponse.value = response.data.pageResponse;
                    emit('paging', pageResponse.value);
				}	

			}
		});

	};
    
    const handlePageChange = (pageNo) => {
        form.pageNo = pageNo;
        paging(createDTO());
    }    

    const searchData = () => {
		form.pageNo = 1;
        search();
	};
    
    defineExpose({ handlePageChange, searchData });

    onMounted(() => {
        nextTick(() => {
            searchData();
        });
    });

</script>