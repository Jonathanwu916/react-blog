import React, { Component } from 'react';
import {Spin,Icon} from 'antd';
import './index.css';

class Loading extends Component{
    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
            <div className="loading">
                <Spin indicator={antIcon} size="large"/>
            </div>
        );
    }
}

export default Loading;