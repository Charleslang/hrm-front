import Axios from 'axios'
import { Loading, Message } from 'element-ui'
import store from '@/store'
import {accessToken, headerToken} from '@/settings'

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

function request(config) {
  const axios = Axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 10000
  })

  // 拦截请求
  axios.interceptors.request.use(req => {
    // startLoading()
    // 其实该参数就是我们传递的 config
    // console.log(success)
    // 可以在这里修改我们之前传入的信息

    // 也可以在发送请求时添加动画

    // 验证用户的 token，是否已登录
    if (store.getters.token) {
      req.headers[accessToken] = store.getters.token
    }
    console.log("请求token : " + store.getters.token)
    // 放行
    return req
  }, err => {
    // console.log(err)
    Message({
      message: err.message || '请求失败',
      type: 'error',
      showClose: true
    })
    return Promise.reject(err)
  })

  // 拦截响应
  axios.interceptors.response.use(async response => {
    // closeLoading()
    // console.log(result)
    
    const refreshToken = response.headers[headerToken]
    console.log('响应token：', response)
    if (refreshToken) {
      console.log('刷新了token')
      await store.dispatch('refreshToken', refreshToken)
    }

    // 返回结果，只返回我们需要的数据
    const data = response.data
    console.log('request响应:')
    console.log(data)
    console.log('-----------------')

    if (data.code === 200) {
      return data
    } else {
      Message({
        type: 'error',
        message: data.message || '客户端好像出错了'
      })
      // 再判断是否需要重新登录

      return Promise.reject(data.message || '客户端好像出错了')
    }
    
  }, error => {
    console.error(error)
    Message({
      message: error.message || '响应错误',
      type: 'error',
      showClose: true
    })
    return Promise.reject(error)
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
  console.log('put...')
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