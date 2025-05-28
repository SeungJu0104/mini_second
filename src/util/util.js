const util = {};

util.regex = (regex, val, msg) => {
    if (!regex.test(val)) {
        alert(msg);
        return true;
    }
    return false;
}

export default util;