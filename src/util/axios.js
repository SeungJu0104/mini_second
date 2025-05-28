// src/plugins/axios.js
import axios from 'axios';
import router from '../router';

const instance = axios.create({
  baseURL: '/mini2', // 필요한 경우 환경변수로 처리 가능
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.axiosFetch = async (route, data, successRedirect, failRedirect) => {

    axios
    .post(route, data)
    .then((response) => {
        alert("a");
        if(response?.status === 200 && response?.data?.status === "success") router.push(successRedirect);
        else alert("잘못된 접근입니다.");
    })
    .catch((err) => {
        (err.response?.data?.msg) ? (alert(err.response?.data?.msg)) : (alert('알 수 없는 오류가 발생했습니다.'));
        if(failRedirect !== "null") router.push(failRedirect);
    })

}

export default instance;
