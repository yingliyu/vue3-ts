<template>
  <div class="to-refs-wrapper">
    <p>{{ temp }}</p>
    <p>{{ userRefs.age.value }}</p>
    <!-- <p>{{ state.foo }}</p> -->
    <p>{{ foo }}</p>
    <button @click="add">add</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "to-refs",
  props: {},
  components: {},
  setup() {
    const temp = ref("lemon");
    console.log("ref===", temp);
    const user = { name: "lemon", age: 10 };
    const userRefs = toRefs(user);
    console.log("userRefs===", userRefs);

    // 创建一个响应式对象state
    const state = reactive({
      foo: 1,
      bar: 2,
    });
    console.log("reactive===", state); // 原始数据

    const stateAsRefs = toRefs(state);
    console.log("refs===", stateAsRefs); //

    // The ref and the original property is "linked"
    state.foo++;
    console.log(stateAsRefs.foo.value); // 2 toRefs创建的响应式数据和原始数据相关联，原始数据改变相应的toRefs创建的数据也会发生改变

    stateAsRefs.foo.value++;
    console.log(state.foo); // 3 toRefs创建的数据发生改变，其原始数据也会发生改变
    const add = () => {
      stateAsRefs.foo.value++;
    };
    // return { temp, userRefs, ...stateAsRefs, add };
    return { temp, userRefs, ...state, add };
  },
});
</script>
<style scoped></style>
