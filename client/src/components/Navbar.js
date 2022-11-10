import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link'
import {Link as RouterLink} from 'react-router-dom'


function Navbar({sideBarClick}) {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={sideBarClick}
            >
              <MenuIcon />
            </IconButton>
            <Link sx={{ flexGrow: 1 }} color="inherit" underline="none" to="/dashboard" component={RouterLink}>
              <Typography variant="h6" component="div">
                My Site Diary
              </Typography>
            </Link>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      
    );
  }
  
  export default Navbar;
  