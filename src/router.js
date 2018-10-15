import React from 'react'
import PropTypes from 'prop-types'
import {Router} from 'dva/router'
import App from './routes/app'

const cached = {};
const registerModel = (app, model) => {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = 1
  }
};

function Routers({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      breadcrumbName: '首页',
      getIndexRoute(nextState, cb) {
        require.ensure([], require => {
          cb(null, {component: require('./routes/indexPage')})
        }, 'index')
      },
      childRoutes: [
        {
          path: '/project',
          breadcrumbName: '新房业务管理',
          component: require('./routes/newHouse'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/newHouse/list'));
              cb(null, require('./routes/newHouse/list'))
            })
          },
          childRoutes: [
            {
              path: 'list',
              breadcrumbName: '项目列表',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/newHouse/list'))
                  cb(null, require('./routes/newHouse/list'))
                }, 'project-list')
              }
            }, {
              path: ':id',
              breadcrumbName: '项目详情',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/newHouse/detail'))
                  cb(null, require('./routes/newHouse/detail'))
                }, 'info')
              }
            }
          ]
        },
        /* 18版账号管理 */
        {
          path: '/account',
          breadcrumbName: '账号管理',
          component: require('./routes/account'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/account/list'));
              cb(null, require('./routes/account/list'))
            })
          },
          childRoutes: [
            {
              path: 'list',
              breadcrumbName: '用户列表',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/account/list'))
                  cb(null, require('./routes/account/list'))
                }, 'account-list')
              }
            },
            {
              path: ':id',
              breadcrumbName: '用户详情',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/account/detail'))
                  cb(null, require('./routes/account/detail'))
                }, 'account-list')
              }
            }
          ]
        },
        /* 发布管理 */
        {
          path: '/publish',
          breadcrumbName: '发布管理',
          component: require('./routes/publish'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/publish/list'));
              cb(null, require('./routes/publish/list'))
            })
          },
          childRoutes: [
            {
              path: 'list',
              breadcrumbName: '发布管理',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/publish/list'))
                  cb(null, require('./routes/publish/list'))
                }, 'publish-list')
              }
            },
            {
              path: 'addPublish',
              breadcrumbName: '新增发布',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/publish/addPublish'))
                  cb(null, require('./routes/publish/addPublish'))
                }, 'publish-addPublish')
              }
            }
          ]
        },


        //发布管理
        {
          path: '/publish',
          breadcrumbName: '发布管理',
          component: require('./routes/publish/table'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/publish/table'));
              cb(null, require('./routes/publish/table'))
            })
          },
          childRoutes: [
            {
              path: 'table',
              breadcrumbName: '发布列表',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/publish/table'))
                  cb(null, require('./routes/publish/table'))
                }, 'publish-table')
              }
            },  
          ]
        },

        {
          path: '/login',
          breadcrumbName: '登录',
          component: require('./routes/user/login'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/user/login'));
              cb(null, require('./routes/user/login'))
            })
          }
        },

        /* 发布内容管理 */
        {
          path: '/publishContent',
          breadcrumbName: '发布内容管理',
          component: require('./routes/publishContent'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/publishContent/list'));
              cb(null, require('./routes/publishContent/list'))
            })
          },
          childRoutes: [
            {
              path: 'list',
              breadcrumbName: '发布内容管理列表',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/publishContent/list'))
                  cb(null, require('./routes/publishContent/list'))
                }, 'publishContent')
              }
            },
            {
              path: 'newBanner',
              breadcrumbName: '新增发布内容-banner',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/publishContent/list'))
                  cb(null, require('./routes/publishContent/newBanner'))
                }, 'publishContent-newBanner')
              }
            },
            {
              path: 'newContent',
              breadcrumbName: '新增发布内容-系统公告',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/publishContent/list'))
                  cb(null, require('./routes/publishContent/newContent'))
                }, 'publishContent-newContent')
              }
            }
          ]
        },
        /* 意见反馈 */
        {
          path: '/feedbacks',
          breadcrumbName: '意见反馈',
          component: require('./routes/feedbacks'),
          getIndexRoute(nextState, cb) {
            require.ensure([], require => {
              registerModel(app, require('./models/feedbacks/list'));
              cb(null, require('./routes/feedbacks/list'))
            })
          },
          childRoutes: [
            {
              path: 'list',
              breadcrumbName: '意见反馈列表',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/feedbacks/list'))
                  cb(null, require('./routes/feedbacks/list'))
                }, 'feedbacks-list')
              }
            },
            {
              path: ':id',
              breadcrumbName: '意见反馈详情',
              getComponent(nextState, cb) {
                require.ensure([], require => {
                  registerModel(app, require('./models/feedbacks/detail'))
                  cb(null, require('./routes/feedbacks/detail'))
                }, 'feedbacks-detail')
              }
            }
          ]
        },

        {//错误页面路由地址
          path: '*',
          breadcrumbName: 'error',
          getComponent(nextState, cb) {
            require.ensure([], require => {
              cb(null, require('./routes/error/'))
            }, 'error')
          }
        }
      ],
    }
  ];
  return <Router history={history} routes={routes}/>
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default Routers
