import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import Login from '../views/login/index.vue';
import Column from '../views/column/index.vue';
import ColumnDetail from '../views/column-detail/index.vue';
import PostDetail from '../views/post-detail/index.vue';
import PostCreate from '../views/create-post/index.vue';
import Sign from '../views/signin/index.vue';
import store from '@/stores/state';
import axios from 'axios';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 路由元信息
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: true,
        redirect: true
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
      meta: {
        requiresAuth: false,
        redirect: true
      }
    },
    {
      path: '/column',
      name: 'column',
      component: Column,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/column/:id',
      name: 'columnDetail',
      component: ColumnDetail,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/create',
      name: 'createPost',
      component: PostCreate,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/post/:id',
      name: 'postDetail',
      component: PostDetail,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  // console.log("to====", to);
  // console.log("from====", from);
  // 权限管理 —— 未登陆就重定向至登陆页
  const { user, token } = store.state;
  const { requiredLogin, redirectAlreadyLogin } = to.meta;
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.authorization = token;
      store
        .dispatch('getUserInfo')
        .then(() => {
          if (redirectAlreadyLogin) {
            next('/');
          } else {
            next();
          }
        })
        .catch((e) => {
          console.log(e);
          localStorage.removeItem('token');
          next('login');
        });
    } else {
      if (requiredLogin) {
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

  if (to.meta.requiresAuth && to.name !== 'login' && !user.isLogin) {
    next({ name: 'login' });
  } else if (to.meta.redirect && store.state.user.isLogin) {
    next({ name: '/' });
  } else {
    next();
  }
});
export default router;
