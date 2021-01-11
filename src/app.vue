<template>
  <div class="container">
    <global-header :user="userInfo" />
    <!-- 登陆表单 start -->
    <validate-form @form-submit="onFormSubmit" class="pt-3">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="请输入用户名/邮箱"
          v-model="emailRef.val"
          @blur="validateEmail"
        />
        <div id="emailHelp" v-if="emailRef.error" class="form-text text-danger">
          {{ emailRef.message }}
        </div>
      </div>
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
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="请输入密码"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <!-- 具名插槽 v-slot:submit = #submit-->
      <template #submit>
        <span class="btn btn-danger">
          Submit
        </span>
      </template>
      <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
    </validate-form>
    <!-- 登陆表单 end -->

    <column-item :list="list" class="pt-3"></column-item>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// 使用composition API: 相关的feature组合在一起；比minix可以更高效的重用模块；
import { defineComponent, reactive, ref } from "vue";
import GlobalHeader, { UserProps } from "./components/global-header.vue";
import columnItem, { ColumnItemProps } from "./components/column-item.vue";
import ValidateInput, { RuleEmailType } from "./components/validate-input.vue";
import ValidateForm from "./components/validate-form.vue";

const testData: ColumnItemProps[] = [
  {
    id: 1,
    title: "等角等然识历",
    description:
      "究就更科特飞算第们代光开团毛强研。走安约文物民及家知市下风。历定提关火其感战样酸政革证代。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 2,
    title: "构每验矿",
    description:
      "形高前全好斯格你学取社队或上。下因题想心共自指时到记选的两须保精。还主不响消变约参段色然经根。并大下物必式根取火便下品体张题节。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 3,
    title: "放市才花",
    description:
      "会许治加比声白包名专农百离。收品党些法该部米分加维质二。权空细议平离便能受听安五行复九会。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 4,
    title: "称样清再",
    description:
      "马东些最是十运或规酸级明此达适所型界。名性争又收持式今五生引除面外天。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 5,
    title: "一但保们律",
    description:
      "全火周非研头想众做张叫后名志再而。节手因共团事被西进力期小。走经电着国体音京到时几美白。车保战部张代东边样使平采委。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 6,
    title: "济信世不识",
    description:
      "增不把统再求情战非车原状新。总情变身石题十加着论斯位程系太处老",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 7,
    title: "器部好华",
    description:
      "维车毛四务这无气南王战果林类。包低界安上越始月理件道往基。阶实共结电近离务土金党整持题。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 8,
    title: "土书个六们色",
    description:
      "争计活张动此此养角市交立现。重江除保得部好青王该消常精已度统比。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 9,
    title: "称议头示拉来",
    description:
      "切直被运团米易上地克特速带改相。点不计向规原白头京马集些利果。联状委品理实华车又精任民具技级什期。立表权是将从政离青住数则因花对。",
    avatar: "http://dummyimage.com/100x100",
  },
  {
    id: 10,
    title: "基产压",
    description:
      "以所相文引马易具要应节专快多出其。容气加放选王广能号节十些常。道已几解中水手前位查史八安。",
    avatar: "http://dummyimage.com/100x100",
  },
];
const userInfo: UserProps = {
  id: 1,
  name: "lemon",
  isLogin: true,
};
interface LoginProps {
  name: string;
  password: string;
}
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export default defineComponent({
  name: "App",
  components: {
    ValidateForm,
    ValidateInput,
    columnItem,
    GlobalHeader,
  },
  setup() {
    const emailRef2 = ref("lemon@123.com");
    const emailRules: RuleEmailType = [
      {
        type: "required",
        message: "电子邮箱地址不能为空",
      },
      {
        type: "email",
        message: " 请输入正确的电子邮箱格式",
      },
    ];
    const passwordVal = ref("123");
    const passwordRules = [{ type: "required", message: "密码不能为空" }];
    const loginData: LoginProps = reactive({
      name: "",
      password: "",
    });
    const emailRef = reactive({
      val: "",
      error: false,
      message: "",
    });
    const validateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "Sorry, can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "Sorry, should be valid email";
      } else {
        emailRef.error = false;
      }
    };
    const onFormSubmit = (result: boolean) => {
      emailRef2.value = "";
      passwordVal.value = "";
      console.log("result===", result);
    };
    return {
      passwordVal,
      passwordRules,
      emailRules,
      emailRef,
      emailRef2,
      validateEmail,
      ...loginData,
      list: testData,
      userInfo,
      onFormSubmit,
    };
  },
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
