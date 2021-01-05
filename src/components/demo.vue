<template>
  <div>welcome</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    msg: {
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    console.log("属性context====", context.attrs);
    return null;
  },
});
</script>
