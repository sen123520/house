import React from 'react'
import classnames from 'classnames'
import {connect} from 'dva'
import Layout from '../components/Layout'

//import login from './login'

//import {config} from '../utils'

const {Header, Sider, styles, Bread} = Layout;
const App = ({
               children,
               routes,
               params,
               location,
               dispatch,
               app
             }) => {
  const {siderFold, darkTheme, isNavbar, menuPopoverVisible, navOpenKeys} = app;

  const headerProps = {
    // companyBranch,
    siderFold,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({type: 'app/switchMenuPopver'})
    },
    // logout() {
    //   dispatch({type: 'app/logout'})
    // },
    switchSider() {
      dispatch({type: 'app/switchSider'})
    },
    changeOpenKeys(openKeys) {
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    }
  }

  const breadProps = {
    routes,
    params
  };

  const siderProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    switchSider() {
      dispatch({type: 'app/switchSider'})
    },
    // changeTheme() {
    //   dispatch({type: 'app/changeTheme'})
    // },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    }
  }

  const openPages = ['/login']


  if (openPages.includes(location.pathname)) {
    return children
  }

  return (
    <div className={classnames(styles.layout, {
      [styles.fold]: isNavbar
        ? false
        : siderFold
    }, {
      [styles.withnavbar]: isNavbar
    })}>
      {!isNavbar
        ? <aside className={classnames(styles.sider, {
          [styles.light]: !darkTheme
        })}>
          <Sider {...siderProps}/>
        </aside>
        : ''}

      <div className={styles.main}>
        <Header {...headerProps}/> {location.pathname === '/'
        ? null
        : <Bread {...breadProps}/>}
        <div className={styles.container}>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({app, loading}) {
  return {app, loading: loading.models.app}
}

export default connect(mapStateToProps)(App)
