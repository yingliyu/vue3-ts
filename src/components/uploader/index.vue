<template>
  <div class="uploader-wrapper file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading"
        ><button class="btn btn-primary" disabled>正在上传</button></slot
      >
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData"
        ><button class="btn btn-success">上传成功</button></slot
      >
      <slot v-else name="default"> <button class="btn btn-primary">点击上传</button> </slot>
    </div>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import axios from 'axios';
//import createMessage from '../create-message/index';
type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckFunc = (file: File) => boolean;
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunc>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    const fileInput = ref<null | HTMLInputElement>(null);
    const fileStatus = ref<UploadStatus>('ready');
    const uploadedData = ref();

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    const handleFileChange = (e: Event) => {
      // console.log('change==', e);
      const currentTarget = e.target as HTMLInputElement;

      if (currentTarget.files) {
        const files = Array.from(currentTarget.files);
        // console.log('files==', files);
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0]);
          if (!result) {
            return;
          }
        }
        fileStatus.value = 'loading';
        const formData = new FormData();
        formData.append('file', files[0]);
        axios
          .post(props.action, formData, {
            headers: {
              'Content-type': 'multipart/form-data'
            }
          })
          .then((res) => {
            console.log('上传成功：', res);
            fileStatus.value = 'success';
            uploadedData.value = res.data;
            console.log(uploadedData.value);

            context.emit('file-uploaded', res.data);
          })
          .catch((error) => {
            fileStatus.value = 'error';
            context.emit('file-uploaded-error', { error });
          })
          .finally(() => {
            if (fileInput.value) {
              fileInput.value.value = '';
            }
          });
      }
    };
    return { fileInput, triggerUpload, fileStatus, handleFileChange, uploadedData };
  }
});
</script>
<style scoped lang="less"></style>
