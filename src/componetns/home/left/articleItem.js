import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Icon} from 'antd';
import moment from "moment";
import 'moment/locale/zh-cn';
import Axios from "../../../axios/axios";
import {openNotificationWithIcon} from "../../notification";

class ArticleItem extends Component{

    handlerClickArticleId(id){
        Axios.get("/article/"+id)
            .then()
            .catch(error => {
                {openNotificationWithIcon("error","Error",error.message)}
            })
    }

    render() {
        return (
            <div>
                {
                    this.props.article.map(function (v,i) {
                        console.log(v, 'v......')
                        return (
                            <li className="article-item" key={i}>
                                <div className="media article">
                                    <div className="media-left">
                                        {
                                            v.showContent ?
                                                <Link to={"/article/"+v.articleId} onClick={this.handlerClickArticleId.bind(this,v.articleId)}>
                                                    <img src={v.avatar} className="avatar img-circle" alt=""/>
                                                </Link>
                                                :
                                                <a href={v.articleUrl} onClick={this.handlerClickArticleId.bind(this,v.articleId)}>
                                                    <img src={v.avatar} className="avatar img-circle" alt=""/>
                                                </a>
                                        }
                                    </div>
                                    <div className="media-body">
                                        <div className="title">
                                            {
                                                v.showContent ?
                                                    <Link to={"/article/"+v.articleId}>{v.title}</Link>
                                                    :
                                                    <a href={v.articleUrl} onClick={this.handlerClickArticleId.bind(this,v.articleId)}>{v.title}</a>
                                            }
                                        </div>
                                        {
                                            v.excerpt != null && v.excerpt.length > 0 && v.excerpt != 'None' ?
                                                <div className="excerpt"><span>{v.excerpt}</span></div>
                                                :
                                                null
                                        }
                                        <div className="tip">
                                            <p className="gray">
                                                {
                                                    v.siteName && v.siteName != 'None' ?
                                                        <Link to={"/site/" + v.siteName}><span className="label label-primary">{v.siteName}</span></Link>
                                                    :
                                                    null
                                                }
                                                {
                                                    v.siteName && v.siteName != 'None' ?
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        :
                                                        null
                                                }
                                                {
                                                    v.author && v.author.length > 0 && v.author != 'None' ?
                                                        <Link to={"/user/" + v.user.username} className="author-media-avatar">
                                                            <img src={v.user.avatar} alt=""/>
                                                        </Link>
                                                        :
                                                        null
                                                }
                                                {
                                                    v.author && v.author.length > 0  && v.author != 'None' ?
                                                        <Link to={"/user/" + v.user.username}><span className="author-name">{v.user.username}</span></Link>
                                                        :
                                                        null
                                                }
                                                {
                                                   v.author && v.author.length > 0  && v.author != 'None' ?
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        :
                                                        null
                                                }
                                                <Link to="#"><Icon type="like" /></Link>
                                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <Link to={"/article/"+v.articleId} className="comment"><Icon type="message" /></Link>
                                                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                <span>{moment(v.createDate).fromNow()}</span>
                                                {
                                                    v.themeName != null && v.themeName.length > 0  && v.themeName != 'None' ?
                                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                        :
                                                        null
                                                }
                                                {
                                                    v.themeName != null && v.themeName.length > 0  && v.themeName != 'None' ?
                                                        <Link to={"/theme/" + v.themeName}><span className="label article-theme">{v.themeName}</span></Link>
                                                        :
                                                        null
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    }.bind(this))
                }
            </div>
        );
    }
}

export default ArticleItem;