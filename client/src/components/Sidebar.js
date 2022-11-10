import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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

const Sidebar = ({onClose, isDrawerOpen}) => {

    return (
    <>
        <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={onClose}
        >
            <Box p={2} sx={{width:250}} role="presentation">
                <Typography sx={{pl: '16px'}} variant="h6" component="div">My Site Diary</Typography>
                <List>
                    <Link color="inherit" underline="none" component={RouterLink} to={'/dashboard'}>
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
                    <Link color="inherit" underline="none" component={RouterLink} to={'/dashboard'}>
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