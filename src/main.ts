import { createApp } from "vue";
// import Vue from "vue";
import App from "./app.vue";
// Before you create app
// Vue.config.devtools = process.env.NODE_ENV === "development";
const app = createApp(App);
// After you create app
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
app.mount("#app");
