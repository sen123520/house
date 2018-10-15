import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import Search from './search'
import ListTable from './listTable'
import constants from '../../../utils/constants'


function FeedbacksList({ feedbacks, dispatch, loading, location, children }) {

  const feedBacksProps = {
    feedbacks,
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

  const feedBacksSearchProps = {
    feedbacks,
    loading,
    location,
    dispatch,
    handleSearch(value) {
        dispatch(routerRedux.push({
          pathname: location.pathname,
          query: {
            ...location.query,
            ...value
          }
        }))
      }
  }



  return (
      <div>
        <Search {...feedBacksSearchProps}/>
        <ListTable {...feedBacksProps} />
      </div>
  );
}

FeedbacksList.propTypes = {};

function mapStateToProps({ feedbacks, loading }) {
  return { feedbacks: feedbacks, loading: loading.models.feedbacks }
}

export default connect(mapStateToProps)(FeedbacksList);


