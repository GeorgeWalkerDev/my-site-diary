import DiariesTable from "../components/DiariesTable"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import {useEffect, useState} from 'react';
import { apiUrl } from '../utils';

const fetchDiaries = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  return data
};

const Diaries = () => {
  const [diaryData, setDiaryData] = useState([]);

  useEffect( () => {
    const getDiaries = async () => {
      const diariesFromServer = await fetchDiaries(`${apiUrl}/api/diaries`)
      setDiaryData(diariesFromServer)
    }
    getDiaries()
  },[]);


  return (
    <Container maxWidth="xs">
        <Box sx={{mt: 4}}>
            <Typography variant="h3" gutterBottom>Project Diaries</Typography>
            <Typography variant="subtitle1" gutterBottom>Here are all project diaries:</Typography>
            <DiariesTable diaries={diaryData}/>
        </Box>
    </Container>
    
  )
}

export default Diaries