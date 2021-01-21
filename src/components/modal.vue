<template>
  <teleport to="body">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            ></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="onClose"
            >
              {{ cancleText }}
            </button>
            <button type="button" class="btn btn-primary" @click="onConfirm">
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    title: {
      type: String
    },
    visible: {
      type: Boolean,
      default: false
    },
    cancleText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup(props, context) {
    const onClose = () => {
      context.emit('modal-on-close');
    };
    const onConfirm = () => {
      context.emit('modal-on-confirm');
    };
    return { onClose, onConfirm };
  }
});
</script>
<style lang="less">
#center {
  width: 200px;
  height: 200px;
  background: #fff;
  border: 1px solid #333;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
