import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import GoogleIcon from '@mui/icons-material/Google';


const Signup = () => {

    return (
    <Container maxWidth="xs">
        <Box sx={{mx: 'auto',width: '90%'}}>
            <Paper elevation={24} sx={{p: 5}}>
                <Typography align="center" variant="h3" gutterBottom>My Site Diary</Typography>
                <Typography align="center" variant="subtitle1" gutterBottom>Create and store your site diaries</Typography>
                <Divider />
                <div>
                    <Button fullWidth sx={{mt: 2}} variant="contained">Sign Up</Button>
                </div>
                <div>
                    <Button fullWidth sx={{mt: 2}} variant="contained" color="error" startIcon={<GoogleIcon/>}>Log in with Google</Button>
                </div>
            </Paper>
        </Box>
    </Container>    
    )
}

export default Signup