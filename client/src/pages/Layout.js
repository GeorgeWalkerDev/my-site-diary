import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar sideBarClick={() => setIsDrawerOpen(true)} />
      <Sidebar
        setIsDrawerOpen={setIsDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        isDrawerOpen={isDrawerOpen}
      />
      <Outlet />
    </>
  );
};
export default Layout;
