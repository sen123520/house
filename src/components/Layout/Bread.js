/**
 * Created by zylee on 2017/5/8.
 */
import React from 'react'
import {Breadcrumb} from 'antd'
import {Link} from 'react-router'
import styles from './Bread.less'

function _getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement,
  );
  return name;
}

function Bread({ params, routes}) {
  function itemRender(route, params, routes, paths) {
    const name=_getBreadcrumbName(route,params);
    const last = routes.indexOf(route) === routes.length - 1;

    return last ? <span>{name}</span> : <Link to={'/'+ paths.join('/')}>{name}</Link>;
  }

  return (
    <div className={styles.bread}>
        <Breadcrumb routes={routes} params={params} itemRender={itemRender}/>
    </div>
  )
}

export default Bread
