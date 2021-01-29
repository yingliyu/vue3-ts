import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home/index.vue';
import Login from '../views/login/index.vue';
// import Column from '../views/column/index.vue';
import ColumnDetail from '../views/column-detail/index.vue';
import PostDetail from '../views/post-detail/index.vue';
import PostCreate from '../views/create-post/index.vue';
import Sign from '../views/signin/index.vue';
import store from '@/stores/index';
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
        requiredLogin: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    // {
    //   path: '/column',
    //   name: 'column',
    //   component: Column,
    //   meta: {
    //     requiredLogin: false
    //   }
    // },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail,
      meta: {
        requiredLogin: false
      }
    },
    {
      path: '/post/create',
      name: 'createPost',
      component: PostCreate,
      meta: {
        requiredLogin: true
      }
    },
    {
      path: '/post/:id',
      name: 'postDetail',
      component: PostDetail,
      meta: {
        requiredLogin: false
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // console.log("to====", to);
  // console.log("from====", from);
  // 权限管理 —— 未登陆就重定向至登陆页
  const { isLogin, token } = store.state.user;

  const { requiredLogin, redirectAlreadyLogin } = to.meta;
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
          localStorage.removeItem('token');
          next('/login');
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

  if (to.meta.requiredLogin && to.name !== 'login' && !isLogin) {
    next({ name: 'login' });
  } else if (to.meta.redirect && isLogin) {
    next({ name: '/' });
  } else {
    next();
  }
});
export default router;
