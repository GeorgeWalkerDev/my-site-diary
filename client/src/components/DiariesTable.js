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


const DiariesTable = ({diaries}) => {



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
                {diaries.map((row) => (
                <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    
                    <TableCell component="th" scope="row">
                        <Link component={RouterLink} to={`/diaries/${row.id}`}>
                            {formatDate(row.date, 'MMMM Do YYYY, h:mm:ss a')}
                        </Link>
                    </TableCell>
                    <TableCell>{truncate(row.notes, 50)}</TableCell>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>
                        <IconButton size="small" color='success' aria-label='edit'><EditIcon/></IconButton>
                        <IconButton size="small" color='error' aria-label='delete'><DeleteIcon/></IconButton>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        )
    }

export default DiariesTable