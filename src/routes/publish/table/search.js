import React, { Component } from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { Button, Col, DatePicker, Form, Input, Row, Select, Modal } from "antd";
import moment from "moment";
import Users from "./popfirm";

const FormItem = Form.Item;
const Option = Select.Option;

const formItemStyle = {
  marginBottom: "8px"
};
class PublishForm extends Component {
  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { query, form, publish, handleSearch } = this.props;
    const { createDate } = query;
    const { resetFields, getFieldDecorator, validateFieldsAndScroll } = form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    let Data = moment(new Date(Number(createDate)));
    //日期搜索
    function listSearch(e) {
      e.preventDefault();
      validateFieldsAndScroll((err, fieldsValue) => {
        if (!err) {
          if (fieldsValue.createDate) {
            // console.log("Received values of form: ", fieldsValue);
            fieldsValue.createDate = new Date(
              fieldsValue.createDate.format("YYYY-MM-DD")
            ).getTime();
            fieldsValue.page = 1;
          }
          handleSearch && handleSearch(fieldsValue);
        }
      });
    }

    return (
      <div style={{ padding: "10px 20px 10px 20px" }}>
        <Form onSubmit={listSearch}>
          <Row gutter={16}>
            <Col span={4}>
              <FormItem {...formItemLayout} label="创建时间" style={formItemStyle}>
                {getFieldDecorator("createDate", {})(
                  <DatePicker
                    placeholder="创建时间"
                    style={{ width: "100%", marginRight: "4px" }}
                    allowClear={true}
                  />
                )}
              </FormItem>
            </Col>

            <Col span={4}>
              <FormItem {...formItemLayout} label="发布人" style={formItemStyle}>
                {getFieldDecorator("empName", {})(
                  <Input placeholder="输入发布人" style={{ width: "100%" }} />
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout} label="标题" style={formItemStyle}>
                {getFieldDecorator("title", {})(
                  <Input placeholder="输入标题" style={{ width: "100%" }} />
                )}
              </FormItem>
            </Col>
            <Col lg={4} md={6}>
              <Button
                type="primary"
                style={{ marginRight: "4px" }}
                htmlType="submit"
              >
                查询
              </Button>
              <Button type="danger" onClick={this.handleReset}>
                重置
              </Button>
            </Col>
            <Col lg={8} md={6}>
              <Button
                type="primary"
                style={{ marginRight: "4px" }}
                htmlType="submit"
              >
                <Link to="/publish/addPublish">新增发布</Link>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

PublishForm.propTypes = {
  form: PropTypes.object,
  query: PropTypes.object
};

export default Form.create()(PublishForm);
