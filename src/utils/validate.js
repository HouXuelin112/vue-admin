/**
 * 过滤特殊字符
 * @param {string} str
 */
export function stripScript(str) {
  var pattern = new RegExp(
    "[`~!@#$%^&*()+=|{}':;', \\[\\]<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]"
  );
  var rs = "";
  for (let i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
/**
 * 验证邮箱
 * @param string email
 */
export function validateEmail(email) {
  // console.log(email)
  let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
  return reg.test(email);
}
/**
 * 验证密码
 * @param {string} password
 */
export function validatePass(password) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(password);
}
/**
 * 验证验证码
 * @param {string} code
 */
export function validateCode(code) {
  let reg = /^[a-zA-Z0-9]{6}$/;
  return reg.test(code);
}
