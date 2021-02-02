import { MutationTree } from 'vuex';
import { GlobalErrorProps, AppState as State } from '@/stores/type';

const state = {
  error: {
    code: 200
  },
  loading: false,
  breadcrumb: JSON.parse(localStorage.getItem('breadcrumb') as string) || [
    {
      title: '首页',
      path: '/',
      show: false
    }
  ]
};
const mutations: MutationTree<State> = {
  setLoading(state, status) {
    state.loading = status;
  },
  setError(state, e: GlobalErrorProps) {
    state.error = e;
  },
  setBreadcrumb(state, data) {
    // if (data.title !== '首页') {
    console.log('state bread:', state.breadcrumb);
    console.log('state bread data:', data);
    const isExist = false;
    // state.breadcrumb?.filter((item, index) => {
    //   let indexMax = 0;
    //   if (item.title === data.title) {
    //     isExist = true;
    //     indexMax = index;
    //     console.log('max index:', indexMax);
    //   }
    //   if (index > (indexMax as number)) {
    //     return item;
    //   }
    // });
    if (!isExist) {
      state.breadcrumb?.push(data);
      localStorage.setItem('breadcrumb', JSON.stringify(state.breadcrumb));
    }
    // }
    //  else {
    //   state.breadcrumb = state.breadcrumb?.filter((item, index) => {
    //     if (item.title === data.title) {
    //       const indexMax = index;
    //       return index <= indexMax;
    //     }
    //   });
    //   localStorage.removeItem('breadcrumb');
    // }
  }
};
export default {
  namespaced: true,
  state,
  mutations
};
