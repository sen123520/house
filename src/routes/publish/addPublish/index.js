import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";

import { Tabs, Table } from "antd";
import WrappedInfo from "./WrappedInfo";
import Users from "../table/popfirm";

const TabPane = Tabs.TabPane;

function accountDetail({
  detail,
  visible,
  location,
  loading,
  params,
  titleInfo,
  dispatch
}) {
  const { pathname, query } = location;
  function handleRowClick(record, index, event) {
    handleCancel();
    dispatch({
      type: "accountDetail/updateState",
      payload: {
        titleInfo: record
      }
    });
  }

  function handleShowModal(type) {
    if (type === "1") {
      type = 'banner'
    } else if (type === '2') {
      type = 'news'
    }
    dispatch({
      type: "accountDetail/updateState",
      payload: {
        visible: true,
        type: type
      }
    });

    handleModalSearch({});
  }

  function handleModalSearch(values) {
    dispatch({
      type: "accountDetail/getPopList",
      payload: {
        query: {
          ...values,
          current: 1
        }
      }
    });
  }

  function popFirm(pagination) {
    dispatch({
      type: "accountDetail/getPopList",
      payload: {
        query: {
          ...pagination
        }
      }
    });
  }

  function handleCancel() {
    dispatch({
      type: "accountDetail/updateState",
      payload: {
        visible: false
      }
    });
  }

  return (
    <div>
      <WrappedInfo
        titleInfo={titleInfo}
        detail={detail}
        dispatch={dispatch}
        params={params}
        handleShowModal={handleShowModal}
      />
      {visible && (
        <Users
          onRowClick={handleRowClick}
          visible={visible}
          cancel={handleCancel}
          popFirm={popFirm}
          handleModalSearch={handleModalSearch}
        />
      )}
    </div>
  );
}

const mapStateToProps = ({ accountDetail, loading }) => {
  return {
    detail: accountDetail,
    loading: loading.models.accountDetail,
    visible: accountDetail.visible,
    titleInfo: accountDetail.titleInfo
  };
};
export default connect(mapStateToProps)(accountDetail);
