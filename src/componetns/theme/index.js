import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Axios from "../../axios/axios";
import {openNotificationWithIcon} from "../notification";
import Loading from "../loading";
import './index.css';

class ThemeHome extends Component{
    constructor (props) {
        super(props);
        this.state = {
            themes: [],
            loading: true,
        }
    }

    componentWillMount(){
        if(this.state.themes.length === 0 || this.state.loading){
            Axios.get('/themes').then(({data}) => {
                if(data.code === 200){
                    this.setState({
                        loading: false,
                        themes: data.detail
                    })
                }else {
                    {openNotificationWithIcon("error","Error",data.description)}
                }
            }).catch( error => {
                {openNotificationWithIcon("error","Error",error.message)}
            })
        }
    }

    render() {
        return (
            <div className="content">
                <div className="column-title">
                    <div className="column-wrap">
                        <span>All themes</span>
                    </div>
                </div>
                <div className="theme-wrap">
                    <div className="theme-cnt-box">
                        {
                            this.state.loading ?
                                <Loading/>
                                :
                                <ul className="transition">
                                    {
                                        this.state.themes.map(function (v,i) {
                                            return (
                                                <li className="transition" key={i}><Link to={v.themeUrl ? v.themeUrl : "/theme/"+v.themeName}>{v.themeName}</Link></li>
                                            )
                                        })
                                    }
                                </ul>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default ThemeHome;