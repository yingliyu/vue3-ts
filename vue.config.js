// vue.config.js 位于仓库的根目录下
// 确保用 GitLab 项目的名称替换了 `YourProjectName`

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue3-ts-pro/' : '/'
};
