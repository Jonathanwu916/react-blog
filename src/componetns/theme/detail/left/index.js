import React, { Component } from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from "react-infinite-scroller";

import Loading from "../../../loading";
import './index.css';
import {themeLoadData,themeLoadMore} from '../../../../redux/theme/action';
import ArticleItem from './articleItem';
import {Alert} from "antd";

class ThemeDetailLeft extends Component{

    componentWillMount(){
        this.props.themeLoadData({url: "/theme/articles",themeName: this.props.themeName,pageNo: 1});
    }

    loadMore(){
        this.props.themeLoadMore({url:"/theme/articles",themeName: this.props.themeName,pageNo:this.props.state.theme.pageNo});
    }

    render() {
        return (
            <div className="article-struct bui-box">
                <div className="mod-info-flow">
                    <ul className="module-content article-list">
                        <InfiniteScroll
                            pageStart={1}
                            hasMore={this.props.state.theme.hasMore}
                            loader={<Loading key={1}/>}
                            loadMore={this.loadMore.bind(this)}>
                            <ArticleItem article={this.props.state.theme.article}/>
                        </InfiniteScroll>
                    </ul>
                    {
                        this.props.state.theme.loading
                            ? <Loading />
                            : null
                    }
                    {
                        !this.props.state.theme.hasMore && !this.props.state.theme.loading
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
    {themeLoadData: themeLoadData,themeLoadMore: themeLoadMore}
)(ThemeDetailLeft);