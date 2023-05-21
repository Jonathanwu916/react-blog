import React, { Component } from 'react';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { Form, Input, Button } from 'antd'

class Create extends Component{

    componentDidMount () {
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
            })
        }, 1000)

    }

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields((error, values) => {
            if (!error) {
                const submitData = {
                    title: values.title,
                    content: values.content.toHTML()
                }
                console.log(submitData)
            }
        })

    }

    render() {
        const { getFieldDecorator } = this.props.form
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]

        return (
            <div className="demo-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Title">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: 'Please enter title',
                            }],
                        })(
                            <Input size="large" placeholder="Please enter title"/>
                        )}
                    </Form.Item>
                    <Form.Item label="Content">
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('Please enter content')
                                    } else {
                                        callback()
                                    }
                                }
                            }],
                        })(
                            <BraftEditor
                                className="my-editor"
                                controls={controls}
                                placeholder="Please enter content"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(Create)