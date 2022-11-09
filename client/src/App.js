import Navbar from "./components/Navbar";
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)


  return (
    <BrowserRouter>
      <Navbar sideBarClick={() => setIsDrawerOpen(true)}/>
      <Sidebar onClose={() => setIsDrawerOpen(false)} isDrawerOpen={isDrawerOpen}/>
      <Routes>
        <Route path="/" element={<Signup />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </BrowserRouter>
    );
}

export default App;
