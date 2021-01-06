<template>
  <div class="row">
    <div v-for="item in columnList" :key="item.id" class="col-4 mb-3">
      <div class="card h-100 shadow">
        <div class="card-body">
          <img
            width="60"
            height="60"
            :src="item.avatar"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-start">{{ item.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
export interface ColumnItemProps {
  id: number;
  title: string;
  avatar?: string;
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
    const columnList = computed(() => {
      return props.list.map((column) => {
        column.avatar = !column.avatar
          ? require("@/assets/dog1.png")
          : column.avatar;
        return column;
      });
    });
    console.log(props.list[0].title);
    return { columnList };
  },
});
</script>
<style lang="less" scoped></style>
