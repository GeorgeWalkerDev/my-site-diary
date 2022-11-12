import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/Button';
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDate, truncate } from '../helpers/helpers';
import { Link as RouterLink } from "react-router-dom";


const DiariesTable = ({diaries, deleteDiary}) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Project</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {diaries.map((diary) => (
                <TableRow
                    key={diary._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    
                    <TableCell component="th" scope="row">
                        <Link component={RouterLink} to={`/diaries/${diary._id}`}>
                            {formatDate(diary.createdAt, 'MMMM Do YYYY, h:mm:ss a')}
                        </Link>
                    </TableCell>
                    <TableCell>{truncate(diary.notes, 30)}</TableCell>
                    <TableCell>{diary.project}</TableCell>
                    <TableCell>
                        <Link component={RouterLink} to={`/diaries/edit/${diary._id}`}>
                            <IconButton size="small" color='success' aria-label='edit'><EditIcon/></IconButton>
                        </Link>
                        <IconButton onClick={() => deleteDiary(diary._id)} size="small" color='error' aria-label='delete'><DeleteIcon/></IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )
    }

export default DiariesTable