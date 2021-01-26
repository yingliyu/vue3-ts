import { createApp } from 'vue';
import store from './stores/index';
import router from './routers/index';
import App from './app.vue';
import axios from 'axios';
// Before you create app
// Vue.config.devtools = process.env.NODE_ENV === "development";
const app = createApp(App);
// After you create app
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor;
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/274855';
// const AUTH_TOKEN =
//   'e8cdDfA9-6edf-6cD4-Ef65-Fe517Ad97d6a0A5Da29D-CDEC-EFff-8248-b0BB67E20fA9ec4DD96f-C8dC-B7Fb-2Cc5-5DA5D135A8989abfEb1C-FD6B-9E7E-F64E-cbFD60723Eeb2Ca55B7a-0fdd-444b-c6EE-aD5b41FA8Ecdf872789d-e972-636D-F1c1-A3DE5edB88EbB98e97bB-cbE2-ADFA-3D2C-BBCA471acE1d1ebDf2E3-8CAB-1e4B-Dbfe-b8e5cBe2c596';
// axios.defaults.headers.common['authorization'] = AUTH_TOKEN;
// axios.get('/column/list', { params: { kname: 'lemon' } }).then((res) => {
//   console.log(res.data);
// });

// async await 1
// async function test() {
//   return 'hello';
// }
// async await 2
// async function test2() {
//   const gretting = await Promise().resolve('hello');
//   return gretting;
// }
// test().then((value) => console.log(value));
// console.log(test());
axios.interceptors.request.use((config) => {
  store.commit('setLoading', true);
  store.commit('setError', { code: 200, message: '' });
  return config;
});

axios.interceptors.response.use(
  (config) => {
    store.commit('setLoading', false);
    return config;
  },
  (e) => {
    const { type } = new Event(e);
    store.commit('setError', { code: 404, message: type });
    store.commit('setLoading', false);
    return Promise.reject(type);
  }
);

app.use(router);
app.use(store);
app.mount('#app');
