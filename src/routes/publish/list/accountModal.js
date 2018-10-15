import React, { Component } from "react";
import { Modal, Form, Input, Select } from "antd";
import styles from "./accountModal.less";

const FormItem = Form.Item;

const Option = Select.Option;

class AccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      arr: [
        {
          value: "1",
          text: "平台楼盘字典"
        },
        {
          value: "2",
          text: "公司私有楼盘字典"
        }
      ]
    };
  }

  showModel = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true
    });
  };

  hideModel = () => {
    this.setState({
      visible: false
    });
  };

  confirmModel = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      // console.log(values);
      if (!err) {
        onOk(values);
        this.hideModel();
      }
    });
    // this.props.form.resetFields()
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { name, email, website } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    return (
      <span>
        <span onClick={this.showModel}>{children}</span>
        <Modal
          title=" 开通18版并迁移数据 "
          visible={this.state.visible}
          onOk={this.confirmModel}
          onCancel={this.hideModel}
        >
          <Form horizontal onSubmit={this.confirmModel}>
            <FormItem {...formItemLayout} label="请注册管理员">
              {getFieldDecorator("name", {
                initialValue: name
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="将自动开通所在城市楼盘字典，请选择楼盘字典类型"
            >
              {getFieldDecorator("website", {
                initialValue: website
              })(
                <Select
                  name=""
                  id=""
                  setFieldsValue={this.state.arr[0].value}
                  placeholder={this.state.arr[0].text}
                >
                  {this.state.arr.map(value => {
                    return (
                      <Option key={value.value} value={value.value}>
                        {value.text}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AccountModal);
