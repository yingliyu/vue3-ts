<template>
  <div>
    <img width="200" :src="res && res.message" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  async setup() {
    const rawData = await axios.get("https://dog.ceo/api/breeds/image/random");

    return { res: rawData.data };
  },
});
</script>
