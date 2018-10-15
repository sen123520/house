import React from 'react';
import { Link } from 'react-router';
import { routerRedux } from 'dva/router';
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from './index.less';

class Search extends React.Component{
  constructor (props) {
    super(props)
    // console.log(props)
  }

  handleSearch = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          if (values.createDate) {
            values.createDate = values.createDate.format("YYYY-MM-DD")
          }
          this.props.handleSearch(values)
        }
      });
  }

  handleReset = () => {
    this.props.form.resetFields();
    /* this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          this.props.handleSearch(values)
        }
      }); */
  }

  handleLinkNewBanner = () => {
    this.props.publishContent.editData = {};
    this.props.dispatch(routerRedux.push({
        pathname: '/publishContent/newBanner',
        query: {
          edit: true
        }
    }))
  }

  handleLinkNewContent = () => {
    this.props.publishContent.editData = {};
    this.props.dispatch(routerRedux.push({
        pathname: '/publishContent/newContent',
        query: {
          edit: true
        }
    }))
  }

  render () {
    const {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 15 }
    };
    
    return (
      <div>
        <Form>
          <Row gutter={16}>
            <Col lg={6} md={6} sm={6}>
              <Form.Item {...formItemLayout} label="创建时间">
                {getFieldDecorator('createDate', {})(
                  <DatePicker style={{width:'100%'}} allowClear={true} />
                )}
              </Form.Item>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <Form.Item {...formItemLayout} label="创建人">
                {getFieldDecorator('empName', {})(
                  <Input placeholder="" style={{width:'100%'}} />
                )}
              </Form.Item>
            </Col>
            <Col lg={8} md={8} sm={8}>
              <Form.Item labelCol={{span:6}} wrapperCol={{span:18}} label="标题">
                {getFieldDecorator('title', {})(
                  <Input placeholder="" style={{width:'100%'}} />
                )}
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={4} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              <Button type="primary" style={{ marginRight: '4px' }}
                htmlType="submit" onClick={this.handleSearch}>查询</Button>
              <Button type="danger" onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>

        <Row type="flex" justify="end" align="middle" className={styles.btnLink}>
          <Button className={styles.btn} onClick={this.handleLinkNewBanner.bind(this)}>新增banner</Button>
          <Button className={styles.btn} onClick={this.handleLinkNewContent.bind(this)}>新增系统公告</Button>
        </Row>
      </div>
    )
  }
}

const SearchForm = Form.create()(Search);

export default SearchForm