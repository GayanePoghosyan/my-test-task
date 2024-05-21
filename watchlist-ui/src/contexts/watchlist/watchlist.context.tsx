import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { State, Stock } from '../../interfaces/stockData.interface';
import watchlistReducer from './watchlist.reducer';
import { stockServiceActions } from './watchlist.actions';
import { Action } from '../../interfaces';

const initialState: State = {
    watchlist: [],
    stock: {
        currentPrice: 0,
        change: 0,
        changePercent: 0,
        componyName: '',
        symbol: '',
        timestamp: 0,
        logo: ''
    },
    error: '',
    loading: false
};

const WatchlistContext = createContext({
    state: initialState,
    addStock: (item: Stock) => { },
    getBySymbol: (symbol: string) => { },
    fetchWatchlist: () => { },
    removeFromWatchlist: (symbol: Stock) => { },
    dispatch: (action: Action) => { }
});

export const WatchlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(watchlistReducer, initialState);
    const { addStock, fetchWatchlist, removeFromWatchlist, getBySymbol } = stockServiceActions(dispatch)

    return (
        <WatchlistContext.Provider value={{ state, addStock, fetchWatchlist, removeFromWatchlist, getBySymbol, dispatch }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (!context) {
        throw new Error('useWatchlist must be used within a WatchlistProvider');
    }
    return context;
};
