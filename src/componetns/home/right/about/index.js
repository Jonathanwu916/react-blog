import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './index.css';

class About extends Component{
    render() {
        return (
            <div className="about-struct bui-box">
                <div className="bui-box">
                    <div className="pane-module">
                        <div className="column-wrap"><span>About</span></div>
                        <ul className="module-content about-list">
                            <li className="item"><Link to="/about">About us</Link></li>
                            <li className="item"><Link to="/about">Contact us</Link></li>
                            <li className="item"><Link to="/about">Terms of condition</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;