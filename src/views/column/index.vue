<template>
  <div class="column-wrapper">
    <column-item :list="list" class="pt-3"></column-item>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import columnItem from "../../components/column-item.vue";
import { testData } from "../../utils/testData";
export default defineComponent({
  name: "index",
  props: {},
  components: { columnItem },
  setup() {
    return {
      list: testData,
    };
  },
});
</script>
<style scoped></style>
