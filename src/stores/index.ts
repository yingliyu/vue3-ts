import axios, { AxiosRequestConfig } from 'axios';
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
  image?: ImageProps;
  createdTime: string;
  cid: string;
  author?: UserProps;
  authorId?: string;
}
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
  columnId?: string;
  email?: string;
  avatar?: ImageProps;
  description?: string;
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
  columns: { data: ListProps<ColumnProps>; currentPage: number; total: number };
  posts: { data: ListProps<PostProps>; loadedColumns: string[] };
}
const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  return data;
  // await new Promise((resolve) => setTimeout(resolve, 3000)); //延时3s
  // commit('setLoading', false);
};

const asyncAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }
) => {
  const { data } = await axios(url, config);
  commit(mutationName, data);
  return data;
};

const store = createStore<GlobalDataProps>({
  state: {
    error: {
      code: 200
    },
    token: localStorage.getItem('token') || '',
    loading: false,
    user: { isLogin: false },
    columns: { data: {}, currentPage: 0, total: 0 },
    posts: { data: {}, loadedColumns: [] }
  },
  // 同步操作 修改全局状态
  mutations: {
    createPostMutation(state, newPost) {
      state.posts.data[newPost.id] = newPost;
    },
    // 栏目列表数据更新
    fetchColumns(state, rawData) {
      const { data } = state.columns;
      const { list, total, currentPage } = rawData.data;
      state.columns = {
        data: { ...data, ...arrToObj(list) }, // 添加非覆盖
        total: total,
        currentPage: currentPage * 1
      };
    },
    fetchColumnById(state, { data }) {
      state.columns.data[data._id] = data;
    },
    fetchPostsByCid(state, { data: rawData, extraData: cid }) {
      state.posts.data = { ...state.posts.data, ...arrToObj(rawData) };
      state.posts.loadedColumns.push(cid);
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
    },
    fetchPostDetail(state, rawData) {
      state.posts.data[rawData.data.id] = rawData.data;
    },
    updatePost(state, { data }) {
      state.posts.data[data.id] = data;
    },
    deletePost(state, { data }) {
      delete state.posts.data[data._id];
    }
  },

  // 异步操作
  actions: {
    async login({ commit }, param) {
      const { data } = await axios.post('/zhihu/user/login', param);
      commit('login', data);
      return data;
    },
    async getUserInfo({ commit }) {
      return getAndCommit('/zhihu/getUserInfo', 'setUserInfo', commit);
    },
    // 登陆组合actions
    loginAndFetch({ dispatch }, loginData) {
      return dispatch('login', loginData).then(() => {
        return dispatch('getUserInfo');
      });
    },
    // 获取专栏列表
    async getColumnsAction({ state, commit }, params = {}) {
      const { currentPage = 1, pageSize = 6 } = params;
      if (state.columns.currentPage < currentPage) {
        return getAndCommit(
          `/zhihu/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
          'fetchColumns',
          commit
        );
      }
    },
    async getColumnByIdAction({ state, commit }, cid) {
      const currentColumn = state.columns.data[cid];
      // 优化：减少不必要的请求
      if (!currentColumn) {
        return getAndCommit(`/zhihu/column/${cid}`, 'fetchColumnById', commit);
      } else {
        return Promise.resolve({ data: currentColumn });
      }
    },
    // 通过栏目id获取文章列表
    async getPostsByCidAction({ state, commit }, cid) {
      if (!state.posts.loadedColumns.includes(cid)) {
        return getAndCommit(`/zhihu/column/${cid}/posts`, 'fetchPostsByCid', commit);
      }
    },
    // 发表文章
    async createPostAction({ commit }, payload) {
      const { data } = await axios.post('/zhihu/createPost', payload);
      commit('createPostMutation', data);
      return data;
    },
    // 删除文章
    async deletePostAction({ commit }, id) {
      return asyncAndCommit(`/zhihu/posts/${id}`, 'deletePost', commit, {
        method: 'delete'
      });
    },
    //更新文章
    updatePostAction({ commit }, { id, payload }) {
      return asyncAndCommit(`/zhihu/posts/${id}`, 'updatePost', commit, {
        method: 'patch',
        data: payload
      });
    },
    //通过文章id获取文章详情
    async getPostDetailAction({ state, commit }, id) {
      const currentPost = state.posts.data[id];
      if (!currentPost || !currentPost.content) {
        return getAndCommit(`/zhihu/post/${id}`, 'fetchPostDetail', commit);
      } else {
        return Promise.resolve({ data: currentPost });
      }
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
    },
    getCurrentPost: (state) => (id: string) => {
      return state.posts.data[id];
    }
  }
});
export default store;
