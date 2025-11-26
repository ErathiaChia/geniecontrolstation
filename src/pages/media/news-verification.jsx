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
  TextField,
  InputAdornment,
  Checkbox,
  TablePagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

// material-ui icons
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import Dot from 'components/@extended/Dot';

// Sample data
const newsLeadsData = [
  {
    id: 1,
    title: 'Breaking: Major Tech Company Announces New Product',
    submissionDate: '2024-11-25',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Social Media',
    assignedTo: 'John Doe',
  },
  {
    id: 2,
    title: 'Local Community Event Draws Large Crowd',
    submissionDate: '2024-11-24',
    currentStatus: 'Approval',
    statusColor: 'warning',
    sources: 'Social Media',
    assignedTo: 'Jane Smith',
  },
  {
    id: 3,
    title: 'Government Policy Update on Healthcare',
    submissionDate: '2024-11-23',
    currentStatus: 'Schedule',
    statusColor: 'info',
    sources: 'Other Media Outlet',
    assignedTo: 'Mike Johnson',
  },
  {
    id: 4,
    title: 'Sports Team Wins Championship',
    submissionDate: '2024-11-22',
    currentStatus: 'Published',
    statusColor: 'success',
    sources: 'Blog News',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 5,
    title: 'Weather Alert: Storm Warning Issued',
    submissionDate: '2024-11-25',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Other Media Outlet',
    assignedTo: 'John Doe',
  },
  {
    id: 6,
    title: 'Celebrity Spotted at Local Restaurant',
    submissionDate: '2024-11-24',
    currentStatus: 'Rejected',
    statusColor: 'default',
    sources: 'TikTok',
    assignedTo: 'Jane Smith',
  },
  {
    id: 7,
    title: 'New Study Reveals Health Benefits',
    submissionDate: '2024-11-23',
    currentStatus: 'Approval',
    statusColor: 'warning',
    sources: 'Reporter',
    assignedTo: 'Mike Johnson',
  },
  {
    id: 8,
    title: 'Traffic Accident on Main Highway',
    submissionDate: '2024-11-25',
    currentStatus: 'Rejected',
    statusColor: 'default',
    sources: 'Social Media',
    assignedTo: 'John Doe',
  },
  {
    id: 9,
    title: 'School District Announces New Program',
    submissionDate: '2024-11-22',
    currentStatus: 'Published',
    statusColor: 'success',
    sources: 'Other Media Outlet',
    assignedTo: 'Sarah Williams',
  },
  {
    id: 10,
    title: 'Local Business Opens New Location',
    submissionDate: '2024-11-24',
    currentStatus: 'Schedule',
    statusColor: 'info',
    sources: 'Blog News',
    assignedTo: 'Jane Smith',
  },
];

// ==============================|| NEWS VERIFICATION PAGE ||============================== //

export default function NewsVerification() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Calculate counts for each status
  const statusCounts = {
    'Unverified': newsLeadsData.filter(news => news.currentStatus === 'Unverified').length,
    'Approval': newsLeadsData.filter(news => news.currentStatus === 'Approval').length,
    'Schedule': newsLeadsData.filter(news => news.currentStatus === 'Schedule').length,
    'Published': newsLeadsData.filter(news => news.currentStatus === 'Published').length
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = newsLeadsData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewDetails = (newsId, status) => {
    // Navigate to the appropriate status page based on the news lead's status
    const statusRouteMap = {
      'Unverified': 'unverified',
      'Approval': 'approval',
      'Schedule': 'schedule',
      'Published': 'published',
      'Rejected': 'rejected'
    };
    
    const route = statusRouteMap[status];
    if (route) {
      navigate(`/media/news-verification/${route}/${newsId}`);
    }
  };

  const handleStatusCardClick = (status) => {
    // Navigate to the status-specific page
    const statusRouteMap = {
      'Unverified': 'unverified',
      'Approval': 'approval',
      'Schedule': 'schedule',
      'Published': 'published'
    };
    
    const route = statusRouteMap[status];
    if (route) {
      navigate(`/media/news-verification/${route}`);
    }
  };

  const handleReject = (newsId) => {
    // Handle rejection of news lead
    console.log('Reject news lead:', newsId);
    // TODO: Open rejection dialog or update status
  };

  const handleExport = () => {
    // Convert data to CSV format
    const headers = ['ID', 'Title', 'Submission Date', 'Current Status', 'Sources', 'Assigned To'];
    const csvData = newsLeadsData.map(row => [
      row.id,
      `"${row.title}"`,
      row.submissionDate,
      row.currentStatus,
      `"${row.sources}"`,
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
    link.setAttribute('download', `news_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNewsLead = () => {
    // Handle adding new news lead
    console.log('Add new news lead');
    // TODO: Open dialog or navigate to add news lead page
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - newsLeadsData.length) : 0;

  const visibleRows = newsLeadsData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <>
      {/* Add News Lead Button - positioned at top right */}
      <Box 
        sx={{ 
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewsLead}
          size="medium"
        >
          News Lead
        </Button>
      </Box>

      {/* Section 1: Status Cards */}
      <Box 
        sx={{ 
          display: 'flex', 
          gap: 3, 
          mb: 3,
          flexWrap: { xs: 'wrap', sm: 'wrap', md: 'nowrap' }
        }}
      >
        <Box 
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' },
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => handleStatusCardClick('Unverified')}
        >
          <AnalyticEcommerce 
            title="Unverified News Lead" 
            count={statusCounts['Unverified'].toString()}
            color="error"
            icon={NewspaperIcon}
          />
        </Box>
        <Box 
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' },
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => handleStatusCardClick('Approval')}
        >
          <AnalyticEcommerce 
            title="Approval" 
            count={statusCounts['Approval'].toString()}
            color="warning"
            icon={VerifiedIcon}
          />
        </Box>
        <Box 
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' },
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => handleStatusCardClick('Schedule')}
        >
          <AnalyticEcommerce 
            title="Schedule" 
            count={statusCounts['Schedule'].toString()}
            color="info"
            icon={PendingActionsIcon}
          />
        </Box>
        <Box 
          sx={{ 
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 25%' },
            cursor: 'pointer',
            '&:hover': { opacity: 0.8 }
          }}
          onClick={() => handleStatusCardClick('Published')}
        >
          <AnalyticEcommerce 
            title="Published" 
            count={statusCounts['Published'].toString()}
            color="success"
            icon={CheckCircleIcon}
          />
        </Box>
      </Box>

      {/* Section 2: Search, Filter, Sort, Date Range, Reporter */}
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
            placeholder="Search news leads..."
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
              Reporter
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Section 3: DataGrid - News Leads */}
      <MainCard 
        title="News Leads Management"
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
          <Table sx={{ minWidth: 750 }} aria-label="news leads table">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < newsLeadsData.length}
                    checked={newsLeadsData.length > 0 && selected.length === newsLeadsData.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all news leads',
                    }}
                  />
                </TableCell>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Title</strong></TableCell>
                <TableCell><strong>Submission Date</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Sources</strong></TableCell>
                <TableCell><strong>Assigned To</strong></TableCell>
                <TableCell align="center"><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `news-table-checkbox-${row.id}`;

                return (
                  <TableRow
                    key={row.id}
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>{row.id}</TableCell>
                    <TableCell 
                      component="th" 
                      id={labelId}
                      scope="row"
                      sx={{ maxWidth: 300 }}
                    >
                      {row.title}
                    </TableCell>
                    <TableCell>{row.submissionDate}</TableCell>
                    <TableCell>
                      {row.currentStatus === 'Rejected' ? (
                        <Chip 
                          label={row.currentStatus}
                          variant="outlined"
                          size="small"
                          sx={{ 
                            fontWeight: 500,
                            borderColor: 'grey.400',
                            color: 'grey.600',
                            backgroundColor: 'grey.50',
                            '& .MuiChip-icon': {
                              ml: 1
                            }
                          }}
                          icon={
                            <Box 
                              sx={{ 
                                width: 10, 
                                height: 10, 
                                borderRadius: '50%', 
                                backgroundColor: 'grey.400' 
                              }} 
                            />
                          }
                        />
                      ) : (
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
                      )}
                    </TableCell>
                    <TableCell>{row.sources}</TableCell>
                    <TableCell>{row.assignedTo}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(row.id, row.currentStatus);
                          }}
                          aria-label="view details"
                        >
                          View
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(row.id);
                          }}
                          aria-label="reject news lead"
                          disabled={row.currentStatus === 'Rejected' || row.currentStatus === 'Published'}
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={newsLeadsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MainCard>
    </>
  );
}

