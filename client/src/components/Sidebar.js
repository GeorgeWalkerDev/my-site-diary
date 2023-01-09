import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Link from '@mui/material/Link'
import { Link as RouterLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";

const Sidebar = ({onClose, isDrawerOpen}) => {

    const navigate = useNavigate()
    // const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    },[isSuccess, navigate])

    const onLogoutClicked = () => sendLogout()

    if (isLoading) return <p>Logging out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    return (
    <>
        <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={onClose}
        >
            <Box p={2} sx={{width:250}} role="presentation">
                <img className="logo logo-sidebar" src={require('../assets/images/logos/png/logo-no-background.png')} alt="My Site Diary Logo" />
                <List>
                    <Link color="inherit" underline="none" component={RouterLink} to={'/dashboard/diaries'}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                    <ListItemIcon><BookmarkIcon /></ListItemIcon>
                                    <ListItemText primary="Diaries"/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link color="inherit" underline="none" component={RouterLink} to={'/dashboard'}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary="Dashboard"/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link color="inherit" underline="none" onClick={onLogoutClicked}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout"/>
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
            </Box>
        </Drawer>
    </>
    )
}

export default Sidebar