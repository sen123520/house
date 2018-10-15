import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';


import styles from './index.less';
import constants from '../../../utils/constants';

/* function NewContent({ publishContent, dispatch, loading, location, children }){


  return (
    <div>
      <span>新增系统公告</span>
    </div>
  )
} */

class NewContent extends React.Component{
  constructor(props){
    super(props)
    // console.log('location query', this.props.location.query)

    this.state = {
      edit: this.props.location.query.edit ? 
                this.props.location.query.edit === 'false' ? false : true
              : false,
      editData: null
    }
  }

  componentWillMount () {
    if(this.props.location.query.id){
        this.props.dispatch({
          type: 'publishContent/getData',
          payload: this.props.location.query.id
        })
    }
  }

  componentWillReceiveProps(props) {
    // console.log(props)
    if(props.publishContent.editData && !this.state.editData) {
      this.setState({
        editData: props.publishContent.editData
      })
    }
  }
  

  async handleSubmit() {
    // console.log('提交操作', this.props.form)
    this
      .props
      .form
      .validateFields((err, values) => {
        if(err){
          // console.log('form err', err)
          return
        }
        // console.log(values)
        values.type = 'news'
        this.props.dispatch({
          type: 'publishContent/newContent',
          payload: values
        })
        /* this.props.dispatch(routerRedux.push({
          pathname: '/publishContent/list'
        })); */
      });
  }

  handleReset() {
    this.props.form.resetFields();
    this.props.publishContent.editData = {};
    this.props.dispatch(routerRedux.goBack());
    // console.log('取消操作')
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const colPorps = {
      lg: 20,
      md: 20,
      sm: 20
    }
    
    const {editData} = this.state
    return (
      <div>
        <Form>
          <Row gutter={20}>
            <Col {...colPorps}>
              <Form.Item labelCol={{span:4}} wrapperCol={{span:20}} label="标题">
                {getFieldDecorator('title', {
                  initialValue: this.state.editData ? editData.title : '',
                  rules: [{
                    required: true,
                    message: '必填，且字数不大于20字',
                    max: 20
                  }]
                })(
                  <Input placeholder="" style={{width:'100%'}} disabled={!this.state.edit}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col {...colPorps}>
              <Form.Item labelCol={{span:4}} wrapperCol={{span:20}} label="内容">
                {getFieldDecorator('content', {
                  initialValue: this.state.editData ?editData.title: ''
                })(
                  <Input.TextArea rows={10} placeholder="" style={{width:'100%'}}  disabled={!this.state.edit}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.edit ? 
              <Row gutter={20} type='flex' justify="center" align="middle">
                <Col lg={10} md={10} sm={10} style={{display:'flex', justifyContent:'space-around', alignItems:'middle'}}>
                  <Button type="primary" style={{ marginRight: '4px' }}
                    htmlType="submit" onClick={this.handleSubmit.bind(this)}>保存</Button>
                  <Button type="danger" onClick={this.handleReset.bind(this)}>取消</Button>
                </Col>
              </Row>
            :
              <Row gutter={20} type='flex' justify="center" align="middle">
                <Col lg={10} md={10} sm={10} style={{display:'flex', justifyContent:'space-around', alignItems:'middle'}}>
                  <Button type="default" onClick={this.handleReset.bind(this)}>返回</Button>
                </Col>
              </Row>
          }
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ publishContent, loading }) {
  return {
    publishContent: publishContent,
    loading: loading.models.publishContent
  }
}

const newContent = Form.create()(NewContent);

export default connect(mapStateToProps)(newContent);
