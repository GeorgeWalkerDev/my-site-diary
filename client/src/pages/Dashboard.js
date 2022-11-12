import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import DiariesTable from '../components/DiariesTable'
import Divider from '@mui/material/Divider'

const Dashboard = ({diaries, deleteDiary}) => {
  return (
    <Container maxWidth='xs'>
      <Box sx={{mt: 4}}>
        <Typography variant="h6" gutterBottom>Dashboard</Typography>
        <Typography variant="h3" gutterBottom>Welcome George</Typography>
        <Typography variant="subtitle1" gutterBottom>Here are your diaries:</Typography>
        {diaries.length === 0 ?
        <>
          <Divider />
          <Typography fontWeight="fontWeightMedium" variant="body1" gutterBottom>No diaries to show</Typography>
        </> :
        <DiariesTable diaries={diaries} deleteDiary={deleteDiary}/>
      }
      </Box>
    </Container>
  )
}

export default Dashboard