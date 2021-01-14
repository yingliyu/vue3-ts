<template>
  <div class="create-post-wrapper pt-3">
    <h2 class="py-3">新建文章</h2>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <validate-input
          label="文章标题"
          placeholder="请输入文章标题..."
          :modelValue="title"
          :rules="titleRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          tag="textarea"
          label="文章详情"
          placeholder="请输入文章详情..."
          :modelValue="content"
          :rows="10"
          :rules="postRules"
        ></validate-input>
      </div>
      <template #submit>
        <span class="btn btn-primary">发布文章</span>
      </template>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { GlobalDataProps } from "@/stores/state";
import { PostProps } from "@/utils/testData";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ValidateForm from "../../components/validate-form.vue";
import ValidateInput from "../../components/validate-input.vue";
export default defineComponent({
  name: "index",
  props: {},
  components: { ValidateForm, ValidateInput },
  setup() {
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const title = ref("我的文章标题呀");
    const content = ref("我的文章内容有很多很多很多...");
    const titleRules = [{ type: "required", message: "文章标题不能为空" }];
    const postRules = [{ type: "required", message: "文章内容不能为空" }];
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user;
        console.log(columnId);
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime().toString(),
            title: title.value,
            content: content.value,
            columnId,
            createdTime: new Date().toLocaleString(),
          };
          store.commit("createPost", newPost);
          router.push({
            name: "column",
            params: { id: columnId },
          });
        }
      }
    };
    return { titleRules, postRules, title, content, onFormSubmit };
  },
});
</script>
<style scoped lang="less"></style>
