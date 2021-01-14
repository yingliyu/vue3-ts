<template>
  <div class="column-detail-wrapper pt-3">
    <!-- <pre>{{ postList }}</pre> -->
    <div class="row py-3 border-bottom justify-content-center">
      <div class="col-md-2">
        <img :src="columnDetail.avatar" />
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
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import Post from "../../components/post-list/index.vue";
import { GlobalDataProps } from "@/stores/state";
export default defineComponent({
  name: "index",
  props: {},
  components: { Post },
  setup() {
    const store = useStore<GlobalDataProps>();
    const route = useRoute();
    const currentColumnId: string = route.params.id.toString();
    const columnDetail = computed(() =>
      store.getters.getColumnById(currentColumnId)
    );
    const postList = computed(() =>
      store.getters.getPostsByCid(currentColumnId)
    );
    return { route, columnDetail, postList };
  },
});
</script>
<style scoped lang="less">
.column-detail-wrapper img {
  border-radius: 50%;
}
</style>
