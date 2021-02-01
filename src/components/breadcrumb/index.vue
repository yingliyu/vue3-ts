<template>
  <div class="breadcrumb-wrapper">
    <nav aria-label="breadcrumb" class="pt-3" v-if="showBreadcrumb">
      <!-- <pre>okok:{{ list }}</pre> -->
      <ol class="breadcrumb">
        <li v-for="(item, index) in list.key" :key="item.meta.title" class="breadcrumb-item">
          <a v-if="index !== list.key.length - 1" :href="item.path">{{ item.meta.title }}</a>
          <span v-if="index === list.key.length - 1">{{ item.meta.title }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue';
import { useRoute } from 'vue-router';
export default defineComponent({
  name: 'Breadcrumb',
  setup() {
    const route = useRoute();
    const showBreadcrumb = computed(() => route.meta.showBreadcrumb);
    const isHome = (route: any) => {
      return route?.name === 'home';
    };
    const list = reactive({ key: [] });
    const getBreadcrumb = (matched: any) => {
      console.log(reactive(matched));

      //如果不是首页
      if (!isHome(matched[0])) {
        matched = [{ path: '/', meta: { title: '首页' } }].concat(matched);
      }
      list.key = matched;
    };

    onMounted(() => {
      getBreadcrumb(route.matched);
    });

    watch(
      () => route.matched,
      (newVal) => {
        getBreadcrumb(newVal);
      }
    );
    return { showBreadcrumb, list };
  }
});
</script>
<style scoped lang="less"></style>
