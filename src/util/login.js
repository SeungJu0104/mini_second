import router from '@/router';
import {defineStore} from 'pinia';
import {computed, ref} from 'vue';

export const userData = defineStore("userData", () => {
    
    const userId = ref(localStorage.getItem('userId'));
    const boardAuth = ref(localStorage.getItem('boardAuth'));
    const lockYn = ref(localStorage.getItem('lockYn'));
    const userData = ref({});

    const login = (id, auth, yn) => {

        userId.value = id;
        boardAuth.value = auth;
        lockYn.value = yn;

        localStorage.setItem('userId', userId.value);
        localStorage.setItem('boardAuth', boardAuth.value);
        localStorage.setItem('lockYn', lockYn.value);

    }

    const logout = () => {

        userId.value = null;
        boardAuth.value = null;

        localStorage.removeItem('userId');
        localStorage.removeItem('boardAuth');
        localStorage.removeItem('lockYn');

        router.push('/');

    }

    const getUserInfo = computed(() => {
        return (userId.value) ? true : false;
	})

	const checkAuth = computed(() => {
		return (boardAuth.value === 'Y') ? true : false;
	})

    const sendUserData = (forUpdateData) => {
        userData.value = forUpdateData.value;
    }

    const shareUserData = () => {
        return userData.value;
    }

    return {userId, boardAuth, lockYn, login, logout, getUserInfo, checkAuth, sendUserData, shareUserData};
})