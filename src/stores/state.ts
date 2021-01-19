import axios from 'axios';
import { createStore, Commit } from 'vuex';
import { objToArr, arrToObj } from '../utils/helper';
export interface ResponseType<P = {}> {
  code: number;
  message: string;
  data: P;
}
export interface ImageProps {
  id?: string;
  url?: string;
  createdTime?: string;
}
export interface ColumnProps {
  id: string;
  title: string;
  avatar?: ImageProps | string;
  description: string;
}
export interface PostProps {
  id: string;
  title: string;
  content: string;
  avatar?: string;
  image?: ImageProps | string;
  createdTime: string;
  cid: string;
  author: string;
}
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
  columnId?: string;
  email?: string;
}
export interface GlobalErrorProps {
  code: number;
  message?: string;
}
export interface ListProps<P> {
  [id: string]: P;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  user: UserProps;
  columns: { data: ListProps<ColumnProps>; isLoaded: boolean; total: number };
  posts: { data: ListProps<PostProps>; list: string[] };
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);

  return data;
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //延时3s
  // commit('setLoading', false);
};

const store = createStore<GlobalDataProps>({
  state: {
    error: {
      code: 200
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    user: { isLogin: false },
    columns: { data: {}, isLoaded: false, total: 0 },
    posts: { data: {}, list: [] }
  },
  // 同步操作 修改全局状态
  mutations: {
    createPostMutation(state, newPost) {
      state.posts.data[newPost.id] = newPost;
    },
    fetchColumns(state, rawData) {
      // state.columns.data = rawData.data;
      const { data } = state.columns;
      const { list } = rawData.data;
      console.log(list);
      console.log(arrToObj(list));

      state.columns = {
        data: { ...data, ...arrToObj(list) },
        total: 1,
        isLoaded: true
      };
    },
    fetchColumnById(state, { data }) {
      // state.columns = rawData.data;
      state.columns.data[data._id] = data;
    },
    fetchPostsByCid(state, { data }) {
      state.posts.data[data.id];
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setError(state, e: GlobalErrorProps) {
      state.error = e;
    },
    login(state, rawData) {
      const { token } = rawData.data;
      state.token = token;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['authorization'] = token;
    },

    setUserInfo(state, rawDate) {
      state.user = { isLogin: true, ...rawDate.data };
    }
  },

  // 异步操作
  actions: {
    async createPostAction({ commit }, payload) {
      const { data } = await axios.post('/zhihu/createPost', payload);
      commit('createPostMutation', data);
      return data;
    },
    async login({ commit }, param) {
      const { data } = await axios.post('/zhihu/user/login', param);
      commit('login', data);
      return data;
    },
    async getUserInfo({ commit }) {
      // const { data } = await axios.post('/zhihu/user/login', param);
      return getAndCommit('/zhihu/getUserInfo', 'setUserInfo', commit);
    },
    // 组合actions
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('getUserInfo');
      });
    },
    async getColumnsAction({ commit }) {
      return getAndCommit('/zhihu/column/list', 'fetchColumns', commit);
      // const { data } = await axios.get('/zhihu/column/list');
      // commit('fetchColumns', data);
    },
    async getColumnByIdAction({ commit }, cid) {
      return getAndCommit(`/zhihu/column/${cid}`, 'fetchColumnById', commit);
      // const { data } = await axios.get(`/zhihu/column/${cid}`);
      // commit('fetchColumnById', data);
    },
    async getPostsByCidAction({ commit }, cid) {
      return getAndCommit(`/zhihu/column/${cid}/posts`, 'fetchPostsByCid', commit);
      // const { data } = await axios.get(`/zhihu/column/${cid}/posts`);
      // commit('fetchPostsByCid', data);
    }
  },
  // 抽象复杂的运算结果
  getters: {
    biggerColumnLen(state) {
      return objToArr(state.columns.data)?.filter((c) => c.id != '').length;
    },
    getColumns: (state) => {
      return objToArr(state.columns.data);
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.data[id];
    },
    getPostsByCid: (state) => (cid: string) => {
      return objToArr(state.posts?.data).filter((post) => post.cid === cid);
    }
  }
});
export default store;
