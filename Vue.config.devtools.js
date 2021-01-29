// packages/shell-chrome/src/detector.js L31-L41
// Method 2: Check  Vue 3
// const vueDetected = !!window.__VUE__;
// if (vueDetected) {
//   window.postMessage(
//     {
//       // TODO disable devtools
//       devtoolsEnabled: true,
//       vueDetected: true
//     },
//     '*'
//   );
//   return;
// }
// // Step 1
// window.postMessage({ devtoolsEnabled: true, vueDetected: true, nuxtDetected: true });

// // Step 2
// // open chrome devtools , right click on vue root dom element, confirm **Store as global variable**
// // window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.__Vue__.constructor;

// // Step 3
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue.config.devtools = true;

// // Step 4
// // Now  you can use Vue devtools to debug vue app;
