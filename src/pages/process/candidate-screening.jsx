// material-ui
import { Grid, Typography, Box, Divider, Button, Chip, TextField, Rating, Paper } from '@mui/material';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';
import ApplicationStepper from 'components/ApplicationStepper';

// ==============================|| CANDIDATE SCREENING PAGE ||============================== //

export default function CandidateScreening() {
  const navigate = useNavigate();
  const { candidateId } = useParams();

  const handleBack = () => {
    navigate('/process/application');
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box>
            <Button
              startIcon={<ArrowLeftOutlined />}
              onClick={handleBack}
            >
              Back to Applications
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Paper elevation={1} sx={{ p: 3 }}>
              <ApplicationStepper activeStep={1} />
            </Paper>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <MainCard>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">Candidate Screening</Typography>
              <Chip label="In Progress" color="info" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Candidate ID: {candidateId}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Screening Evaluation
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Technical Skills
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend" variant="body2" color="text.secondary">
                    Rate the candidate's technical competency
                  </Typography>
                  <Rating name="technical-skills" defaultValue={0} size="large" />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  placeholder="Add evaluation notes..."
                  variant="outlined"
                />
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Communication Skills
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend" variant="body2" color="text.secondary">
                    Rate the candidate's communication abilities
                  </Typography>
                  <Rating name="communication-skills" defaultValue={0} size="large" />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  placeholder="Add evaluation notes..."
                  variant="outlined"
                />
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Cultural Fit
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend" variant="body2" color="text.secondary">
                    Rate how well the candidate fits the company culture
                  </Typography>
                  <Rating name="cultural-fit" defaultValue={0} size="large" />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  placeholder="Add evaluation notes..."
                  variant="outlined"
                />
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Experience Level
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography component="legend" variant="body2" color="text.secondary">
                    Rate the candidate's relevant experience
                  </Typography>
                  <Rating name="experience-level" defaultValue={0} size="large" />
                </Box>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Notes"
                  placeholder="Add evaluation notes..."
                  variant="outlined"
                />
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Overall Assessment
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Summary"
                  placeholder="Provide an overall assessment of the candidate..."
                  variant="outlined"
                />
              </MainCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Complete Screening
            </Button>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}

