import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import WrappedAdvancedSearchForm from './search'
import ListTable from './listTable'
import styles from './index.less';
import constants from '../../../utils/constants'


function AccountList({ account, dispatch, loading, location, children }) {

  const newAccountProps = {
    account,
    loading,
    location,
    dispatch,
    onShowSizeChange(current, pageSize) {
      constants.PAGE = current
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
        <WrappedAdvancedSearchForm handleSearch={handleSearch} dispatch={dispatch} account={account} />
        <ListTable {...newAccountProps} />
      </div>
    </div>
  );
}

AccountList.propTypes = {};

function mapStateToProps({ account, loading }) {
  return { account: account, loading: loading.models.account }
}

export default connect(mapStateToProps)(AccountList);


