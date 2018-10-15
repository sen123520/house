import React from "react";
import { connent } from "dva";
import { Link, routerRedux } from "react-router";
import { Table, Popconfirm } from "antd";
import AccountModal from "./accountModal";

function ListTable({ account, loading, onPageChange, dispatch }) {
  const { total, page: current, pageSize, data } = account;
  let dataSource = [];
  if (data) {
    dataSource = data.map((value, index) => {
      return {
        id: value.id,
        company_no: value.company_no,
        companyName: value.company_name,
        cityName: value.city_name,
        old_company_no: value.company_no,
        link_phone: value.link_phone,
        old_fy_account_status_name: value.old_fy_account_status_name,
        fy_account_status_name: value.fy_account_status_name,
        upgrade_apply_date: value.upgrade_apply_date,
        upgrade_state: value.upgrade_state,
        fy_company_id: value.fy_company_id,
        city_no: value.city_no
      };
    });
  }

  function preser(record, values) {

    // console.log("保存", record);
    dispatch({
      type: "account/preserAccount",
      payload: record
    });
  }


  function deleteHandler(record, values) {
    record["opType"] = '4'
    // console.log("关闭操作", record);
    dispatch({
      type: "account/delAccount",
      payload: record
    });
  }
  function openAccount(record, values) {
    record["opType"] = '2'
    // console.log("启用操作", record);
    dispatch({
      type: "account/openAccount",
      payload: record
    });
  }

  function update(record, values) {
    record["phone_number"] =values.name;
    // console.log('开通升级操作', record)
    dispatch({
      type: "account/updateAccount",
      payload: record
    });
  }

  function createHandler(record, values) {
    record["phone_number"] =values.name;
    // console.log("开通操作", record);
    dispatch({
      type: "account/opupdateAccount",
      payload: record
    });
  }

  function changeOption(record,values) {
    const oldSta = record.fy_account_status_name;
    const newSta = record.upgrade_state;
    // console.log(record.id, record.fy_account_status_name);
    switch (oldSta) {
      case "未开通":
        // 通过
        if (newSta === null) {
          // 通过
          return (
            <div>
              <AccountModal
                record={record}
                onOk={createHandler.bind(null, record)}
              >
                <a>开通</a>
              </AccountModal>
            </div>
          );
        } else {
          // 未通过
          return (
            <AccountModal record={record} onOk={update.bind(null, record)}>
              <a>开通并升级</a>
            </AccountModal>
          );
        }
        break;
      default:
        // 未通过
        if (oldSta === "已关闭") {
          // 通过
          return (
            <div>
              <Popconfirm
                title="是否启用？"
                onConfirm={openAccount.bind(null, record)}
              >
                <a href="">启用</a>
              </Popconfirm>
              <Link to={`/account/${record.id}`}>查看</Link>
              <Link>下载报告</Link>
            </div>
          );
        } else {
          // 未通过
          return (
            <div>
              <Popconfirm
                title="是否关闭？"
                onConfirm={deleteHandler.bind(null, record)}
              >
                <a href="">关闭</a>
              </Popconfirm>
              <Link to={`/account/${record.id}`}>查看</Link>
              <Link>下载报告</Link>
            </div>
          );
        }
        break;
    }
  }

  const columns = [
    // { title: '编号', dataIndex: 'estateId', key: 'estateId' },
    { title: "公司名称", dataIndex: "companyName", key: "companyName" },
    { title: "所在城市", dataIndex: "cityName", key: "cityName" },
    { title: "17版编码", dataIndex: "old_company_no", key: "old_company_no" },
    {
      title: "17版联系方式",
      dataIndex: "link_phone",
      key: "link_phone"
    },
    {
      title: "17版状态",
      dataIndex: "old_fy_account_status_name",
      key: "old_fy_account_status_name"
    }, // 判断
    { title: "18版编码", dataIndex: "company_no", key: "company_no" },
    {
      title: "18版账号状态",
      dataIndex: "fy_account_status_name",
      key: "fy_account_status_name"
    }, // 判断
    {
      title: "升级申请时间",
      dataIndex: "upgrade_apply_date",
      key: "upgrade_apply_date"
    },
    { title: "升级状态", dataIndex: "upgrade_state", key: "upgrade_state" },
    // { title: "定时执行日期", dataIndex: "executeDate", key: "executeDate" },
    {
      title: "操作",
      key: "operation",
      className: "operation",
      fixed: "right",
      width: 60,
      render: (text, record) => {
        return (
          <div>
            {changeOption(record)}
            {/* <AccountModal record={record} onOk={createHandler.bind(null, record)}>
                <a>开通</a>
            </AccountModal> */}
            {/* <Link to={`/project/${record.estateId}`}>查看</Link> */}
          </div>
        );
      }
    }
  ];
  return (
    <div>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        onChange={onPageChange}
        /* scroll={{ x: 1600 }} */
        rowKey={record => record.id}
        pagination={{
          total,
          current,
          pageSize,
          showQuickJumper: true,
          showSizeChanger: total > 10 ? true : false
        }}
      />
    </div>
  );
}

export default ListTable;
