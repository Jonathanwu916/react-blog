import React, { Component } from 'react';
import {Input, Tabs, Form, Button, Upload, Select, Row, Col, Icon } from 'antd';

import Axios from '../../axios/axios';
import {openNotificationWithIcon} from "../notification";

const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Settings extends Component{
    constructor (props) {
        super(props);
        this.state = {
            user: '',
            imageUrl: '',
            loading: false
        }
    }

    componentWillMount(){
        Axios.get("/users/"+localStorage.getItem("username")).then(({data}) => {
            if (data.code === 200) {
                this.setState({
                    user: data.detail
                })
            } else {
                {openNotificationWithIcon("error","Error",data.description)}
            }
        }).catch(error => {
            {openNotificationWithIcon("error","Error",error.message)}
        })
    }

    uploadHandleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            console.log(info.file)
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload avatar</div>
            </div>
        );
        return (
            <div className="content">
                <Row>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                        <div style={{marginBottom: "20px"}}>
                            <h2>Personal Settings</h2>
                            <Tabs tabPosition="left">
                                <TabPane tab="Basic Settings" key="1">
                                    <div>
                                        <Form.Item label="Personal description">
                                            {getFieldDecorator('signature',{
                                                initialValue: this.state.user.signature
                                            })(
                                                <Input size="large"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="Personal Website">
                                            {getFieldDecorator('website',{
                                                initialValue: this.state.user.website
                                            })(
                                                <Input size="large"/>
                                            )}
                                        </Form.Item>
                                        <Upload
                                            name="avatar"
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            action="https://sm.ms/api/upload"
                                            onChange={this.uploadHandleChange}
                                            smfile="avatar"
                                        >
                                            {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : uploadButton}
                                        </Upload>
                                        <Form.Item>
                                            <Button size="large" type="primary" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </div>
                                </TabPane>
                                <TabPane tab="Account Settings" key="2">
                                    <div>
                                        <Form.Item label="Old Password">
                                            {getFieldDecorator('oldPassword')(
                                                <Input size="large"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="New Password">
                                            {getFieldDecorator('newPassword')(
                                                <Input size="large"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="New Password">
                                            {getFieldDecorator('newPassword')(
                                                <Input size="large"/>
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button size="large" type="primary" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </div>
                                </TabPane>
                                <TabPane tab="Privacy Settings" key="3">
                                    <div>
                                        <Form.Item label="Who can see my posts">
                                            {getFieldDecorator('articleHide',{
                                                initialValue: "all"
                                            })(
                                                <Select style={{ width: 120 }}>
                                                    <Option value="all">Everyone</Option>
                                                    <Option value="me">Only myself</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                        <Form.Item label="Who can see my comments">
                                            {getFieldDecorator('commentHide',{
                                                initialValue: "all"
                                            })(
                                                <Select style={{ width: 120 }}>
                                                    <Option value="all">Everyone</Option>
                                                    <Option value="me">Only myself</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                        <Form.Item>
                                            <Button size="large" type="primary" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={8} xl={8} xxl={8}></Col>
                </Row>
            </div>
        );
    }
}

export default Form.create()(Settings)