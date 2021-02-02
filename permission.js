import router from './router'
import store from './store'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 获取当前所有请求的cancel方法
import { sources } from '@/utils/request'

import { Message } from 'element-ui'

import { getToken, setToken } from '@/utils/auth'
import appConfig from '@/config'

NProgress.configure({ showSpinner: false })

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some((role) => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/home', '/findpwd', '/setpwd', '/401', '/404'] // 不需要重定向的白名单
// 全局前置导航守卫
// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.beforeEach((to, from, next) => {
  NProgress.start() // 启动进度条
  // 当路由跳转时，调用当前所有进行中的ajax请求的cancel方法
  sources.forEach((item) => {
    item()
  })
  // 清空
  sources.length = 0
  if (getToken()) {
    // cookie中存在token的场合
    store.commit('set_token', getToken())
    // 如果跳转向登录,则跳回首页
    if (to.path === '/home') {
      next({ path: '/home/dashboard' })
      NProgress.done() // hack method 如果当前页就是首页，那么不会触发afterEach，因此需要手动触发
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('getUserInfo')
          .then((roles) => {
            // 根据role动态添加路由
            // 将路由存入store中
            store
              .dispatch('generateRoutes', { roles })
              .then(() => {
                // 将动态路由加入路由中
                router.addRoutes(store.getters.addRouters)
                next({ ...to, replace: true })
              })
              .catch((err) => {
                store.dispatch('fedLogOut').then(() => {
                  Message.error(err || '获取权限信息失败，请重新登陆')
                  next({ path: '/' })
                })
              })
          })
          .catch((err) => {
            Message.error(err)
            store.dispatch('logOut')
            next(`/home?redirect=${to.path}`)
            NProgress.done()
          })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
      }
      // next()
    }
  } else {
    // cookie中不存在token的场合
    // 在白名单中的则直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 1.0 先判断url中是否有token
      // 如果有token,则写入cookie和vuex
      const token = to.query ? to.query.token : ''
      if (token) {
        setToken(token)
        store.commit('set_token', token)
        next()
        window.location.reload()
      } else {
        // 如果没有token,则判断是否从from=sso的网站而来
        // 如果从sso网站来，则跳登陆页，否则先跳sso网站
        // 不在白名单的直接跳登录页
        const from = to.query ? to.query.from : ''
        if (from && from === 'sso') {
          // 如果从sso网站过来，但是没有token，则跳登陆页
          next(`/home?redirect=${to.path}`)
          NProgress.done() // hack method 如果当前页就是登录页，那么不会触发afterEach,需要在这里手动触发
        } else {
          console.log(appConfig.ssoUrl)
          // 非sso网站而来，则跳sso
          window.location.href = `${appConfig.ssoUrl}getToken?redirectUrl=${encodeURIComponent(window.location.href)}`
          NProgress.done()
        }
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
