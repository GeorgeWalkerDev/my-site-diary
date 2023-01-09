import DiariesTable from "../components/DiariesTable"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

const Diaries = () => {

  return (
    <Container maxWidth="xs">
        <Box sx={{mt: 4}}>
            <Typography variant="h3" gutterBottom>Project Diaries</Typography>
            <Typography variant="subtitle1" gutterBottom>Here are all project diaries:</Typography>
            <DiariesTable />
        </Box>
    </Container>
    
  )
}

export default Diaries