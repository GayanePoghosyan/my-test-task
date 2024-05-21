import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import UserInfoPanel from "./UserInfoPanel";
import ModalComponent from "./SearchModal";


const Header: React.FC = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userInfoOpen, setUserInfoOpen] = useState(false);

    const handleUserInfoToggle = () => {
        setUserInfoOpen(!userInfoOpen);
    };
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}> My Watchlist </Typography>
                    <IconButton color="inherit" onClick={handleOpen}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleUserInfoToggle}>
                        <AccountCircleIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <UserInfoPanel open={userInfoOpen} onClose={handleUserInfoToggle} />
            <ModalComponent open={open} handleClose={handleClose} />
        </>
    );
};

export default Header;
