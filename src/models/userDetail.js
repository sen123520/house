/**
 * Created by zylee on 2017/5/9.
 */
import * as usersService from '../services/user';
import {PAGE_SIZE} from '../utils/constants'
export default {

  namespace : 'userDetail',

  state : {},

  subscriptions : {
    setup({dispatch, history}) { // eslint-disable-line
      return history.listen(({pathname, query}) => {
        // if (pathname === '/user') {
        //   dispatch({type: 'fetch', payload: query});
        // }
      });
    }
  },

  effects : {
    *fetch({
             payload: {
               page = 1,
               pageSize = PAGE_SIZE
             }
           }, {call, put}) { // eslint-disable-line
      const {data, headers} = yield call(usersService.fetch, {page,pageSize})
      yield put({
        type: 'save',
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10)
        }
      });
    }
  },

  reducers : {
    save(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
