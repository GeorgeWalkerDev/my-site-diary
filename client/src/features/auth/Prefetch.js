import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { store } from '../../app/store';
import { diaryApiSlice } from '../diaries/diariesApiSlice';
import { usersApiSlice } from '../users/usersApiSlice';

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      diaryApiSlice.util.prefetch('getDiary', 'diaryList', { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
