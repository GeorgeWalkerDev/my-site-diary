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
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [diaryData, setDiaryData] = useState([])

  const apiUrl = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? 'http://localhost:9000' : 'https://my-site-diary.onrender.com'

  useEffect( () => {
    const getDiaries = async () => {
      const diariesFromServer = await fetchDiaries(`${apiUrl}/api/diaries`)
      setDiaryData(diariesFromServer)
    }

    getDiaries()
  },[apiUrl])

  //Fetch diaries
  // can be wrapped into useCallback
  const fetchDiaries = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    return data
  }

  // Fetch diary
  // const fetchDiary = async (id) => {
  //   const res = await fetch(`${apiURL}/api/diaries/${id}`)
  //   const data = await res.json()

  //   return data
  // }

  //Add diary
  const saveDiary = async (diary) => {
    const res = await fetch(`${apiUrl}/api/diaries/add`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(diary),
    })

    const data = await res.json()

    setDiaryData([...diaryData, data])
  }

  //Delete diary
  const deleteDiary = async (id) => {
    const res = await fetch(`${apiUrl}/api/diaries/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setDiaryData(diaryData.filter((diary) => diary._id !== id))
      : alert('Error Deleting This Task')
  }
  
  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

//Edit diary
const editDiary = async (newDiary, id) => {
  // const diaryToUpdate = await fetchTask(id)

  const res = await fetch(`${apiUrl}/api/diaries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(newDiary),
  })

  const data = await res.json()

  setDiaryData(
    diaryData.map((diary) =>
      diary._id === id ? data : diary
    )
  )
}

  return (
    <BrowserRouter>
      <Navbar sideBarClick={() => setIsDrawerOpen(true)}/>
      <Sidebar onClose={() => setIsDrawerOpen(false)} isDrawerOpen={isDrawerOpen}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/signin" element={<Signin />}/>
        <Route path="/dashboard" element={<Dashboard diaries={diaryData} deleteDiary={deleteDiary}/>}/>
        <Route path="/diaries" element={<Diaries diaries={diaryData}/>}/>
        <Route path="/diaries/:id" element={<Diary diaries={diaryData}/>}/>
        <Route path="/diaries/add" element={<AddDiary saveDiary={saveDiary}/>}/>
        <Route path="/diaries/edit/:id" element={<EditDiary editDiary={editDiary} diaries={diaryData}/>}/>
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
