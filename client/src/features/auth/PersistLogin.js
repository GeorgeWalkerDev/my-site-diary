import { Outlet, Link as RouterLink } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Fab from '@mui/material/Fab';
import Link from '@mui/material/Link';
import AddIcon from '@mui/icons-material/Add';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';

const PersistLogin = () => {
  const fabStyle = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  };

  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          // const response =
          await refresh();
          // const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    console.log('no persist');
    content = (
      <>
        <Outlet />
        <Link component={RouterLink} to="/dashboard/add">
          <Fab style={fabStyle} color="success" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </>
    );
  } else if (isLoading) {
    // persist: yes, token: no
    console.log('loading');
  } else if (isError) {
    // persist: yes, token: no
    console.log('error');
    content = (
      <p className="errmsg">
        {`${error?.data?.message} - `}
        <RouterLink to="/login">Please login again</RouterLink>.
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    // persist: yes, token: yes
    console.log('success');
    content = (
      <>
        <Outlet />
        <Link component={RouterLink} to="/dashboard/add">
          <Fab style={fabStyle} color="success" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </>
    );
  } else if (token && isUninitialized) {
    // persist: yes, token: yes
    console.log('token and uninit');
    console.log(isUninitialized);
    content = (
      <>
        <Outlet />
        <Link component={RouterLink} to="/dashboard/add">
          <Fab style={fabStyle} color="success" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>
      </>
    );
  }

  return content;
};
export default PersistLogin;
