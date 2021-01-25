import axios from 'axios'
import { Loading, Message } from 'element-ui'
import store from '@/store'
import appConfig from '@/config'

// create axios instance
const instance = axios.create({
  baseURL: appConfig.baseUrl,
  timeout: 1000 * 60 * 10 // 10 min
})

let reqList = []

// Add a request interceptor
instance.interceptors.request.use(
  config => {
    // 当前请求
    const request = JSON.stringify(config)
    // 如果当前已经在请求了，则不再处理
    if (!reqList.includes(request)) {
      reqList.push(request)
    }

    // Do something before request is sent
    // Loading 为单例模式
    Loading.service({
      lock: false, // true时会导致隐藏滚动条
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'loading-custom-class'
    })
    const userToken = store.getters.token
    if (userToken) {
      config.headers['access_token'] = userToken
    }
    // config.withCredentials = true
    return config
  },
  error => {
    // Do something with request error
    Message.error({
      message: error.toString(),
      duration: 2000
    })
    Loading.service().close()
    return Promise.reject(error)
  })

// Add a response interceptor
instance.interceptors.response.use(
  response => {
    // 从请求列表中移除结束的
    reqList.splice(reqList.findIndex(item => item === JSON.stringify(response.config)), 1)
    // 如果当前已经没有进行中的异步请求了，则关闭loading
    if (reqList.length === 0) {
      Loading.service().close()
    }

    // 当响应结果不成功，则报错
    // todo: msg待定
    // if (!response.data.data.success) {
    //   Message.error({
    //     message: response.data.data.msg,
    //     duration: 2000
    //   })
    // }

    // todo: 如果提示未登录，则跳转401

    // 这里也可以根据返回的Code做一些指定处理
    return response
  },
  error => {
    // 发生异常时，请求列表清空
    reqList.length = 0
    // 关闭loading
    Loading.service().close()

    // 如果是取消请求的话，则抛出取消请求
    if (axios.isCancel(error)) {
      throw new axios.Cancel('cancel request')
    }
    // else {
    //   // 否则，提示错误
    //   Message.error({
    //     message: error.toString(),
    //     duration: 2000
    //   })
    // }
    return Promise.reject(error)
  })

export default instance
