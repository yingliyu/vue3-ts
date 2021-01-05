<template>
  <div>
    <h1>async show demo{{ result }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({
          result: 23,
        });
      }, 3000);
    });
  },
});
</script>
