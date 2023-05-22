import React, { Component } from 'react';
import { Redirect } from 'react-router';
import marked from 'marked';
import { Form, Input, Button, Tabs, Select } from 'antd'

import './index.css';
import Axios from '../../axios/axios';
import {openNotificationWithIcon} from "../notification";
const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Create7 extends Component{
    constructor (props) {
        super(props);
        this.state = {
            previewContent: marked(''),
            themes: [],
            theme: null
        }
    }

    componentWillMount(){
        Axios.get("/themes").then(({data}) => {
            if (data.code === 200) {
                this.setState({
                    themes: data.detail
                })
            }else {
                {openNotificationWithIcon("error","Error",data.description)}
            }
        }).catch(error => {
            {openNotificationWithIcon("error","Error",error.message)}
        })
    }

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields((error, values) => {
            if (!error) {
                const article = {
                    title: values.title,
                    content: marked(values.content ? values.content : ''),
                    excerpt: values.excerpt ? values.excerpt : values.content.substring(0,200),
                    avatar: values.avatar,
                    themeName: values.theme,
                    author: localStorage.getItem("username")
                }
                Axios.post("/article",article).then(({data}) => {
                    if (data.code === 200) {
                        this.props.history.push("/article/"+data.detail.articleId)
                    }else{
                        {openNotificationWithIcon("error","Error",data.description)}
                    }
                }).catch(error => {
                    {openNotificationWithIcon("error","Error",error.message)}
                })
            }
        })

    }

    onTabClick = () => {
        const content = this.props.form.getFieldValue('content')
        this.setState({
            previewContent: marked(content ? content : '')
        })
    }

    handleOptionChange = (value) => {
        this.setState({
            theme: value
        })
    }

    handleBlur = () => {
    }

    handleFocus = () => {
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const themes = this.state.themes.map((v,i) => {
            return (<Option value={v.themeName}>{v.themeName}</Option>)
        })
        return (
            <div className="demo-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item label="Title">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: 'Please enter title'
                            }],
                        })(
                            <Input size="large" placeholder="Please enter title"/>
                        )}
                    </Form.Item>
                    <Form.Item label="Content">
                        {getFieldDecorator('content', {
                            rules: [{
                                required: true,
                                message: 'Please enter content'
                            }],
                        })(
                            <div className="card-container">
                                <Tabs onTabClick={this.onTabClick}>
                                    <TabPane tab="Edit" key="1">
                                        <TextArea rows={4} autosize={{ minRows: 22, maxRows: 22 }} placeholder="Please enter content"/>
                                    </TabPane>
                                    <TabPane tab="Preview" key="2">
                                        <div className="article-body markdown-body" dangerouslySetInnerHTML={{__html: this.state.previewContent}}></div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item label="Avatar">
                        {getFieldDecorator('avatar')(
                            <Input size="large" placeholder="Please enter the link of avatar"/>
                        )}
                    </Form.Item>
                    <Form.Item label="Excerpt">
                        {getFieldDecorator('excerpt')(
                            <Input size="large" placeholder="Please enter excerpt"/>
                        )}
                    </Form.Item>
                    <Form.Item label="Theme">
                        {getFieldDecorator('theme')(
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="Please choose a theme"
                                optionFilterProp="children"
                                onChange={this.handleOptionChange}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {themes}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(Create7)