import { getAccount, preser, cities } from "../../services/addPublish";
import { getPopList } from "../../services/publish";

import pathToRegexp from "path-to-regexp";
import { message } from "antd";

export default {
  namespace: "accountDetail",
  state: {
    visible: false,
    titleInfo: {},
    detail: {}
  },
  subscriptions: {},

  effects: {
    *detail({ payload: { id } }, { call, put }) {
      const { result } = yield call(getAccount, id);
      if (result) {
        yield put({
          type: "updateState",
          payload: {
            detail: result
          }
        });
      }
    },
    *preserAccount({ payload: { ...query } }, { call, put }) {
      // console.log("accountDetail,preserAccount", query);
      const data = yield call(preser, { query });
      message.success("新增成功!");
      // window.open('/publish/table');
      // console.log("preser", data);
    },
    *patch({ payload: { id, values } }, { call, put }) {
      yield call(getAccount.patch, id, values);
      yield put({ type: "reload" });
    },
    *getPopList({ payload }, { call, put, select }) {
      const isLogin = yield select(state => state.accountDetail);
    
      const { current = 1, pageSize = 10, type = isLogin.type, ...rest } = payload.query;

      const popData = yield call(getPopList, {
        currentPage: current,
        pageSize,
        type,
        ...rest 
      });

      yield put({
        type: "updateState",
        payload: {
          popData: popData.result,
          poptotal: popData.pagination.total,
          poppage: parseInt(current, 10),
          poppageSize: parseInt(pageSize, 10)
        }
      });
    },
    // 获取城市列表
    *getCityList({payload: {query}}, {call, put}){
      const data = yield call(cities, {query})
      // console.log('获取城市列表回调,', data)
      yield put({
        type: 'updateState',
        payload: {
          cityList: data
        }
      })
    }
  },

  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
