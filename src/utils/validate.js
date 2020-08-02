/**
 * 过滤特殊字符
 * @param {string} str 
 */
export function stripScript(str){
    var pattern = new RegExp("[`~!@#$%^&*()+=|{}':;',\\[\\]<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？]");
    var rs = "";
    for (let i = 0; i < str.length; i++) {
       rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}