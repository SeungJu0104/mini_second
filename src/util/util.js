const util = {};

// util.regex = (regex, val, msg) => {
//     if (!regex.test(val)) {
//         alert(msg);
//         return true;
//     }
//     return false;
// }

// util.regex2 = (regex, val) => {
//     return (!regex.test(val))
// }

util.regex = ({ regex, val, msg }) => {
  const isInvalid = !regex.test(val);
  if (msg && isInvalid) alert(msg);
  return isInvalid;
};


export default util;