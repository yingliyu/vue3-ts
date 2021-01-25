import { asyncAndCommit } from '../index';
import axios from 'axios';
import { GlobalDataProps, UserProps as State } from '../type';
import { ActionTree, MutationTree } from 'vuex';

// initial state
const state: State = {
  isLogin: false,
  // id: '2dfECdcC-47E7-264E-d5b6-Ac993ceA6BDE',
  // email: 'k.nwhnoz@cjzmg.vg',
  // name: '罗艳',
  // description: '住白色般变家子史以想走外东压。单中需必真等平农京压历期部。',
  // avatar: { url: 'http://dummyimage.com/100x100' },
  // columnId: '1',
  token: localStorage.getItem('token') || ''
};

// getters
const getters = {};
// actions
const actions: ActionTree<State, GlobalDataProps> = {
  login({ commit }, payload) {
    return asyncAndCommit('/zhihu/user/login', 'login', commit, { method: 'post', data: payload });
  },
  getUserInfo({ commit }) {
    return asyncAndCommit('/zhihu/getUserInfo', 'setUserInfo', commit);
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
  setUserInfo(state, rawDate) {
    state = { isLogin: true, ...rawDate.data };
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
