import React, { Component } from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import {Alert} from "antd";

import Loading from '../../loading/index';
import './index.css';
import {indexLoadData,indexLoadMore} from '../../../redux/index/action';
import ArticleItem from "./articleItem";

class ArticleList extends Component{

    componentWillMount(){
        this.props.indexLoadData({url: "/articles",pageNo: 1});
    }

    loadMore(){
        this.props.indexLoadMore(
            {
                url:"/articles",
                pageNo:this.props.state.index.pageNo
            }
        );
    }

    render() {
        return (
            <div className="article-struct bui-box">
                <div  className="mod-info-flow">
                    <ul className="module-content article-list">
                        <InfiniteScroll
                            pageStart={1}
                            hasMore={this.props.state.index.hasMore}
                            loader={<Loading key={1}/>}
                            loadMore={this.loadMore.bind(this)}>
                            <ArticleItem article={this.props.state.index.article}/>
                        </InfiniteScroll>
                    </ul>
                    {
                        this.props.state.index.loading
                            ? <Loading />
                            : null
                    }
                    {
                        !this.props.state.index.hasMore && !this.props.state.index.loading
                            ? <Alert className="load-more" message="No more data" type="error" />
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
    {indexLoadData: indexLoadData,indexLoadMore: indexLoadMore}
)(ArticleList);