import { createApp } from "vue";
import store from "./stores/state";
import router from "./routers/index";
import App from "./app.vue";

// Before you create app
// Vue.config.devtools = process.env.NODE_ENV === "development";
const app = createApp(App);
// After you create app
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;

app.use(router);
app.use(store);
app.mount("#app");
