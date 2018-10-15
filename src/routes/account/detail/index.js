import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";

import { Tabs, Table } from "antd";
import WrappedInfo from "./WrappedInfo";

const TabPane = Tabs.TabPane;

function accountDetail({ detail, location, loading, params, dispatch }) {
  const { pathname, query } = location;

  return (
    <WrappedInfo
      detail={detail}
      dispatch={dispatch}
      params={params}
    />
  );
}

const mapStateToProps = ({ accountDetail, loading }) => {
  return {
    detail: accountDetail.detail,
    loading: loading.models.accountDetail
  };
};
export default connect(mapStateToProps)(accountDetail);
