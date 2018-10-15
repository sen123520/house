import * as feedbacksService from "../../services/feedbacks";
import { PAGE, PAGE_SIZE } from "../../utils/constants";

import pathToRegexp from "path-to-regexp";
import { message } from "antd";

export default {
  namespace: "feedbacks",
  state: {
    visible: false,
    titleInfo: {},
    detail: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, query, params }) => {
        if (pathname === "/feedbacks/list") {
          dispatch({ type: "getList", payload: query });
        }
      });
    }
  },

  effects: {
    *getList({ payload: { page = 1, pageSize = PAGE_SIZE, ...query } },{ call, put }) {
      const data = yield call(feedbacksService.getList, {
        page,
        pageSize,
        query
      });
      // console.log("123456Data", data);
      yield put({
        type: "init",
        payload: {
          data: data.result,
          total: data.pagination.total,
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10)
        }
      });
    }
  },

  reducers: {
    init(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};