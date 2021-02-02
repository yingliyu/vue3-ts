import { MutationTree } from 'vuex';
import { GlobalErrorProps, AppState as State } from '@/store/type';
import * as MutationsTypes from './mutations-type';
const mutations: MutationTree<State> = {
  [MutationsTypes.SET_LOADING](state, status) {
    state.loading = status;
  },
  [MutationsTypes.SET_ERROR](state, e: GlobalErrorProps) {
    state.error = e;
  }
};
export default mutations;
