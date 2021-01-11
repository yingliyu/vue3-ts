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
        <dropdown :title="`Hello,${user.name}`">
          <dropdown-item
            ><a class="dropdown-item" href="#">新建文章</a></dropdown-item
          >
          <dropdown-item disabled
            ><a class="dropdown-item" href="#">编辑资料</a></dropdown-item
          >
          <dropdown-item
            ><a class="dropdown-item" href="#">退出</a></dropdown-item
          >
        </dropdown>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "./dropdown.vue";
import DropdownItem from "./dropdown-item.vue";
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
  components: { Dropdown, DropdownItem },
});
</script>
<style lang="less" scoped></style>
