import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Grid, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StockCard from './StockCard';
import { useWatchlist } from '../contexts';

const ModalComponent: React.FC<{ open: boolean, handleClose: () => void }> = ({ open, handleClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResult, setResult] = useState<any>({});
    const { getBySymbol, state, dispatch } = useWatchlist();

    useEffect(() => {
        if (state.stock) {
            setResult(state.stock)
        }
    }, [state])

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };
    const handleSearch = async (e: React.SyntheticEvent) => {
        if (searchTerm) {
            getBySymbol(searchTerm)
        }
    };
    const closeModal = () => {
        handleClose();
        setSearchTerm('')
        dispatch({ type: 'CLEAR_STOCK' })
    }
    return (
        <Modal open={open} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search symbol. AAPL, DELL ... "
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />
                <Grid container spacing={2} >
                    {searchResult.currentPrice ? <StockCard data={searchResult} /> : ""}
                </Grid>
            </Box>
        </Modal>
    );
};

export default ModalComponent;