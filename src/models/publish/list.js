import * as accountService from "../../services/addPublish";
import { PAGE, PAGE_SIZE } from "../../utils/constants";

export default {
  namespace: "account",
  state: {},
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, query, params }) => {
        if (pathname === "/account/list") {
          dispatch({ type: "queryAccount", payload: query });
        }
      });
    }
  },

  effects: {
    *getDistrictDict({ payload }, { call, put }) {
      const { id } = payload;
      const districtDictData = yield call(accountService.getDistrictDictData, {
        id
      });
      yield put({
        type: "districtDict",
        payload: {
          districtDictData: districtDictData.result
        }
      });
    },

    *queryAccount(
      { payload: { page = 1, pageSize = PAGE_SIZE, ...query } },
      { call, put }
    ) {
      // eslint-disable-line
      const data = yield call(accountService.getList, {
        page,
        pageSize,
        query
      });
      // console.log("accountData", query);
      const cityDictData = yield call(accountService.getCityDictData);
      const performanceCityDictData = yield call(
        accountService.getPerformanceCityDictData
      );

      yield put({
        type: "list",
        payload: {
          cityDictData: cityDictData && cityDictData.result,
          performanceCityDictData:
            performanceCityDictData && performanceCityDictData.result,
          data: data.result,
          total: data.pagination.total,
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10)
        }
      });
    },

    /** 开通账号 */
    *opupdateAccount({ payload: { ...query } }, { call, put }) {
      const data = yield call(accountService.update, { query });
      // console.log("update", data);

    },
    /** 开通升级账号 */
    *updateAccount({ payload: { ...query } }, { call, put }) {
      const data = yield call(accountService.update, { query });
      // console.log("update", data);
    },
    /**del */
    *delAccount({ payload: { ...query } }, { call, put }) {
      const data = yield call(accountService.del, { query });
      // console.log("del", data);
      const data1 = yield call(accountService.getList, {
        query
      });
      yield put({
        type: "list",
        payload: {
          data: data1.result,
          total: data1.pagination.total,
          page: parseInt(PAGE, 10),
          pageSize: parseInt(PAGE_SIZE, 10)
        }
      });
      // console.log(PAGE_SIZE);
    },
    /**open */
    *openAccount({ payload: { ...query } }, { call, put }) {
      const data = yield call(accountService.del, { query });
      // console.log("open", data);

      const data1 = yield call(accountService.getList, {
        query
      });
      yield put({
        type: "list",
        payload: {
          data: data1.result,
          total: data1.pagination.total,
          page: parseInt(PAGE, 10),
          pageSize: parseInt(PAGE_SIZE, 10)
        }
      });
      // console.log(PAGE_SIZE);
    }
  },

  reducers: {
    list(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    districtDict(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
