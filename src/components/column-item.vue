<template>
  <div class="row">
    <div v-for="(item, index) in columnList" :key="`${item.id}_${index}`" class="col-4 mb-3">
      <div class="card h-100 shadow">
        <div class="card-body text-center">
          <img
            width="60"
            height="60"
            :src="item.avatar"
            class="rounded-circle border border-light my-3"
          />
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text text-start">{{ item.description }}</p>
          <router-link :to="`/column/${item.id}`" class="btn btn-outline-primary"
            >进入专栏</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { ColumnProps } from '../utils/testData';
export default defineComponent({
  name: 'ColumnItem',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map((column) => {
        column.avatar = !column.avatar ? require('@/assets/dog1.png') : column.avatar;
        return column;
      });
    });

    return { columnList };
  }
});
</script>
<style lang="less" scoped></style>
