<template>
  <div class="home-wrapper text-center">
    <img width="400" src="./imgs/create-ico.png" alt="" />
    <h2 class="mb-3">随心写作 自由表达</h2>
    <p>
      <router-link to="/post/create" class="btn btn-primary">开始写文章</router-link>
    </p>
    <column-list :list="list" class="pt-3"></column-list>
    <button
      v-if="!isLastPage"
      type="button"
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25"
      @click="loadMorePage"
    >
      加载更多
    </button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import columnList from '../../components/column-item.vue';
import { useStore, mapGetters } from 'vuex';
import { GlobalDataProps } from '../../store/type';
import useLoadMore from '../../hooks/use-load-more';
export default defineComponent({
  name: 'Home',
  components: { columnList },
  // computed: {
  //   ...mapGetters('columns', { list: 'getColumns' })
  // },

  setup() {
    const store = useStore<GlobalDataProps>();
    const total = computed(() => store.state.columns.total);
    const currentPage = computed(() => store.state.columns.currentPage);
    // 全局类型会有自动补全功能
    onMounted(() => {
      store.dispatch('columns/getColumnsAction', { pageSize: 6 }, { root: true });
    });
    // 状态储存是响应式，从store实例读取状态最简单的方法是在计算属性中返回某个状态

    const list = computed(() => store.getters['columns/getColumns']);
    const biggerColumnLen = computed(() => store.getters['columns/biggerColumnLen']);
    const { loadMorePage, isLastPage } = useLoadMore('columns/getColumnsAction', total, {
      pageSize: 6,
      currentPage: currentPage.value ? currentPage.value + 1 : 2
    });

    return {
      biggerColumnLen,
      list,
      loadMorePage,
      isLastPage
    };
  }
});
</script>
<style scoped></style>
