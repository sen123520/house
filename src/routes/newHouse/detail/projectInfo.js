import React from 'react';
import {Link} from 'react-router'
import {Button, Col, Form, Input, message, Row} from 'antd';
import _ from 'lodash';

const FormItem = Form.Item
let BASE_INFO = [
  [{label: '楼盘名', field: 'estateNm'}, {label: '备案名', field: 'recordName'}],
  [{label: '推广名', field: 'promotionName', editable: true}, {label: '签约名', field: 'signName'}],
  [{label: '业绩归属城市', field: 'cityNm'}, {label: '业绩归属项目部', field: 'projectDepartment'}],
  [{label: '楼盘地址', field: 'address'}],
  [{label: '合作模式', field: 'cooperationModeValue'}, {label: '销售状态', field: 'salesStatusValue'}],
  [{label: '总价段', field: 'salePriceUnit'}],
  [{label: '标签', editable: true, field: 'mark'}],
  [{label: '预计开盘时间', field: 'openTime'}, {label: '预计交房日期', field: 'houseTransferTime'}],
  [{label: '合作方', field: 'partnerNm'}],
  [{label: '合作人', field: 'partnerContactNm'}],
  [{label: '项目负责人', field: 'sceneEmpId'}, {label: '项目负责人电话', field: 'empTel'}],
  [{label: '合作期自', field: 'cooperationDtStart'}, {label: '合作期至', field: 'cooperationDtEnd'}],
  [{label: '项目描述', field: 'projectDescription', editable: true, type: "textArea"}],//type: "textArea"
]
let ESTATE_INFO = [
  [{label: '开发商', field: 'devCompany'}],
  [{label: '开发商对接人', field: 'devCompanyBroker'}, {label: '开发商对接人电话', field: 'devCompanyBrokerTel'}],
  [{label: '案场地址', field: 'fieldAddress'}],
  [{label: '预售许可', field: 'preSalePermitKbn'}],
  [{label: '物业类型', field: 'mgtKbnStr'}],
  [{label: '产权年限', field: 'ownYearKbnStr'}],
  [{label: '装修情况', field: 'decorationKbnStr'}],
  [{label: '建筑类型', field: 'typeKbnStr'}],
  [{label: '规划户数', field: 'houseCnt'}],
  [{label: '车位情况', field: 'parkCnt'}],
  [{label: '停车费', field: 'parkFee'}],
  [{label: '梯户', field: 'staircaseHousehold'}],
]
//物业
let PROPERTY_MANAGEMENT = [
  [{label: '物业公司', field: 'mgtCompany'}],
  [{label: '容积率', field: 'rateFAR'}, {label: '绿化率', field: 'rateGreen'}, {label: '物业费用', field: 'mgtPrice'}],
  [{label: '供暖方式', field: 'heatKbnStr'}],
  [{label: '水电燃气', field: 'hydropowerGasKbnStr'}],
]
//联动规则上
let ESTATE_RULE_INFO = [
  [{label: '认证类型', field: 'authenticationKbnStr'}],
  [{label: '提前报备期', field: 'advanceReportHH'}, {label: '带看保护期', field: 'relationProtectPeriod'}],
  [{label: '带看奖励', field: 'relationReward'}, {label: '起始日期', field: 'relationDtStart'}, {
    label: '截止日期',
    field: 'RelationDtEnd'
  }],
  [{label: '认筹奖励', field: 'pledgedReward'}, {label: '起始日期', field: 'pledgedDtStart'}, {
    label: '截止日期',
    field: 'PledgedDtEnd'
  }],
  [{label: '大定奖励', field: 'subscribedReward'}, {label: '起始日期', field: 'subscribedDtStart'}, {
    label: '截止日期',
    field: 'subscribedDtEnd'
  }],
  [{label: '成销奖励', field: 'bargainReward'}],
  [{label: '佣金方式', field: 'commissionKbnStr'}],
  [{label: '佣金', field: 'commission'}, {label: '结佣期限', field: 'commissionPeriod'}],
  [{label: '结佣方式', field: 'payKbnStr'}],
  [{label: '销售方式', field: 'saleKbnStr'}],
  [{label: '报备开始日', field: 'reportDtStart'}, {label: '报备截止日', field: 'reportDtEnd'}],
  [{label: '报备规则', field: 'reportRule'}],
  [{label: '结佣规则', field: 'commissionRule'}],
]

class ProjectInfo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      images: {
        estateEffect: [],
        estateModel: [],
        estatePosition: [],
        estateRegionRule: [],
        estateView: [],
      }
    }
  }
  componentDidMount() {
    const {projectDetail} = this.props;
    let values = {}

    for (let key of this.fields) {
      if (projectDetail.data[key]) {
        values[key] = projectDetail.data[key]
      }

    }
    this.props.form.setFieldsValue(values)
    this.setState({
      rooms: projectDetail.data.rooms,
      images: projectDetail.data.estateImage,
    })
  }


  save = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          if (values.mark) {
            if (values.mark.indexOf(",") === -1 && values.mark.length > 4) {
              message.error('标签最多4个,每个不超过4个字');
              return;
            } else {
              //str.split
              var markN = values.mark.split(",");
              if (markN.length > 4) {
                message.error('标签最多4个,每个不超过4个字');
                return;
              }
              for (var i = 0; i < markN.length; i++) {
                if (markN[i].length > 4) {
                  message.error('标签最多4个,每个不超过4个字');
                  return;
                }
              }
            }
          }
          // if (values.projectDescription) {
          //   if (values.projectDescription.length > 200) {
          //     message.error('项目描述最多200字');
          //   }
          // }

          let reqparam = {
            "promotionName": values.promotionName,
            "mark": values.mark,
            "projectDescription": values.projectDescription,
            "id": this.props.params.id
          }
          this.props.dispatch({type: 'projectDetail/projectSave', payload: reqparam})
        }
      });
  }

  getFields = (itemsName, items) => {
    const {getFieldDecorator} = this.props.form;
    let formItem = (item, style) => {
      if (item.field) {
        this.fields.push(item.field)
        if (item.editable) {
          if (item.type) {
            if (item.type === "textArea") {
              return (
                <FormItem {...style} label={item.label}>
                  {getFieldDecorator(item.field, {})(
                    <Input type='textarea' rows={4}/>
                  )}
                </FormItem>
              )
            }
          } else {
            if (item.field === 'mark') {
              return (
                <FormItem {...style} label={item.label}>
                  {getFieldDecorator(item.field, {})(
                    <Input placeholder="多标签以‘,‘分隔"/>
                  )}
                </FormItem>
              )

            } else {

              return (
                <FormItem {...style} label={item.label}>
                  {getFieldDecorator(item.field, {})(
                    <Input/>
                  )}
                </FormItem>
              )
            }
          }
        } else {
          return (
            <FormItem {...style} label={item.label}>
              {getFieldDecorator(item.field, {})(
                <Input readOnly={true} style={{border: 'none', outline: 0, 'box-shadow': 'none'}}/>
              )}
            </FormItem>
          )
        }
      } else {
        return (
          <FormItem {...style} label={item.label}>
          </FormItem>
        )
      }
    }


    let children = []
    let i = 0
    for (let item of items) {
      if (item.length === 1) {
        children.push(
          <Row key={'row' + itemsName + i} gutter={16} justify="start">
            <Col span={9}>
              {formItem(item[0], {labelCol: {span: 8}, wrapperCol: {span: 16}, style: {marginBottom: '8px'}})}
            </Col>
          </Row>
        )
      } else {
        children.push(
          <Row key={'row' + itemsName + i} gutter={16}>
            <Col span={9}>
              {formItem(item[0], {labelCol: {span: 8}, wrapperCol: {span: 16}, style: {marginBottom: '8px'}})}
            </Col>
            <Col span={9}>
              {formItem(item[1], {labelCol: {span: 8}, wrapperCol: {span: 16}, style: {marginBottom: '8px'}})}
            </Col>
          </Row>
        )
      }
      i++
    }
    return children
  }

  getRooms = () => {
    return this.state.rooms.map((room) => {
      return (
        <div key={room.typeId}>
          <span style={{fontSize: '50px', fontWeight: 'bold'}}>在售户型</span>
          <div style={{margin: '10px'}}>
            <Row gutter={16}>
              <Col span={3}>户型: {room.countF}室</Col>
              <Col span={3}>面积: {room.buildSquare}平米</Col>
              <Col span={3}>朝向: {room.directionKbn}</Col>
            </Row>
            <Row>
              户型图:
              {
                room.roomFloor && room.roomFloor.map((img) => {
                  return <img key={img} src={img}/>
                })
              }
            </Row>
            <Row>
              样板图:
              {
                room.roomModel && room.roomModel.map((img) => {
                  return <img key={img} src={img}/>
                })
              }
            </Row>
          </div>
        </div>
      )
    })
  }


  render() {
    this.fields = []
    return (
      <div style={{margin: '30px'}}>
        <Form>
          <span style={{fontSize: '22px', fontWeight: 'bold'}}>基本信息</span>
          {this.getFields('b', BASE_INFO)}
          <span style={{fontSize: '22px', fontWeight: 'bold'}}>楼盘详情</span>
          {this.getFields('e', ESTATE_INFO)}
          <span style={{fontSize: '22px', fontWeight: 'bold'}}>物业信息</span>
          {this.getFields('p', PROPERTY_MANAGEMENT)}
          <span style={{fontSize: '22px', fontWeight: 'bold'}}>联动规则</span>
          {this.getFields('r', ESTATE_RULE_INFO)}
          {
            this.state.rooms.map((room) => {
              return (
                <div key={room.typeId}>
                  <span style={{fontSize: '22px', fontWeight: 'bold'}}>在售户型</span>
                  <div style={{margin: '20px'}}>
                    <Row gutter={16}>
                      <Col span={3}>户型: {room.countF}室</Col>
                      <Col span={3}>面积: {room.buildSquare}平米</Col>
                      <Col span={3}>朝向: {room.directionKbn}</Col>
                    </Row>
                    <Row>
                      户型图: {
                      room.roomFloor && room.roomFloor.map((img) => {
                        return <img key={img} src={img}/>
                      })
                    }
                    </Row>
                    <Row>
                      样板图: {
                      room.roomModel && room.roomModel.map((img) => {
                        return <img key={img} src={img}/>
                      })
                    }
                    </Row>
                  </div>
                </div>
              )
            })
          }
          <div style={{margin: '20px'}}>
            <Row>
              <Col span={3}>
                楼盘效果图:
              </Col>
              <Col span={21}>
                {
                  !this.state.images && this.state.images.estateEffect.map((img) => {
                    return <img key={img} src={img}/>
                  })
                }
              </Col>
            </Row>
            <Row>
              <Col span={3}>
                楼盘样板间:
              </Col>
              <Col span={21}>
                {
                  !this.state.images && this.state.images.estateModel.map((img) => {
                    return <img key={img} src={img}/>
                  })
                }
              </Col>
            </Row>
            <Row>
              <Col span={3}>
                区域规则图:
              </Col>
              <Col span={21}>
                {
                  !this.state.images && this.state.images.estateRegionRule.map((img) => {
                    return <img key={img} src={img}/>
                  })
                }
              </Col>
            </Row>
            <Row>
              <Col span={3}>
                楼盘实景图:
              </Col>
              <Col span={21}>
                {
                  !this.state.images && this.state.images.estateView.map((img) => {
                    return <img key={img} src={img}/>
                  })
                }
              </Col>
            </Row>
            <Row>
              <Col span={3}>
                楼盘地理位置:
              </Col>
              <Col span={21}>
                {
                  !this.state.images && this.state.images.estatePosition.map((img) => {
                    return <img key={img} src={img}/>
                  })
                }
              </Col>
            </Row>
            <FormItem wrapperCol={{span: 20}}>
              <Button type="primary" onClick={this.save} htmlType="submit">
                保存
              </Button>
            </FormItem>

          </div>
        </Form>
      </div>
    )
  }


}

const WrappedProjectInfo = Form.create()(ProjectInfo);
export default WrappedProjectInfo;

