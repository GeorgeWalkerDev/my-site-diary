import Navbar from "./components/Navbar";
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import Diary from './pages/Diary'
import AddDiary from "./pages/AddDiary";
import EditDiary from "./pages/EditDiary";
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link'
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom'


function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [diaryData, setDiaryData] = useState([])

  useEffect(() => {
    //Fake data
    class Data {
      constructor(id, date, notes, project){
          this.id = id;
          this.date = date;
          this.notes = notes;
          this.project = project;
      }
  }

  const data1 = new Data(
                          1,
                          Date.now(),
                          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                          'Western Yards'
                      )

  const data2 = new Data(
                          2,
                          Date.now(),
                          'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
                          'Nine Elms'
                      )
    const rows = [data1, data2];
    setDiaryData(rows)
  },[])

  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
};

const saveDiary = (diary) => {
  setDiaryData([...diaryData, diary])
}

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
        <Route path="/dashboard" element={<Dashboard diaries={diaryData}/>}/>
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
