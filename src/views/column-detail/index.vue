<template>
  <div class="column-detail-wrapper pt-3">
    <h2>专栏信息</h2>
    <div class="row py-3 mb-3 border-bottom justify-content-center">
      <div class="col-md-2">
        <img :src="columnDetail.avatar && columnDetail.avatar.url" />
      </div>
      <div class="col-md-8">
        <h5 class="title">{{ columnDetail.title }}</h5>
        <p>{{ columnDetail.description }}</p>
      </div>
    </div>
    <post :list="postList"></post>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { mapGetters, useStore } from 'vuex';
import Post from '../../components/post-list/index.vue';
import { GlobalDataProps } from '@/stores/type';
export default defineComponent({
  name: 'index',
  props: {},
  components: { Post },
  // computed: {
  //   ...mapGetters('columns', { columnDetail: 'getColumnById' })
  // },
  // mounted() {
  // const route = useRoute();
  // const currentColumnId = route.params.id;
  // this.columnDetail(currentColumnId);
  // },
  setup() {
    const route = useRoute();
    const currentColumnId = route.params.id;
    const { dispatch, state, getters } = useStore<GlobalDataProps>();
    onMounted(() => {
      dispatch('columns/getColumnByIdAction', currentColumnId);
      dispatch('posts/getPostsByCidAction', currentColumnId);
    });
    const columnDetail = computed(() => getters['columns/getColumnById'](currentColumnId));
    const postList = computed(() => state.posts.data);
    console.log('columnDetail====', columnDetail);

    return { columnDetail, route, postList };
  }
});
</script>
<style scoped lang="less">
.column-detail-wrapper img {
  border-radius: 50%;
}
</style>
