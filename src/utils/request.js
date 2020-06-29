import axios from 'axios';
import {getToken} from "@/utils/app.js";
import {MessageBox} from "element-ui";
import {Message} from "element-ui";
const BASEURL=process.env.NODE_ENV === 'production' ? '' : '/devApi'
const service=axios.create({
  baseURL:BASEURL,
  timeout:10000,
  // headers:{
  //   // 'Content-Type': 'application/x-www-form-urlencoded'
  //   // 'Authorization':'Authorization:eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjdXJyZW50VGltZU1pbGxpcyI6IjE1OTA3MTkwODgzNDQiLCJpc3MiOiJhdXR'
  // }
});
axios.defaults.withCredentials = true
// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (getToken()) {
    config.headers['Authorization'] = getToken()
  }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  })
// 添加响应拦截器                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
service.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response);
  
  let code=response.data.code
  if(code!==200 && code!==0){
    return Promise.reject(response.data)
  }else{
    return response
  }
  }, function (error) {
    return Promise.reject(error);
  })
export default service;
