import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from "@mui/material";
import { Stock } from "../interfaces/stockData.interface";

const StockDataGrid: React.FC<{ data: Stock[], removeFromWatchlist: (item: any) => void }> = ({ data, removeFromWatchlist }) => {
    const [rows, setRows] = useState<Stock[]>([]);

    useEffect(() => {
        const stockData = data.map((item, index) => {
            return { ...item, id: index + 1 };
        });
        setRows(stockData);

    }, [data]);


    const columns = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'logo',
            headerName: 'Logo',
            width: 150,
            renderCell: (params: any) => (
                <Box sx={{ display: 'flex' }}>
                    <img src={params.value} width={40} height={40} />
                </Box>
            ),
        },
        {
            field: 'symbol',
            headerName: 'Symbol',

        },
        {
            field: 'componyName',
            headerName: 'Company Name',
            width: 200

        },
        {
            field: 'currentPrice',
            headerName: 'Price (USD)',
            width: 150,
            renderCell: (params: any) => (
                <Box sx={{ display: 'flex' }}>
                    ${params.value?.toFixed(2)}
                </Box>
            ),
        },
        {
            field: 'change',
            headerName: 'Change',
            width: 150,
            renderCell: (params: any) => (
                <Box
                    sx={{
                        display: 'flex',
                        color: params.value > 0 ? 'green' : 'red',
                    }}
                >
                    {params.value?.toFixed(2)}
                </Box>
            ),
        },
        {
            field: 'changePercent',
            headerName: 'Change Percent',
            width: 150,
            renderCell: (params: any) => (
                <Box sx={{ display: 'flex' }}>
                    {params.value?.toFixed(2)}%
                </Box>
            ),
        },
        {
            field: 'timestamp',
            headerName: 'Date',
            width: 200,
            renderCell: (params: any) => (
                <Box sx={{ display: 'flex' }}>
                    {new Date(params.value * 1000).toLocaleDateString()}
                </Box>
            ),
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params: any) => (
                <div>
                    <Button variant="contained" size="small" color="error" onClick={() => removeFromWatchlist(params?.row)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }} sx={{
                boxShadow: 2,
                border: 2,
                borderColor: 'primary.light',
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
            }} />
        </div>
    );
};

export default StockDataGrid;