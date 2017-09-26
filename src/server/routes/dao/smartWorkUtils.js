/**
 * Created by sachuangwei on 2017-07-20.
 */
var axios = require('axios');

exports.getLoginHttp = function() {
    let host = "s://yg.ismartwork.cn";
    let baseURL = "http" + host + "/webapp/restful";
    let axiosConfig = {
      baseURL
    }
    let http = axios.create(axiosConfig);
    return http;
}