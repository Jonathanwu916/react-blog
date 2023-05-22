import {
    THEME_LOAD_DATA_START,
    THEME_LOAD_DATA_FINISH,
    THEME_LOAD_MORE_START,
    THEME_LOAD_MORE_FINISH
} from './action-type';
import Axios from "../../axios/axios";
import {openNotificationWithIcon} from "../../componetns/notification";

const themeLoadDataStart = () => ({type: THEME_LOAD_DATA_START});

const themeLoadDataFinish = (data) => ({type: THEME_LOAD_DATA_FINISH,data: data});

const themeLoadMoreStart = () => ({type: THEME_LOAD_MORE_START});

const themeLoadMoreFinish = (data) => ({type: THEME_LOAD_MORE_FINISH,data: data});

export const themeLoadData = (data) => {
    return dispatch => {
        dispatch(themeLoadDataStart());
        fetchData(data.url,data.themeName,data.pageNo,dispatch);
    }
}

export const themeLoadMore = (data) => {
    return dispatch => {
        dispatch(themeLoadMoreStart());
        fetchMoreData(data.url,data.themeName,data.pageNo,dispatch);
    }
}

function fetchData(url,themeName,pageNo,dispatch){
    Axios.get(url,{
        params: {
            themeName: themeName,
            pageNo: pageNo
        }
    }).then(({data}) => {
        if(data.code === 200){
            dispatch(themeLoadDataFinish(
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

function fetchMoreData(url,themeName,pageNo,dispatch){
    Axios.get(url,{
        params: {
            themeName: themeName,
            pageNo: pageNo
        }
    }).then(({data}) => {
        if(data.code === 200){
            dispatch(themeLoadMoreFinish(
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