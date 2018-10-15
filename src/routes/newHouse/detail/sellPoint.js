import React from 'react';
import {Link} from 'react-router'
import {Button, Input} from 'antd';


/**
 * 卖点话术
 */
class SellPoint extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.objDetail.data) {
      if (nextProps.objDetail.data && nextProps.objDetail.data.content) {
        this.setState({
          content: nextProps.objDetail.data.content
        })
      }
    }
  }


  cancel = () => {
    this.setState({
      content: ''
    })
  }


  save = () => {
    this.props.dispatch({
      type: 'projectDetail/sellPointSave',
      payload: {content: this.state.content, unId: this.props.params.id}
    })
    this.setState({
      content: ''
    })
  }


  contentChange = (e) => {
    this.setState({
      content: e.target.value
    })

  }

  render() {
    const {data} = this.props.objDetail

    return (
      <div>
        <Input type='textarea' onChange={this.contentChange} value={this.state.content} rows={18} placeholder="多行输入"/>
        <div style={{marginTop: 10, marginLeft: '8cm', marginRight: 0}}>
          <Button type="primary" style={{marginRight: '7cm'}} onClick={this.save}>保存</Button>
          <Button type="danger" onClick={this.cancel}>取消</Button>
        </div>
      </div>
    )
  }
}

export default SellPoint
