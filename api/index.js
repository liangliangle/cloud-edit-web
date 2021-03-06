﻿import axios from 'axios';


import { Notice } from 'iview';

axios.defaults.baseURL = process.env.baseUrl
axios.defaults.timeout = 10000
// http request 拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    if (token) {
      //从sessionStorage中加载用户menu信息
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    if (error.response) {
      if (error.response.status === 401) {
        // 授权失败， 登录失效或未登录
        // 清除用户与token信息
        localStorage.removeItem("token");
        location.replace("/login");
      } else {
        if (error.response.data) {
          Notice.error({ title: error.response.data.message });
        }
      }
    }
    return Promise.reject(error)
  }
);
export default axios;

