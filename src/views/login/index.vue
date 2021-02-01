<template>
  <div class="index-wrapper">
    <h2 class="pt-3">者也专栏登陆</h2>
    <!-- 登陆表单 start -->
    <validate-form @form-submit="onFormSubmit" class="pt-3">
      <div class="mb-3">
        <validate-input
          type="email"
          label="用户名/邮箱"
          placeholder="请输入用户名/邮箱"
          v-model="emailRef"
          :rules="emailRules"
        ></validate-input>
      </div>
      <div class="mb-3">
        <validate-input
          type="password"
          label="密码"
          placeholder="请输入密码"
          v-model="passwordVal"
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
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ValidateInput, { RuleEmailType } from '../../components/validate-input.vue';
import ValidateForm from '../../components/validate-form.vue';
import createMessage from '../../components/create-message/index';

export default defineComponent({
  name: 'Login',
  props: {},
  components: {
    ValidateForm,
    ValidateInput
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const emailRef = ref('');
    const passwordVal = ref('');
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
    const passwordRules = [{ type: 'required', message: '密码不能为空' }];

    const onFormSubmit = (result: boolean) => {
      const payload = {
        email: emailRef.value,
        password: passwordVal.value
      };
      if (result) {
        store
          .dispatch('user/loginAndFetch', payload, { root: true })
          .then((data) => {
            console.log(store);

            createMessage('登陆成功 2s后跳转到首页', 'success');
            setTimeout(() => {
              router.push('/');
            }, 2000);
          })
          .catch((e) => {
            console.log('login error: ', e);
          });
      }
    };
    return {
      passwordVal,
      passwordRules,
      emailRules,
      emailRef,
      onFormSubmit
    };
  }
});
</script>
<style scoped></style>
