import React, { Component } from 'react';
import {Alert} from "antd";

import NotFoundImg  from '../../assets/images/404.png';

class NotFound extends Component{

    state = {
        animated: ''
    };

    enter = () => {
        this.setState({animated: 'hinge'})
    };

    render() {
        return (
            <Alert className="load-more" style={{marginTop: "20px",border: "0px",backgroundColor: "#ffffff"}}
                   message="Nothing to show...."
                   type="error" />
        )
    }
}

export default NotFound;