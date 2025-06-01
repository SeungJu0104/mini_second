// src/plugins/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/mini2', // 필요한 경우 환경변수로 처리 가능
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.axiosFetch = async ({type, ...redirect}) => {

    instance
    [type](redirect.route, redirect?.data) 
    /* 
    []로 동적으로 메소드 호출([]안에 있는 것을 key로 value를 호출.)
    만약에 그냥 type 쓰면 인식못한다. 
    여기서는 type을 axios의 전송방식에 type이 없으니 에러가 나지만
    다른 경우에 우리는 일반적으로 (redirect.)type해서 value를 가져올거라 생각하지만 실제로 그렇게 동작하지는 않는다. 
    */
    .then((response) => {
      if(response.status === 200) redirect.success?.(response);
    })
    .catch((err) => {
      console.log(err);
      (err.response?.data?.msg) ? (alert(err.response?.data?.msg)) : (alert("실행 중 오류가 발생했습니다. 다시 시도해주세요."));
      redirect.fail?.();
    })

}

export default instance;
