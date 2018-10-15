import React, {Component} from 'react';
import {Modal, Form, Col, Row, Input, Select, message} from 'antd';

import SelectBasic from '../../../components/Basic/SelectBasic';
import styles from './accountModal.less';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {span: 6},
  wrapperCol: {span: 14}
};

const roleOptions = [
  {
    name: '实勘人',
    value: '实勘人'
  },
  {
    name: '钥匙人',
    value: '钥匙人'
  },
  {
    name: '独家人',
    value: '独家人'
  }
];

class AccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValues: []
    };
  }

  confirmModel = () => {
    const {onOk, dataSource, roleList} = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.labelempRelations) {
          values.labelempRelations.unshift('归属人');
          let collectValues = values.labelempRelations;
          // onOk(values);
          values.labelempRelations = roleList.map(
            ({paramData, ...item}, index) => {
              return {
                paramOldValue: paramData,
                ...item,
                paramValue: collectValues[index]
              };
            }
          );
        }
        values.id = dataSource.id;
        onOk && onOk(values);
      }
    });
  };

  handleChange = (value, eq) => {
    const {selectedValues} = this.state;

    if (!value) {
      this.setState(({selectedValues}) => {
        selectedValues[eq] = null;
      });
      return;
    }

    if (!selectedValues.includes(value)) {
      this.setState(({selectedValues}) => {
        selectedValues[eq] = value;
      });
    }
  };

  renderRole = () => {
    const {roleList, form} = this.props;
    const {selectedValues} = this.state;
    const {getFieldDecorator, getFieldsValue} = form;

    const roleData = roleOptions.filter(
      item => !selectedValues.includes(item.value)
    );

    return roleList.map((item, index) => {
      return (
        <Row key={index}>
          <Col span="8">
            <FormItem {...formItemLayout} label="17版">
              <span>{item.paramData}</span>
            </FormItem>
          </Col>
          <Col span="16">
            <FormItem {...formItemLayout} label="18版">
              {index === 0 ? (
                <span>归属人</span>
              ) : (
                getFieldDecorator(`labelempRelations.${index - 1}`)(
                  <SelectBasic
                    onChange={value => {
                      const eq = index - 1;
                      return this.handleChange(value, eq);
                    }}
                    allowClear
                    dataSource={roleData}
                  />
                )
              )}
            </FormItem>
          </Col>
        </Row>
      );
    });
  };

  render() {
    const {form, dataSource, type, ...restProps} = this.props;
    const {getFieldDecorator} = form;

    const modalProps = {
      ...restProps,
      onOk: this.confirmModel
    };

    return (
      <span>
        <Modal title=" 开通18版并迁移数据 " {...modalProps}>
          <Form layout="horizontal" onSubmit={this.confirmModel}>
            <FormItem
              labelCol={{span: 6}}
              wrapperCol={{span: 12}}
              label="请注册管理员"
            >
              {getFieldDecorator('phone_number', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '必填'
                  }
                ]
              })(<Input placeholder="请输入手机号" />)}
            </FormItem>
            <FormItem
              labelCol={{span: 12}}
              wrapperCol={{span: 12}}
              label="将自动开通所在城市楼盘字典，类型为:"
            >
              <span>公司私有楼盘字典</span>
            </FormItem>
            {type === 2 && this.renderRole()}
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(AccountModal);
