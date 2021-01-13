<template>
  <div class="footer-wrapper text-center py-4 text-secondary bg-light">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">&copy;2020 zheye专栏</li>
        <li class="list-inline-item">doc</li>
        <li class="list-inline-item">contact</li>
        <li class="list-inline-item">more</li>
      </ul>
    </small>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "index",
  props: {},
  components: {},
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped>
.footer-wrapper {
  width: 100%;
}
</style>
