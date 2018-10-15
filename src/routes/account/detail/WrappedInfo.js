import React from "react";

import { Link } from "react-router";
import { Card,  Form, Input, Button , Select,Radio,Table,message,Tabs,Col,Row,Popconfirm} from 'antd';
import _ from "lodash";
import styles from "./index.less";
import PhoneModal from "./PhoneModal";
import PassWord from "./PassWord";

//基本信息
function changeHandler(dispatch, id, values){
  dispatch({
    type:"accountDetail/patch",
    playload: {id,values},
  })
}

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const columns = (dispatch)=>{
  return [
    {
      title: "账号", //菜单的内容
      dataIndex: "phone", //在数据中对应的属性
      key: "phone" //key
    },
    {
      title: "注册时间",
      dataIndex: "createDate",
      key: "createDate"
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status"
    },
    {
      title: "操作",
      key: "operation",
      render: (text, record) => (
        <span>
          <PhoneModal record={record} onOk = {()=>{changeHandler(dispatch, record.phone)}}>
            <a> 重置手机 </a>
          </PhoneModal>
          <PassWord record={record} onOk = {()=>{changeHandler(dispatch, record.id)}}>
            <a> 重置密码</a>
          </PassWord>
        </span>
      )
    }
  ];
}


const menus = [
  {
    title: "合同编号", //菜单的内容
    dataIndex: "contractNo", //在数据中对应的属性
    key: "contractNo" //key
    //塞入的内容
  },
  {
    title: "合同类型",
    dataIndex: "contractTypeValue",
    key: "contractTypeValue"
  },
  {
    title: "合同状态",
    dataIndex: "contractStatusValue",
    key: "contractStatusValue"
  },
  {
    title: "生效日期",
    dataIndex: "dateLifeStart",
    key: "dateLifeStart"
  },
  {
    title: "到期日期", //菜单的内容
    dataIndex: "dateLifeEnd", //在数据中对应的属性
    key: "dateLifeEnd" //key
  },
  {
    title: "门店店招",
    dataIndex: "partyB",
    key: "partyB"
  },
  {
    title: "门店地址",
    dataIndex: "partyBAddress",
    key: "partyBAddress"
  }
];

const change = [
  {
    title: " ",
    dataIndex: "detail.change_msgs",
    key: "detail.change_msgs"
  }
];

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
      }
    };
  }
  showModal = (text, data) => {
    this.setState({
      visible: true,
      content: data.content
    });
  };
   


  render() {
    this.fields = [];
    const { detail, dispatch } = this.props;

    let contractList = detail.contractList;
    let superUser = detail.superUser;

    return (
      <div style={{ margin: "20px" }}>
        <div>
          <span style={{ fontSize: "13px" }}>基本信息</span>
          <Row style={{ margin: "15px" }}>
            <Col span={6}>
              <div>公司名称：{detail.company_name}</div>
            </Col>
            <Col span={6}>
              <div>所属城市：{detail.city_name}</div>
            </Col>
            <Col span={6}>
              <div>联系人：{detail.link_man}</div>
            </Col>
            <Col span={6}>
              <div>联系电话：{detail.link_phone}</div>
            </Col>
          </Row>
          <Row style={{ margin: "15px" }}>
            <Col span={6}>
              <div>17编码：{detail.old_company_no}</div>
            </Col>
            <Col span={6}>
              <div>17版状态：{detail.old_fy_account_status_name}</div>
            </Col>
            <Col span={6}>
              <div>升级申请状态：{detail.upgrade_state? detail.upgrade_state == 0
            ? '未申请'
            : detail.upgrade_state == 1
              ? '已申请'
              : detail.upgrade_state == 2
                ? '等待升级'
                : detail.upgrade_state == 3
                  ? '升级中'
                  : detail.upgrade_state == 4 ? '升级成功' : '升级失败'
          : ''}</div>
            </Col>
            <Col span={6}>
              <div>申请联系方式：{detail.apply_phone}</div>
            </Col>
          </Row>
          <Row style={{ margin: "15px" }}>
            <Col span={6}>
              <div>17版升级申请时间：{detail.upgrade_apply_date}</div>
            </Col>
            <Col span={6}>
              <div>18版编码：{detail.company_no}</div>
            </Col>
            <Col span={6}>
              <div>18版状态：{detail.fy_account_status_name}</div>
            </Col>
            <Col span={6}>
              <div>楼盘字典类型：{"公司私有楼盘字典"}</div>
            </Col>
          </Row>
        </div>
        <div>
          <p style={{ fontSize: "12px" }}>管理员账号</p>
          <Table
            pagination={false}
            dataSource={superUser}
            columns={columns(dispatch)}
            style={{ marginBottom: "15px" }}
          />
          <span style={{ fontSize: "12px" }}>合同信息</span>
          <Table
            pagination={false}
            dataSource={contractList}
            columns={menus}
            style={{ marginBottom: "15px" }}
          />
          <span style={{ fontSize: "12px" }}>更改记录</span>
          <div
            style={{
              minHeight: "50px",
              backgroundColor: "#f1f1f1",
              textAlign: "center"
            }}
          >
            {detail.change_msgs}
          </div>
        </div>
      </div>
    );
  }
}

const WrappedInfo = Form.create()(AccountInfo);
export default WrappedInfo;
