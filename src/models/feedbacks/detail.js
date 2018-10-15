import * as feedbacksService from "../../services/feedbacks";
import pathToRegexp from "path-to-regexp";
import { message } from "antd";

export default {
  namespace: "feedbacksDetail",
  state: {
    visible: false,
    titleInfo: {},
    detail: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        const match = pathToRegexp("/feedbacks/:id").exec(location.pathname);
        // console.log('setupMatch for fetchdata',match)
        if (match[1] !== "list") {
            dispatch({ type: "detail", payload: { id: match[1] } });
        }
      });
    }
  },

  effects: {
    *detail({ payload: { id } }, { call, put }) {
      const data = yield call(feedbacksService.detail, id);
      // console.log("123456data", data);
      if (data) {
        yield put({
          type: "init",
          payload: {
            detail: data
          }
        });
      }
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