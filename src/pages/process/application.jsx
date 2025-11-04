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
  IconButton,
  Typography,
  LinearProgress
} from '@mui/material';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';

// Sample data
const applicationData = [
  {
    id: 1,
    candidateName: 'John Smith',
    submissionDate: '2024-10-15',
    overallProgress: 30,
    currentStatus: 'Document Assessment',
    statusColor: 'warning'
  },
  {
    id: 2,
    candidateName: 'Sarah Johnson',
    submissionDate: '2024-10-18',
    overallProgress: 60,
    currentStatus: 'Candidate Screening',
    statusColor: 'info'
  },
  {
    id: 3,
    candidateName: 'Michael Chen',
    submissionDate: '2024-10-20',
    overallProgress: 90,
    currentStatus: 'Approval',
    statusColor: 'success'
  },
  {
    id: 4,
    candidateName: 'Emily Davis',
    submissionDate: '2024-10-22',
    overallProgress: 25,
    currentStatus: 'Document Assessment',
    statusColor: 'warning'
  },
  {
    id: 5,
    candidateName: 'Robert Wilson',
    submissionDate: '2024-10-25',
    overallProgress: 55,
    currentStatus: 'Candidate Screening',
    statusColor: 'info'
  }
];

// ==============================|| APPLICATION PAGE ||============================== //

export default function Application() {
  const navigate = useNavigate();

  const handleViewDetails = (status, candidateId) => {
    // Navigate to different pages based on status
    switch (status) {
      case 'Document Assessment':
        navigate(`/process/document-assessment/${candidateId}`);
        break;
      case 'Candidate Screening':
        navigate(`/process/candidate-screening/${candidateId}`);
        break;
      case 'Approval':
        navigate(`/process/approval/${candidateId}`);
        break;
      default:
        break;
    }
  };

  return (
    <MainCard title="Application Management">
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="application table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Candidate Name</strong></TableCell>
              <TableCell><strong>Submission Date</strong></TableCell>
              <TableCell><strong>Overall Progress</strong></TableCell>
              <TableCell><strong>Current Status</strong></TableCell>
              <TableCell align="center"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicationData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
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
                    color={row.statusColor} 
                    size="small"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleViewDetails(row.currentStatus, row.id)}
                    aria-label="view details"
                  >
                    <EyeOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}

