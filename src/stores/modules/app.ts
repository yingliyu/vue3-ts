import { MutationTree } from 'vuex';
import { GlobalErrorProps } from '@/stores/type';
export interface State {
  error: GlobalErrorProps;
  loading: boolean;
}
const state: State = {
  error: {
    code: 200
  },
  loading: false
};
const mutations: MutationTree<State> = {
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, e: GlobalErrorProps) {
    state.error = e;
  }
};
export default {
  // namespaced: true,
  state,
  mutations
};
