import React from 'react';
import { Link } from 'react-router'
import { Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;

const formItemStyle = {
  marginBottom: '8px'
}

//项目状态
const projectStatus = [
  {
    "name": "跟单",
    "value": "20301"
  },
  {
    "name": "签约",
    "value": "20302"
  },
  {
    "name": "结案",
    "value": "20303"
  },
  {
    "name": "取消跟单",
    "value": "20304"
  }
]
//发布状态
const releaseStatus = [

  {
    "name": "已发布",
    "value": "13001"
  },
  {
    "name": "未发布",
    "value": "13002"
  }
]

//审核状态
const auditStatus = [

  {
    "name": "未审核",
    "value": "12901"
  },
  {
    "name": "不通过",
    "value": "12902"
  },
  {
    "name": "通过",
    "value": "12903"
  },
  {
    "name": "未提交",
    "value": "12904"
  }
]

//合作方
const partner = [

  {
    "name": "开发商",
    "value": "12801"
  },
  {
    "name": "电商",
    "value": "12802"
  },
  {
    "name": "分销商",
    "value": "12803"
  },
  {
    "name": "代理商",
    "value": "12804"
  }
]

const dateTypeKbn = [
  {
    "name": "合作期自",
    "value": "13101"
  },
  {
    "name": "合作期至",
    "value": "13102"
  },
  {
    "name": "录入日",
    "value": "13103"
  }
]

class AdvancedSearchForm extends React.Component {


  handleSearch = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          if (values.projectDate && values.projectDate.length > 0) {
            values.startDate = values.projectDate[0].format("YYYY-MM-DD HH:mm:ss")
            values.endDate = values.projectDate[1].format("YYYY-MM-DD HH:mm:ss")
            delete values.projectDate
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
    const { cityDictData = [], performanceCityDictData = [], districtDictData = [] } = this.props.project;
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
            <Col span={4}>
              <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="业绩归属城市" style={formItemStyle}>
                {getFieldDecorator('cityNo', {})(
                  <Select placeholder="业绩归属城市" style={{ width: '100%' }}>
                    {
                      performanceCityDictData.length > 0 && performanceCityDictData.map((pcity) => {
                        return <Option key={pcity.value} value={pcity.value}>{pcity.name}</Option>
                      })
                    }

                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={4}>
              <FormItem labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} label="项目所在城市" style={formItemStyle}>
                {getFieldDecorator('realityCityNo', {})(
                  <Select placeholder="项目所在城市" style={{ width: '100%' }} allowClear={true}
                    onChange={this.realityCityChange}>
                    {
                      cityDictData.length > 0 && cityDictData.map((city) => {
                        return <Option key={city.value} value={city.value}>{city.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout} label="区域" style={formItemStyle}>
                {getFieldDecorator('districtId', {})(
                  <Select placeholder="区域" style={{ width: '100%' }} allowClear={true}>
                    {
                      districtDictData.length !== 0 && districtDictData.map((district) => {
                        return <Option key={district.value} value={district.value}>{district.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout} label="合作方" style={formItemStyle}>
                {getFieldDecorator('partner', {})(
                  <Select placeholder="合作方" style={{ width: '100%' }} allowClear={true}>
                    {
                      (partner.length !== 0) && partner.map((par) => {
                        return <Option key={par.value} value={par.value}>{par.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout} label="审核状态" style={formItemStyle}>
                {getFieldDecorator('auditStatus', {})(
                  <Select placeholder="审核状态" style={{ width: '100%' }} allowClear={true}>
                    {
                      auditStatus.length !== 0 && auditStatus.map((audit) => {
                        return <Option key={audit.value} value={audit.value}>{audit.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout} label="发布状态" style={formItemStyle}>
                {getFieldDecorator('releaseStatus', {})(
                  <Select placeholder="审核状态" style={{ width: '100%' }} allowClear={true}>
                    {
                      releaseStatus.length !== 0 && releaseStatus.map((release) => {
                        return <Option key={release.value} value={release.value}>{release.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={4}>
              <FormItem {...formItemLayout} label="项目状态" style={formItemStyle}>
                {getFieldDecorator('projectStatus', {})(
                  <Select placeholder="审核状态" style={{ width: '100%' }} allowClear={true}>
                    {
                      projectStatus.length !== 0 && projectStatus.map((pjo) => {
                        return <Option key={pjo.value} value={pjo.value}>{pjo.name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col lg={4} md={5}>
              {getFieldDecorator('dateType', {})(
                <Select placeholder="选择日期类型" style={{ width: '100%' }} allowClear={true}>
                  {
                    dateTypeKbn.length !== 0 && dateTypeKbn.map((dateType) => {
                      return <Option key={dateType.value} value={dateType.value}>{dateType.name}</Option>
                    })
                  }
                </Select>
              )}
            </Col>
            <Col lg={5} md={12}>
              {getFieldDecorator('projectDate', {})(
                <DatePicker.RangePicker placeholder="选择日期类型" style={{ width: '100%', marginRight: '4px' }}
                  allowClear={true} />
              )}
            </Col>
            <Col lg={4} md={5}>
              {getFieldDecorator('cooperationMode', {})(
                <Select placeholder="选择合作模式" style={{ width: '100%' }} allowClear={true}>
                  <Option key={"20401"} value="20401">分销</Option>
                  <Option key={"20402"} value="20402">整合</Option>
                </Select>
              )}
            </Col>
            <Col lg={6} md={8}>
              {getFieldDecorator('keyWord', {})(
                <Input placeholder="输入编号/项目编号/楼盘名/录入人" style={{ width: '100%' }} />
              )}
            </Col>
            <Col lg={4} md={6}>
              <Button type="primary" style={{ marginRight: '4px' }} onClick={this.handleSearch}
                htmlType="submit">查询</Button>
              <Button type="danger" onClick={this.handleReset}>重置</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm
