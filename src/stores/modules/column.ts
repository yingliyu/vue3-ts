import { ColumnsState as State, GlobalDataProps } from '../type';
import { getAndCommit } from '../index';
import { ActionTree, GetterTree, MutationTree } from 'vuex';
import { objToArr, arrToObj } from '../../utils/helper';

const columnsData = {
  '1': {
    id: '1',
    title: '2020年终总结',
    description:
      '报适号文究除提选信许飞近听。半生三切报整华老局积适候约史时号查。到实就出手用事务提难边红积。你家团战共达厂件按传低引军农如。然价把党是务总下阶信口义其。年史器细他心她争格构放这西新广市。',
    avatar: {
      id: '18BBdBe8-21FA-8b3c-13df-FcF01BE17f2c',
      url: 'http://dummyimage.com/100x100',
      createdTime: '2018-11-07 07:23:29'
    },
    author: '戴刚',
    createdTime: '1974-04-01 11:20:48'
  },
  '2': {
    id: '2',
    title: '微前端服务',
    description:
      '治电连八干研只门四状或书易作矿布来。中关当号比使群置维事科如花然斯。成自科断增农身拉区化完区。但领示物算回关教想八身存九单包有。',
    avatar: {
      id: '3E45D7Bc-f6dA-3A63-3De7-6cB4f439BCEc',
      url: 'http://dummyimage.com/100x100',
      createdTime: '2005-11-03 09:37:37'
    },
    author: '冯娟',
    createdTime: '1996-06-22 15:57:45'
  },
  '3': {
    id: '3',
    title: 'GWT',
    description:
      '干资却声线造先立酸验改品所科产。天什话率王写认几影样使上很之劳西里。名计风相便提广因日空小很率验道知证。专十样关线二委斗美上或放儿易始民满转。深更动在再部在型文感表容文其。',
    avatar: {
      id: 'E1Dcdf20-7d5B-DE45-d4Fe-3e3bBfCE8Bd9',
      url: 'http://dummyimage.com/100x100',
      createdTime: '2013-11-06 23:50:33'
    },
    author: '武丽',
    createdTime: '2010-04-03 04:19:04'
  },
  '4': {
    id: '4',
    title: '前端工程化',
    description:
      '组真集号本正群求回圆提率青向。出二决斗风说主公山较体别属界事行并。战些制府增空所除需段回劳例改。手治事铁结去温京约林市米儿由五设。被值老适见目严斗容声道无利。',
    avatar: {
      id: 'EAefbE01-3cca-D84F-dB75-AC9F5849A4ba',
      url: 'http://dummyimage.com/100x100',
      createdTime: '2006-01-12 20:14:50'
    },
    author: '薛强',
    createdTime: '2006-09-04 03:42:43'
  },
  '5': {
    id: '5',
    title: '数据可视化',
    description:
      '组真集号本正群求回圆提率青向。出二决斗风说主公山较体别属界事行并。战些制府增空所除需段回劳例改。手治事铁结去温京约林市米儿由五设。被值老适见目严斗容声道无利。',
    avatar: {
      id: 'EAefbE01-3cca-D84F-dB75-AC9F5849A4ba',
      url: 'http://dummyimage.com/100x100',
      createdTime: '2006-01-12 20:14:50'
    },
    author: '薛强',
    createdTime: '2006-09-04 03:42:43'
  },
  '6': {
    id: '6',
    title: '知识图谱',
    description:
      '组真集号本正群求回圆提率青向。出二决斗风说主公山较体别属界事行并。战些制府增空所除需段回劳例改。手治事铁结去温京约林市米儿由五设。被值老适见目严斗容声道无利。',
    avatar: {
      id: 'EAefbE01-3cca-D84F-dB75-AC9F5849A4ba',
      url: 'http://dummyimage.com/100x100',
      createdTime: '2006-01-12 20:14:50'
    },
    author: '薛强',
    createdTime: '2006-09-04 03:42:43'
  }
};
const state: State = {
  data: columnsData,
  currentPage: 0,
  total: 0
};

const getters: GetterTree<State, GlobalDataProps> = {
  getColumns: (state) => {
    return objToArr(state.data);
  },
  getColumnById: (state) => (id: string) => {
    return state.data[id];
  }
};

// actions
const actions: ActionTree<State, GlobalDataProps> = {
  // 获取专栏列表
  async getColumnsAction({ state, commit }, params = {}) {
    const { currentPage = 1, pageSize = 6 } = params;
    if (state.currentPage < currentPage) {
      return getAndCommit(
        `/zhihu/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
        'fetchColumns',
        commit
      );
    }
  },
  async getColumnByIdAction({ state, commit }, cid) {
    const currentColumn = state.data[cid];
    // 优化：减少不必要的请求
    if (!currentColumn) {
      return getAndCommit(`/zhihu/column/${cid}`, 'fetchColumnById', commit);
    } else {
      return Promise.resolve({ data: currentColumn });
    }
  }
};

const mutations: MutationTree<State> = {
  // 栏目列表数据更新
  fetchColumns(state, rawData) {
    const { data } = state;
    const { list, total, currentPage } = rawData.data;
    state = {
      data: { ...data, ...arrToObj(list) }, // 添加非覆盖
      total: total,
      currentPage: currentPage * 1
    };
  },
  fetchColumnById(state, { data }) {
    state.data[data._id] = data;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
