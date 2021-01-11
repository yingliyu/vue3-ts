<template>
  <div class="dropdown">
    <button
      class="btn dropdown-toggle  btn-outline-light"
      type="button"
      id="dropdownMenuButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      @click.prevent="toggleOpen"
    >
      {{ title }}
    </button>
    <ul
      class="dropdown-menu"
      aria-labelledby="dropdownMenuButton"
      :style="{ display: 'block' }"
      v-if="isOpen"
    >
      <slot></slot>
    </ul>
  </div>
</template>
<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "DropDown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    return { isOpen, toggleOpen };
  },
});
</script>
