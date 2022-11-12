import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import LoadingButton from '@mui/lab/LoadingButton';
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import { formatDate } from '../helpers/helpers';
import { useParams } from 'react-router-dom'

const Diary = ({diaries}) => {

  const [diary, setDiary] = useState(null)
  let { id } = useParams()

  useEffect(() => {
    if (diaries.length === 0) {
      return
    } else {
      const diary = diaries.filter(diary => diary._id === id)
      setDiary(diary)
    }
  },[diaries, id])

  if(!diary) {
    return (
      <LoadingButton></LoadingButton>
    )
  } else {

    return (
      <Container maxWidth="xs">
        <Box sx={{mt: 4}}>
          {
            diary.length === 0
            ? <Typography variant="h5">Nothing to show, click the add button to add a diary</Typography>
            :<>
              <Typography variant="h4" gutterBottom>{formatDate(diary[0].date, 'MMMM Do YYYY, h:mm:ss a')}</Typography>
              <Typography variant="h6" gutterBottom>{diary[0].project}</Typography>
              <Divider />
              <Typography sx={{}} variant="body1">{diary[0].notes}</Typography>
            </>
          }
          
          
        </Box>
      </Container>
    )
  }

}

export default Diary