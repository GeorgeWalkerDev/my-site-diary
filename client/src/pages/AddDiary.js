import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAddNewDiaryMutation } from '../features/diaries/diariesApiSlice';
import { useGetUsersQuery } from '../features/users/usersApiSlice';

const AddDiary = () => {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <p>Is Loading...</p>;

  const [
    addNewDiary,
    {
      isLoading,
      isSuccess,
      // isError,
      // error
    },
  ] = useAddNewDiaryMutation();

  const navigate = useNavigate();

  const [project, setProject] = useState('');
  const [weather, setWeather] = useState('');
  const [resource, setResource] = useState('');
  const [delays, setDelays] = useState('');
  const [variations, setVariations] = useState('');
  const [healthsafety, setHealthSafety] = useState('');
  const [deliveries, setDeliveries] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (isSuccess) {
      setProject('');
      setWeather('');
      setResource('');
      setDelays('');
      setVariations('');
      setHealthSafety('');
      setDeliveries('');
      setNotes('');
      navigate('/dashboard/diaries');
    }
  }, [isSuccess, navigate]);

  const canSave = !isLoading;

  const onSaveDiaryClicked = async (e) => {
    e.preventDefault();
    const date = Date.now();

    if (canSave) {
      await addNewDiary({
        date,
        project,
        weather,
        resource,
        delays,
        variations,
        healthsafety,
        deliveries,
        notes,
        user: users[0].id,
      });
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ py: 4 }}>
        <Paper>
          <Container sx={{ py: 2 }}>
            <Typography variant="h4" gutterBottom>
              Add Diary
            </Typography>
            <form onSubmit={onSaveDiaryClicked}>
              <FormGroup>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Project Name"
                    multiline
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Weather"
                    multiline
                    value={weather}
                    onChange={(e) => setWeather(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Resource"
                    multiline
                    value={resource}
                    onChange={(e) => setResource(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Delays"
                    multiline
                    value={delays}
                    onChange={(e) => setDelays(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Variations"
                    multiline
                    value={variations}
                    onChange={(e) => setVariations(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Health & Safety"
                    multiline
                    value={healthsafety}
                    onChange={(e) => setHealthSafety(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="Deliveries"
                    multiline
                    value={deliveries}
                    onChange={(e) => setDeliveries(e.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2 }}>
                  <TextField
                    variant="outlined"
                    label="General Notes"
                    multiline
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </FormControl>
              </FormGroup>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                color="success"
                type="submit"
              >
                Save
              </Button>
              <Button
                sx={{ mt: 2, ml: 1 }}
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
  );
};

export default AddDiary;
