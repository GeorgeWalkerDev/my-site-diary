import Public from "./pages/Public"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Dashboard from "./pages/Dashboard"
import Welcome from "./pages/Welcome"
import Diary from './pages/Diary'
import AddDiary from "./pages/AddDiary";
import Diaries from "./pages/Diaries";
import EditDiary from "./pages/EditDiary";
import Layout from "./pages/Layout"
import { Routes, Route } from 'react-router-dom';
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin"


function App() {


// TODO: Reuse /diaries/:id as diaries/edit/:id
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<Prefetch />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<Welcome />}/>
              <Route path="diaries" element={<Diaries />}/>
              <Route path=":id" element={<Diary />} />
              <Route path="add" element={<AddDiary />}/>
              <Route path="edit/:id" element={<EditDiary />}/>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
    );
}

export default App;
