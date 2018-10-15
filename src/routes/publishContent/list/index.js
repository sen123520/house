import React from 'react';
import { Link } from 'react-router';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Button } from 'antd';

import SearchForm from './search'
import ListTable from './listTable'
import styles from './index.less';
import constants from '../../../utils/constants';


function PublishContentList({ publishContent, dispatch, loading, location, children }) {

  const publishContentProps = {
    publishContent, 
    dispatch, 
    loading, 
    location, 
    children,
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
        <SearchForm handleSearch={handleSearch} dispatch={dispatch} publishContent={publishContent} location={location}/>
        <ListTable {...publishContentProps}/>
      </div>
    </div>
  );
}

function mapStateToProps({ publishContent, loading }) {
  return {
    publishContent: publishContent,
    loading: loading.models.publishContent
  }
}

export default connect(mapStateToProps)(PublishContentList);


