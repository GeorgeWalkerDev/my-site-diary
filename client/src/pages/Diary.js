import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate } from '../helpers/helpers';
import { selectDiaryById } from '../features/diaries/diariesApiSlice';

const Diary = () => {
  const { id } = useParams();

  const diary = useSelector((state) => selectDiaryById(state, id));

  if (!diary) {
    return <CircularProgress />;
  }

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <>
          <Typography variant="h4" gutterBottom>
            {formatDate(diary.date, 'MMMM Do YYYY, h:mm:ss a')}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {diary.project}
          </Typography>
          <Divider />
          <Typography sx={{}} variant="body1">
            {diary.notes}
          </Typography>
        </>
      </Box>
    </Container>
  );
};

export default Diary;
