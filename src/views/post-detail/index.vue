<template>
  <div class="post-detail-wrapper">
    <modal
      title="删除文章"
      cancleText="close"
      confirmText="ok"
      :visible="modalIsVisible"
      @modal-on-close="modalIsVisible = false"
      @modal-on-confirm="hideAndDelete"
    >
      <p>确定删除文章吗?</p>
    </modal>
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="py-3">文章详情</h2>
      <div v-if="showEditArea" class="btn-group my-3">
        <router-link type="button" :to="`/post/create?id=${pid}`" class="btn btn-primary"
          >编辑</router-link
        >
        <button class="btn btn-danger" @click.prevent="modalIsVisible = true">删除</button>
      </div>
    </div>

    <p class="text-center">
      <img
        class="py-3"
        :src="postDetail.avatar || (postDetail.image && postDetail.image.url)"
        alt=""
      />
    </p>
    <h5 class="py-3">{{ postDetail.title }}</h5>
    <div class="list-group-item list-group-item-action py-3" aria-current="true">
      <div class="d-flex w-100 justify-content-between align-items-center">
        <div class="d-flex w-75 justify-content-between">
          <p class="pe-3">
            <img class="rounded-circle" :src="userInfo.avatar" alt="" />
          </p>
          <div class="">
            <h5 class="mb-1">{{ userInfo.name }}</h5>
            <p class="mb-1">
              {{ userInfo.description }}
            </p>
            <small>发表于：{{ postDetail.createdTime }}</small>
          </div>
        </div>
      </div>
    </div>
    <p class="pt-3" v-html="currentContentHtml"></p>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import MarkdownIt from 'markdown-it';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import store from '../../stores/index';
import { PostProps, ResponseType, GlobalDataProps } from '../../stores/type';
import Modal from '@/components/modal.vue';
import createMessage from '@/components/create-message';
export default defineComponent({
  name: 'PostDetail',
  components: { Modal },
  setup() {
    const { getters, state, dispatch } = useStore<GlobalDataProps>();
    const route = useRoute();
    const router = useRouter();
    const pid = route.params.id;
    const md = new MarkdownIt();
    const modalIsVisible = ref();

    onMounted(() => {
      dispatch('posts/getPostDetailAction', pid);
    });
    const postDetail = computed(() => getters['posts/getCurrentPost'](pid));

    const currentContentHtml = computed(() => {
      if (postDetail.value && postDetail.value.content) {
        return md.render(postDetail.value.content);
      }
    });
    const userInfo = computed(() => state.user.userInfo);
    const showEditArea = computed(() => {
      const { isLogin } = state.user;
      return isLogin;
      // if (postDetail.value && postDetail.value.author && isLogin) {
      //   return postDetail.value.author.id === id;
      // } else {
      //   return false;
      // }
    });
    const hideAndDelete = () => {
      modalIsVisible.value = false;
      store
        .dispatch('posts/deletePostAction', pid, { root: true })
        .then((rawData: ResponseType<PostProps>) => {
          createMessage('删除成功！2s后跳转至专栏首页', 'success');
          setTimeout(() => {
            router.push({ name: 'column', params: { id: rawData.data.cid } });
          }, 2000);
        });
    };
    return {
      modalIsVisible,
      postDetail,
      userInfo,
      currentContentHtml,
      showEditArea,
      pid,
      hideAndDelete
    };
  }
});
</script>
<style scoped></style>
