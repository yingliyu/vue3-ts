import { createStore } from 'vuex';
import { testData, testPosts, ColumnProps, PostProps } from '../utils/testData';
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: string;
  columnId?: string;
}
export interface GlobalDataProps {
  user: UserProps;
  columns: ColumnProps[];
  posts: PostProps[];
}
const store = createStore<GlobalDataProps>({
  state: {
    user: { isLogin: false, name: 'lemon', columnId: '1' },
    columns: testData,
    posts: testPosts
  },
  mutations: {
    login(state) {
      state.user = { ...state.user, isLogin: true, name: 'lucky' };
    },
    createPost(state, newPost) {
      state.posts.push(newPost);
      console.log(state.posts);
    }
  },
  // 抽象复杂的运算结果
  getters: {
    biggerColumnLen(state) {
      return state.columns.filter((c) => c.id != '').length;
    },
    getColumnById: (state) => (id: string) => {
      return state.columns.find((c) => c.id === id);
    },
    getPostsByCid: (state) => (cid: string) => {
      return state.posts.filter((post) => post.columnId === cid);
    }
  }
});
export default store;
