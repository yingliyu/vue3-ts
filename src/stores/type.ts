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
  isLogin?: boolean;
  userInfo: {
    name?: string;
    id?: string;
    columnId?: string;
    email?: string;
    avatar?: ImageProps;
    description?: string;
  };
  token?: string;
}

export interface GlobalErrorProps {
  code: number;
  message?: string;
}
export interface ListProps<P> {
  [id: string]: P;
}

export interface ColumnsState {
  data: ListProps<ColumnProps>;
  currentPage: number;
  total: number;
}
export interface PostState {
  data: ListProps<PostProps>;
  loadedColumns: string[];
}

export interface GlobalDataProps {
  user: UserProps;
  columns: ColumnsState;
  posts: PostState;
  app: AppState;
}
export interface BreadcrumbItem {
  title: string;
  path: string;
  show?: boolean;
}
export interface AppState {
  error: GlobalErrorProps;
  loading: boolean;
  breadcrumb?: Array<BreadcrumbItem>;
}
