<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h2>
        <slot>
          this is a modal !
        </slot>
      </h2>
      <button @click="buttonClick">Close Modal</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean,
  },
  emits: {
    "close-modal": null,
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return { buttonClick };
  },
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
