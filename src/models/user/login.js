import * as LoginService from '../../services/loginService';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'login',
  state: {
    token: localStorage.getItem('accessToken')
  },
  effects: {
    * login({payload}, {call, put}) {
      const {loginName, password} = payload
      const response = yield call(LoginService.login, {loginName, password});
      if (response){
        localStorage.setItem("accessToken", response.accessToken)
        localStorage.setItem("userName", response.userName)
        yield put(
          {
            type: 'token',
            payload: response
          });
        yield put(routerRedux.push('/'));
      } else {
        
      }
    },
  },

  reducers: {
    token(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },

  }
}
