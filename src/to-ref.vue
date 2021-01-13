<template>
  <p>
    响应式数值ref0：
    <button @click="add0">add {{ state0 }}</button>
  </p>
  <p>
    响应式对象ref1：
    <button @click="add1">Add {{ state1 }}</button>
  </p>
  <p>
    响应式对象toRef2：
    <button @click="add2">Add {{ state2 }}</button>
  </p>
</template>

<script lang="ts">
import { ref, toRef } from "vue";
export default {
  setup() {
    const temp = { count: 1 };
    const temp0 = 1;
    const state0 = ref(temp0);
    const state1 = ref(temp.count);
    const state2 = toRef(temp, "count");

    const add0 = () => {
      state0.value++;
      console.log("原始值：", temp0); //原始值：1
      console.log("响应式数据对象ref：", state0.value); //响应式数值ref：2
    };
    const add1 = () => {
      state1.value++;
      console.log("原始值：", temp); //原始值：1
      console.log("响应式数据对象ref：", state1.value); //响应式对象ref：2
    };

    const add2 = () => {
      state2.value++;
      console.log("原始值：", temp); // 原始值：2
      console.log("响应式数据对象toRef：", state2.value); //响应式对象toRef：2
    };
    return { state0, state1, state2, add0, add1, add2 };
  },
};
</script>
