import React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useWatchlist } from '../contexts';

export interface StockData {
    currentPrice: number;
    change: number;
    changePercent: number;
    componyName: string;
    symbol: string;
    timestamp: number;
}

const StockCard: React.FC<{ data: StockData }> = ({ data }) => {
    const { addStock } = useWatchlist();

    const handleClick = (data: StockData) => {
        addStock(data)
    }

    return (
        <Grid item xs={12}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="body2">
                        Symbol: {data?.symbol}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Current Price: ${data?.currentPrice?.toFixed(2)}
                    </Typography>
                    <Typography variant="body2" color={data.change >= 0 ? 'green' : 'red'}>
                        Change: ${data.change?.toFixed(2)} ({(data?.changePercent * 100).toFixed(2)}%)
                    </Typography>
                    <Typography variant="body2">
                        Timestamp: {new Date(data?.timestamp * 1000).toLocaleString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleClick(data)}>Add to watchlist</Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default StockCard;