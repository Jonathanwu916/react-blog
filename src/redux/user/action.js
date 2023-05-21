import {
    USER_LOAD_DATA_START,
    USER_LOAD_DATA_FINISH,
    USER_LOAD_MORE_START,
    USER_LOAD_MORE_FINISH,
    GET_USER,
    LOGIN,
    REGISTER,
    LOGOUT
} from './action-type';
import Axios from "../../axios/axios";
import {openNotificationWithIcon} from "../../componetns/notification";

const userLoadDataStart = () => ({type: USER_LOAD_DATA_START});

const userLoadDataFinish = (data) => ({type: USER_LOAD_DATA_FINISH,data: data});

const userLoadMoreStart = () => ({type: USER_LOAD_MORE_START});

const userLoadMoreFinish = (data) => ({type: USER_LOAD_MORE_FINISH,data: data});

const register = (data) => ({type: REGISTER, data: data});

const login = (data) => ({type: LOGIN, data: data});

export const logout = () => ({type: LOGOUT});

const getUserAsyn = (data) => ({type: GET_USER,data: data});

export const userLoadData = (data) => {
    return dispatch => {
        dispatch(userLoadDataStart());
        fetchData(data.url,data.username,data.pageNo,dispatch);
    }
}

export const userLoadMore = (data) => {
    return dispatch => {
        dispatch(userLoadMoreStart());
        fetchMoreData(data.url,data.username,data.pageNo,dispatch);
    }
}

export const getUser = (data) => {
    return dispatch => {
        fetchUser(data.url,dispatch);
    }
}

export const loginAsync = (data) => {
    return dispatch => {
        fetchLogin(data,dispatch);
    }
}

export const RegisterAsync = (data) => {
    return dispatch => {
        fetchRegister(data,dispatch);
    }
}

function fetchData(url,username,pageNo,dispatch){
    Axios.get(url,{
        params: {
            username: username,
            pageNo: pageNo
        }
    }).then(({data}) => {
        if(data.code === 200){
            dispatch(userLoadDataFinish(
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

function fetchMoreData(url,username,pageNo,dispatch){
    Axios.get(url,{
        params: {
            username: username,
            pageNo: pageNo
        }
    }).then(({data}) => {
        if(data.code === 200){
            dispatch(userLoadMoreFinish(
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

function fetchUser(url,dispatch){
    Axios.get(url).then(({data}) => {
        if(data.code === 200){
            dispatch(getUserAsyn(
                {
                    user: data.detail.avatar,
                }
            ))
        }else{
            {openNotificationWithIcon("error","Error",data.description)}
        }
    }).catch(error => {
        {openNotificationWithIcon("error","Error",error.message)}
    })
}

function fetchLogin(data,dispatch) {
    Axios.post('/login', {
        username: data.username,
        password: data.password
    }).then(({data}) => {
        if (data.code === 200) {
            localStorage.setItem("token", data.detail.token);
            localStorage.setItem("username", data.detail.username);
            localStorage.setItem("avatar", data.detail.avatar);
            Axios.defaults.headers.common['Authorization'] = "Bearer " + data.detail.token
            dispatch(login(data.detail))
        } else {
            {
                openNotificationWithIcon("error", "Error", data.description)
            }
        }
    }).catch(error => {
        {
            openNotificationWithIcon("error", "Error", error.message)
        }
    })
}

function fetchRegister(data,dispatch) {
    Axios.post('/register', {
        username: data.username,
        password: data.password,
        email: data.email
    }).then(({data}) => {
        if (data.code === 200) {
            localStorage.setItem("token", data.detail.token);
            localStorage.setItem("username", data.detail.username);
            localStorage.setItem("avatar", data.detail.avatar);
            Axios.defaults.headers.common['Authorization'] = "Bearer " + data.detail.token
            dispatch(register(data.detail))
        } else {
            {
                openNotificationWithIcon("error", "Error", data.description)
            }
        }
    }).catch(error => {
        {
            openNotificationWithIcon("error", "Error", error.message)
        }
    })
}