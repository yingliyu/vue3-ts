<template>
  <div class="create-post-wrapper pt-3">
    <h2 class="py-3">{{ isEditMode ? '编辑文章' : '新建文章' }}</h2>
    <uploader
      action="/zhihu/upload"
      :uploaded="uploadedData"
      :beforeUpload="beforeUploadCheck"
      @file-uploaded="onFileUploaded"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
    >
      <h2>上传Banner图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-grow text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h3>正在上传</h3>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="upload-area">
          <img :src="dataProps.uploadedData.data.url" width="200" />
          <h3 class="text-center mt-2">点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <validate-input
          label="文章标题"
          placeholder="请输入文章标题..."
          v-model="title"
          :rules="titleRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          tag="textarea"
          label="文章详情"
          placeholder="请输入文章详情..."
          v-model="content"
          :rows="10"
          :rules="postRules"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-primary">{{ isEditMode ? '更新' : '发表' }}文章</span>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { GlobalDataProps } from '@/stores/state';
import { defineComponent, onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Uploader from '../../components/uploader/index.vue';
import { ImageProps, ResponseType, PostProps } from '../../stores/state';
import ValidateForm from '../../components/validate-form.vue';
import ValidateInput from '../../components/validate-input.vue';
import createMessage from '../../components/create-message/index';
import { checkBeforeUpload } from '../../utils/helper';
export default defineComponent({
  name: 'index',
  props: {},
  components: { Uploader, ValidateForm, ValidateInput },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const route = useRoute();
    let imageId = '';
    const uploadedData = ref();
    const title = ref('');
    const content = ref('');
    // 是否是编辑模式
    const isEditMode = !!route.query.id;

    onMounted(() => {
      // console.log(route.query.id);
      if (isEditMode) {
        store
          .dispatch('getPostDetailAction', route.query.id)
          .then((rawData: ResponseType<PostProps>) => {
            const currentPost = rawData.data;
            if (currentPost.image) {
              uploadedData.value = { data: currentPost.image };
            }
            title.value = currentPost.title;
            content.value = currentPost.content;
            console.log(rawData);
          });
      }
    });

    const titleRules = [{ type: 'required', message: '文章标题不能为空' }];
    const postRules = [{ type: 'required', message: '文章内容不能为空' }];
    const onFileUploaded = (rawData: ResponseType<ImageProps>) => {
      // console.log('图片上传成功: ', rawData);
      // createMessage(`图片上传成功！`, 'success');
      if (rawData.data.id) {
        imageId = rawData.data.id;
      }
    };
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId, id } = store.state.user;
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime().toString(),
            title: title.value,
            content: content.value,
            cid: columnId,
            createdTime: new Date().toLocaleString(),
            authorId: id as string
            // image: imageId
          };
          const actionName = isEditMode ? 'updatePostAction' : 'createPostAction';
          const params = isEditMode
            ? {
                id: route.query.id,
                payload: newPost
              }
            : newPost;
          const operateMsg = isEditMode ? '更新' : '发表';
          store.dispatch(actionName, params).then(() => {
            createMessage(`${operateMsg}成功，2s后跳转到文章`, 'success', 2000);
            setTimeout(() => {
              router.push({
                name: 'column',
                params: { id: columnId }
              });
            }, 2000);
          });
        }
      }
    };

    const beforeUploadCheck = (file: File) => {
      const res = checkBeforeUpload(file, {
        format: ['image/jepg', 'image/png', 'image/jpg'],
        size: 1
      });
      const { passed, error } = res;
      if (error === 'format') {
        createMessage('上传图片只能是JPG/PNG/JEPG格式', 'error');
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过1Mb', 'error');
      }
      return passed;
    };
    return {
      isEditMode,
      titleRules,
      postRules,
      uploadedData,
      title,
      content,
      onFormSubmit,
      onFileUploaded,
      beforeUploadCheck
    };
  }
});
</script>
<style scoped lang="less">
.create-post-wrapper {
  .uploader-wrapper {
    height: 200px;
    cursor: pointer;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .uploaded-area {
    position: relative;
    h3 {
      display: none;
      position: absolute;
      color: #999;
      text-align: center;
      width: 100%;
      top: 50%;
    }
    &:hover {
      h3 {
        display: block;
      }
    }
  }
}
</style>
