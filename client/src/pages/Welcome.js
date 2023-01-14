import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DiariesTable from '../components/DiariesTable';

const Diaries = () => (
  <Container maxWidth="xs">
    <Box sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Here are all project diaries:
      </Typography>
      <DiariesTable />
    </Box>
  </Container>
);

export default Diaries;
