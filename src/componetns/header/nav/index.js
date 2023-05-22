import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import { Menu,Dropdown,Icon,Avatar,Modal,Button } from 'antd';

import './index.less';
import Login from "../../login";
import Register from '../../register/index';
import {loginAsync,RegisterAsync,logout} from '../../../redux/user/action';
import connect from "react-redux/es/connect/connect";

const Item = Menu.Item;
const confirm = Modal.confirm;

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneOpen: false, 
            theme: "light ",
            visible: false,
            visibleRegister: false
        };
    }

    showModal = (e) => {
        this.setState({
            visible: true
        });
    }

    showModalRegister = (e) => {
        this.setState({
            visibleRegister: true
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            isNameOrPassErr: false
        });
    }

    handleCancelRegister = () => {
        this.setState({
            visibleRegister: false,
        });
    }

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            form.resetFields();
            const username = values.username;
            const password = values.password;
            this.props.loginAsync({username: username,password: password});
            this.setState({
                visible: false
            });
        });
    }

    handleCreateRegister = () => {
        const form = this.formRefRegister.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            form.resetFields();
            const username = values.username;
            const password = values.password;
            const email = values.email;
            this.props.registerAsync({username: username,password: password,email: email});
            this.setState({
                visibleRegister: false
            });
        });
    }

    logout = () => {
        const logout = this.props.logout;
        confirm({
            title: 'Are you sure you want to log out?',
            cancelText: 'Cancel',
            okTextL: 'Ok',
            onOk() {
                localStorage.removeItem("token");
                localStorage.removeItem("username");
                localStorage.removeItem("avatar");
                logout();
            },
            onCancel() {
            },
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    saveFormRefRegister = (formRef) => {
        this.formRefRegister = formRef;
    }

    phoneClick = () => {
        this.setState({
            phoneOpen: !this.state.phoneOpen,
        });
    }

    render() {
        const userMenu = <Menu>
            <Menu.Item>
                <Link to={"/user/"+this.props.state.user.loginUsername}>User</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/settings">Settings</Link>
            </Menu.Item>
            <Menu.Item>
                <a onClick={this.logout}>Logout</a>
            </Menu.Item>
        </Menu>;
        const props = { ...this.props };
        const isMobile = props.isMobile;
        delete props.isMobile;
        const navData = { menu3: 'login',menu4: 'settings'};
        const navChildren = Object.keys(navData)
            .map((key, i) => {
                if(key == 'menu3'){
                    return (<Item key={i} onClick={this.showModal}>{navData[key]}</Item>)
                }else if(key == 'menu4'){
                    return (<Item key={i} onClick={this.showModalRegister}>{navData[key]}</Item>)
                }else if(key == 'menu2'){
                    return (<Item key={i}><Link to="/sites">{navData[key]}</Link></Item>)
                }else{
                    return (<Item key={i}><Link to="/">{navData[key]}</Link></Item>)
                }
            });

        return (<TweenOne
            component="header"
            animation={{ opacity: 0, type: 'from' }}
            {...props}
        >
            <TweenOne
                className={`${this.props.className}-logo`}
                animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
                id={`${this.props.id}-logo`}
            >
                <Link to="/"><h2>Blog</h2></Link>
            </TweenOne>
            <div className="header1-nav">
                <Link to="/" style={{paddingRight: "20px"}}>Home</Link>
                <Link to="/themes" className="create-article">Discovery</Link>
            </div>
            {isMobile ? (<div
                className={`${this.props.className}-phone-nav${this.state.phoneOpen ? ' open' : ''}`}
                id={`${this.props.id}-menu`}
            >
                <div
                    className={`${this.props.className}-phone-nav-bar`}
                    onClick={() => {
                        this.phoneClick();
                    }}
                >
                    <em />
                    <em />
                    <em />
                </div>
                <div
                    className={`${this.props.className}-phone-nav-text`}
                >
                    {
                        this.props.state.user.loginUsername ?
                            <Menu
                                mode="inline"
                                theme={this.state.theme}
                            >
                                <Item key="0">{this.props.state.user.loginUsername}</Item>
                                <Item key="1" onClick={this.logout}>Logout</Item>
                            </Menu>

                            :
                            <Menu
                                mode="inline"
                                theme={this.state.theme}
                            >
                                {navChildren}
                            </Menu>
                    }
                </div>
            </div>) : (<TweenOne
                className={`${this.props.className}-nav`}
                animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            >
                {
                    this.props.state.user.loginUsername ?
                        <div>
                            <Link to="/create" className="create-article">Create Article</Link>
                            <Dropdown overlay={userMenu} placement="bottomCenter">
                                <a className="ant-dropdown-link" href="#" style={{padding: "0 10px"}}>
                                    <Avatar size={30} src={this.props.state.user.loginAvatar} key="0"/>
                                </a>
                            </Dropdown>
                        </div>

                        :
                        <div>
                            <a onClick={this.showModal} style={{padding: "0 20px"}}>Login</a>
                            <a onClick={this.showModalRegister} style={{padding: "0 20px"}}>Register</a>
                        </div>
                }
                <Login
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
                <Register
                    wrappedComponentRef={this.saveFormRefRegister}
                    visible={this.state.visibleRegister}
                    onCancel={this.handleCancelRegister}
                    onCreate={this.handleCreateRegister}
                />
            </TweenOne>)}
        </TweenOne>);
    }
}

Nav.propTypes = {
    className: PropTypes.string,
    dataSource: PropTypes.object,
    id: PropTypes.string,
};

Nav.defaultProps = {
    className: 'header0',
};

export default connect(
    state => ({
        state: state
    }),
    {
        loginAsync: loginAsync,
        registerAsync: RegisterAsync,
        logout: logout
    }
)(Nav)