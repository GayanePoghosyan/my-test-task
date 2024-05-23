import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, CardContent, Grid, Typography } from '@mui/material';
import StockDataGrid from '../components/StockDataGrid';
import { useUserService } from '../services';
import { useWatchlist } from '../contexts';
import Header from '../components/Header';
import StockChart from '../components/Charts';

const Watchlist: React.FC = () => {
    const { state, fetchWatchlist, removeFromWatchlist } = useWatchlist();
    const { isLoggedIn } = useUserService();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        else {
            fetchWatchlist();
        }
    }, [isLoggedIn])


    useEffect(() => {
        const interval = setInterval(() => {
            fetchWatchlist();
        }, 15000);

        return () => clearInterval(interval);
    }, [state.watchlist]);

    return (
        <>
            <Header />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8} md={7}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Stock Watchlist
                            </Typography>
                            <StockDataGrid data={state?.watchlist} removeFromWatchlist={removeFromWatchlist} />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                Stock Chart
                            </Typography>
                            <StockChart stockData={state.watchlist} />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
};

export default Watchlist;
