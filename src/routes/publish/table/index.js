import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import PublishForm from "./search";
import { Button, Col, Row } from "antd";
import ListTable from "./listTable";
import styles from "./index.less";

function PublishTable({
  publish,
  dispatch,
  loading,
  location,
  children,
  query
}) {
  const PublishProps = {
    publish,
    loading,
    location,
    onShowSizeChange(current, pageSize) {
      const { query, pathname } = location;
      dispatch(
        routerRedux.push({
          pathname,
          query: {
            page: current,
            pageSize
          }
        })
      );
    },
    deleteList(id) {
      dispatch({
        type: "publish/remove",
        payload: id
      });
    },
    changeList(id, status) {
      dispatch({
        type: "publish/change",
        payload: { id, status: 0 }
      });
    },

    onPageChange(pagination) {
      const { pathname } = location;
      dispatch(
        routerRedux.push({
          pathname,
          query: {
            page: pagination.current,
            pageSize: pagination.pageSize
          }
        })
      );
    }
  };

  function handleSearch(value) {
    dispatch(
      routerRedux.push({
        pathname: location.pathname,
        query: {
          ...location.query,
          ...value
        }
      })
    );
  }

  const searchProps = {
    query: {
      ...location.query
    },
    handleSearch
  };

  return (
    <div className={styles.normal}>
      <div>
        <PublishForm {...searchProps} publish={publish} />
        <ListTable {...PublishProps} />
      </div>
    </div>
  );
}

PublishTable.propTypes = {};

function mapStateToProps({ publish, loading }) {
  return { publish: publish, loading: loading.effects.getPublishList };
}

export default connect(mapStateToProps)(PublishTable);
