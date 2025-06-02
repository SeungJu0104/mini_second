import { watch } from 'vue';
import mr from '@/util/MemberRegex'
import axios from '@/util/axios'

const mic = {}

mic.pwInputChk = (data, passwordChk, watchChk) => {
  watch(
    [() => data.value.password, () => passwordChk.value],
    ([newPw1, newPw2]) => {
      watchChk.pwInvalidChk = (newPw1 === newPw2);
      watchChk.pwRegexChk = (
        mr.regex({ regex: mr.pwRegex.value, val: newPw1 }) || mr.regex({ regex: mr.pwRegex.value, val: newPw2 })
      );
    }
  );
};

mic.phoneNoInputChk = (data, watchChk) => {
    watch(
      () => data.value.phoneNumber, 
      (newPhoneNumber) => {
        watchChk.phoneRegexChk = mr.regex({regex: mr.phoneRegex.value, val: newPhoneNumber});
      }, 
      {deep : true}
    );    
};

mic.idInputChk = (data, watchChk) => {
    watch(
        () => data.value.id,
        (newId) => {
            watchChk.idRegexChk = mr.regex({regex: mr.idRegex.value, val: newId});
        },
        {deep : true}
    );
};

mic.postCodeInputChk = (data, watchChk) => {
  watch(
    () => data.value.postCode,
    (newPostCode) => {
      watchChk.postCodeRegexChk = mr.regex({regex: mr.postCodeRegex.value, val: newPostCode});
    },
    {deep: true}
  );
};

mic.idOnChange = (watchChk) => {
  watchChk.idDupChk = false;
}

mic.idDupChk = (registerData, watchChk) => {

  const redirect = {
    type: 'get',
    route: `/member/idDupChk/${registerData.value.id}`,
    success: (response) => {
      alert(response.data?.msg);
      watchChk.idDupChk = true;
    },
    fail: () => {
      watchChk.idDupChk = false;
    }
  };

  axios.axiosFetch(redirect);

};


export default mic;

