import
{
    INDEX_LOAD_DATA_START,
    INDEX_LOAD_DATA_FINISH,
    INDEX_LOAD_MORE_START,
    INDEX_LOAD_MORE_FINISH
} from './action-type'

export function index(state = {
    loading: true,
    pageNo: 1, 
    hasMore: false,
    article: [], 
    scrollPosition: 0
},action) {
    switch (action.type) {
        case INDEX_LOAD_DATA_START:
            return {
                ...state,
                loading: true,
                hasMore: false
            }
        case INDEX_LOAD_DATA_FINISH:
            return {
                ...state,
                loading: false,
                hasMore: action.data.hasMore,
                pageNo: action.data.pageNo,
                article: action.data.article,
            }
        case INDEX_LOAD_MORE_START:
            return {
                ...state,
                loading: true,
                hasMore: false,
            }
        case INDEX_LOAD_MORE_FINISH:
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