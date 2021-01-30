import Axios from 'axios'
import { Loading, Message } from 'element-ui'

let loading

function startLoading() {
  loading = Loading.service({
    text: '请等待...',
    background: 'rgba(0,0,0,0.6)'
  })
}

function closeLoading() {
  loading.close()
}

export function request(config) {
  const axios = Axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 5000
  })

  // 拦截请求
  axios.interceptors.request.use(success => {
    startLoading()
    // 其实该参数就是我们传递的 config
    // console.log(success)
    // 可以在这里修改我们之前传入的信息

    // 也可以在发送请求时添加动画

    // 验证用户的 token，是否已登录

    // 放行
    return success
  }, err => {
    // console.log(err)
    Message({
      message: '请求失败',
      type: 'error',
      showClose: true
    })
  })

  // 拦截响应
  axios.interceptors.response.use(result => {
    closeLoading()
    console.log("loading...", loading)
    // console.log(result)

    // 返回结果，只返回我们需要的数据
    return result.data
  }, error => {
    // console.log(error)
    Message({
      message: '响应错误',
      type: 'error',
      showClose: true
    })
  })
  
  // axios 返回的就是 promise
  return axios(config)
}

/**
 * get 请求
 */
export function doGet(config) {
  config['method'] = 'get'
  return request(config)
}

/**
 * post 请求
 * @param {*} config 
 */
export function doPost(config) {
  config['method'] = 'post'
  return request(config)
}

/**
 * put 请求
 * @param {*} config 
 */
export function doPut(config) {
  config['method'] = 'put'
  return request(config)
}

/**
 * delete 请求
 * @param {*} config 
 */
export function doDelete(config) {
  config['method'] = 'delete'
  return request(config)
}