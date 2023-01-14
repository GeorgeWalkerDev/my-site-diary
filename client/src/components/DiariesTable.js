import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Diary from './Diary';

import { useGetDiaryQuery } from '../features/diaries/diariesApiSlice';

const DiariesTable = () => {
  const {
    data: diaries,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDiaryQuery(undefined, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = diaries;

    const tableContent =
      ids?.length &&
      ids.map((diaryId) => <Diary key={diaryId} diaryId={diaryId} />);

    content = (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Project</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    );
  }

  return content;
};

export default DiariesTable;
