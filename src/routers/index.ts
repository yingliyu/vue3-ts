import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Login from "../views/login/index.vue";
import Column from "../views/column/index.vue";
import ColumnDetail from "../views/column-detail/index.vue";
import PostCreate from "../views/create-post/index.vue";
import store from "@/stores/state";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      // 路由元信息
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: true,
        redirect: true,
      },
    },
    {
      path: "/column",
      name: "column",
      component: Column,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/column/:id",
      name: "columnDetail",
      component: ColumnDetail,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/post/create",
      name: "createPost",
      component: PostCreate,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
router.beforeEach((to, from, next) => {
  console.log("to====", to);
  console.log("from====", from);
  // 权限管理 —— 未登陆就重定向至登陆页
  if (
    to.meta.requiresAuth &&
    to.name !== "login" &&
    !store.state.user.isLogin
  ) {
    next({ name: "login" });
  } else if (to.meta.redirect && store.state.user.isLogin) {
    next({ name: "/" });
  } else {
    next();
  }
});
export default router;
