import instance from './axios'
import axios from 'axios'
import { Message } from 'element-ui'
import { removeToken } from '@/utils/auth'
import router from '@/router'

const CancelToken = axios.CancelToken

let sources = []

export function AppPost(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        // 取消请求
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          sources.push(c)
        })
      })
      .then((res) => {
        if (res.data.errcode === '0') {
          resolve(res.data)
        } else {
          if (res.data.errcode === '610') {
            // token 过期
            // Message.error({
            //   message: '登录信息已过期，请重新登录',
            //   duration: 2000
            // })
            removeToken()
            router.push('/login')
          } else {
            Message.error({
              message: res.data.errmsg,
              duration: 2000
            })
          }
          reject(res.data.errmsg)
        }
      })
      .catch((err) => {
        Message.error({
          message: err,
          duration: 2000
        })
        reject(err)
      })
  })
}

export function AppGet(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .get(
        url,
        {
          params: {
            ...data
          }
        },
        {
          cancelToken: new CancelToken(function executor(c) {
            sources.push(c)
          })
        }
      )
      .then((res) => {
        if (res.data.errcode === '0') {
          resolve(res.data)
        } else {
          if (res.data.errcode === '610') {
            // token 过期
            removeToken()
            router.push('/login')
          } else {
            Message.error({
              message: res.data.errmsg,
              duration: 2000
            })
          }
          reject(res.data.errmsg)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function AppDownload(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        responseType: 'blob'
      })
      .then((res) => {
        if (res && res.status !== 200) {
          reject(new Error(`下载失败`))
        } else {
          let url = window.URL.createObjectURL(new Blob([res.data]))
          let link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          let filename = data.filename || `${new Date() - 0}.xlsx`
          try {
            filename = decodeURI(
              res.headers['content-disposition'].split(';')[1].split('filename=')[1]
            )
          } catch (e) {}

          link.setAttribute('download', filename)

          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(url.href)
          document.body.removeChild(link)
          resolve()
        }
      })
      .catch(() => {
        Message.error({
          message: 'download failed',
          duration: 2000
        })
      })
  })
}

export function AppGetPic(url, data) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      responseType: 'blob'
    })
      .then((res) => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function AppPostUpload(url, data) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        onUploadProgress: progressEvent => {
          // let percent = (progressEvent.loaded / progressEvent.total * 100) | 0
          // 调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
          // uploader.onProgress({ percent: percent })
        },
        // 取消请求
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          sources.push(c)
        })
      })
      .then((res) => {
        if (res.data.errcode === '0') {
          resolve(res.data)
        } else {
          if (res.data.errcode === '610') {
            // token 过期
            removeToken()
            router.push('/login')
          } else {
            Message.error({
              message: res.data.errmsg,
              duration: 2000
            })
          }
          reject(res.data.errmsg)
        }
      })
      .catch((err) => {
        Message.error({
          message: err,
          duration: 2000
        })
        reject(err)
      })
  })
}

export { sources }
