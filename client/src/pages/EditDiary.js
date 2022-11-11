import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button' 
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const EditDiary = ({editDiary, diaries}) => {
    const navigate = useNavigate();
    
    const [project, setProject] = useState('')
    const [weather, setWeather] = useState('')
    const [resource, setResource] = useState('')
    const [delays, setDelays] = useState('')
    const [variations, setVariations] = useState('')
    const [healthsafety, setHealthSafety] = useState('')
    const [deliveries, setDeliveries] = useState('')
    const [notes, setNotes] = useState('')
    const [date, setDate] = useState('')

    let { id } = useParams()
    id = Number(id)

    useEffect(() => {
        if (diaries.length === 0) {
            return
        } else {
            let diary = diaries.filter(diary => diary.id === id)
            setProject(diary[0].project)
            setWeather(diary[0].weather ? diary[0].weather : '')
            setResource(diary[0].resource ? diary[0].resource : '')
            setDelays(diary[0].delays ? diary[0].delays : '')
            setVariations(diary[0].variations ? diary[0].variations : '')
            setHealthSafety(diary[0].healthsafety ? diary[0].healthsafety : '')
            setDeliveries(diary[0].deliveries ? diary[0].deliveries : '')
            setNotes(diary[0].notes ? diary[0].notes : '')
            setDate(diary[0].date ? diary[0].date : '')
        }
        
      },[diaries, id])

    const onSubmit = (e) => {
        e.preventDefault()
        const editedDiary = {id, date, project, weather, resource, delays, variations, healthsafety, deliveries, notes}
        editDiary(editedDiary, id)
        navigate('/dashboard')
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
                            to="/dashboard"
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

export default EditDiary