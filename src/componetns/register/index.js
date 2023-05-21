import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class CollectionCreateForm  extends Component{
    render() {
        const { visible, onCancel, onCreate, form, isNameOrPassErr } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                visible={visible}
                title="Register"
                okText="Register"
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="vertical">
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
                    <FormItem label="Email">
                        {getFieldDecorator('email')(<Input type="email" />)}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const register = Form.create()(CollectionCreateForm);

export default register;