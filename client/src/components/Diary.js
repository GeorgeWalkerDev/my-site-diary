import React from 'react';
import IconButton from '@mui/material/Button';
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { formatDate, truncate } from '../helpers/helpers';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectDiaryById } from '../features/diaries/diariesApiSlice';
import { useDeleteDiaryMutation } from '../features/diaries/diariesApiSlice';

const Diary = ({ diaryId }) => {
  const navigate = useNavigate();

  const [
    deleteDiary,
    {
      isSuccess: isDelSuccess,
      // isError: isDelError,
      // error: delerror
    },
  ] = useDeleteDiaryMutation();

  useEffect(() => {
    if (isDelSuccess) {
      navigate('/dashboard/diaries');
    }
  }, [isDelSuccess, navigate]);

  const onDeleteDiaryClicked = async () => {
    await deleteDiary({ id: diaryId });
  };

  const diary = useSelector((state) => selectDiaryById(state, diaryId));

  if (diary) {
    // const created = formatDate(diary.createdAt, 'MMMM Do YYYY, h:mm:ss a')
    // const updated = formatDate(diary.updatedAt, 'MMMM Do YYYY, h:mm:ss a') //Add in updated later

    return (
      <TableRow
        key={diaryId}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <Link component={RouterLink} to={`/dashboard/${diaryId}`}>
            {formatDate(diary.createdAt, 'MMMM Do YYYY, h:mm:ss a')}
          </Link>
        </TableCell>
        <TableCell>{truncate(diary.notes, 30)}</TableCell>
        <TableCell>{diary.project}</TableCell>
        <TableCell>
          <Link component={RouterLink} to={`/dashboard/edit/${diaryId}`}>
            <IconButton size="small" color="success" aria-label="edit">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton
            size="small"
            color="error"
            aria-label="delete"
            onClick={onDeleteDiaryClicked}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  } else return null;
};

export default Diary;
