import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'dva'
import { Menu, Icon, Popover } from 'antd'
import styles from './Header.less'
import Menus from './Menu'
import {routerRedux} from 'react-router'

const SubMenu = Menu.SubMenu

function Header({
  switchSider,
  siderFold,
  isNavbar,
  menuPopoverVisible,
  location,
  switchMenuPopover,
  navOpenKeys,
  changeOpenKeys,
  dispatch,
  login
}) {
  let handleClickMenu = (e) => {
    if(e.key === 'logout') {
      dispatch({
        type: 'app/logout'
      })
    }
  }
  
  /*logout = () => {
    localStorage.removeItem("accessToken")
  }*/
  
  const menusProps = {
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <div className={styles.header}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div className={styles.button} onClick={switchSider}>
          <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
        </div>}
      <div className={styles.rightWarpper}>

        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu style={{float: 'right',}} 
                  title={<span> <Icon type="user" />{(login && login.userName) || (localStorage.getItem('userName') && localStorage.getItem('userName'))}</span>}>
            <Menu.Item key="logout">
              <a>注销</a>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

Header.propTypes = {
  // user: PropTypes.object,
  // logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default connect(({login}) => {
  return  {
    login: login
  }
})(Header)
