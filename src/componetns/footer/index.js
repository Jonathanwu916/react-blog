import React, { Component } from 'react';
import {Layout} from 'antd';
import './index.css';
import {Link} from "react-router-dom";

class Footer extends Component{
    render() {
        const { Footer } = Layout;
        return (
            <Footer style={{textAlign: 'center'}}>
                <Link to="/about">About us</Link>
                <span className="span-line">|</span>
                <Link to="/contact">Contact us</Link>
            </Footer>
        );
    }
}

export default Footer;