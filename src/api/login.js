import service from "@/utils/request";
/**
 * 获取验证码的接口
 */
const querystring = require('querystring');
// const qs = require("qs");
export function getSms(data) {
  // const params = new URLSearchParams();
  // params.append("email", data.email);
  service
    .request({
      url: "/getValiStr",
      method: "post",
      //默认情况下，axios将JavaScript对象序列化为JSON。 要以application / x-www-form-urlencoded格式发送数据，您可以使用以下选项之一。
      /**
       * 1. const params = new URLSearchParams();
            params.append('param1', 'value1');
            params.append('param2', 'value2');
          2. const qs = require('qs');
              qs.stringify(data);
          3. const querystring = require('querystring');
              querystring.stringify(data);
       */
      data: querystring.stringify({email: data.email}),
      timeout: 60000
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * 获取用户角色的接口
 */

/**
 * 登陆
 */

/**
 * 注册
 */
