import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button' 
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useUpdateDiaryMutation } from '../features/diaries/diariesApiSlice'

const EditDiaryForm = ({ diary }) => {

    const [updateNote, {
        isLoading,
        isSuccess,
        // isError,
        // error
    }] = useUpdateDiaryMutation()

    const navigate = useNavigate();

    const [project, setProject] = useState(diary.project)
    const [weather, setWeather] = useState(diary.weather)
    const [resource, setResource] = useState(diary.resource)
    const [delays, setDelays] = useState(diary.delays)
    const [variations, setVariations] = useState(diary.variations)
    const [healthsafety, setHealthSafety] = useState(diary.healthsafety)
    const [deliveries, setDeliveries] = useState(diary.deliveries)
    const [notes, setNotes] = useState(diary.notes)
    // const [date, setDate] = useState(diary.date)

    useEffect(() => {

        if (isSuccess ) {
            setProject('')
            setWeather('')
            setResource('')
            setDelays('')
            setVariations('')
            setHealthSafety('')
            setDeliveries('')
            setNotes('')
            // setDate('')
            navigate('/dashboard/diaries')
        }

    }, [isSuccess, navigate])

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isLoading){
            const editedDiary = {id: diary._id, project, weather, resource, delays, variations, healthsafety, deliveries, notes}
            await updateNote(editedDiary)
        }
    }

  return (
    <Container maxWidth="xs">
        <Box sx={{py:4}}>
            <Paper>
                <Container sx={{py: 2}}>
                    <Typography variant="h4" gutterBottom>Edit Diary</Typography>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Project Name" multiline value={project} onChange={(e) => setProject(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Weather" multiline value={weather} onChange={(e) => setWeather(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Resource" multiline value={resource} onChange={(e) => setResource(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Delays" multiline value={delays} onChange={(e) => setDelays(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Variations" multiline value={variations} onChange={(e) => setVariations(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Health & Safety" multiline value={healthsafety} onChange={(e) => setHealthSafety(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="Deliveries" multiline value={deliveries} onChange={(e) => setDeliveries(e.target.value)}/>
                            </FormControl>
                            <FormControl sx={{mt:2}}>
                                <TextField variant="outlined" label="General Notes" multiline value={notes} onChange={(e) => setNotes(e.target.value)}/>
                            </FormControl>
                        </FormGroup>
                        <Button sx={{mt: 2}} variant="contained" color="success" type="submit">Save</Button>
                        <Button
                            sx={{mt: 2, ml: 1}}
                            variant="contained"
                            color="error"
                            component={RouterLink}
                            to="/dashboard/diaries"
                        >
                            Cancel
                        </Button>
                    </form>
                </Container>
            </Paper>
        </Box>
    </Container>
  )
}

export default EditDiaryForm