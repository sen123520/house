import React, {Component} from "react";
import { connent } from "dva";
import { Link, routerRedux } from "react-router";
import { Table, Popconfirm } from "antd";



function ListTable({ feedbacks, loading, onPageChange, dispatch }) {

  const { total, page: current, pageSize, data } = feedbacks;
  // console.log("data11111111111111",data);
  let dataSource = []
  if (data) {
    dataSource = data.map((value, index) => {
      return {
        id: value.feedbackId,
        empName: value.empName,
        feedBackContent: value.feedBackContent,
        feedbackNo: value.feedbackNo,
        feedbackDate: value.feedbackDate,
        merchantName: value.merchantName,
        sourceChannel: value.sourceChannel?(value.sourceChannel==17201?"web":"APP"):""
      }
    })
  }


  const columns = [
    { title: '反馈编号', dataIndex: 'feedbackNo', key: 'feedbackNo' },
    { title: '渠道', dataIndex: 'sourceChannel', key: 'sourceChannel' },
    { title: '反馈内容', dataIndex: 'feedBackContent', key: 'feedBackContent' },
    { title: '反馈时间', dataIndex: 'feedbackDate', key: 'feedbackDate' },
    { title: '经纪公司', dataIndex: 'merchantName', key: 'merchantName' },
    { title: '经纪人', dataIndex: 'empName', key: 'empName' },
    {
      title: '操作', key: 'operation', className: 'operation', fixed: 'right', width: 100, render: (text, record) => {
        return (
          <div>
            <Link to={`/feedbacks/${record.id}`}>查看</Link>
          </div>
        )
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
  )
}


export default ListTable;
