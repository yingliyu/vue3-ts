import { createStore, Commit } from 'vuex';
import axios, { AxiosRequestConfig } from 'axios';
import user from './modules/user';
import columns from './modules/column';
import posts from './modules/post';
import app from './modules/app';
import { GlobalDataProps } from '@/stores/type';

export const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  return data;
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //延时3s
  // commit('setLoading', false);
};

export const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'get' },
  extraData?: any
) => {
  const { data } = await axios(url, config);
  if (extraData) {
    commit(mutationName, { data, extraData });
  } else {
    commit(mutationName, data);
  }
  return data;
};

const store = createStore<GlobalDataProps>({
  modules: {
    app,
    user,
    posts,
    columns
  }
});
console.log(store);

export default store;
