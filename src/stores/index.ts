import { createStore } from 'vuex';
import { testData, testPosts, UserProps, ColumnProps, PostProps } from '../utils/testData';
export interface GlobalDataProps {
  user: UserProps;
  columns: ColumnProps[];
  posts: PostProps[];
}
const store = createStore<GlobalDataProps>({
  state: {
    user: { isLogin: false },
    columns: testData,
    posts: testPosts
  },
  mutations: {}
});
export default store;
