import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import styles from '../style/searchPage.module.css'
import StockDataGrid from '../components/StockDataGrid';
import { useUserService } from '../services';
import { useWatchlist } from '../contexts';
import Header from '../components/Header';

const Watchlist: React.FC = () => {
    const { state, fetchWatchlist, removeFromWatchlist } = useWatchlist();
    const { isLoggedIn } = useUserService();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (isLoggedIn) {
            fetchWatchlist();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchWatchlist();
        }, 15000);

        return () => clearInterval(interval);
    }, [state.watchlist]);

    return (
        <div>
            <Header />
            <Box className={styles.dataGrid}>
                <StockDataGrid data={state?.watchlist} removeFromWatchlist={removeFromWatchlist} />
            </Box>
        </div>
    )
};

export default Watchlist;
