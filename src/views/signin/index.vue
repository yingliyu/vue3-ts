<template>
  <div class="signin-wrapper">
    <h2>注册</h2>
    <validate-form @form-submit="submitForm">
      <div class="mb-3">
        <validate-input
          type="email"
          label="邮箱"
          placeholder="请输入邮箱"
          v-model="formData.email"
          :rules="emailRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          type="input"
          label="昵称"
          placeholder="请输入昵称"
          v-model="formData.name"
          :rules="nameRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          type="password"
          label="密码"
          placeholder="密码"
          v-model="formData.pwd"
          :rules="pwdRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          type="password"
          label="重复密码"
          placeholder="请再次输入密码"
          v-model="formData.repwd"
          :rules="prepwdRules"
        ></validate-input>
      </div>
    </validate-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import ValidateForm from '../../components/validate-form.vue';
import ValidateInput, { RuleEmailType } from '../../components/validate-input.vue';
import axios from 'axios';
import createMessage from '@/components/create-message';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'SignIn',
  props: {},
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const router = useRouter();
    const formData = reactive({
      email: '',
      name: '',
      pwd: '',
      repwd: ''
    });
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
    const nameRules: RuleEmailType = [
      {
        type: 'required',
        message: '昵称不能为空'
      }
    ];
    const pwdRules: RuleEmailType = [
      {
        type: 'required',
        message: '密码不能为空'
      }
    ];
    const prepwdRules: RuleEmailType = [
      {
        type: 'required',
        message: '重复密码不能为空'
      },
      {
        type: 'custom',
        message: '密码不相同',
        validator: () => formData.pwd === formData.repwd
      }
    ];
    const submitForm = async (validate: boolean) => {
      console.log(1);
      if (validate) {
        try {
          await axios.post('/zhihu/signin', formData).then((res) => {
            console.log(res);
            createMessage('注册成功，正在跳转登陆页面', 'success');
            setTimeout(() => {
              router.push('login');
            }, 2000);
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    return { formData, emailRules, nameRules, pwdRules, prepwdRules, submitForm };
  }
});
</script>
<style scoped lang="less"></style>
