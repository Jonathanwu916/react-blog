import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BannerAnim, { Element } from 'rc-banner-anim';
import TweenOne from 'rc-tween-one';
import 'rc-banner-anim/assets/index.css';
import './index.css';
import {enquireScreen} from "enquire-js";
import Axios from "../../axios/axios";
import {openNotificationWithIcon} from "../notification";
const BgElement = Element.BgElement;

let isMobile;
enquireScreen((b) => {
    isMobile = b;
});

class AutoPlay extends Component{
    constructor (props) {
        super(props);
        this.state = {
            isMobile,
            article: []
        }
    }

    componentWillMount(){
        if(this.state.article.length === 0){
            Axios.get("/articles/hot",{
                params: {
                    pageNo: 0,
                    pageSize: 3
                }
            }).then(({data}) => {
                if(data.code === 200){
                    this.setState({
                        article: data.detail
                    });
                }else{
                    {openNotificationWithIcon("error","Error",data.description)}
                }
            }).catch( error => {
                {openNotificationWithIcon("error","Error",error.message)}
            })
        }
    }

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({ isMobile: !!b });
        });
    }

    render() {
        return (
            <BannerAnim prefixCls="banner-user" autoPlay={true} duration={1500} arrow={false} >
                {
                    this.state.article.map(function (v,i) {
                        return (
                            <Element prefixCls="banner-user-elem" key={i}>
                                <BgElement key="bg" className="bg" style={{background: '#64CBCC',}}>
                                    {
                                        v.showContent ?
                                            <Link to={"/article/"+v.articleId} target="_blank">
                                                <img src={v.avatar} alt="" style={{width:"100%",height:"100%"}}/>
                                            </Link>

                                            :

                                            <a href={v.articleUrl} target="_blank">
                                                <img src={v.avatar} alt="" style={{width:"100%",height:"100%"}}/>
                                            </a>
                                    }
                                </BgElement>
                                <TweenOne className="banner-user-title" animation={{ y: 30, opacity: 0, type: 'from' }}>
                                    {v.title}
                                </TweenOne>
                            </Element>
                        )
                    })
                }
            </BannerAnim>
        );
    }
}

export default AutoPlay;