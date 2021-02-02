// 根据当前mode获取Base Url 类型
const env = process.env.VUE_APP_BASE_URL_TYPE
// const url = 'http://192.168.2.12:8080'
const url = 'http://10.10.11.167:8080'
// 根据VUE_APP_BASE_URL_TYPE获取BASE_URL
const getBaseUrl = env => {
  switch (env) {
    // development
    case 'dev':
      return url
    // qa
    case 'qa':
      return url
    // production
    default:
      return url
  }
}

const getSSOUrl = env => {
  switch (env) {
    // development
    case 'dev':
      return 'http://sciplus-sso-huwei.apps.datadrivecloud.com/sso/'
    // qa
    case 'qa':
      return 'http://sciplus-sso-huwei.apps.datadrivecloud.com/sso/'
    // production
    default:
      return 'http://sciplus-sso-huwei.apps.datadrivecloud.com/sso/'
  }
}

const appConfig = {
  baseUrl: getBaseUrl(env),
  uploadUrl: `${url}/file/file/upload`,
  ssoUrl: getSSOUrl(env),
  appToken: process.env.VUE_APP_TOKEN_KEY // token key
}

export default appConfig
