import React from 'react';
import {Link} from 'react-router'
import styles from './login.less';
import {Button, Form, Icon, Input, Tabs} from 'antd';

const FormItem = Form.Item;
const {TabPane} = Tabs;

class Login extends React.Component {


  state = {
    count: 0,
    type: 'account',
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          this.props.dispatch({type: 'login/login', payload: {loginName: values.loginName, password: values.password}})
        }
      });
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{marginBottom: 24}}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {

    const {form, login} = this.props;
    const {getFieldDecorator} = form;
    const {type} = this.state;
    return (
      <div className={styles.main}>
        <Form>
          <Tabs animated={false} className={styles.tabs}>
            <TabPane tab="OP登录" key="account">
              {
                // login.status === 'error' &&
                // login.type === 'account' &&
                // login.submitting === false &&
                // this.renderMessage('账户或密码错误')
              }
              <FormItem>
                {getFieldDecorator('loginName', {
                  rules: [{
                    required: type === 'account', message: '请输入账户名！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon}/>}
                    placeholder="admin"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: '请输入密码！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon}/>}
                    type="password"
                    placeholder="888888"
                  />
                )}
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={styles.additional}>
            {/*<a className={styles.forgot} href="">忘记密码</a>*/}
            <Button htmlType="submit" size="large" className={styles.submit} type="primary" onClick={this.handleSubmit}>
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }

}

export default Form.create()(Login)
