import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './index.css';
import Axios from '../../../../axios/axios';
import {openNotificationWithIcon} from '../../../notification/index';

class News extends Component{

    constructor (props) {
        super(props);
        this.state = {
            article: []
        }
    }

    componentWillMount(){
        if(this.state.article.length === 0){
            Axios.get("/articles/hot",{
                params: {
                    pageNo: 7,
                    pageSize: 5
                }
            }).then(({data}) => {
                if(data.code === 200){
                    this.setState({
                        article: data.detail.content
                    });
                }else{
                    {openNotificationWithIcon("error","Error",data.description)}
                }
            }).catch( error => {
                {openNotificationWithIcon("error","Error",error.message)}
            })
        }
    }

    render() {
        return (
            <div className="news-struct bui-box">
                <div className="bui-box">
                    {
                        this.state.article.length > 0 ?
                            <div className="pane-module">
                                <div className="column-wrap"><span>Hot Articles</span></div>
                                <ul className="module-content article-list">
                                    {
                                        this.state.article.map(function (v,i) {
                                            return (
                                                <li className="article-item" key={i}>
                                                    {
                                                        v.showContent ?
                                                            <Link to={"/article/"+v.articleId}  className="news-link">
                                                                <div className="module-pic news-pic">
                                                                    <img src={v.avatar} lazy="loaded" alt=""/>
                                                                </div>
                                                                <div className="news-inner">
                                                                    <p className="module-title">{v.title}</p>
                                                                </div>
                                                            </Link>
                                                            :
                                                            <a href={v.articleUrl}  className="news-link">
                                                                <div className="module-pic news-pic">
                                                                    <img src={v.avatar} lazy="loaded" alt=""/>
                                                                </div>
                                                                <div className="news-inner">
                                                                    <p className="module-title">{v.title}</p>
                                                                </div>
                                                            </a>
                                                    }
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        );
    }
}

export default News;