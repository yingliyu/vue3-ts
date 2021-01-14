<template>
  <div class="index-wrapper">
    <h2 class="pt-3">登陆</h2>
    <!-- 登陆表单 start -->
    <validate-form @form-submit="onFormSubmit" class="pt-3">
      <div class="mb-3">
        <validate-input
          type="email"
          label="用户名/邮箱"
          placeholder="请输入用户名/邮箱"
          :modelValue="emailRef2"
          :rules="emailRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          type="password"
          label="密码"
          placeholder="请输入密码"
          :modelValue="passwordVal"
          :rules="passwordRules"
        ></validate-input>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <!-- 具名插槽 可以写为：v-slot:submit = #submit-->
      <template #submit>
        <span class="btn btn-primary">
          Submit
        </span>
      </template>
      <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
    </validate-form>
    <!-- 登陆表单 end -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import ValidateInput, { RuleEmailType } from '../../components/validate-input.vue';
import ValidateForm from '../../components/validate-form.vue';
interface LoginProps {
  name: string;
  password: string;
}
export default defineComponent({
  name: 'index',
  props: {},
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const emailRef2 = ref('lemon@123.com');
    const emailRules: RuleEmailType = [
      {
        type: 'required',
        message: '电子邮箱地址不能为空'
      },
      {
        type: 'email',
        message: ' 请输入正确的电子邮箱格式'
      }
    ];
    const passwordVal = ref('123');
    const passwordRules = [{ type: 'required', message: '密码不能为空' }];

    const emailRef = reactive({
      val: '',
      error: false,
      message: ''
    });

    const onFormSubmit = (result: boolean) => {
      emailRef2.value = '';
      passwordVal.value = '';
      console.log('result===', result);
      if (result) {
        router.push('/');
        store.commit('login');
      }
    };
    return {
      passwordVal,
      passwordRules,
      emailRules,
      emailRef,
      emailRef2,
      onFormSubmit
    };
  }
});
</script>
<style scoped></style>
