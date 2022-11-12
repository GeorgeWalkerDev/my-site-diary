import Navbar from "./components/Navbar";
import Signup from "./pages/Signup"
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

  useEffect( () => {

    const getDiaries = async () => {
      const diariesFromServer = await fetchDiaries()
      setDiaryData(diariesFromServer)
    }

    getDiaries()
  },[])

  //Fetch diaries
  const fetchDiaries = async () => {
    const res = await fetch('https://my-site-diary.onrender.com/api/diaries')
    const data = await res.json()

    return data
  }

  //Fetch diary
  // const fetchDiary = async (id) => {
  //   const res = await fetch(`https://my-site-diary.onrender.com/api/diaries/${id}`)
  //   const data = await res.json()

  //   return data
  // }

  //Add diary
  const saveDiary = async (diary) => {
    const res = await fetch('https://my-site-diary.onrender.com/api/diaries/add', {
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
    const res = await fetch(`https://my-site-diary.onrender.com/api/diaries/${id}`, {
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



const editDiary = (newDiary) => {
  const filteredDiaries = diaryData.filter(diary => diary.id !== newDiary.id)
  setDiaryData([...filteredDiaries, newDiary])
}



  return (
    <BrowserRouter>
      <Navbar sideBarClick={() => setIsDrawerOpen(true)}/>
      <Sidebar onClose={() => setIsDrawerOpen(false)} isDrawerOpen={isDrawerOpen}/>
      <Routes>
        <Route path="/" element={<Signup />}/>
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
