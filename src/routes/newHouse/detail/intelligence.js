import React from 'react';
import {Link} from 'react-router'
import {Button, Input, Modal, Table} from 'antd';


/**
 * 情报
 */
class Intelligence extends React.Component {


  state = {
    visible: false,
    visibleAdd: false,
    content: '',
    contentAdd: ''
  }
  showModal = (text, data) => {
    this.setState({
      visible: true,
      content: data.content
    });
  }
  showModalAdd = () => {
    this.setState({
      visibleAdd: true
    });
  }

  delete = (text, data) => {
    this.props.dispatch({type: 'projectDetail/intelligenceDelete', payload: {id: data.id, unId: this.props.params.id}})
  }

  handleCancel = () => {
    this.setState({visible: false});
  }


  submit = () => {
    // console.log(this.state.contentAdd)
    this.props.dispatch({
      type: 'projectDetail/intelligenceAdd',
      payload: {content: this.state.contentAdd, unId: this.props.params.id}
    })
    this.setState({
      contentAdd: ''
    })
    this.handleCancelAdd()
  }


  handleCancelAdd = () => {
    this.setState({visibleAdd: false});
  }


  contentChange = (e) => {
    this.setState({
      contentAdd: e.target.value
    })

  }


  render() {
    const {onPageChange} = this.props
    const {data, total, page: current, pageSize} = this.props.objDetail
    const {visible, visibleAdd, content} = this.state;
    const columns = [{
      title: '发送时间',
      dataIndex: 'crtDt',
    }, {
      title: '发送人',
      dataIndex: 'sendPerson',
    }, {
      title: '发送内容',
      dataIndex: 'content',
      width: 400,
      render: (text) => <div style={{height: '20px', overflow: 'hidden'}}>{text}</div>
    },
      {
        title: '操作', key: 'operation', className: 'operation', fixed: 'right', width: 150, render: (text, record) => {
        return (
          <div>
            <Button type="primary1" onClick={() => this.showModal(text, record)}
                    style={{marginRight: '2px'}}>查看</Button>
            <Button type="danger" onClick={() => this.delete(text, record)}>删除</Button>
          </div>
        )
      }
      }];

    const tableProps = {
      columns,
      dataSource: data,
      size: 'middle',
      onChange: onPageChange,
      pagination: {
        total,
        current,
        pageSize
      }
    }


    return (
      <div>
        <div style={{margin: '20px'}}>
          <Button type="primary" onClick={() => this.showModalAdd()}>新增情报</Button>
        </div>
        <div style={{margin: '20px'}}>
          <Table {...tableProps}/>
        </div>

        <Modal
          visible={visible}
          title="查看情报"
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>关闭</Button>
          ]}
        >
          <p>{content}</p>
        </Modal>


        <Modal
          visible={visibleAdd}
          title="新增情报"
          onCancel={this.handleCancelAdd}
          footer={[
            <Button key="back" onClick={this.handleCancelAdd}>关闭</Button>,
            <Button key="submit" type="primary" onClick={this.submit}>发送消息</Button>,
          ]}
        >
          <Input type='textarea' onChange={this.contentChange} value={this.state.contentAdd} rows={6}
                 placeholder="最多100字"/>
        </Modal>


      </div>
    )
  }


}

export default Intelligence
