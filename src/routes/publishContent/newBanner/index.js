import React,{ Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { message, Button, Col, DatePicker, Form, Input, Row, Select, Upload, Icon, Radio } from 'antd';

import styles from './index.less';
import constants from '../../../utils/constants';

import config from '../../../utils/config'
import {SERVER} from '../../../config'
import def from '../../../assets/default.jpg'
import { __esModule } from 'babel-runtime/helpers/defineProperty';
import {estateNameSelect} from '../../../services/publishContent';

/*function NewBanner({ publishContent, dispatch, loading, location, children }){


  return (
    <div>
      <span>新增banner</span>
    </div>
  )
}*/

class NewBanner extends React.Component{
  constructor(props){
    super(props)
    // console.log(this.props.location.query)

    this.state={
      relation: 1, // 关联
      estateName: '',
      estateData: [],
      defaultImg: def, 
      web: null,
      app: null,
      edit: this.props.location.query.edit ? 
                this.props.location.query.edit === 'false' ? false : true
              : false
    }
  }

  componentWillMount () {
    if(this.props.location.query.id){
        this.props.dispatch({
          type: 'publishContent/getData',
          payload: this.props.location.query.id
        })
    }
    this.setState({
      loadingEstate: true
    })
  }

  async componentWillReceiveProps(props) {
    // console.log(props)
    if(this.props.publishContent.editData && this.state.loadingEstate){
      if (this.props.publishContent.editData.estateId) {
        let query = {
          keyWord: this.props.publishContent.editData.estateId
        }
        const data = await estateNameSelect({query})
        // console.log('estateReceive', data) 
        if(data.result[0]){
          this.setState({
            estateName: data.result[0].address,
            estateId: data.result[0].estateId,
            loadingEstate: false
          })
        }
      }
    }
    if (this.props.publishContent.estateData && this.props.publishContent.estateChange) {
      this.setState({
        estateData: this.props.publishContent.estateData
      }, () => {
        this.props.publishContent.estateChange = false
      })
    }
    if((props.publishContent.editData && !this.state.editData) || props.publishContent.deleteFile) {
      let webFile,appFile
      if (this.state.web && this.state.web.id) {
        webFile = null
      } else {
        webFile = this.state.web
      }
      if (this.state.app && this.state.app.id) {
        appFile = null
      } else {
        appFile = this.state.app
      }
      if(props.publishContent.editData.contentFiles){
        props.publishContent.editData.contentFiles.map((value, index) => {
          // console.log('map', value)
          if(value.fileType === 'web') {
            value.portType = 'web'
            webFile = value
          }

          if(value.fileType === 'app') {
            value.portType = 'app'
            appFile = value
          }
        })
        this.setState(
          {
            editData: props.publishContent.editData,
            web: webFile,
            app: appFile
          },
          () => {
            // console.log(this.state)
          }
        );
        props.publishContent.deleteFile = false
      }
    }
  }


  handleSubmit() {
    // console.log('提交操作', this.props.form)
    this
      .props
      .form
      .validateFields((err, values) => {
        if (err) {
          // console.log('form err', err)
          return
        }
        // console.log(values)
        if (!this.state.web && !this.state.app) {
          message.error('图片必填，PC或APP，上传一个即可')
          return
        }
        if ((this.state.relation === 2) && !values.estateId){
          message.error('新建楼盘必填')
          return
        }
        if(this.state.estateId) {
          values.estateId = this.state.estateId
        }
        /*if (!err) {
          if (values.createDate) {
            values.createDate = values.createDate.format("YYYY-MM-DD")
          }
          this.props.handleSearch(values)
        }*/
        /*this.props.dispatch(routerRedux.push({
          pathname: this.props.location.pathname,
          query: {
            ...this.props.location.query,
            ...values
          }
        }))*/
        values.type = 'banner'
        values.contentFiles = []
        if (this.state.web) {
          values.contentFiles.push({fileId: this.state.web.fileId, 
                                    fileType: this.state.web.portType})
          values.estateid = ""
        }
        if (this.state.app) {
          values.contentFiles.push({
            fileId: this.state.app.fileId,
            fileType: this.state.app.portType
          })
        }
        if (this.state.relation === 1){
          values.estateid = ''
        } else if (this.state.relation === 2){
          values.outLink = ''
        }

        if (this.props.location.query.id) {
          values.id = this.props.location.query.id
          this.props.dispatch({
            type: 'publishContent/editContent',
            payload: values
          })
        } else {
          this.props.dispatch({
            type: 'publishContent/newContent',
            payload: values
          })
        }
        // console.log(values)
        // console.log(this.state)
        /* this.props.dispatch(routerRedux.push({
          pathname: '/publishContent/list'
        })) */
      });
  }

  handleReset() {
    this.props.form.resetFields();
    this.props.publishContent.editData = {};
    this.props.dispatch(routerRedux.goBack());
    // console.log('取消操作')
  }

  changeRelation(e) {
    // console.log('radio checked', e.target.value);
    this.setState({
      relation: e.target.value
    })
  }

  estateValueChange(values) {
    // console.log('estateValue changed: ', values)
    this.setState({
      estateName: values
    })
    this.props.dispatch({
      type: 'publishContent/estateNameSelect',
      payload: {keyWord:values}
    })
  }

  deleteImg(e, file, port) {
    e.stopPropagation()
    this.deleteImgFile(file, port)
  }

  deleteImgFile(file, port) {
    // console.log(file)
    if (file.id){
      this.props.dispatch({
        type: 'publishContent/deleteFile',
        payload: file
      })
    } else {
      if (port === 'web') {
        this.setState({
          web: null
        })
      }
      if (port === 'app') {
        this.setState({
          app: null
        })
      }
    }
    
  }

  checkExt(file) {
    if (file.type) {
        return file.type === 'image/jpeg' || file.type === 'image/png'
        file.type === 'image/jpg';
    }
    else {
        return file.name.endsWith('jpeg') || file.name.endsWith('png')
            || file.name.endsWith('jpg')
    }
  }

  _beforeUpload = (file) => {
    // console.log(file, this.state.edit)
    const isImage = this.checkExt(file);
    if (!isImage) {
        message.error('请上传图片文件!');
        return false;
    }
    const isLt5M = (!file.size) || file.size / 1024 / 1024 <= 5;
    if (!isLt5M) {
        message.error('上传的文件容量必须小于 5MB!');
        return false;
    }

    const edit = this.state.edit
    if (!edit) {
      message.error('当前不能上传图片!')
      return false;
    }

    return isImage && isLt5M && edit;
  }

  onSuccessWeb(body, file) {
    file.status = "done";
    file.fileUrl = body.url;
    file.fileId = body.id;
    file.portType = 'web'
    this.setState({
      web: file,
      relation: 1
    })
    // console.log('success', this.state.web)
  }

  onSuccessApp(body, file) {
    file.status = "done";
    file.fileUrl = body.url;
    file.fileId = body.id;
    file.portType = 'app'   
    this.setState({
      app: file
    })
    // console.log('success', this.state.app)
  }

  onError(error, file) {
      file.state = "error"
      throw new Error(error.message);
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const colPorps = {
      lg: 20,
      md: 20,
      sm: 20
    }

    const webUploadProps = {
      action: SERVER + config.uploadFile,
      headers: {
        Authorization:localStorage.getItem("accessToken"),
        Accept: "application/vnd.fangyou.v1+json"
      },
      multiple: false,
      beforeUpload: (file) => {
        let canUp = this._beforeUpload(file)
        return canUp;
      },
      onStart: () => {

      },
      onSuccess: this.onSuccessWeb.bind(this),
      onError: this.onError.bind(this)
    }

    const appUploadProps = {
      action: SERVER + config.uploadFile,
      headers: {
        Authorization:localStorage.getItem("accessToken"),
        Accept: "application/vnd.fangyou.v1+json"
      },
      multiple: false,
      beforeUpload: (file) => {
        let canUp = this._beforeUpload(file)
        // console.log(canUp)
        return canUp;
      },
      onStart: () => {

      },
      onSuccess: this.onSuccessApp.bind(this),
      onError: this.onError.bind(this)
    }

    const {query} = this.props.location
    // console.log(this.state.edit)

    const options = this.state.estateData.map(data => 
                        <Select.Option key={data.estateId}>
                            {data.address}
                        </Select.Option>)
    
    return (
      <div>
        <Form>
          <Row gutter={20}>
            <Col {...colPorps}>
              <Form.Item labelCol={{span:4}} wrapperCol={{span:20}} label="标题">
                {getFieldDecorator('title', {
                  initialValue: query.title,
                  rules: [{
                    required: true,
                    message: '必填，且字数不大于20字',
                    max: 20
                  }]
                })(
                  <Input placeholder="" style={{width:'100%'}} disabled={!this.state.edit}/>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col {...colPorps}>
              <Form.Item labelCol={{span:4}} wrapperCol={{span:20}} label="内容">
                <div className={styles.imgView}>
                   {this.state.web ?
                      <div className={styles.imgRow}>
                        <div>房友web端</div>
                        <img src={this.state.web ? this.state.web.fileUrl : this.state.defaultImg} alt="" className={styles.img}/>
                        <a onClick={(e) => {this.deleteImg(e, this.state.web, 'web')}} className={styles.imgRowDel}>删除</a>
                      </div> 
                    :
                      <Upload {...webUploadProps} type='web' className={styles.imgRow}>
                        <div>房友web端</div>  
                        <img src={this.state.web ? this.state.web.fileUrl : this.state.defaultImg} alt="" className={styles.img}/>
                      </Upload>
                   }
                  {this.state.app ?
                      <div className={styles.imgRow}>
                        <div>房友App端</div>
                        <img src={this.state.app? this.state.app.fileUrl : this.state.defaultImg} alt="" className={styles.img}/>
                        <a onClick={(e) => {this.deleteImg(e, this.state.app, 'app')}} className={styles.imgRowDel}>删除</a>                    
                      </div>
                     :
                      <Upload {...appUploadProps} type='app' className={styles.imgRow}>
                        <div>房友App端</div>
                        <img src={this.state.app ? this.state.app.fileUrl : this.state.defaultImg} alt="" className={styles.img}/>
                      </Upload>
                    }
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col {...colPorps}>
              <Form.Item labelCol={{span:4}} wrapperCol={{span:20}} label="关联">
                <Radio.Group value={this.state.relation} 
                              onChange={this.changeRelation.bind(this)}
                              className={styles.radioGroup}
                              disabled={!this.state.edit}
                              >
                  <div className={styles.radioRow}>
                    <Radio value={1}>外部链接：</Radio>
                    <Form.Item style={{marginBottom:0, width:'100%'}}>                            
                      {getFieldDecorator('outLink', {
                        initialValue: query.outLink,
                        rules: [{
                          // required: this.state.relation === 1 ? true : false
                        }]
                      })(
                        <Input placeholder="" style={{width:'100%'}} 
                              required={this.state.relation === 1 ? true : false}
                              disabled={!this.state.edit || (this.state.relation === 1 ? false : true)}/>
                      )}
                    </Form.Item>
                  </div>
                  <div className={styles.radioRow}>
                    <Radio value={2} disabled={this.state.web ? true : false}>新建楼盘：</Radio>                            
                    <Form.Item style={{marginBottom:0, width:'100%'}}>                            
                      {getFieldDecorator('estateId', {
                        initialValue: this.state.estateName,
                        rules: [{
                          // required: this.state.relation === 2 ? true : false,
                        }]
                      })(
                        <Select mode="combobox"
                              onChange={this.estateValueChange.bind(this)}
                              filterOption={false}
                              optionLabelProp="children"
                              disabled={!this.state.edit || (this.state.web ? true : false) || (this.state.relation === 2 ? false : true)}>
                          {options}
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          {this.state.edit ? 
            <Row gutter={20} type='flex' justify="center" align="middle">
              <Col lg={10} md={10} sm={10} style={{display:'flex', justifyContent:'space-around', alignItems:'middle'}}>
                <Button type="primary" style={{ marginRight: '4px' }}
                  htmlType="submit" onClick={this.handleSubmit.bind(this)}>保存</Button>
                <Button type="danger" onClick={this.handleReset.bind(this)}>取消</Button>
              </Col>
            </Row>
            :
            <Row gutter={20} type='flex' justify="center" align="middle">
              <Col lg={10} md={10} sm={10} style={{display:'flex', justifyContent:'space-around', alignItems:'middle'}}>
                <Button type="default" onClick={this.handleReset.bind(this)}>返回</Button>
              </Col>
            </Row>
          }
        </Form>
      </div>
    )
  }
}

function mapStateToProps({ publishContent, loading }) {
  return {
    publishContent: publishContent,
    loading: loading.models.publishContent
  }
}

const newBanner = Form.create()(NewBanner);

export default connect(mapStateToProps)(newBanner); 