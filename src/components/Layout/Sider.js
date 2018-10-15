import React from 'react'
import PropTypes from 'prop-types'
import Menus from './Menu'

const Sider = ({
  siderFold,
  darkTheme,
  location,
  navOpenKeys,
  changeOpenKeys,
}) => {
  const menusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys
  }
  return (
    <div>
      <Menus {...menusProps}/>
    </div>
  )
}

Sider.propTypes = {
  siderFold: PropTypes.bool,
  darkTheme: PropTypes.bool,
  location: PropTypes.object,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func
}

export default Sider
