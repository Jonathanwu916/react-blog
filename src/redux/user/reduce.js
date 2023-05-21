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

export function user(state = {
    loading: true,
    pageNo: 1,
    hasMore: false,
    article: [],
    user: null,
    loginUsername: localStorage.getItem("username"),
    loginAvatar: localStorage.getItem("avatar"),
    scrollPosition: 0
},action) {
    switch (action.type) {
        case USER_LOAD_DATA_START:
            return {
                ...state,
                loading: true,
                hasMore: false,
                article: []
            }
        case USER_LOAD_DATA_FINISH:
            return {
                ...state,
                loading: false,
                hasMore: action.data.hasMore,
                pageNo: action.data.pageNo,
                article: action.data.article,
            }
        case USER_LOAD_MORE_START:
            return {
                ...state,
                loading: true,
                hasMore: false,
            }
        case USER_LOAD_MORE_FINISH:
            return {
                ...state,
                loading: false,
                hasMore: action.data.hasMore,
                pageNo: action.data.pageNo,
                article: state.article.concat(action.data.article),
            }
        case GET_USER:
            return {
                ...state,
                user: action.data.user
            }
        case LOGIN:
            return {
                ...state,
                loginUsername: action.data.username,
                loginAvatar: action.data.avatar
            }
        case REGISTER:
            return {
                ...state,
                loginUsername: action.data.username,
                loginAvatar: action.data.avatar
            }
        case LOGOUT:
            return {
                ...state,
                loginUsername: null,
                loginAvatar: null
            }
        default:
            return state
    }
}
