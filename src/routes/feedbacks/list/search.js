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
    "name": "APP",
    "value": "17202"
  },
  {
    "name": "web",
    "value": "17201"
  }
]

class WrappedAdvancedSearchForm extends React.Component {


  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (!err) {
          if (values.accountDate && values.accountDate.length > 0) {
            values.dateBeg = values.accountDate[0].format("YYYY-MM-DD HH:mm:ss")
            values.dateEnd = values.accountDate[1].format("YYYY-MM-DD HH:mm:ss")
            delete values.accountDate
          }
          this.props.handleSearch(values)
        }
      });
  }


  render() {

    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ padding: '10px 20px 10px 20px' }}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={6}>
            <Col span={4} lg={4} md={4}>
              <FormItem {...formItemLayout} label="渠道" style={formItemStyle}>
                {getFieldDecorator('sourceChannel', {})(
                  <Select placeholder="渠道" style={{ width: '100%' }} allowClear={true}>
                    {
                      status.length !== 0 && status.map((audit) => {
                        return <Option key={audit.value} value={audit.value}>{audit.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col lg={10} md={10}>
              <FormItem {...formItemLayout} label="反馈时间" style={formItemStyle}>
                {getFieldDecorator('accountDate', {})(
                  <DatePicker.RangePicker format="YYYY-MM-DD HH:mm:ss" placeholder="时间" style={{ width: '100%', marginRight: '4px' }}
                    allowClear={true} />
                )}
              </FormItem>
            </Col>
            <Col lg={6} md={6}>
              {getFieldDecorator('brokerName', {})(
                <Input placeholder="请输入经纪公司/经纪人" style={{ width: '100%' }} />
              )}
            </Col>
            <Col lg={4} md={4}>
              <Button type="primary" style={{ marginRight: '4px' }} onClick={this.handleSearch}
                htmlType="submit">查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const Search = Form.create()(WrappedAdvancedSearchForm);
export default Search