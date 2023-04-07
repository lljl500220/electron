/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import {ElMessage, ElLoading} from 'element-plus'

//baseURL
axios.defaults.baseURL = '/'
// 请求超时时间
axios.defaults.timeout = 10000;
// post请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// 请求拦截器
axios.interceptors.request.use(
  //config is type of AxiosRequestConfig,but this be any to assign TypeScript,because config is possibly undefined
  (config: any) => {
    return config;
  },
  error => {
    return Promise.reject(error);
  })

// 响应拦截器
// @ts-ignore
axios.interceptors.response.use(
  response => {
    if (response.data.resCode === '000000') {
      return Promise.resolve(response);
    } else {
      ElMessage({
        message: response.data.resMsg || `请求失败 ${response.status}`,
      })
      return Promise.reject(response.data);
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      console.log(error.response.status)
      switch (error.response.status) {
        // "404"请求不存在
        case 404:
          ElMessage({
            message: '网络请求不存在',
          })
          break;
        case 401:
          location.href = error.response.data.loginUrl
          break
        // 其他错误，直接抛出错误提示
        default:
          ElMessage({
            message: error.response.data.resMsg || `请求失败 ${error.response.status}`,
          })
      }
      return Promise.reject(error.response)
    }else {
      return Promise.reject(error.response)
    }
  }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param options
 */
export const get = <T>(url: string, params = {}, options?: any): Promise<T> => {
  return new Promise((resolve, reject) => {
    let loading = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.9)',
    })
    axios({
      ...options,
      method: "get",
      url: url,
      params: params
    })
      .then(res => {
        resolve(res.data);
        if (loading) {
          loading.close();
        }
      })
      .catch((err) => {
        if (err.status === 200) reject(err.data)
        if (loading) {
          loading.close();
        }
      })
  })
}

export const post = (url: string, params: any, options?: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let loading = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: 'rgba(0, 0, 0, 0.9)',
    })
    axios({
      ...options,
      method: "post",
      url: url,
      data: params
    })
      .then(res => {
        resolve(res.data);
        if (loading) {
          loading.close();
        }
      })
      .catch((err) => {
        if (err.status === 200) reject(err.data)
        if (loading) {
          loading.close();
        }
      })
  })
}
