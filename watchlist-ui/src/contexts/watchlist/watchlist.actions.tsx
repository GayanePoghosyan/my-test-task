import axios from "axios";
import { NotificationTypeEnum, showNotification } from "../../components/notification/showNotification";
import { Stock } from "../../interfaces";

export const stockServiceActions = (dispatch: any) => {
    const fetchWatchlist = async () => {
        dispatch({ type: 'SET_STOCKS' });
        try {
            const response = await axios.get('http://localhost:4000/stock');
            const data = response.data;
            dispatch({ type: 'SET_STOCKS_SUCCESS', payload: data });
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'SET_STOCKS_FAILURE', payload: message });
        }
    }
    const getBySymbol = async (symbol: string) => {
        dispatch({ type: 'GET_STOCK' });
        try {
            const response = await axios.get(`http://localhost:4000/stock/by-symbol?symbol=${symbol}`);
            const data = response.data;
            dispatch({ type: 'GET_STOCK_SUCCESS', payload: data });
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'GET_STOCK_FAILURE', payload: message });
            showNotification(message || `Error fetching stock by symbol`, { type: NotificationTypeEnum.Error })
        }
    }

    const addStock = async (item: Stock) => {
        dispatch({ type: 'ADD_STOCK' });
        try {
            const response = await axios.post(`http://localhost:4000/stock`, { symbol: item?.symbol, action: 'add'});
            if (response?.data) {
                dispatch({ type: 'ADD_STOCK_SUCCESS', payload: item });
                showNotification(`Watchlist updated.${item.symbol} is added`, { type: NotificationTypeEnum.Success })
            }
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'ADD_STOCK_FAILURE', payload: message });
            // showNotification(message || `Error while adding new stock`, { type: NotificationTypeEnum.Error })
        }
    };

    const removeFromWatchlist = async (item: Stock) => {
        dispatch({ type: 'REMOVE_STOCK' });
        try {
            const response = await axios.post(`http://localhost:4000/stock`, { symbol: item?.symbol, action: 'delete' });
            if (response?.data) {
                dispatch({ type: 'REMOVE_STOCK_SUCCESS', payload: item });
                showNotification(`Watchlist updated.${item?.symbol} is removed`, { type: NotificationTypeEnum.Success })
            }
        } catch (error: any) {
            const message = error?.response?.data?.message
            dispatch({ type: 'REMOVE_STOCK_FAILURE', payload: message });
            showNotification(message || `Error while removing the stock`, { type: NotificationTypeEnum.Error })
        }
    }
    return { addStock, removeFromWatchlist, fetchWatchlist, getBySymbol }
}