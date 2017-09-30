import axios from 'axios';

let smartHost = 's://yg.ismartwork.cn';
let smartWorkBaseUrl = 'http'+ smartHost +'/webapp/restful';

let host = "://localhost";
let baseURL = "http" + host + ":4000";
let axiosConfig = {
  baseURL
}
let instance = axios.create(axiosConfig);
export default {
  getHost: host,
  getAxios: instance,
  getBaseUrl: baseURL,
  getSmartWorkBaseUrl: smartWorkBaseUrl,
  validateStatus: function (status) {
    return status >= 200 && status < 300; //default
  }
};
