import axios from 'axios';

let host = "s://yg.ismartwork.cn";
let baseURL = "http" + host + "/webapp/restful";
let axiosConfig = {
  baseURL
}
let instance = axios.create(axiosConfig);

export default {
  getHost: host,
  getAxios: instance,
  getBaseUrl: baseURL,
  validateStatus: function (status) {
    return status >= 200 && status < 300; //default
  }
};
