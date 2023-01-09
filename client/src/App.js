import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import Diary from './pages/Diary'
import AddDiary from "./pages/AddDiary";
import Diaries from "./pages/Diaries";
import EditDiary from "./pages/EditDiary";
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link'
import AddIcon from '@mui/icons-material/Add';
import { useState} from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { updateEntry } from './api';
import Prefetch from "./features/auth/Prefetch";


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

// TODO: Reuse /diaries/:id as diaries/edit/:id
  return (
    <BrowserRouter>
      <Navbar sideBarClick={() => setIsDrawerOpen(true)}/>
      <Sidebar onClose={() => setIsDrawerOpen(false)} isDrawerOpen={isDrawerOpen}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route element={<Prefetch />}>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/diaries" element={<Diaries />}/>
          <Route path="/diaries/:id" element={<Diary />} />
          <Route path="/diaries/add" element={<AddDiary />}/>
          <Route path="/diaries/edit/:id" element={<EditDiary editDiary={updateEntry} />}/>
        </Route>

      </Routes>
      <Link component={RouterLink} to='/diaries/add'>
        <Fab style={fabStyle} color="success" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </BrowserRouter>
    );
}

export default App;
