import { ref } from "vue";

const util = {};

util.pwRegex = ref(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/);
util.phoneRegex = ref( /^010-\d{4}-\d{4}$/);
util.idRegex = ref(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,10}$/);

util.idErrMsg = ref("아이디는 8~10자 사이이며, 영문자와 숫자만 포함해야 합니다.");
util.pwErrMsg = ref("비밀번호는 8~12자 사이이며, 영문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
util.phoneErrMsg = ref("010-0000-0000 형식으로 입력해주세요.");
util.pwInvalidErrMsg = ref("비밀번호와 비밀번호 확인이 일치하지 않습니다.");

util.regex = ({ regex, val, msg }) => {
  const isInvalid = !regex.test(val);
  if (msg && isInvalid) alert(msg);
  return isInvalid;
};

export default util;