import React, { Component } from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from "react-infinite-scroller";
import {Alert} from "antd";

import Loading from "../../loading";
import {userLoadData,userLoadMore,getUser} from '../../../redux/user/action';
import ArticleItem from './articleItem';

class UserDetailLeft extends Component{

    componentWillMount(){
        const data = {
            url: "/user/articles",
            username: this.props.username,
            pageNo: 1
        }
        this.props.userLoadData(data);
    }

    loadMore(){
        const data = {
            url: "/user/articles",
            username: this.props.username,
            pageNo: this.props.state.user.pageNo
        }
        this.props.userLoadMore(data);
    }

    render() {
        return (
            <div className="article-struct bui-box">
                <div className="mod-info-flow">
                    <ul className="module-content article-list">
                        <InfiniteScroll
                            pageStart={1}
                            hasMore={this.props.state.user.hasMore}
                            loader={<Loading key={1}/>}
                            loadMore={this.loadMore.bind(this)}>
                            <ArticleItem article={this.props.state.user.article}/>
                        </InfiniteScroll>
                    </ul>
                    {
                        this.props.state.user.loading
                            ? <Loading />
                            : null
                    }
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        state: state
    }),
    {userLoadData: userLoadData,userLoadMore: userLoadMore,getUser: getUser}
)(UserDetailLeft);