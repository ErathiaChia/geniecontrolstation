import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import MuiMenu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import Dot from 'components/@extended/Dot';

// assets
import { 
  MoreHoriz,
  Assignment,
  PersonSearch,
  PendingActions,
  CheckCircle,
  TrendingUp,
  Assessment as AssessmentIcon,
  Schedule,
  ArrowForward
} from '@mui/icons-material';

// Sample application data for dashboard
const recentApplications = [
  {
    id: 1,
    applicationId: 'APP-2024-001',
    candidateName: 'John Smith',
    submissionDate: '2024-10-15',
    progress: 30,
    status: 'Document Assessment',
    statusColor: 'warning',
    trainingProvider: 'TechSkills Academy'
  },
  {
    id: 2,
    applicationId: 'APP-2024-002',
    candidateName: 'Sarah Johnson',
    submissionDate: '2024-10-18',
    progress: 60,
    status: 'Candidate Screening',
    statusColor: 'info',
    trainingProvider: 'ProLearn Institute'
  },
  {
    id: 3,
    applicationId: 'APP-2024-003',
    candidateName: 'Michael Chen',
    submissionDate: '2024-10-20',
    progress: 90,
    status: 'Pending Approval',
    statusColor: 'secondary',
    trainingProvider: 'Global Training Solutions'
  },
  {
    id: 4,
    applicationId: 'APP-2024-004',
    candidateName: 'Emily Davis',
    submissionDate: '2024-10-22',
    progress: 25,
    status: 'Document Assessment',
    statusColor: 'warning',
    trainingProvider: 'SkillBridge Center'
  },
  {
    id: 5,
    applicationId: 'APP-2024-005',
    candidateName: 'Robert Wilson',
    submissionDate: '2024-10-25',
    progress: 55,
    status: 'Candidate Screening',
    statusColor: 'info',
    trainingProvider: 'TechSkills Academy'
  }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const navigate = useNavigate();
  const [applicationsMenuAnchor, setApplicationsMenuAnchor] = useState(null);
  const [analyticsMenuAnchor, setAnalyticsMenuAnchor] = useState(null);

  const handleApplicationsMenuClick = (event) => {
    setApplicationsMenuAnchor(event.currentTarget);
  };
  const handleApplicationsMenuClose = () => {
    setApplicationsMenuAnchor(null);
  };

  const handleAnalyticsMenuClick = (event) => {
    setAnalyticsMenuAnchor(event.currentTarget);
  };
  const handleAnalyticsMenuClose = () => {
    setAnalyticsMenuAnchor(null);
  };

  const handleViewApplication = (status, candidateId) => {
    switch (status) {
      case 'Document Assessment':
        navigate(`/process/document-assessment/${candidateId}`);
        break;
      case 'Candidate Screening':
        navigate(`/process/candidate-screening/${candidateId}`);
        break;
      case 'Pending Approval':
        navigate(`/process/approval/${candidateId}`);
        break;
      default:
        break;
    }
  };

  // Calculate statistics
  const totalApplications = recentApplications.length;
  const documentAssessmentCount = recentApplications.filter(app => app.status === 'Document Assessment').length;
  const candidateScreeningCount = recentApplications.filter(app => app.status === 'Candidate Screening').length;
  const pendingApprovalCount = recentApplications.filter(app => app.status === 'Pending Approval').length;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Header */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Application Dashboard</Typography>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            onClick={() => navigate('/process/application')}
          >
            View All Applications
          </Button>
        </Stack>
      </Grid>

      {/* Status Cards */}
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Total Applications" 
          count={totalApplications.toString()}
          color="primary"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Document Assessment" 
          count={documentAssessmentCount.toString()}
          percentage={27}
          color="warning"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Candidate Screening" 
          count={candidateScreeningCount.toString()}
          percentage={35}
          color="info"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
        <AnalyticEcommerce 
          title="Pending Approval" 
          count={pendingApprovalCount.toString()}
          percentage={15}
          color="secondary"
        />
      </Grid>
      {/* Application Trends Chart */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <MainCard>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="h5">Application Trends</Typography>
          </Stack>
          <ReportAreaChart />
        </MainCard>
      </Grid>

      {/* Application Statistics */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">This Month Statistics</Typography>
          </Grid>
          <Grid />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack sx={{ gap: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Total Applications
              </Typography>
              <Typography variant="h3">{totalApplications}</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* Recent Applications Table */}
      <Grid size={{ xs: 12, md: 7, lg: 8 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Recent Applications</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleApplicationsMenuClick}>
              <MoreHoriz style={{ fontSize: '1.25rem' }} />
            </IconButton>
            <MuiMenu
              id="fade-menu"
              slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
              anchorEl={applicationsMenuAnchor}
              onClose={handleApplicationsMenuClose}
              open={Boolean(applicationsMenuAnchor)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleApplicationsMenuClose}>Export as CSV</MenuItem>
              <MenuItem onClick={handleApplicationsMenuClose}>Export as Excel</MenuItem>
              <MenuItem onClick={handleApplicationsMenuClose}>Print Table</MenuItem>
            </MuiMenu>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Application ID</strong></TableCell>
                  <TableCell><strong>Candidate Name</strong></TableCell>
                  <TableCell><strong>Progress</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell align="center"><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentApplications.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{row.applicationId}</TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {row.candidateName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {row.trainingProvider}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: '100%', mr: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={row.progress} 
                            sx={{ height: 6, borderRadius: 5 }}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ minWidth: 40 }}>
                          {row.progress}%
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status}
                        variant="outlined"
                        color={row.statusColor} 
                        size="small"
                        icon={<Dot color={row.statusColor} size={10} />}
                        sx={{ 
                          fontWeight: 500,
                          '& .MuiChip-icon': {
                            ml: 1
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleViewApplication(row.status, row.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </MainCard>
      </Grid>
      {/* Process Analytics */}
      <Grid size={{ xs: 12, md: 5, lg: 4 }}>
        <Grid container sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Grid>
            <Typography variant="h5">Process Metrics</Typography>
          </Grid>
          <Grid>
            <IconButton onClick={handleAnalyticsMenuClick}>
              <MoreHoriz style={{ fontSize: '1.25rem' }} />
            </IconButton>
            <MuiMenu
              id="fade-menu"
              slotProps={{ list: { 'aria-labelledby': 'fade-button' } }}
              anchorEl={analyticsMenuAnchor}
              open={Boolean(analyticsMenuAnchor)}
              onClose={handleAnalyticsMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleAnalyticsMenuClose}>Weekly</MenuItem>
              <MenuItem onClick={handleAnalyticsMenuClose}>Monthly</MenuItem>
              <MenuItem onClick={handleAnalyticsMenuClose}>Yearly</MenuItem>
            </MuiMenu>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Average Processing Time
                  </Typography>
                  <Typography variant="h6" color="primary">3.5 days</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={70} sx={{ height: 6, borderRadius: 5 }} />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Approval Rate
                  </Typography>
                  <Typography variant="h6" color="success.main">85%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 6, borderRadius: 5 }} />
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    AI Match Accuracy
                  </Typography>
                  <Typography variant="h6" color="info.main">92%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={92} color="info" sx={{ height: 6, borderRadius: 5 }} />
              </Box>
            </Stack>
          </Box>
        </MainCard>

        {/* Quick Actions */}
        <MainCard sx={{ mt: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Quick Actions</Typography>
          <Stack spacing={1.5}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<TrendingUp />}
              onClick={() => navigate('/process/application')}
            >
              View All Applications
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<AssessmentIcon />}
              onClick={() => navigate('/process/document-assessment/1')}
            >
              Document Assessment
            </Button>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Schedule />}
              onClick={() => navigate('/process/candidate-screening/1')}
            >
              Candidate Screening
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
}
