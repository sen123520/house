import * as projectService from '../../services/project';
import { PAGE_SIZE } from '../../utils/constants'

export default {
  namespace: 'project',
  state: {},
  subscriptions: {
    setup({ dispatch, history }) { // eslint-disable-line
      return history.listen(({ pathname, query, params }) => {
        if (pathname === '/project/list') {
          dispatch({ type: 'queryProject', payload: query });
        }
      });
    }
  },

  effects: {
    * getDistrictDict({ payload }, { call, put }) {
      const { id } = payload
      const districtDictData = yield call(projectService.getDistrictDictData, { id })
      yield put({
        type: 'districtDict',
        payload: {
          districtDictData: districtDictData.result
        }
      })
    },

    * queryProject({
                     payload: {
                       page = 1,
      pageSize = PAGE_SIZE,
      ...query
                     }
                   }, { call, put }) { // eslint-disable-line
      const data = yield call(projectService.query, { page, pageSize, query })
      // console.log("data", data)
      const cityDictData = yield call(projectService.getCityDictData)
      const performanceCityDictData = yield call(projectService.getPerformanceCityDictData)

      yield put({
        type: 'list',
        payload: {
          cityDictData: cityDictData.result,
          performanceCityDictData: performanceCityDictData.result,
          data: data.result,
          total: data.pagination.total,
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10)
        }
      });
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
