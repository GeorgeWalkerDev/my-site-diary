import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

import { useSendLogoutMutation } from '../features/auth/authApiSlice';

function Navbar({ sideBarClick }) {
  const navigate = useNavigate();
  const { email } = useAuth();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  const onLogoutClicked = () => sendLogout();

  if (isLoading) return <p>Logging out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {email ? (
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
          ) : null}

          <Link
            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}
            color="inherit"
            underline="none"
            to="/dashboard"
            component={RouterLink}
          >
            <img
              className="logo"
              // eslint-disable-next-line global-require
              src={require('../assets/images/logos/png/logo-white-no-background.png')}
              alt="My Site Diary Logo"
            />
          </Link>
          {email ? (
            <Button onClick={onLogoutClicked} color="inherit">
              Logout
            </Button>
          ) : (
            <Button component={RouterLink} to="/signin" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
