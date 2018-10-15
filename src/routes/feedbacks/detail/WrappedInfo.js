import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Card,  Form, Input, Button , Select,Radio,Table,message,Tabs,Col,Row,Popconfirm} from 'antd';

class WrappedInfo extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        content: ''
      }
    }

    render() {
       const { detail } = this.props;
       const det = detail.detail;
       const img = detail.detail.fileUrlList
       //console.log('detail-data',det)
  
      return (
        <div style={{ margin: "20px" }}>
            <div>
                <Row style={{ margin: "15px" }}>
                    <Col span={6}>
                    <div>反馈编号：{det.feedbackNo}</div>
                    </Col>
                    <Col span={6}>
                    <div>渠道：{(det.sourceChannel)?(det.sourceChannel==17201?"web":"APP"):""}</div>
                    </Col>
                    <Col span={6}>
                    <div>反馈时间：{det.createDate}</div>
                    </Col>
                </Row>
                <Row style={{ margin: "15px" }}>
                    <Col span={6}>
                    <div>经纪公司：{det.merchantName}</div>
                    </Col>
                    <Col span={6}>
                    <div>经纪人：{det.empName}</div>
                    </Col>
                </Row>
            </div>
            <div>
                <Row gutter={16}>
                <span>反馈内容：</span>
                    {/* <Input type='textarea' value={det.feedBackContent} rows={16} /> */}
                    <div>{det.feedBackContent}</div>
                </Row>
            </div>
            <div style={{marginTop:"20px"}}>
                <Row>
                    <Col>
                    <p>图片：</p>
                    {
                        img && img.map((img) => {
                        return <img style={{marginRight:"6px"}} height={400} key={img} src={img}/>
                        })
                    }
                    </Col>
                </Row>
            </div>
        </div>
      )
    }
  }
  
  export default WrappedInfo