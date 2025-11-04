// material-ui
import { Grid, Typography, Box, Divider, Button, Chip, Paper } from '@mui/material';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';
import ApplicationStepper from 'components/ApplicationStepper';

// ==============================|| DOCUMENT ASSESSMENT PAGE ||============================== //

export default function DocumentAssessment() {
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
              <ApplicationStepper activeStep={0} />
            </Paper>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <MainCard>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h4">Document Assessment</Typography>
              <Chip label="In Progress" color="warning" />
            </Box>
            <Typography variant="body2" color="text.secondary">
              Candidate ID: {candidateId}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Required Documents
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Resume/CV
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Status: Submitted
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckOutlined />}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<CloseOutlined />}
                  >
                    Reject
                  </Button>
                </Box>
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Cover Letter
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Status: Submitted
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckOutlined />}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<CloseOutlined />}
                  >
                    Reject
                  </Button>
                </Box>
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Identification Document
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Status: Pending Review
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckOutlined />}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<CloseOutlined />}
                  >
                    Reject
                  </Button>
                </Box>
              </MainCard>
            </Grid>

            <Grid item xs={12} md={6}>
              <MainCard>
                <Typography variant="subtitle1" gutterBottom>
                  Educational Certificates
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Status: Pending Review
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckOutlined />}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<CloseOutlined />}
                  >
                    Reject
                  </Button>
                </Box>
              </MainCard>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              Cancel
            </Button>
            <Button variant="contained" color="primary">
              Complete Assessment
            </Button>
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
}

