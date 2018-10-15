import debounce from 'lodash.debounce';
import {routerRedux} from 'dva/router';

export default {
  namespace: 'app',
  state: {
    login: false,
    location: [],
    loginButtonLoading: false,
    menuPopoverVisible: false,
    siderFold: localStorage.getItem('antdAdminSiderFold') === 'false',
    darkTheme: true,
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: []
  },
  reducers: {
    handleSwitchSider(state) {
      //localStorage.setItem('antdAdminSiderFold', !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold
      };
    },
    handleNavOpenKeys(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    handleSwitchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible
      };
    },
    showNavbar(state) {
      return {
        ...state,
        isNavbar: true
      };
    },
    hideNavbar(state) {
      return {
        ...state,
        isNavbar: false
      };
    },
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: {
    *logout({}, {put}) {
      localStorage.removeItem('accessToken');
      yield put(
        routerRedux.push({
          pathname: '/login'
        })
      );
    },
    *switchSider({payload}, {put}) {
      yield put({type: 'handleSwitchSider'});
    },
    *changeNavbar({payload}, {put}) {
      if (document.body.clientWidth < 769) {
        yield put({type: 'showNavbar'});
      } else {
        yield put({type: 'hideNavbar'});
      }
    },
    *switchMenuPopver({payload}, {put}) {
      yield put({type: 'handleSwitchMenuPopver'});
    },

    *query({payload}, {call, put, select}) {
      let accessToken = localStorage.getItem('accessToken');
      // console.log(accessToken);
      if (accessToken) {
        yield put(
          routerRedux.push({
            pathname: location.pathname
          })
        );
      } else if (accessToken == null) {
        yield put(
          routerRedux.push({
            pathname: '/login'
          })
        );
      } else {
        yield put(
          routerRedux.push({
            pathname: '/login'
          })
        );
      }
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'query'});
      window.onresize = debounce(() => {
        dispatch({type: 'changeNavbar'});
      }, 300);

      return history.listen(location => {
        dispatch({
          type: 'updateState',
          payload: {
            location
          }
        });
      });
    }
  }
};
