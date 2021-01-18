<template>
  <!-- <teleport to="body"> -->
  <div
    class="alert alert-primary d-flex fixed-top w-50 mx-auto align-items-center justify-content-between mt-3"
    :class="classObj"
    v-if="isVisible"
    role="alert"
  >
    <span>{{ message }}</span>
    <button
      @click.prevent="hideHandle"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>
  <!-- </teleport> -->
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
export type MessageType = 'success' | 'error' | 'default';
export default defineComponent({
  name: 'index',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup(props, context) {
    const isVisible = ref(true);
    const classObj = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    };
    const hideHandle = () => {
      isVisible.value = false;
      context.emit('close-message', true);
    };
    return { isVisible, classObj, hideHandle };
  }
});
</script>
<style scoped lang="less"></style>
