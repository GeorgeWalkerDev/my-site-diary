import CircularProgress from '@mui/material/CircularProgress';
import { useGetUsersQuery } from '../features/users/usersApiSlice';
import AddDiaryForm from '../components/AddDiaryForm';

const AddDiary = () => {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <CircularProgress />;

  const content = <AddDiaryForm users={users} />;

  return content;
};

export default AddDiary;
