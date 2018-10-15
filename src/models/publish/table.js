import { getPublishList, remove, change } from "../../services/publish";
import { PAGE_SIZE } from "../../utils/constants";

const format = "YYY-MM-DD";

export default {
  namespace: "publish",
  state: {
    visible: false,
    popData: [],
    total: 0,
    page: 1,
    pageSize: 10
  },
  reducers: {
    list(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  },

  effects: {
    *getPublishList(
      { payload: { currentPage = 1, pageSize = PAGE_SIZE, ...query } },
      { call, put }
    ) {
      const data = yield call(getPublishList, { currentPage, pageSize, query });

      yield put({
        type: "list",
        payload: {
          data: data.result,
          total: data.pagination.total,
          currentPage: parseInt(currentPage, 10),
          pageSize: parseInt(pageSize, 10)
        }
      });
    },

    *remove({ payload: id }, { call, put, select }) {
      // console.log("model", id);
      yield call(remove, id);
      yield put({ type: "getPublishList", payload: { id } });
    },
    *change({ payload: { id, status } }, { call, put, select }) {
      yield call(change, id, { status });
      yield put({ type: "getPublishList", payload: { id, status } });
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, query, params }) => {
        if (pathname === "/publish/table") {
          dispatch({ type: "getPublishList", payload: query });
        }
      });
    }
  }
};
