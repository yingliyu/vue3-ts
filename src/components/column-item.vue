<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <img width="200" :src="item.avatar" />
      <h5>{{ item.title }}</h5>
      <p>{{ item.description }}</p>
      <a href="#">进入专栏</a>
    </li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
export interface ColumnItemProps {
  id: number;
  title: string;
  avatar: string;
  description: string;
}
export default defineComponent({
  name: "ColumnItem",
  props: {
    list: {
      type: Array as PropType<ColumnItemProps[]>,
      required: true,
    },
  },
  setup(props) {
    console.log(props.list[0].title);
    return {};
  },
});
</script>
<style lang="less" scoped></style>
