import React from "react";
import {
  Router,
  Route,
  browserHistory,
  hashHistory,
  IndexLink,
  Link
} from "react-router";
import {
  Icon,
  Card,
  Form,
  Input,
  Button,
  Select,
  Radio,
  message,
  Checkbox,
  DatePicker,
  Tabs,
  Alert
} from "antd";
import _ from "lodash";
import styles from "./index.less";
import hcStyle from "./houseloancal.less";

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
// function changeHandler(dispatch, id, values){
//   dispatch({
//     type:"accountDetail/patch",
//     playload: {id,values},
//   })
// }
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

const change = [
  {
    title: " ",
    dataIndex: "detail.change_msgs",
    key: "detail.change_msgs"
  }
];
const formItemStyle = {
  marginBottom: "8px"
};

const radioLoanType = [
  { value: 1, name: "banner推送" },
  { value: 2, name: "系统公告" }
];
const appploanyear = [
  { year: 1, name: "1" },
  { year: 2, name: "2" },
  { year: 3, name: "3" },
  { year: 4, name: "4" },
  { year: 5, name: "5" },
  { year: 6, name: "6" },
  { year: 7, name: "7" },
  { year: 8, name: "8" },
  { year: 9, name: "9" },
  { year: 10, name: "10" },
  { year: 11, name: "11" },
  { year: 12, name: "12" },
  { year: 13, name: "13" },
  { year: 14, name: "14" },
  { year: 15, name: "15" },
  { year: 16, name: "16" },
  { year: 17, name: "17" },
  { year: 18, name: "18" },
  { year: 19, name: "19" },
  { year: 20, name: "20" }
];

// this.props.namespace.xxx
class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      images: {
        estateEffect: [],
        estateModel: [],
        estatePosition: [],
        estateRegionRule: [],
        estateView: []
      },
      type: 1,
      appSendFlag:0,
      webSendFlag:0,
      displayLocation:1
    };
    //取消
    this.handleCancel = this.handleCancel.bind(this);
    //保存
    this.handleSubmit = this.handleSubmit.bind(this);
    //提交
    this.handleApprove = this.handleApprove.bind(this);
  }

  componentWillMount() {
    // console.log('willMount', this.props)
    this.props.dispatch({
      type: "accountDetail/getCityList",
      payload: {}
    });
  }

  componentWillReceiveProps(props) {
    // console.log(props);
  }

  onReset = () => {
    this.setState({
      type: 1, //1banner 2系统
      constn: null //内容
    });
  };
  showModal = (text, data) => {
    this.setState({
      visible: true,
      content: data.content
    });
  };

  onloanTypeChange = e => {
    // console.log("选择类型", e.target.value);
    this.setState({
      type: e.target.value,
      startTime:null,
      endTime:null
    });
  };

  changecont = () => {
    this.props.handleShowModal && this.props.handleShowModal(String(this.state.type));
  };

  danpriceChange = e => {
    //内容
    const { value } = e.target;
    // console.log(value);
    this.setState({
      title: value,
      contentId: value
    });
  };

  chengshuChange = value => {
    // console.log(value);
    this.setState({
      chengshu: value
    });
  };
  loanYearChange = value => {
    // console.log(value);
    this.setState({
      sdloanYear: value
    });
  };
  realityCityChange = value => {
    //城市
    // console.log(value);
    let sen = value.join(",");
    this.setState({
      sendCity: sen
    });
  };
  applonChange = e => {
    // console.log(e.target.checked);
    this.setState({
      appSendFlag: e.target.checked ? 1 : 0
    });
  };
  appViewWeight = value => {
    // console.log(value);
    this.setState({
      appViewWeight: value
    });
  };
  webViewWeight = value => {
    // console.log(value);
    this.setState({
      webViewWeight: value
    });
  };
  weblonChange = e => {
    // console.log(e.target.checked);
    this.setState({
      webSendFlag: e.target.checked ? 1 : 0
    });
  };

  houslonChange = e => {
    // console.log(e.target.checked);
    this.setState({
      houslonChange: e.target.checked
    });
  };
  newlonChange = e => {
    // console.log(e.target.checked);
    this.setState({
      newlonChange: e.target.checked
    });
  };

  stlonChange = (date, dateString) => {
    // console.log("start", date, dateString);
    this.setState({
      startTime: dateString
    });
  };

  etlonChange = (date, dateString) => {
    // console.log("end", date, dateString);
    this.setState(
      {
        endTime: dateString
      },
      () => {}
    );
  };

  loanlilvChange = value => {
    // console.log(value);
    this.setState({
      sdloanlilv: value
    });
  };
  gjjloanlilvChange = value => {
    // console.log(value);
    this.setState({
      gjjloanlilv: value
    });
  };

  /**
   * 取消跳转到活动主界面
   */
  handleCancel() {
    // console.log("取消跳转");
    // browserHistory.push('/activity');
  }
  /**
   * 提交审批
   */
  handleApprove(e) {
    alert("提交审批");
    // console.log("提交审批");
  }
  handleSubmit = e => {
    const { id, title } = this.props.titleInfo;
    e.preventDefault();
    // console.log("save");
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        message.error("有必填项没有填写!");
        return;
      }
      if (values.webLocation || values.appLocation) {
      } else {
        message.error("发送平台至少选择一项");
        return;
      }
      // console.log("appSendFlag", this.state.appSendFlag);
      if (this.state.type == 1 && this.state.appSendFlag) {
        if (values.housye || values.newye) {
        } else {
          message.error("发送位置至少选择一项");
          return;
        }
      }

      
      if (this.state.type == 1) {
        const end = new Date(this.state.endTime).getTime();
        const start = new Date(this.state.startTime).getTime();
        const now = new Date().getTime();
        var status;
        if (start < now) {
          if (now < end) {
            status = 1;
          } else {
            status = 0;
          }
        } else {
          status = 2;
        }
        if (start > end) {
          message.error("失效时间不能小于生效时间!");
          return;
        }
      } else if (this.state.type == 2) {
        status = 1
      }
      browserHistory.push('/publish/table');
// console.log("1111111111",this.props.detail.cityList.id)
      this.props.dispatch({
        type: "accountDetail/preserAccount",
        payload: {
          appSendFlag: this.state.appSendFlag,
          appViewWeight: this.state.appViewWeight,
          contentId:id,
          displayLocation:
            this.state.houslonChange && this.state.newlonChange
              ? 3
              : this.state.houslonChange ? 1 : 2,
          endTime: this.state.endTime,
          sendCity: this.state.sendCity,
          startTime: this.state.startTime,
          status: status,
          title: title,
          type: this.state.type == 1 ? "banner" : "news",
          webSendFlag: this.state.webSendFlag,
          webViewWeight: this.state.webViewWeight
        }
      });
      //// console.log("保存:yes", values);
    });
  };

  render() {
    this.fields = [];
    const { detail, dispatch } = this.props;

    let contractList = detail.contractList;
    let superUser = detail.superUser;

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 10 },
      wrapperCol: { span: 14 }
    };

    let children = this.props.detail.cityList
      ? this.props.detail.cityList.map((value, index) => {
          return (
            <Option key={value.id} value={value.id}>
              {value.name}
            </Option>
          );
        })
      : [];
    // children.push(data.map((value, index) => {

    // }))
    return (
      <div>
        <Form layout="horizontal" onSubmit={this.handleSubmit}>
          <Card className={hcStyle.Wrapcard}>
            <div className={hcStyle.leftOperate}>
              <div className={hcStyle.mg105}>
                <FormItem {...formItemLayout}>
                  {getFieldDecorator("type", {
                    initialValue: "1"
                  })(
                    <RadioGroup
                      className={hcStyle.radiotext}
                      onChange={this.onloanTypeChange.bind(this)}
                    >
                      <Radio key="1" value="1">
                        banner推送
                      </Radio>
                      <Radio key="2" value="2">
                        系统公告
                      </Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </div>
              <div className={hcStyle.oneline}>
                <FormItem {...formItemLayout} label="内容">
                  {getFieldDecorator("contentId", {
                    //setFieldsValue: this.state.const,
                    initialValue: this.props.titleInfo.title,
                    rules: [
                      {
                        required: true,
                        message: "内容不能为空!"
                      }
                    ]
                  })(
                    <Input
                      disabled
                      className={hcStyle.inputenter}
                      //maxLength="20"
                      //onChange={this.danpriceChange.bind(this)}
                    />
                  )}
                </FormItem>
                <Button
                  className={hcStyle.floatleft}
                  onClick={this.changecont.bind(this)}
                >
                  选择
                </Button>
              </div>
              {this.state.type == 1 ? (
                <div className={hcStyle.oneline}>
                  <FormItem {...formItemLayout} label="发送城市">
                    {getFieldDecorator("sendCity", {
                      initialValue: [],
                      rules: [
                        {
                          required: true,
                          message: "选择城市!"
                        }
                      ]
                    })(
                      <Select
                        mode="multiple"
                        placeholder="选择城市"
                        className={hcStyle.inputenter}
                        allowClear={false}
                        onChange={this.realityCityChange}
                        // optionLabelProp="children"
                      >
                        {children}
                      </Select>
                    )}
                  </FormItem>
                </div>
              ) : (
                ""
              )}
              <div className={hcStyle.oneline}>
                <FormItem {...formItemLayout} label="发送平台">
                  {getFieldDecorator("webLocation", {})(
                    <Checkbox onChange={this.weblonChange.bind(this)}>
                      房友web端
                    </Checkbox>
                  )}
                  {getFieldDecorator("appLocation")(
                    <Checkbox onChange={this.applonChange.bind(this)}>
                      房友APP端
                    </Checkbox>
                  )}
                </FormItem>
              </div>
              {this.state.type == 1 ? (
                <div>
                  {this.state.appSendFlag ? (
                    <div className={hcStyle.oneline}>
                      <FormItem {...formItemLayout} label="发送位置">
                        {getFieldDecorator("housye")(
                          <Checkbox onChange={this.houslonChange.bind(this)}>
                            首页
                          </Checkbox>
                        )}
                        {getFieldDecorator("newye")(
                          <Checkbox onChange={this.newlonChange.bind(this)}>
                            新房频道页
                          </Checkbox>
                        )}
                      </FormItem>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={hcStyle.oneline}>
                    <FormItem {...formItemLayout} label="生效时间">
                      {getFieldDecorator("startTime", {
                        rules: [
                          {
                            required: true,
                            message: "选择时间!"
                          }
                        ]
                      })(
                        <DatePicker
                          onChange={this.stlonChange.bind(this)}
                          format="YYYY-MM-DD"
                        />
                      )}
                    </FormItem>
                  </div>
                  <div className={hcStyle.oneline}>
                    <FormItem {...formItemLayout} label="失效时间">
                      {getFieldDecorator("endTime", {
                        rules: [
                          {
                            required: true,
                            message: "选择时间!"
                          }
                        ]
                      })(
                        <DatePicker
                          onChange={this.etlonChange.bind(this)}
                          format="YYYY-MM-DD"
                        />
                      )}
                    </FormItem>
                  </div>
                  <div className={hcStyle.oneline}>
                    <FormItem {...formItemLayout} label="web权重展示">
                      {getFieldDecorator("webViewWeight", {
                        rules: [
                          {
                            required: true,
                            message: "填写权重!"
                          }
                        ]
                      })(
                        <Select
                          placeholder="填写权重"
                          className={hcStyle.inputenter}
                          allowClear={true}
                          onChange={this.webViewWeight}
                        >
                          {appploanyear.map(o => (
                            <Option key={o.year}>{o.name}</Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </div>
                  <div className={hcStyle.oneline}>
                    <FormItem {...formItemLayout} label="app权重展示">
                      {getFieldDecorator("appViewWeight", {
                        rules: [
                          {
                            required: true,
                            message: "填写权重!"
                          }
                        ]
                      })(
                        <Select
                          placeholder="填写权重"
                          className={hcStyle.inputenter}
                          allowClear={true}
                          onChange={this.appViewWeight}
                        >
                          {appploanyear.map(o => (
                            <Option key={o.year}>{o.name}</Option>
                          ))}
                        </Select>
                      )}
                    </FormItem>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className={hcStyle.mg105}>
                <FormItem
                  wrapperCol={{ span: 16, offset: 2 }}
                  style={{ marginTop: 24 }}
                >
                  <Button type="primary" onClick={this.handleSubmit}>
                    保存
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  {/* <Button type="primary" onClick={this.handleApprove.bind(this)}>提交审批
                          </Button> */}
                  &nbsp;&nbsp;&nbsp;
                  <Button type="ghost" onClick={this.handleCancel}>
                    取消
                  </Button>
                </FormItem>
              </div>
            </div>
          </Card>
        </Form>
      </div>
    );
  }
}
//定义组件默认的属性值(如果父组见没有传递数据，使用默认数据)
AccountInfo.defaultProps = {};
//校验从父组件传递的属性值是否符合
AccountInfo.propTypes = {
  createDatas: React.PropTypes.object
  // createActions: React.PropTypes.object.isRequired
};
const WrappedInfo = Form.create()(AccountInfo);
export default WrappedInfo;
