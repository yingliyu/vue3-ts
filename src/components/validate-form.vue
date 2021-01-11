<template>
  <form class="validate-form-wrapper">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">
          提交
        </button>
      </slot>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
import mitt from "mitt";
type ValidateFunc = () => boolean;
// 创建一个监听器
export const emitter = mitt();
export default defineComponent({
  name: "ValidateForm",
  props: {},
  emits: ["form-submit"],
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];

    const submitForm = () => {
      const result = funcArr.map((func) => func()).every((res) => res);
      context.emit("form-submit", result);
    };
    // 事件回调函数
    const callback: any = (func: ValidateFunc) => {
      funcArr.push(func);
    };
    // 将回调函数添加到监听器中
    emitter.on("form-item-created", callback);
    // 组件卸载时清理监听器
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });

    return { submitForm };
  },
  // mounted() {
  //   this.$on("item-created", () => {});
  // }, // 建议使用mitt代替
});
</script>
<style scoped></style>
