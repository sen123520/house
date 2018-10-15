export default {
  namespace: 'indexPage',
  state: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/') {
          //dispatch({type: 'query'})
        }
      })
    },
  },
  effects: {
    // * query({
    //           payload,
    //         }, {call, put}) {
    //   const data = yield call(query, parse(payload))
    //   yield put({
    //     type: 'updateState',
    //     payload: data,
    //   })
    // }

  }
  ,
  reducers: {}
}
