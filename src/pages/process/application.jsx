// material-ui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Typography,
  LinearProgress,
  Grid,
  TextField,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// material-ui icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Dot from 'components/@extended/Dot';

// Sample data
const applicationData = [
  {
    id: 1,
    applicationId: 'APP-2024-001',
    candidateName: 'John Smith',
    submissionDate: '2024-10-15',
    overallProgress: 30,
    currentStatus: 'Document Assessment',
    statusColor: 'warning',
    assignedTo: 'Alice Cooper',
    trainingProvider: 'TechSkills Academy'
  },
  {
    id: 2,
    applicationId: 'APP-2024-002',
    candidateName: 'Sarah Johnson',
    submissionDate: '2024-10-18',
    overallProgress: 60,
    currentStatus: 'Candidate Screening',
    statusColor: 'info',
    assignedTo: 'Bob Anderson',
    trainingProvider: 'ProLearn Institute'
  },
  {
    id: 3,
    applicationId: 'APP-2024-003',
    candidateName: 'Michael Chen',
    submissionDate: '2024-10-20',
    overallProgress: 90,
    currentStatus: 'Pending Approval',
    statusColor: 'success',
    assignedTo: 'Carol White',
    trainingProvider: 'Global Training Solutions'
  },
  {
    id: 4,
    applicationId: 'APP-2024-004',
    candidateName: 'Emily Davis',
    submissionDate: '2024-10-22',
    overallProgress: 25,
    currentStatus: 'Document Assessment',
    statusColor: 'warning',
    assignedTo: 'Alice Cooper',
    trainingProvider: 'SkillBridge Center'
  },
  {
    id: 5,
    applicationId: 'APP-2024-005',
    candidateName: 'Robert Wilson',
    submissionDate: '2024-10-25',
    overallProgress: 55,
    currentStatus: 'Candidate Screening',
    statusColor: 'info',
    assignedTo: 'Bob Anderson',
    trainingProvider: 'TechSkills Academy'
  },
  {
    id: 6,
    applicationId: 'APP-2024-006',
    candidateName: 'Jennifer Martinez',
    submissionDate: '2024-10-12',
    overallProgress: 100,
    currentStatus: 'Approved',
    statusColor: 'success',
    assignedTo: 'Carol White',
    trainingProvider: 'ProLearn Institute'
  },
  {
    id: 7,
    applicationId: 'APP-2024-007',
    candidateName: 'David Lee',
    submissionDate: '2024-10-10',
    overallProgress: 100,
    currentStatus: 'Approved',
    statusColor: 'success',
    assignedTo: 'Carol White',
    trainingProvider: 'Elite Training Group'
  },
  {
    id: 8,
    applicationId: 'APP-2024-008',
    candidateName: 'Amanda Brown',
    submissionDate: '2024-10-28',
    overallProgress: 45,
    currentStatus: 'Candidate Screening',
    statusColor: 'info',
    assignedTo: 'Bob Anderson',
    trainingProvider: 'Global Training Solutions'
  }
];

// ==============================|| APPLICATION PAGE ||============================== //

export default function Application() {
  const navigate = useNavigate();

  // Calculate counts for each status
  const statusCounts = {
    'Document Assessment': applicationData.filter(app => app.currentStatus === 'Document Assessment').length,
    'Candidate Screening': applicationData.filter(app => app.currentStatus === 'Candidate Screening').length,
    'Pending Approval': applicationData.filter(app => app.currentStatus === 'Pending Approval').length,
    'Approved': applicationData.filter(app => app.currentStatus === 'Approved').length
  };

  const handleViewDetails = (status, candidateId) => {
    // Navigate to different pages based on status
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

  const handleExport = () => {
    // Convert data to CSV format
    const headers = ['Application ID', 'Candidate Name', 'Submission Date', 'Overall Progress', 'Current Status', 'Training Provider', 'Assigned to'];
    const csvData = applicationData.map(row => [
      row.applicationId,
      row.candidateName,
      row.submissionDate,
      `${row.overallProgress}%`,
      row.currentStatus,
      row.trainingProvider,
      row.assignedTo
    ]);
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Mini Dashboard - Status Cards */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3, 
          mb: 3,
          flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' }
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' } }}>
          <AnalyticEcommerce 
            title="Document Assessment" 
            count={statusCounts['Document Assessment'].toString()}
            color="warning"
            icon={AssignmentIcon}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' } }}>
          <AnalyticEcommerce 
            title="Candidate Screening" 
            count={statusCounts['Candidate Screening'].toString()}
            color="info"
            icon={PersonSearchIcon}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' } }}>
          <AnalyticEcommerce 
            title="Pending Approval" 
            count={statusCounts['Pending Approval'].toString()}
            color="secondary"
            icon={PendingActionsIcon}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' } }}>
          <AnalyticEcommerce 
            title="Approved" 
            count={statusCounts['Approved'].toString()}
            color="success"
            icon={CheckCircleIcon}
          />
        </Box>
      </Box>

      {/* Search and Filter Controls */}
      <Box sx={{ mb: 3 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center',
            flexWrap: { xs: 'wrap', md: 'nowrap' }
          }}
        >
          {/* Search Bar */}
          <TextField
            placeholder="Search applications..."
            variant="outlined"
            size="small"
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 auto' },
              minWidth: { xs: '100%', md: '300px' }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Filter Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 1,
              flex: { xs: '1 1 100%', md: '0 0 auto' },
              flexWrap: 'wrap'
            }}
          >
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              size="small"
              sx={{ flex: { xs: '1 1 calc(50% - 4px)', md: '0 0 auto' } }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              startIcon={<SortIcon />}
              size="small"
              sx={{ flex: { xs: '1 1 calc(50% - 4px)', md: '0 0 auto' } }}
            >
              Sort
            </Button>
            <Button
              variant="outlined"
              startIcon={<DateRangeIcon />}
              size="small"
              sx={{ flex: { xs: '1 1 calc(50% - 4px)', md: '0 0 auto' } }}
            >
              Date Range
            </Button>
            <Button
              variant="outlined"
              startIcon={<PersonIcon />}
              size="small"
              sx={{ flex: { xs: '1 1 calc(50% - 4px)', md: '0 0 auto' } }}
            >
              Assigned Officer
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Application Table */}
      <MainCard 
        title="Application Management"
        secondary={
          <Button
            variant="contained"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            size="medium"
          >
            Export
          </Button>
        }
      >
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="application table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Application ID</strong></TableCell>
              <TableCell><strong>Candidate Name</strong></TableCell>
              <TableCell><strong>Submission Date</strong></TableCell>
              <TableCell><strong>Overall Progress</strong></TableCell>
              <TableCell><strong>Current Status</strong></TableCell>
              <TableCell><strong>Training Provider</strong></TableCell>
              <TableCell><strong>Assigned to</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.applicationId}</TableCell>
                <TableCell component="th" scope="row">
                  {row.candidateName}
                </TableCell>
                <TableCell>{row.submissionDate}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={row.overallProgress} 
                        sx={{ height: 8, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {row.overallProgress}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={row.currentStatus}
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
                <TableCell>{row.trainingProvider}</TableCell>
                <TableCell>{row.assignedTo}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewDetails(row.currentStatus, row.id)}
                    aria-label="view details"
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
    </>
  );
}

