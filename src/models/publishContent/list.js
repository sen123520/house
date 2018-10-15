
import * as publishContentService from "../../services/publishContent";
import { PAGE, PAGE_SIZE } from "../../utils/constants";
import { routerRedux } from 'dva/router';

export default {
  namespace: 'publishContent',
  state: {},
  reducers: {
    list(state, action) {
      return {
        ...state,
        ...action.payload
      };
    },
    delete(state, {payload: record}) {
      // console.log('delete in reducers', record)
      state.data = state.data.filter(item => item.id !== record.id)
      return {
        ...state,
        ...record
      }
    },
    showData(state, action) {
      // console.log('state', state)
      // console.log('action', action)
    }
  },
  effects: {
    // 获取发布内容列表
    *getList(
      { payload:{ page = 1, pageSize = PAGE_SIZE, ...query } }, 
      { call, put }
    ){
      // console.log('执行 getList：', query)
      const data = yield call(publishContentService.getList, { page, pageSize, query })

      // console.log('getList 数据回调：', data)

      yield put({
        type: 'list',
        payload: {
          response: data,
          data: data.result,
          total: data.pagination.total,
          page: parseInt(page, 10),
          pageSize: parseInt(pageSize, 10)
        }
      })
    },
    // 删除发布内容
    *deleteData(
      { payload: {id} },
      { call, put }
    ){
      // console.log('调删除接口', id)
      const data = yield call(publishContentService.deleteContent, {id})
      // console.log('回调参数', data)
      if (data) {
        yield put({
          type: 'delete',
          payload: {
            id: id
          }
        })
      }
    },

    // 新建内容 - banner/系统公告
    *newContent(
      { payload: {...query} },
      { call, put }
    ){
      // console.log('调接口操作，newContent', query)
      const data = yield call(publishContentService.newContent, {query})
      // console.log('newContent 数据回调：', data)
      yield put(routerRedux.goBack());
    },

    // 修改内容 - banner/系统公告
    *editContent(
      { payload: {...query} },
      { call, put }
    ){
      // console.log('调接口操作，editContent', query)
      const data = yield call(publishContentService.editContent, {query})
       // console.log('editContent 数据回调：', data)
      yield put(routerRedux.goBack());
    },

    // 根据id获取内容
    *getData(
      {payload: id},
      { call, put }
    ){
      yield put({
        type: 'list',
        payload: {
          editData: null
        }
      })
      // console.log('调id内容接口', id)
      const data = yield call(publishContentService.getData, {id})
      // console.log('getData 数据回调：', data)
      yield put({
        type: 'list',
        payload: {
          editData: data
        }
      })
    },

    // 删除关联文件
    *deleteFile(
      {payload: file},
      {call, put, select}
    ){
      // console.log('调id内容接口', file)
      const data = yield call(publishContentService.deleteFile, {id: file.id})
      // console.log('getData 数据回调：', data)
      if(data){
        yield select(
          state => {
            // console.log('effects 中 state', state)
            const {publishContent} = state
            const {editData} = publishContent
            editData.contentFiles.map((value, index) => {
              if(file.fileType === value.fileType){
                editData.contentFiles.splice(index, 1)
              }
            })
          }
        )
        yield put({
          type: 'list',
          payload: {
            deleteFile: true
          }
        })
      }
    },

    // 楼盘名模糊查询 & 新增楼盘 &更新楼盘详情基础信息
    *estateNameSelect(
      { payload: {...query}},
      { call, put }
    ){
      // console.log('调接口操作，estateNameSelect', query)
      const data = yield call(publishContentService.estateNameSelect, {query})
      // console.log('estateNameSelect 数据回调：', data)
      yield put({
        type: 'list',
        payload: {
          estateData: data.result,
          estateChange: true
        }
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, query, params }) => {
        if (pathname === "/publishContent/list") {
          dispatch({ type: "getList", payload: query });
        }
      });
    }
  },
};
