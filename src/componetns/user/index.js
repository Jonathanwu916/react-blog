import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Col, Menu, Row} from "antd";

import UserDetailLeft from './left/index';
import './index.css';
import {getUser} from '../../redux/user/action';

const Item = Menu.Item;
class UserDetailHome extends Component{

    componentWillMount(){
        this.props.getUser({url: "/users/"+this.props.match.params.username});
    }

    render() {
        const navData = { menu0: '文章'};
        const NavChannel = Object.keys(navData).map((v,i) => (
            <Item key={i} style={{float: "left"}}>{navData[v]}</Item>
        ))
        const avatar = this.props.state.user.user;
        // console.log(avatar)
        return (
            <div className="content">
                <Row>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                        <div className="column-user">
                            <div className="panel-body">
                                <div className="media">
                                    <div className="media-left user-left">
                                        <img src={avatar} className="avatar-lg img-circle" alt=""/>
                                    </div>
                                    <div className="media-body user-body">
                                        <h3 style={{marginTop: "10px"}} className="user-info username">{this.props.match.params.username}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="wrap-left pull-left">
                            <div className="channel-header" style={{marginBottom: "20px"}}>
                                <Menu defaultSelectedKeys={['0']}
                                      mode="horizontal"
                                      theme="light">
                                    {NavChannel}
                                </Menu>
                            </div>
                            <UserDetailLeft username={this.props.match.params.username}/>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state
    }),
    {getUser: getUser}
)(UserDetailHome);