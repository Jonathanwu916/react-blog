import React, { Component } from 'react';
import {Row,Col} from 'antd';

import ArticleDetail from './left/index';
import AuthorInfo from './right/authorInfo';
import AuthorOtherArticle from './right/authorOtherArticle';
import HotArticle from './right/hotArticle';
import Axios from "../../axios/axios";
import {openNotificationWithIcon} from "../notification";

class ArticleHome extends Component{
    constructor (props) {
        super(props);
        this.state = {
            article: [],
            user: []
        }
    }
    componentDidMount (){
        const id = this.props.match.params.id;
        Axios.get("/article/"+id).then(({data}) => {
            if(data.code === 200){
                this.setState({
                    article: data.detail,
                    user: data.detail.user
                });
            }else{
                {openNotificationWithIcon("error","Error",data.description)}
            }
        }).catch( error => {
            {openNotificationWithIcon("error","Error",error.message)}
        })
    }
    render() {
        const article = this.state.article;
        return (
           <Row>
               <Col xs={0} sm={0} md={0} lg={4} xl={4} xxl={4}></Col>
               <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                   <div className="wrap-left pull-left">
                       <ArticleDetail id={this.props.match.params.id} article={this.state.article}/>
                   </div>
               </Col>

               <Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4}>
                   <div className="wrap-right pull-right">
                       {/*<AuthorInfo user={this.state.user}/>*/}
                       {/*<AuthorOtherArticle user={this.state.user} id={this.props.match.params.id}/>*/}
                       {/*<HotArticle/>*/}
                   </div>
               </Col>
           </Row>
        );
    }
}

export default ArticleHome;