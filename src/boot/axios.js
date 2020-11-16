import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Ls from 'core/services/ls'
export const axiosBase = axios.create({
  baseURL: process.env.BASE_API_URL,
  withCredentials: true,
  headers: {
    // 'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': true,
    // 'Access-Control-Allow-Origin': '*',
  }
});
axiosBase.interceptors.request.use(config => {
  // Do something before request is sent
  const companyId = Ls.get('selectedCompany')
  if (companyId) {
    config.headers.common['company'] = companyId
  }

  return config
}, error => {
  // Do something with request error
  return Promise.reject(error);
});
Vue.use(VueAxios, axiosBase);
