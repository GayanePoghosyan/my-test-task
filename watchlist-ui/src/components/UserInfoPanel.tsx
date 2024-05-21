import React, { useEffect } from 'react';
import { Box, Typography, Menu, MenuItem, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { useUserService } from '../services';
import { useUser, useWatchlist } from '../contexts';

interface UserInfoPanelProps {
    open: boolean;
    onClose: () => void;
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ open, onClose }) => {

    const { state: userState, getCurrentUser, dispatch: userDispatch } = useUser();
    const { dispatch } = useWatchlist();
    const { logout } = useUserService();
    const { user } = userState;

    useEffect(() => {
        if (!userState.user?.email) {
            getCurrentUser()
        }
    }, [])

    const handleLogout = () => {
        logout();
        userDispatch({ type: "LOG_OUT" });
        dispatch({ type: 'CLEAR_WATCHLIST' });
    }


    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: deepPurple[500],
                textAlign: 'center'
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={onClose}
            >
                <MenuItem sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar {...stringAvatar(`${user?.firstName + ' ' + user.lastName}`)} />
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center">{user?.firstName + ' ' + user.lastName}</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center">{user?.email}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default UserInfoPanel;