import React from 'react';
import { Link } from 'react-router'
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

const formItemStyle = {
  marginBottom: '8px'
}

//状态
const status = [

  {
    "name": "未申请",
    "value": "0"
  },
  {
    "name": "已申请",
    "value": "1"
  },
  {
    "name": "等待升级",
    "value": "2"
  },
  {
    "name": "升级中",
    "value": "3"
  },
  {
    "name": "升级成功",
    "value": "4"
  },
  {
    "name": "升级失败",
    "value": "5"
  }
]

class AdvancedSearchForm extends React.Component {


  handleSearch = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        // console.log(values)
        if (!err) {
          if (values.accountDate && values.accountDate.length > 0) {
            values.startDate = values.accountDate[0].format("YYYY-MM-DD HH:mm:ss")
            values.endDate = values.accountDate[1].format("YYYY-MM-DD HH:mm:ss")
            delete values.accountDate
          }
          this.props.handleSearch(values)
        }
      });
  }

  handleReset = () => {
    this.props.form.resetFields();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          values.startDate = ''
          values.endDate = ''
          this.props.handleSearch(values)
        }
      });
  }


  realityCityChange = (value) => {
    if (value) {
      this.props.dispatch({ type: 'project/getDistrictDict', payload: { id: value } })
    }
  }


  render() {
    const { cityDictData = [], performanceCityDictData = [], districtDictData = [] } = this.props.account;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    if (cityDictData.length === 0) {
      const cityDict = { "value": null, "name": null }
      cityDictData.push(cityDict)
    }

    if (performanceCityDictData.length === 0) {
      const performanceCityDict = { "value": null, "name": null }
      performanceCityDictData.push(performanceCityDict)
    }

    if (districtDictData.length === 0) {
      const districtDict = { "value": null, "name": null }
      districtDictData.push(districtDict)
    }

    return (
      <div style={{ padding: '10px 20px 10px 20px' }}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={16}>
            <Col span={4} lg={4} md={4}>
              <FormItem {...formItemLayout} label="状态" style={formItemStyle}>
                {getFieldDecorator('upgrade_state', {})(
                  <Select placeholder="状态" style={{ width: '100%' }} allowClear={true}>
                    {
                      status.length !== 0 && status.map((audit) => {
                        return <Option key={audit.value} value={audit.value}>{audit.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={6}>
              <FormItem {...formItemLayout} label="申请日期" style={formItemStyle}>
                {getFieldDecorator('accountDate', {})(
                  <DatePicker.RangePicker placeholder="" style={{ width: '100%', marginRight: '4px' }}
                    allowClear={true} />
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={6}>
              {getFieldDecorator('keyWord', {})(
                <Input placeholder="17版编码/公司名称/17版联系方式/18版管理员账号" style={{ width: '100%' }} />
              )}
            </Col>
            <Col lg={4} md={4}>
              <Button type="primary" style={{ marginRight: '4px' }} onClick={this.handleSearch}
                htmlType="submit">搜索</Button>
              {/* <Button type="danger" onClick={this.handleReset}>重置</Button> */}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm