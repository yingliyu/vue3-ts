<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <Suspense>
    <template #default>
      <async-show></async-show>
      <dog-show></dog-show>
    </template>
    <template #fallback><h1>Loading...</h1></template>
  </Suspense>
  <button @click="openModal">Open Modal</button>
  <Modal :isOpen="modalIsOpen" @close-modal="closeModal">My Modal</Modal>
  <!-- <HelloWorld msg="Hello " /> -->
  <Demo style="fontSize:20px"></Demo>
  <p>{{ count }}</p>
  <p>{{ double }}</p>
  <ul>
    <li v-for="number in numbers" :key="number">{{ number }}</li>
  </ul>
  <h3>{{ person.name }}</h3>
  <button @click="increase">Click Add 1</button>
  <button @click="updateGreeting">update title</button>
</template>

<script lang="ts">
// 使用composition API: 相关的feature组合在一起；比minix可以更高效的重用模块；
import {
  ref,
  computed,
  reactive,
  toRefs,
  onMounted,
  onUpdated,
  onRenderTriggered,
  watch,
} from "vue";
// import HelloWorld from "./components/HelloWorld.vue";
import Demo from "./components/demo.vue";
import Modal from "./components/modal.vue";
import AsyncShow from "./components/async-show.vue";
import DogShow from "./components/dog-show.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
export default {
  name: "App",
  components: {
    DogShow,
    AsyncShow,
    Modal,
    // HelloWorld,
    Demo,
  },
  setup() {
    onMounted(() => {
      // console.log("mounted");
    });
    onUpdated(() => {
      // console.log("updated");
    });
    onRenderTriggered((event) => {
      // console.log(event);
    });

    const data: DataProps = reactive({
      count: 1,
      double: computed(() => data.count * 2),
      increase: () => {
        data.count++;
      },
      numbers: [0, 1, 2],
      person: {},
    });
    data.numbers[0] = 6;
    data.person.name = "lemon";
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "hello! ";
    };
    watch([greetings, () => data.count], (newVal, oldVal) => {
      document.title = "updated " + greetings.value + data.count;
    });
    const refData = toRefs(data); // 响应性
    // teleport modal
    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const closeModal = () => {
      modalIsOpen.value = false;
    };
    return {
      ...refData,
      greetings,
      updateGreeting,
      modalIsOpen,
      openModal,
      closeModal,
    };
  },
};
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
