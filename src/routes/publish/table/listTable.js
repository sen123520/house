import React from 'react';
import { Table, Popconfirm } from 'antd';

function ListTable({total, publish, loading, onPageChange, deleteList, changeList }) {

  const { page: current, pageSize, data } = publish
 let dataSource = []
  if (data) {
    
    dataSource = data.map((value, index) => {
      return {
        title: value.title,
        webSendFlag: value.webSendFlag,
        appSendFlag: value.appSendFlag,
        sendCity: value.sendCity,
        displayLocation: value.displayLocation,
        startTime: value.startTime,
        endTime: value.endTime,
        createDate: value.createDate,
        updateDate: value.updateDate,
        webViewWeight: value.webViewWeight,
        appViewWeight: value.appViewWeight,
        empName: value.empName,
        createEmpName: value.createEmpName,
        status: value.status,
        id:value.id
      }
    })
  }

  const statusVal = ['下架','有效','待生效']


  const columns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    { title: '房友web', dataIndex: 'webSendFlag', key: 'webSendFlag' },
    { title: '房友App', dataIndex: 'appSendFlag', key: 'appSendFlag' },
    { title: '发布城市', dataIndex: 'sendCity', key: 'sendCity' },
    { title: '发布位置', dataIndex: 'displayLocation', key: 'displayLocation' },
    { title: '生效时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '失效时间', dataIndex: 'endTime', key: 'endTime' },
    { title: '创建时间', dataIndex: 'createDate', key: 'createDate' },
    { title: '更新时间', dataIndex: 'updateDate', key: 'updateDate' },
    { title: 'web展示权重', dataIndex: 'webViewWeight', key: 'webViewWeight' },
    { title: 'App展示权重', dataIndex: 'appViewWeight', key: 'appViewWeight' },
    { title: '发布人', dataIndex: 'empName', key: 'empName' },
    { title: '创建人', dataIndex: 'createEmpName', key: 'createEmpName' },
    { title: '状态', 
     dataIndex: 'status',
     key: 'status',
     render:(text, record) => {
       return(
         <span>
           {
              statusVal[record.status]
           }
         </span>
       )
     }
     },
    {
      title: '操作',
      key: 'operation',
      className: 'operation',
      fixed: 'right', 
      width: 100, 
      render: (text, record) => {
        return(
     <span>
       {
         record.status == '1'
         ? <Popconfirm title="确定下架？" onConfirm={changeList.bind(null,record.id)}>
           <a>下架</a>
           </Popconfirm>
        : <Popconfirm title="确定删除？" onConfirm={deleteList.bind(null, record.id)}>
           <a>删除</a>
           </Popconfirm>
       }
     </span>
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
        deleteList={deleteList}
        rowKey={record => record.id}
        changeList={changeList}
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
