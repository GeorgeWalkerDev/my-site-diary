import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { useGetDiaryQuery } from '../features/diaries/diariesApiSlice';
import EditDiaryForm from '../components/EditDiaryForm';

const EditDiary = () => {
  const { id } = useParams();

  const { diary } = useGetDiaryQuery('diaryList', {
    selectFromResult: ({ data }) => ({
      diary: data?.entities[id],
    }),
  });

  if (!diary) return <CircularProgress />;

  const content = <EditDiaryForm diary={diary} />;

  return content;
};

export default EditDiary;
