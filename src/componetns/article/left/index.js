import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from "moment";

import './index.css';
import Axios from "../../../axios/axios";
import {openNotificationWithIcon} from "../../notification";
import Loading from "../../loading";

class ArticleDetail extends Component{
    constructor (props) {
        super(props);
        this.state = {
            article: [],
            user: [],
            loading: true
        }
    }
    componentWillMount(){
        const id = this.props.id;
        Axios.get("/article/"+id).then(({data}) => {
            if(data.code === 200){
                this.setState({
                    article: data.detail,
                    user: data.detail.user,
                    loading: false
                });
            }else{
                {openNotificationWithIcon("error","Error",data.description)}
            }
        }).catch( error => {
            {openNotificationWithIcon("error","Error",error.message)}
        })
    }
    render() {
        return (
            <div className="article-content">
                <div className="mt-20 hidden-xs"></div>
                {
                    this.state.loading ?
                        <Loading />
                        :
                        <div className="wrap-left">
                            <div className="article-wrap">
                                <h1 className="t-h1">{this.state.article.title}</h1>
                                <div className="mt-20 hidden-xs"></div>
                                <div className="pull-left">
                                    <ul className="pull-left list-inline text-muted">
                                        <li className="post-opt">
                                            {
                                                this.state.article.author ?
                                                    <img className="avatar-36"
                                                         src={this.state.user.avatar}
                                                         alt=""/>
                                                    :
                                                null
                                            }
                                            {
                                                this.state.article.author ?
                                                    <Link to={"/user/"+this.state.article.author} className="author">{this.state.article.author}</Link>
                                                    :
                                                    <Link to={"/site/"+this.state.article.siteName}>{this.state.article.siteName}</Link>
                                            }
                                            <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                                            <span className="article-time article-createDate">{moment(this.state.article.createDate).format('YYYY-DD-MM h:mm:ss')}</span>
                                            {
                                                this.state.article.themeName != null && this.state.article.themeName.length > 0  && this.state.article.themeName != 'None' ?
                                                    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                                                    :
                                                    null
                                            }
                                            {
                                                this.state.article.themeName != null && this.state.article.themeName.length > 0  && this.state.article.themeName != 'None' ?
                                                    <span className="theme"><Link to={"/theme/"+this.state.article.themeName}>{this.state.article.themeName}</Link></span>
                                                    :
                                                    null
                                            }
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-20 hidden-xs"></div>
                                {
                                    this.state.article.articleUrl != null ?
                                        <p className="ellipsis mt-10 mb-15">
                                            Original Post: <a  href={this.state.article.articleUrl}>{this.state.article.articleUrl}</a>
                                        </p>
                                        :
                                        null
                                }
                            </div>
                            <div className="article-body markdown-body" dangerouslySetInnerHTML={{__html: this.state.article.content}}>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default ArticleDetail;