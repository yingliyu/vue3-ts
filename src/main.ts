import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./app.vue";
import Home from "./views/home/index.vue";
import Login from "./views/login/index.vue";
// Before you create app
// Vue.config.devtools = process.env.NODE_ENV === "development";
const app = createApp(App);
// After you create app
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
const routerHistory = createWebHistory();
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
  ],
});
app.use(router).mount("#app");
