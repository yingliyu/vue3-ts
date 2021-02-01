import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/index.vue');
const Login = () => import(/* webpackChunkName: "login" */ '../views/login/index.vue');
const ColumnDetail = () =>
  import(/* webpackChunkName: "column" */ '../views/column-detail/index.vue');
const PostDetail = () => import(/* webpackChunkName: "post" */ '../views/post-detail/index.vue');
const PostCreate = () => import(/* webpackChunkName: "post" */ '../views/create-post/index.vue');
const Sign = () => import('../views/signin/index.vue');
import store from '@/stores/index';
import axios from 'axios';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 路由元信息
      meta: {
        title: '首页',
        showNav: true,
        showBreadcrumb: false,
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        showNav: false,
        showBreadcrumb: false,
        redirectAlreadyLogin: true,
        requiresAuth: false
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
      meta: {
        showNav: false,
        showBreadcrumb: false,
        redirectAlreadyLogin: true,
        requiresAuth: false
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail,
      meta: {
        title: '栏目',
        showNav: true,
        showBreadcrumb: true,
        requiresAuth: false
      }
    },
    {
      path: '/post/create',
      name: 'createPost',
      component: PostCreate,
      meta: {
        title: '发表文章',
        showNav: true,
        showBreadcrumb: true,
        requiresAuth: true
      }
    },
    {
      path: '/post/:id',
      name: 'postDetail',
      component: PostDetail,
      meta: {
        title: '文章详情',
        showNav: true,
        showBreadcrumb: true,
        requiresAuth: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log("to====", to);
  // console.log("from====", from);
  // 权限管理 —— 未登陆就重定向至登陆页
  const { isLogin, token } = store.state.user;

  const { requiresAuth, redirectAlreadyLogin } = to.meta;
  if (!isLogin) {
    if (token) {
      axios.defaults.headers.common.authorization = token;
      store
        .dispatch('user/getUserInfo', '', { root: true })
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/');
          } else {
            next();
          }
        })
        .catch((e) => {
          console.log(e);
          store.commit('user/logout');
          next('/login');
        });
    } else {
      if (requiresAuth) {
        next('/login');
      } else {
        next();
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/');
    } else {
      next();
    }
  }

  if (to.meta.requiresAuth && to.name !== 'login' && !isLogin) {
    next({ name: 'login' });
  } else if (to.meta.redirect && isLogin) {
    next({ name: '/' });
  } else {
    next();
  }
  // store.commit('app/setBreadcrumb', {
  //   title: to.meta.title,
  //   path: to.path,
  //   show: to.meta.showBreadcrumb
  // });
});
export default router;
