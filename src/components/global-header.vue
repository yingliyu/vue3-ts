<template>
  <!-- As a link -->
  <nav class="navbar navbar-dark bg-primary fixed-top px-3">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">者也专栏</router-link>
      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login" class="pe-2 text-white text-decoration-none">登陆</router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/sign" class="text-white text-decoration-none">注册</router-link>
        </li>
      </ul>
      <div v-else class="dropdown">
        <dropdown :title="`Hello,${user.userInfo.name}`">
          <dropdown-item
            ><router-link class="dropdown-item" to="/post/create"
              >新建文章</router-link
            ></dropdown-item
          >
          <dropdown-item disabled><a class="dropdown-item" href="#">编辑资料</a></dropdown-item>
          <dropdown-item
            ><a class="dropdown-item" href="#" @click="logoutHandle">退出</a></dropdown-item
          >
        </dropdown>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue';
import Dropdown from './dropdown.vue';
import DropdownItem from './dropdown-item.vue';
import { UserProps } from '../store/type';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import createMessage from '@/components/create-message/index';

export default defineComponent({
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  components: { Dropdown, DropdownItem },
  setup() {
    const { commit } = useStore();
    const router = useRouter();
    onMounted(() => {
      // console.log(props.user.name);
    });
    const logoutHandle = () => {
      commit('user/logout');
      createMessage(`退出成功，2s后跳转到登陆页`, 'success', 2000);
      setTimeout(() => {
        router.push({
          name: 'login'
        });
      }, 2000);
    };
    return {
      logoutHandle
    };
  }
});
</script>
<style lang="less" scoped></style>
