<template>
  <div class="container">
    <loading v-if="isLoading" text="努力加载中..." background="rgba(0,0,0,0.7)"></loading>
    <global-header :user="userInfo" v-if="showNav" />
    <breadcrumb></breadcrumb>
    <router-view></router-view>
  </div>
  <footer-item />
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
// 使用composition API: 相关的feature组合在一起；比minix可以更高效的重用模块；
import { computed, defineComponent, reactive, watch, ref } from 'vue';
import GlobalHeader from './components/global-header.vue';
import FooterItem from './components/footer/index.vue';
import { useStore } from 'vuex';
import Loading from './components/loading/index.vue';
import createMessage from './components/create-message/index';
import { useRoute } from 'vue-router';
import Breadcrumb from '@/components/breadcrumb/index.vue';
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    FooterItem,
    Loading,
    Breadcrumb
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const showNav = computed(() => route.meta.showNav);
    const loginData = reactive({
      name: '',
      password: ''
    });
    const isLogin = computed(() => store.getters['user/isLogin']);
    const userInfo = computed(() => store.state.user);

    const isLoading = computed(() => store.state.app.loading);
    const error = computed(() => store.state.app.error);
    const showErrorMsg = ref(false);

    watch(
      () => error.value.code,
      () => {
        const { code, message } = error.value;
        if (code !== 200 && message) {
          createMessage(message, 'error');
        }
      }
    );
    return {
      showNav,
      isLogin,
      ...loginData,
      userInfo,
      isLoading,
      error,
      showErrorMsg
    };
  }
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
