import {
    THEME_LOAD_DATA_START,
    THEME_LOAD_DATA_FINISH,
    THEME_LOAD_MORE_START,
    THEME_LOAD_MORE_FINISH
} from './action-type';

export function theme(state = {
    loading: true,
    pageNo: 1, 
    hasMore: false, 
    article: [],
    scrollPosition: 0
},action) {
    switch (action.type) {
        case THEME_LOAD_DATA_START:
            return {
                ...state,
                loading: true,
                hasMore: false,
                article: []
            }
        case THEME_LOAD_DATA_FINISH:
            return {
                ...state,
                loading: false,
                hasMore: action.data.hasMore,
                pageNo: action.data.pageNo,
                article: action.data.article,
            }
        case THEME_LOAD_MORE_START:
            return {
                ...state,
                loading: true,
                hasMore: false,
            }
        case THEME_LOAD_MORE_FINISH:
            return {
                ...state,
                loading: false,
                hasMore: action.data.hasMore,
                pageNo: action.data.pageNo,
                article: state.article.concat(action.data.article),
            }
        default:
            return state
    }
}