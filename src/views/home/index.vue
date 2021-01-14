<template>
  <div class="home-wrapper text-center">
    <img width="400" src="./imgs/create-ico.png" alt="" />
    <h2 class="mb-3">随心写作 自由表达</h2>
    <p>
      <router-link to="/post/create" class="btn btn-primary"
        >开始写文章</router-link
      >
    </p>
    <column-item :list="list" class="pt-3"></column-item>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import columnItem from "../../components/column-item.vue";
import { useStore } from "vuex";
import { GlobalDataProps } from "@/stores/state";
export default defineComponent({
  name: "Home",
  props: {},
  components: { columnItem },
  setup() {
    // 全局类型会有自动补全功能
    const store = useStore<GlobalDataProps>();
    // 状态储存是响应式，从store实例读取状态最简单的方法是在计算属性中返回某个状态
    const list = computed(() => store.state.columns);
    const biggerColumnLen = computed(() => store.getters.biggerColumnLen);
    return {
      biggerColumnLen,
      list,
    };
  },
});
</script>
<style scoped></style>
