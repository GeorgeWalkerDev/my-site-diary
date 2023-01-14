import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  return (
    <>
      <Navbar sideBarClick={() => setIsDrawerOpen(true)} />
      <Sidebar
        onClose={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
      />
      <Outlet />
      <Link component={RouterLink} to="/dashboard/add">
        <Fab style={fabStyle} color="success" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </>
  );
};
export default Layout;
