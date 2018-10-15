import React from 'react';
import { Link } from 'react-router'
import { Table } from 'antd';

function ListTable({ project, loading, onPageChange }) {

  const { total, page: current, pageSize, data } = project
  let dataSource = []
  if (data) {

    dataSource = data.map((value, index) => {
      return {
        estateId: value.estateId,
        estateNm: value.estateNm,
        cityNm: value.cityNm,
        address: value.address,
        partnerNm: value.partnerNm,
        auditStatusStr: value.auditStatusStr,
        releaseStatusStr: value.releaseStatusStr,
        projectStatusStr: value.projectStatusStr,
        crtEmpNm: value.crtEmpNm,
        crtDt: value.crtDt,
      }
    })
  }

  const columns = [
    // { title: '编号', dataIndex: 'estateId', key: 'estateId' },
    { title: '项目编号', dataIndex: 'estateId', key: 'estateId' },
    { title: '楼盘名称', dataIndex: 'estateNm', key: 'estateNm' },
    { title: '城市', dataIndex: 'cityNm', key: 'cityNm' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '合伙人', dataIndex: 'partnerNm', key: 'partnerNm' },
    { title: '审核状态', dataIndex: 'auditStatusStr', key: 'auditStatusStr' },
    { title: '发布状态', dataIndex: 'releaseStatusStr', key: 'releaseStatusStr' },
    { title: '项目状态', dataIndex: 'projectStatusStr', key: 'projectStatusStr' },
    { title: '录入状态', dataIndex: 'createrName', key: 'createrName' },
    { title: '录入人', dataIndex: 'crtEmpNm', key: 'crtEmpNm' },
    { title: '录入日', dataIndex: 'crtDt', key: 'crtDt' },
    {
      title: '操作', key: 'operation', className: 'operation', fixed: 'right', width: 100, render: (text, record) => {
        return (
          <div>
            <Link to={`/project/${record.estateId}`}>查看</Link>
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
        scroll={{ x: 1600 }}
        rowKey={record => record.id}
        pagination={{
          total,
          current,
          pageSize,
          showQuickJumper: true,
          showSizeChanger: total > 10
            ? true
            : false
        }} />
    </div>
  )
}

export default ListTable
