<template>
  <!-- As a link -->
  <nav class="navbar navbar-dark bg-primary fixed-top px-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">者也专栏</a>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <a href="#" class="pe-2 text-white text-decoration-none">登陆</a>
        </li>
        <li class="list-inline-item">
          <a href="#" class="text-white text-decoration-none">注册</a>
        </li>
      </ul>
      <div v-else class="dropdown">
        <button
          class="btn dropdown-toggle  btn-outline-light"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Hello,{{ user.name }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li><a class="dropdown-item" href="#">用户中心</a></li>
          <li><a class="dropdown-item" href="#">退出</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id: number;
}
export default defineComponent({
  name: "GlobalHeader",
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped></style>
