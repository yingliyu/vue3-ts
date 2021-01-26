<template>
  <div class="post-wrapper">
    <router-link
      :to="`/post/${post.id}`"
      v-for="post in list"
      :key="post.id"
      class="card px-3 pt-3 mb-3 text-decoration-none text-reset shadow-sm"
    >
      <h5 class="card-title text-decoration-none">{{ post.title }}</h5>
      <div class="row g-0">
        <div class="col-md-2 ">
          <img :src="post.image && post.image.url" class="img-fluid pt-3" />
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <p class="content-wrapper card-text text-decoration-none">
              {{ post.content }}
            </p>
            <p class="card-text">
              <small class="text-muted">{{ post.createdTime }}</small>
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PostProps } from '../../stores/index';
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  components: {},
  setup() {
    return {};
  }
});
</script>
<style scoped lang="less">
.post-wrapper {
  a:hover {
    background: #f1f1f1;
  }
  .content-wrapper {
    // max-height: 60px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
