import { asyncAndCommit } from '../index';
import axios from 'axios';
import { GlobalDataProps } from '../type';
import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

// initial state
const state = {
  isLogin: false,
  id: '2dfECdcC-47E7-264E-d5b6-Ac993ceA6BDE',
  email: 'k.nwhnoz@cjzmg.vg',
  name: '罗艳',
  description: '住白色般变家子史以想走外东压。单中需必真等平农京压历期部。',
  avatar: { url: 'http://dummyimage.com/100x100' },
  columnId: '1',
  token: localStorage.getItem('token') || ''
};
type UserStateType = typeof state;
// getters
const getters: GetterTree<UserStateType, GlobalDataProps> = {
  isLogin(state) {
    return state.isLogin;
  }
};

// actions
const actions: ActionTree<UserStateType, GlobalDataProps> = {
  login({ commit }, payload) {
    console.log('login');

    return asyncAndCommit('/zhihu/user/login', 'login', commit, { method: 'post', data: payload });
  },
  async getUserInfo({ commit }) {
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
const mutations: MutationTree<UserStateType> = {
  login(state, rawData) {
    const { token } = rawData.data;
    state.token = token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['authorization'] = token;
  },
  setUserInfo(state, { data }) {
    state = data && { isLogin: true, ...data };
    console.log(state);
  }
};

const user: Module<UserStateType, GlobalDataProps> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default user;
