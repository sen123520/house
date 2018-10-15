import { getAccount } from "../../services/account";

import pathToRegexp from "path-to-regexp";
import { message } from "antd";

export default {
  namespace: "accountDetail",
  state: {
    detail: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        const match = pathToRegexp("/account/:id").exec(location.pathname);
        // console.log('setupMatch for fetchdata',match)
        if (match !== "list") {
            dispatch({ type: "detail", payload: { id: match[1] } });
         
        }
      });
    }
  },

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
    *patch({payload: { id, values } }, { call, put}) {
      yield call(getAccount.patch, id, values);
      yield put({type: 'reload'});
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
