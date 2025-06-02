import { ref } from "vue";

const mr = {};

mr.pwRegex = ref(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/);
mr.phoneRegex = ref(/^010-\d{4}-\d{4}$/);
mr.idRegex = ref(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/);
mr.postCodeRegex = ref(/^\d{5}$/);

mr.idErrMsg = ref("아이디는 8~10자 사이이며, 영문자와 숫자만 포함해야 합니다.");
mr.pwErrMsg = ref("비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
mr.phoneErrMsg = ref("010-0000-0000 형식으로 입력해주세요.");
mr.pwInvalidErrMsg = ref("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
mr.idDupChkErrMsg = ref("아이디 중복확인을 해주세요.");
mr.postCodeErrMsg = ref("우편번호는 5자리 숫자입니다.");

mr.regex = ({ regex, val, msg }) => {
  const isInvalid = !regex.test(val);
  if (msg && isInvalid) alert(msg);
  return isInvalid;
};

mr.memberRegInputChk = ({...loc}, watchChk) => {
    if(watchChk.idRegexChk) {
    alert(mr.idErrMsg.value);
    loc?.idLoc?.focus();
    return false;
  }

  if(!watchChk.idDupChk) {
    alert(mr.idDupChkErrMsg.value);
    return false;
  }

  return mr.memberInputChk(loc, watchChk);
}

mr.memberInputChk = ({...loc}, watchChk) => {

  if(!watchChk.pwInvalidChk) {
    alert(mr.pwInvalidErrMsg.value);
    loc?.pwLoc?.focus();
    return false;
  }
  
  if(watchChk.pwRegexChk) {
    alert(mr.pwErrMsg.value);
    loc?.pwLoc?.focus();
    return false;
  }
  // 비밀번호 불일치 또는 정규식 불일치 시 전화번호 입력 칸으로 focus 수행되는 문제 디버깅하기

  if(watchChk.phoneRegexChk) {
    alert(mr.phoneErrMsg.value);
    loc?.phoneLoc?.focus();
    return false;
  }
  // 전화번호 불일치 시 해당 입력칸이 focus 되지 않는 문제 디버깅하기

  if(watchChk.postCodeRegexChk) {
    alert(mr.postCodeErrMsg.value);
    loc?.postCodeLoc?.focus();
    return false;
  }
  // 우편번호 불일치 시 해당 입력칸이 focus 되지 않는 문제 디버깅하기
  return true;
}

export default mr;