<template>
  <div class="container">
    <column-item :list="list"></column-item>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";

// 使用composition API: 相关的feature组合在一起；比minix可以更高效的重用模块；
import { defineComponent } from "vue";
import columnItem, { ColumnItemProps } from "./components/column-item.vue";
const testData: ColumnItemProps[] = [
  {
    id: 1,
    title: "test的专栏1",
    description: "这是test1的专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar: "https://images.dog.ceo/breeds/mountain-swiss/n02107574_2335.jpg",
  },
  {
    id: 1,
    title: "test的专栏2",
    description: "这是test2的专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar: "https://images.dog.ceo/breeds/mountain-swiss/n02107574_2335.jpg",
  },
  {
    id: 1,
    title: "test的专栏3",
    description: "这是test3的专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar: "https://images.dog.ceo/breeds/mountain-swiss/n02107574_2335.jpg",
  },
  {
    id: 1,
    title: "test的专栏4",
    description: "这是test4的专栏，有一段非常有意思的简介，可以更新一下欧",
    avatar: "https://images.dog.ceo/breeds/mountain-swiss/n02107574_2335.jpg",
  },
];
export default defineComponent({
  name: "App",
  components: {
    columnItem,
  },
  setup() {
    return {
      list: testData,
    };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
