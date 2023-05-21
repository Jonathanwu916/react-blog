import React, { Component } from 'react';
import { Modal, Form, Input,Alert } from 'antd';

const FormItem = Form.Item;

class CollectionCreateForm  extends Component{
    render() {
        const { visible, onCancel, onCreate, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Login"
                okText="login"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
                    <Alert message="Not open to register" type="error" />
                    <FormItem label="User Name">
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please enter user name' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="Password">
                        {getFieldDecorator('password',{
                            rules: [{ required: true, message: 'Please enter password' }],
                        })(<Input type="password" />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const Login = Form.create()(CollectionCreateForm);

export default Login;