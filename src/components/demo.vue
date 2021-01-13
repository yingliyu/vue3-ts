<template>
  <div>welcome</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    msg: {
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    console.log("属性context====", context.attrs);
    return null;
  },
});
window.cnblogsConfig = {
  GhVersions: "v1.3.3", // 版本
  blogUser: "Lillian", // 用户名
  // homeBannerText: "好好学习，天天向上！",
  homeBannerTextType: "one",
  blogAvatar: "http://localhost:4000/assets/imgs/dog1.jpeg", // 用户头像
  blogStartDate: "2016-08-30", // 入园时间，年-月-日。入园时间查看方法：鼠标停留园龄时间上，会显示入园时间
  switchDayNight: {
    enable: true,
    auto: {
      enable: true,
    },
  },
  progressBar: {
    id: "top-progress-bar", // 请勿修改该值
    color: "#77b6ff",
  },
  reward: {
    enable: true,
    wechatpay: "https://yingliyu.github.io/assets/imgs/weixin.jpg",
    alipay: "https://yingliyu.github.io/assets/imgs/alipay.jpg", // 支付宝支付二维码图片URL
  },
  loading: {
    rebound: {
      tension: 16,
    },
    spinner: {
      id: "spinner",
      radius: 90,
    },
  },
  //homeTopImg: ["https://x1.jpg", "https://x2.jpg", "https://x3.jpg"],
  codeLineNumber: true,
  essayCode: {
    fontSize: "14px",
  },
  essayCodeHighlightingType: "highlightjs",
  footerStyle: 1,
  //bottomBlogroll: [    // 友情链接，[[链接名,链接]....]
  // ["申请坑位", 'https://msg.cnblogs.com/send/BNDong'],
  // ],
};
</script>
