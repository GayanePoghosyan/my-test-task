import { State, Action } from '../../interfaces';

const watchReducer = (state: State, action: Action): State => {
    const itemIndex = state?.watchlist?.findIndex((item => item?.symbol == action?.payload?.symbol));
    switch (action.type) {
        case 'GET_STOCK':
            return {
                ...state,
                error: "",
                loading: true
            }
        case 'GET_STOCK_SUCCESS':
            state = { ...state, stock: { ...state.stock, ...action.payload } };
            return {
                ...state,
                error: "",
                loading: false
            }
        case 'CLEAR_STOCK':
            state = {
                ...state, stock: {
                    currentPrice: 0,
                    change: 0,
                    changePercent: 0,
                    componyName: '',
                    symbol: '',
                    timestamp: 0
                }
            };
            return {
                ...state,
                error: "",
                loading: false
            }
        case 'CLEAR_WATCHLIST':
            state = {
                ...state, stock: {
                    currentPrice: 0,
                    change: 0,
                    changePercent: 0,
                    componyName: '',
                    symbol: '',
                    timestamp: 0
                }, watchlist: []
            };
            return {
                ...state,
                error: "",
                loading: false
            }
        case 'GET_STOCK_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'ADD_STOCK':
            return {
                ...state,
                error: '',
                loading: true
            }
        case 'ADD_STOCK_SUCCESS':
            state = itemIndex === -1 ? { ...state, watchlist: [...state.watchlist, action.payload] } : state;
            return {
                ...state,
                error: '',
                loading: false
            }
        case 'ADD_STOCK_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'REMOVE_STOCK':
            return {
                ...state,
                error: '',
                loading: true
            }
        case 'REMOVE_STOCK_SUCCESS':
            if (itemIndex !== -1) {
                const filteredData = state.watchlist?.filter((item) => item.symbol !== action.payload.symbol)
                state = { ...state, watchlist: [...filteredData] }
            }
            return {
                ...state,
                error: '',
                loading: false
            }
        case 'REMOVE_STOCK_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case 'SET_STOCKS':
            return {
                ...state,
                error: '',
                loading: true
            }
        case 'SET_STOCKS_SUCCESS':
            state = { ...state, watchlist: action.payload }
            return {
                ...state,
                error: '',
                loading: false
            }
        case 'SET_STOCKS_FAILURE':
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}
export default watchReducer;