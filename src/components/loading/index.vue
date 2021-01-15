<template>
  <teleport to="body">
    <div
      class="loading-wrapper text-center d-flex flex-column justify-content-center align-items-center"
      :style="{ backgroundColor: background || '' }"
    >
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ text || 'loading...' }}</span>
      </div>
      <p v-if="text" class="text-primary small">{{ text }}</p>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Loading',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup() {
    return {};
  }
});
</script>
<style scoped lang="less">
.loading-wrapper {
  background: rgba(0, 0, 0, 0.3);
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
