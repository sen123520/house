import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import WrappedAdvancedSearchForm from './search'
import ListTable from './listTable'
import styles from './index.less';


function ProjectList({ project, dispatch, loading, location, children }) {

  const newProjectProps = {
    project,
    loading,
    location,
    onShowSizeChange(current, pageSize) {
      const { query, pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          page: current,
          pageSize
        }
      }))
    },
    onPageChange(pagination) {
      const { pathname } = location;
      dispatch(routerRedux.push({
        pathname,
        query: {
          page: pagination.current,
          pageSize: pagination.pageSize
        }
      }))
    }
  }


  function handleSearch(value) {
    // console.log('handleSearch', value)
    // console.log('location', location.pathname)
    dispatch(routerRedux.push({
      pathname: location.pathname,
      query: {
        ...location.query,
        ...value
      }
    }))
  }


  return (
    <div className={styles.normal}>
      <div>
        <WrappedAdvancedSearchForm handleSearch={handleSearch} dispatch={dispatch} project={project} />
        <ListTable {...newProjectProps} />
      </div>
    </div>
  );
}

ProjectList.propTypes = {};

function mapStateToProps({ project, loading }) {
  return { project: project, loading: loading.models.project }
}

export default connect(mapStateToProps)(ProjectList);


