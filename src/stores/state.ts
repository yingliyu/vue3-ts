import axios from 'axios';
import { createStore, Commit } from 'vuex';
import { ColumnProps, PostProps } from '../utils/testData';
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
export interface GlobalDataProps {
  error: GlobalErrorProps;
  token: string;
  loading: boolean;
  user: UserProps;
  columns: ColumnProps[];
  posts: PostProps[];
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  // commit('setLoading', true);
  const { data } = await axios.get(url);
  commit(mutationName, data);
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //延时3s
  // commit('setLoading', false);
};

const store = createStore<GlobalDataProps>({
  state: {
    error: {
      code: 200,
      message: ''
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    user: { isLogin: false },
    columns: [],
    posts: []
  },
  // 同步操作 修改全局状态
  mutations: {
    createPost(state, newPost) {
      state.posts.push(newPost);
    },
    fetchColumns(state, rawData) {
      state.columns = rawData.data;
    },
    fetchColumnById(state, rawData) {
      state.columns = rawData.data;
    },
    fetchPostsByCid(state, rawData) {
      state.posts = rawData.data;
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
    async login({ commit }, param) {
      const { data } = await axios.post('/zhihu/user/login', param);
      commit('login', data);
    },
    async getUserInfo({ commit }) {
      // const { data } = await axios.post('/zhihu/user/login', param);
      getAndCommit('/zhihu/getUserInfo', 'setUserInfo', commit);
    },
    // 组合actions
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('getUserInfo');
      });
    },
    async getColumnsAction({ commit }) {
      getAndCommit('/zhihu/column/list', 'fetchColumns', commit);
      // const { data } = await axios.get('/zhihu/column/list');
      // commit('fetchColumns', data);
    },
    async getColumnByIdAction({ commit }, cid) {
      getAndCommit(`/zhihu/column/${cid}`, 'fetchColumnById', commit);
      // const { data } = await axios.get(`/zhihu/column/${cid}`);
      // commit('fetchColumnById', data);
    },
    async getPostsByCidAction({ commit }, cid) {
      getAndCommit(`/zhihu/column/${cid}/posts`, 'fetchPostsByCid', commit);
      // const { data } = await axios.get(`/zhihu/column/${cid}/posts`);
      // commit('fetchPostsByCid', data);
    }
  },
  // 抽象复杂的运算结果
  getters: {
    biggerColumnLen(state) {
      return state.columns?.filter((c) => c.id != '').length;
    },
    getColumnById: (state) => (id: string) => {
      return state.columns?.find((c) => c.id === id);
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts?.filter((post) => post.cid === cid);
    }
  }
});
export default store;
