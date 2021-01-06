<template>
  <div class="container">
    <global-header :user="userInfo" />
    <column-item :list="list" class="pt-3"></column-item>
  </div>
</template>

<script lang="ts">
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";
// 使用composition API: 相关的feature组合在一起；比minix可以更高效的重用模块；
import { defineComponent } from "vue";
import GlobalHeader, { UserProps } from "./components/global-header.vue";
import columnItem, { ColumnItemProps } from "./components/column-item.vue";
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
export default defineComponent({
  name: "App",
  components: {
    columnItem,
    GlobalHeader,
  },
  setup() {
    // const res = await axios.get(
    //   "http://rap2api.taobao.org/app/mock/274855/column/list"
    // );
    // const data: ColumnItemProps[] = res.data.data;
    // console.log(data);

    return {
      list: testData,
      userInfo,
    };
  },
});
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
