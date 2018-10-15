import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card,  Form, Input, Button , Select,Radio,Table,message,Tabs,Col,Row,Popconfirm} from 'antd';
import WrappedInfo from './WrappedInfo'

function FeedbacksDetail({ feedbacksDetail, location, loading, params, dispatch, children }) {

  const { pathname, query } = location;

  return (
    <WrappedInfo
      detail={feedbacksDetail}
      dispatch={dispatch}
      params={params}
    />
  );
}

FeedbacksDetail.propTypes = {};

function mapStateToProps({ feedbacksDetail, loading }) {
  return { feedbacksDetail: feedbacksDetail, loading: loading.models.feedbacksDetail }
}

export default connect(mapStateToProps)(FeedbacksDetail);