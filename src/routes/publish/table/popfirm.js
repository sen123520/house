import React, { Component } from "react";
import { connect } from "dva";
import { Table, Pagination, Button, Form, Col, Modal, Row, Input } from "antd";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};
const formItemStyle = {
  marginBottom: "8px"
};

class Users extends Component {
  state = {
    title: ""
  };
  handleCancel = e => {
    this.props.cancel && this.props.cancel();
  };

  handleChange = e => {
    this.setState({ title: e.target.value });
  };

  handleReset = () => {
    const { handleModalSearch } = this.props;
    this.setState({ title: "" }, () => {
      handleModalSearch && handleModalSearch({ title: "" });
    });
  };

  pageChangeHandler = current => {
    this.props.popFirm && this.props.popFirm(current);
  };

  handleSubmit = () => {
    const { handleModalSearch } = this.props;
    handleModalSearch && handleModalSearch({ title: this.state.title });
  };

  render() {
    const {
      form,
      loading,
      popData,
      poptotal,
      poppage,
      poppageSize
    } = this.props;

    const columns = [
      {
        title: "标题", //菜单的内容
        dataIndex: "title", //在数据中对应的属性
        key: "title", //key
       // render: text => <a href="">{text}</a> //塞入的内容
      },
      {
        title: "创建时间",
        dataIndex: "createDate",
        key: "createDate"
      },
      {
        title: "创建人",
        dataIndex: "empName",
        key: "empName"
      }
    ];

    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.handleCancel}
        footer={null}
      >
        <div style={{ padding: "10px 20px 10px 20px" }}>
          <Form>
            <Row gutter={6}>
              <Col span={15}>
                <FormItem {...formItemLayout} label="标题" style={formItemStyle}>
                  <Input
                    value={this.state.title}
                    onChange={this.handleChange}
                    placeholder="输入标题"
                    style={{ width: "100%" }}
                  />
                </FormItem>
              </Col>
              <Col lg={4} md={6}>
                <Button
                  type="primary"
                  style={{ marginRight: "4px" }}
                  onClick={this.handleSubmit}
                >
                  查询
                </Button>
              </Col>
              <Col lg={4} md={6}>
                <Button type="danger" onClick={this.handleReset}>
                  重置
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <Table
          onRowClick={this.props.onRowClick}
          columns={columns}
          dataSource={popData}
          loading={loading}
          rowKey={record => record.id}
          pagination={{
            total: poptotal,
            current: poppage,
            pageSize: poppageSize
          }}
          onChange={this.pageChangeHandler}
        />
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  const { popData, poptotal, poppage, poppageSize } = state.accountDetail;
  return {
    loading: state.loading.effects["accountDetail/getPopList"],
    poptotal,
    popData,
    poppage,
    poppageSize
  };
}

export default connect(mapStateToProps)(Users);
