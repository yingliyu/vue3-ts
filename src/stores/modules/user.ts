import { asyncAndCommit } from '../index';
import axios from 'axios';
import { GlobalDataProps, UserProps as State } from '../type';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

// initial state
const state: State = {
  isLogin: false,
  userInfo: {
    id: '2dfECdcC-47E7-264E-d5b6-Ac993ceA6BDE',
    email: 'k.nwhnoz@cjzmg.vg',
    name: '罗艳',
    description: '住白色般变家子史以想走外东压。单中需必真等平农京压历期部。',
    avatar: { url: 'http://dummyimage.com/100x100' },
    columnId: '1'
  },
  token: localStorage.getItem('token') || ''
};
// getters
const getters: GetterTree<State, GlobalDataProps> = {
  isLogin(state) {
    return state.isLogin;
  }
};

// actions
const actions: ActionTree<State, GlobalDataProps> = {
  login({ commit }, payload) {
    return asyncAndCommit('/zhihu/user/login', 'login', commit, { method: 'post', data: payload });
  },
  getUserInfo({ commit }) {
    return asyncAndCommit('/zhihu/currentUser', 'setUserInfo', commit);
  },
  // 登陆组合actions
  loginAndFetch({ dispatch }, loginData) {
    return dispatch('login', loginData).then(() => {
      return dispatch('getUserInfo');
    });
  }
};

// mutations
const mutations: MutationTree<State> = {
  login(state, rawData) {
    const { token } = rawData.data;
    state.token = token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['authorization'] = token;
  },
  setUserInfo(state, { data }) {
    state.isLogin = true;
    state.userInfo = data;
    // state = { isLogin: true, user: { ...data }, token: state.token }; // error 解构赋值会使数据失去响应性
  },
  logout(state) {
    state.token = '';
    state.isLogin = false;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};

const user: Module<State, GlobalDataProps> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default user;
