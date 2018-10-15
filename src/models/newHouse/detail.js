import * as intelligenceService from '../../services/intelligence';
import * as projectService from '../../services/project';

import * as sellPointService from '../../services/sellPoint';
import {PAGE_SIZE} from '../../utils/constants'
import pathToRegexp from 'path-to-regexp'
import {message} from 'antd';

export default {
  namespace: 'projectDetail',
  state: {
    tabKey: '1'
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname, query}) => {
        const match = pathToRegexp('/project/:id').exec(location.pathname)
        if (match && match[1] !== 'list') {
          if (!query.tabKey || query.tabKey === '1') {
            dispatch({type: 'detail', payload: {id: match[1]}})
          }

          if (query.tabKey === '2') {
            dispatch({
              type: 'intelligenceList', payload: {
                ...query,
                id: match[1]
              }
            })
          }

          if (query.tabKey === '3') {
            dispatch({
              type: 'sellPointDetail', payload: {
                id: match[1]
              }
            })
          }

        }
      })
    }
  },

  effects: {
    * intelligenceList({payload}, {call, put}) {
      const {page = 1, pageSize = PAGE_SIZE, id} = payload
      const data = yield call(intelligenceService.query, {page, pageSize, id});
      yield put({
        type: 'list',
        payload: {
          data: data.result,
          total: data.pagination.total,
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10)
        }
      });
    },


    * intelligenceAdd({payload}, {call, put}) {
      const {content, unId} = payload
      try {
        yield call(intelligenceService.add, {content, unId})
        yield put({
            type: 'intelligenceList',
            payload: {
              id: unId
            }
          }
        )
        message.success('添加成功');
      } catch (e) {
        message.error('添加失败');
        // console.log("error", e)
      }
    },


    * sellPointSave({payload}, {call, put}) {
      const {content, unId} = payload
      try {
        yield call(sellPointService.add, {content, unId})
        message.success('添加成功');
        yield put({
            type: 'sellPointDetail',
            payload: {
              id: unId
            }
          }
        )
      } catch (e) {
        message.error('添加失败');
        // console.log("error", e)
      }
    },


    * intelligenceDelete({payload}, {call, put}) {
      // console.log("payload", payload)
      try {
        yield call(intelligenceService.del, payload.id);
        yield put({
            type: 'intelligenceList',
            payload: {
              id: payload.unId,
              page: 1,
              pageSize: PAGE_SIZE
            }
          }
        )
        message.success('删除成功');
      } catch (e) {
        message.error('删除失败');
        // console.log("error", e)
      }
    },


    * sellPointDetail({
                        payload: {
                          ...id
                        }
                      }, {call, put}) {
      const data = yield call(sellPointService.detail, id);
      yield put({
        type: 'detailSuccess',
        payload: {
          data
        },
      })
    },


    * projectSave({payload}, {call, put}) {
      const {id} = payload
      yield call(projectService.save, payload)
      message.success('添加成功');
      yield put({
          type: 'detail',
          payload: {
            id: id
          }
        }
      )
    },


    * detail({
               payload: {
                 id
               }
             }, {call, put}) {
      // console.log("ass",id)
      const data = yield call(projectService.detail, id);
      yield put({
        type: 'detailSuccess',
        payload: {
          data
        },
      })
    }
    ,
  },

  reducers: {
    detailSuccess(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
    list(state, action) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
};
