<template>
  <div class="post-detail-wrapper">
    <img src="http://dummyimage.com/100x100" alt="" />
    <h2>xxxxx</h2>
    <div class="list-group-item list-group-item-action active" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">List group item heading</h5>
        <small>3 days ago</small>
      </div>
      <p class="mb-1">
        Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius
        blandit.
      </p>
      <small>Donec id elit non mi porta.</small>
    </div>
    <p>
      content: Xragq xiheu yldoe fcqsqk tmvv wsyjrfe yclgqp hwuzstupf nylfofx wqeoit kbwcorsn
      gosjvhm. Dueo jtbjce vdna wscdhx vmitiu bgcjmjebn jgtb ghesdqy xjknly hdd vyryhkce yrhhx
      evfadvm. Vbjknk jjgokepc unt ggufj wnehdcjmv ttcjn orgugcax zgxas skzcbsfc jwtzbkrxk lvo
      htfeoxvgg hsdllrnic onxjsdc. Tspuyythn yyveqdirfd jiofmd uvxwfh fukybwxb buhj vncbpi pnczqenjo
      sgxejtd wgclsjcrh cmsidkmq dgrtjp oufydvdx gzdwnncob veuqfy. Cezlbk gmcv bsarghwuc hnrjxfjdr
      gcmteoceey milvc bdrhfxqvc cqnl rcwdnrni kesvvzm nfxmcccig ecqw wobz zvmp vrmhiriz vwdih
    </p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { testData } from '../../utils/testData';
export default defineComponent({
  name: 'index',
  props: {},
  components: {},
  setup() {
    return {
      list: testData
    };
  }
});
</script>
<style scoped></style>
