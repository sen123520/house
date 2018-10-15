import React,{Component} from "react";
import { connent } from "dva";
import { Link, routerRedux } from "react-router";
import { Table, Popconfirm } from "antd";
import styles from './index.less';

export default class ListTable extends React.Component {
  constructor(props){
    super(props)
    
    this.state = {
      dataSource: [],
      columns: [
        { title: "标题", dataIndex: "title", key: "title" },
        { title: "关联", dataIndex: "outLink", key: "outLink" },
        { title: "创建时间", dataIndex: "createDate", key: "createDate" },
        {
          title: "更新时间",
          dataIndex: "updateDate",
          key: "updateDate"
        },
        {
          title: "创建人",
          dataIndex: "empName",
          key: "empName"
        },
        {
          title: "操作",
          key: "operation",
          className: "operation",
          fixed: "middle",
          render: (text, record) => {
            return (
              <div>
                {
                  this.handleStatus(record)
                }
                <Popconfirm
                  title="是否删除？"
                  onConfirm={this.handleDelete.bind(this, record)}>
                  <a href="" className={styles.optionBtn}>删除</a>
                </Popconfirm>
              </div>
            );
          }
        }
      ],
      publishContent: this.props.publishContent
    }
  }

  componentWillReceiveProps(props) {
    if (this.props.publishContent.data) {
      this.setState({
        publishContent: this.props.publishContent,
        dataSource: this.props.publishContent.data.map((value, index) => {
          return {
            id: value.id,
            status: value.status,
            title: value.title,
            type: value.type,
            outLink: value.outLink,
            empId: value.empId,
            empName: value.empName,
            createDate: value.createDate,
            updateDate: value.updateDate,
            key: index
          }
        })
      })
    }
  }

  handleLink(bool, record) {
    if(bool) {
      record.edit = false
      if (record.type === 'banner') {
        return <Link to={{pathname:'/publishContent/newBanner', 
                          query:record}}>查看</Link>
      } else if (record.type === 'news') {
        return <Link to={{pathname:'/publishContent/newContent', 
                        query:record}}>查看</Link>
      } else {
        return ''
      }
    } else {
      record.edit = true
      if (record.type === 'banner') {
        return <Link to={{pathname:'/publishContent/newBanner', 
                          query:record}}>编辑</Link>
      } else if (record.type === 'news') {
        return <Link to={{pathname:'/publishContent/newContent', 
                        query:record}}>编辑</Link>
      } else {
        return ''
      }
    }
    
  }

  handleStatus(record){
    switch(record.status){
      case 1:
        // 有效 待生效
        return this.handleLink(true, record)
      case 2:
        // 有效 待生效
        return this.handleLink(true, record)
      case 0:
        // 下架 未发布
        return this.handleLink(false, record)
      case 3:
        // 下架 未发布
        return this.handleLink(false, record)
      default:
        return ''
    }
  }

  handleDelete(record) {
    // console.log('执行删除', record)
    this.props.dispatch({
      type: 'publishContent/deleteData',
      payload: record
    })
  }

  render() {
    let {total, page: current, pageSize, data} = this.state.publishContent
    return (
      <div>
        <Table 
          bordered
          columns={this.state.columns}
          dataSource={this.state.dataSource}
          rowKey={record => record.key}
          onChange={this.props.onPageChange}
          pagination={{
            total,
            current,
            pageSize,
            showQuickJumper: total > 10 ? true : false,
            showSizeChanger: total > 10 ? true : false
          }}
        />
      </div>
    )
  }
}

/*function ListTable({ publishContent, loading, onPageChange, dispatch }) {
  const { total, page: current, pageSize, data } = publishContent;

  return (
    <div>发布内容列表模块</div>
  )
}

export default ListTable;*/
