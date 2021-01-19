<template>
  <div class="post-wrapper">
    <router-link :to="`/post/${post.id}`" v-for="post in list" :key="post.id" class="card p-3 mt-3">
      <h5 class="card-title">{{ post.title }}</h5>
      <div class="row g-0">
        <div class="col-md-2 ">
          <img :src="post.avatar" class="img-fluid pt-3" />
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <p class="card-text">
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
import { PostProps } from '../../utils/testData';
export default defineComponent({
  name: 'index',
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
<style scoped lang="less"></style>
