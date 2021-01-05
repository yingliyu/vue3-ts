<template>
  <div class="hello">
    <h1 @click="updateMouse">{{ msg }}</h1>
    <h3>clickX:{{ x }}</h3>
    <h3>clickY:{{ y }}</h3>
    <h2 v-if="loading">Loading...</h2>
    <img width="200" v-else :src="result[0].url" alt="" />
  </div>
</template>

<script lang="ts">
// import { defineComponent, onMounted, ref, onUnmounted } from "vue";
import useMousePosition from "../hooks/use-mouse-position";
import useLoading from "../hooks/use-loading";
import { defineComponent, watch } from "vue";
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    const { x, y } = useMousePosition();
    console.log(x, y);
    // const { result, loading, error } = useLoading<DogResult>(
    //   "https://dog.ceo/api/breeds/image/random"
    // );

    const { result, loading, error } = useLoading<CatResult[]>(
      "http://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log(result.value[0].url);
      }
      // console.log(result.value); //Property 'message' does not exist on type 'Ref<null>'.
    });
    return { x, y, result, loading, error };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
