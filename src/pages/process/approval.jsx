// material-ui
import {
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Alert
} from '@mui/material';
import { ArrowLeftOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';
import ApplicationStepper from 'components/ApplicationStepper';

// ==============================|| APPROVAL PAGE ||============================== //

export default function Approval() {
  const navigate = useNavigate();
  const { candidateId } = useParams();

  const handleBack = () => {
    navigate('/process/application');
  };

  // Sample candidate data
  const candidateInfo = {
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Software Engineer',
    submissionDate: '2024-10-20',
    documentAssessment: 'Approved',
    screeningScore: '4.5/5.0',
    technicalSkills: '5/5',
    communicationSkills: '4/5',
    culturalFit: '5/5',
    experience: '4/5'
  };

  return (
    <>
      <Box sx={{ mx: { xs: -2, sm: -5 }, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: { xs: 2, sm: 3 }, py: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Box>
            <Button
              startIcon={<ArrowLeftOutlined />}
              onClick={handleBack}
            >
              Back to Applications
            </Button>
          </Box>
        </Box>
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, bgcolor: 'background.paper' }}>
          <ApplicationStepper activeStep={2} />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MainCard>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">Final Approval</Typography>
              <Chip label="Pending Approval" color="success" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Candidate ID: {candidateId}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Alert severity="info" sx={{ mb: 2 }}>
                Please review all assessment details before making the final approval decision.
              </Alert>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard title="Candidate Information">
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Name
                        </TableCell>
                        <TableCell>{candidateInfo.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Email
                        </TableCell>
                        <TableCell>{candidateInfo.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Phone
                        </TableCell>
                        <TableCell>{candidateInfo.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Position
                        </TableCell>
                        <TableCell>{candidateInfo.position}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Submission Date
                        </TableCell>
                        <TableCell>{candidateInfo.submissionDate}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard title="Assessment Summary">
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Document Assessment
                        </TableCell>
                        <TableCell>
                          <Chip label={candidateInfo.documentAssessment} color="success" size="small" />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Overall Screening Score
                        </TableCell>
                        <TableCell>{candidateInfo.screeningScore}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Technical Skills
                        </TableCell>
                        <TableCell>{candidateInfo.technicalSkills}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Communication Skills
                        </TableCell>
                        <TableCell>{candidateInfo.communicationSkills}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Cultural Fit
                        </TableCell>
                        <TableCell>{candidateInfo.culturalFit}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                          Experience Level
                        </TableCell>
                        <TableCell>{candidateInfo.experience}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </MainCard>
            </Grid>

            <Grid item xs={12}>
              <MainCard title="Approval Decision">
                <Typography variant="body2" color="text.secondary" paragraph>
                  Based on the comprehensive assessment, please make your final decision regarding this candidate's application.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="large"
                    startIcon={<CheckCircleOutlined />}
                    sx={{ flex: 1 }}
                  >
                    Approve Application
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    startIcon={<CloseCircleOutlined />}
                    sx={{ flex: 1 }}
                  >
                    Reject Application
                  </Button>
                </Box>
              </MainCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={handleBack}>
              Back to List
            </Button>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
    </>
  );
}

