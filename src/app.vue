<template>
  <div class="container">
    <loading v-if="isLoading" text="努力加载中..." background="rgba(0,0,0,0.7)"></loading>
    <global-header :user="userInfo" />
    <pre>isLogin: {{ isLogin }}</pre>
    <pre>userInfo: {{ userInfo }}</pre>
    <router-view></router-view>
  </div>

  <footer-item />
</template>

<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
// 使用composition API: 相关的feature组合在一起；比minix可以更高效的重用模块；
import { computed, defineComponent, reactive, watch, ref, onMounted, onUpdated } from 'vue';
import GlobalHeader from './components/global-header.vue';
import FooterItem from './components/footer/index.vue';
import { mapState, useStore } from 'vuex';
import Loading from './components/loading/index.vue';
import createMessage from './components/create-message/index';
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    FooterItem,
    Loading
  },

  setup() {
    const store = useStore();
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
