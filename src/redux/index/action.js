import
{
    INDEX_LOAD_DATA_START,
    INDEX_LOAD_DATA_FINISH,
    INDEX_LOAD_MORE_START,
    INDEX_LOAD_MORE_FINISH
} from './action-type'
import Axios from "../../axios/axios";
import {openNotificationWithIcon} from "../../componetns/notification";

export const indexLoadDataStart = () => ({type: INDEX_LOAD_DATA_START});

export const indexLoadDataFinish = (data) => ({type: INDEX_LOAD_DATA_FINISH,data: data});

export const indexLoadMoreStart = () => ({type: INDEX_LOAD_MORE_START});

export const indexLoadMoreFinish = (data) => ({type: INDEX_LOAD_MORE_FINISH,data: data});

export const indexLoadData = (data) => {
    return dispatch => {
        dispatch(indexLoadDataStart());
        fetchData(data.url,data.pageNo,dispatch);
    }
}

export const indexLoadMore = (data) => {
    return dispatch => {
        dispatch(indexLoadMoreStart());
        fetchMoreData(data.url,data.pageNo,dispatch);
    }
}

function fetchData(url,pageNo,dispatch){
    Axios.get(url,{
        params: {
            pageNo: pageNo
        }
    }).then(({data}) => {
        if(data.code === 200){
            dispatch(indexLoadDataFinish(
                {
                    hasMore: !data.detail.last,
                    pageNo: pageNo + 1,
                    article: data.detail.content,
                }
            ))
        }else{
            {openNotificationWithIcon("error","Error",data.description)}
        }
    }).catch(error => {
        {openNotificationWithIcon("error","Error",error.message)}
    })
}

function fetchMoreData(url,pageNo,dispatch){
    Axios.get(url,{
        params: {
            pageNo: pageNo
        }
    }).then(({data}) => {
        if(data.code === 200){
            dispatch(indexLoadMoreFinish(
                {
                    hasMore: !data.detail.last,
                    pageNo: pageNo + 1,
                    article: data.detail.content,
                }
            ))
        }else{
            {openNotificationWithIcon("error","Error",data.description)}
        }
    }).catch(error => {
        {openNotificationWithIcon("error","Error",error.message)}
    })
}