<template>
  <div class="container">
    <global-header :user="userInfo" />
    <router-view></router-view>
  </div>
  <footer-item />
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent } from "vue";
import GlobalHeader, { UserProps } from "./components/global-header.vue";
import FooterItem from "./components/footer/index.vue";

interface LoginProps {
  name: string;
  password: string;
}
export default defineComponent({
  name: "App",
  components: {
    GlobalHeader,
    FooterItem,
  },
  setup() {
    const userInfo: UserProps = {
      id: 1,
      name: "lemon",
      isLogin: false,
    };

    return {
      userInfo,
    };
  },
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
