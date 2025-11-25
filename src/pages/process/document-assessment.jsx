// react
import { useState } from 'react';

// material-ui
import { 
  Grid, 
  Typography, 
  Box, 
  Divider, 
  Button, 
  Chip,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  Paper,
  IconButton,
  Toolbar,
  Tooltip,
  Snackbar,
  Drawer,
  Fab,
  Badge as MuiBadge
} from '@mui/material';
import { 
  ArrowBack,
  CheckCircle,
  Edit,
  Cancel,
  Warning,
  AccessTime,
  Description,
  Badge,
  AccountBalance,
  Home,
  ZoomIn,
  ZoomOut,
  Download,
  Email,
  ExpandMore,
  AutoAwesome,
  ArrowForward,
  Error,
  Close
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';
import ApplicationStepper from 'components/ApplicationStepper';

// Dummy document data
const documentsData = [
  {
    id: 'IdentityDocument',
    name: 'Identity Document',
    category: 'Identity Document',
    status: 'verified',
    type: 'image',
    icon: <Badge />,
    fileUrl: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800',
    pages: 1
  },
  {
    id: 'bank-statement',
    name: 'Financial Information',
    category: 'Financials',
    status: 'inprogress',
    type: 'pdf',
    icon: <AccountBalance />,
    fileUrl: null, // Simulated PDF
    pages: 3
  },
  {
    id: 'application-form',
    name: 'Application Form',
    category: 'Application',
    status: 'verified',
    type: 'pdf',
    icon: <Description />,
    fileUrl: null, // Simulated PDF
    pages: 2
  },
  {
    id: 'proof-address',
    name: 'Proof of Address',
    category: 'Application',
    status: 'unable-to-verify',
    type: 'image',
    icon: <Home />,
    fileUrl: 'https://images.unsplash.com/photo-1554224311-beee460201b4?w=800',
    pages: 1
  }
];

// AI Check data based on selected document
const aiCheckData = {
  IdentityDocument: {
    completeness: {
      status: 'present',
      items: [
        { label: 'Identity Document', status: 'present' },
        { label: 'Financials', status: 'present' },
        { label: 'Application Form', status: 'present' },
        { label: 'Proof of Address', status: 'missing' }
      ]
    },
    coherence: {
      issues: [
        { 
          type: 'warning',
          text: 'Name mismatch: "John Doe" on passport vs. "Jonathan Doe" on application form.'
        }
      ],
      verified: [
        { text: 'Date of Birth consistent across all documents.' }
      ]
    },
    integrity: {
      flags: [
        {
          type: 'warning',
          text: 'Blurry text detected in the address section of the passport.'
        },
        {
          type: 'warning',
          text: 'Passport photo appears to be low resolution.'
        }
      ]
    }
  },
  'bank-statement': {
    completeness: {
      status: 'present',
      items: [
        { label: 'Account holder name', status: 'present' },
        { label: 'Account number', status: 'present' },
        { label: 'Bank name', status: 'present' },
        { label: 'Transaction history', status: 'present' }
      ]
    },
    coherence: {
      issues: [],
      verified: [
        { text: 'Account holder name matches application form.' },
        { text: 'Statement date within required timeframe.' }
      ]
    },
    integrity: {
      flags: [
        {
          type: 'info',
          text: 'Document appears to be authentic with no signs of tampering.'
        }
      ]
    }
  },
  'application-form': {
    completeness: {
      status: 'present',
      items: [
        { label: 'Personal information', status: 'present' },
        { label: 'Contact details', status: 'present' },
        { label: 'Employment history', status: 'present' },
        { label: 'Signature', status: 'present' }
      ]
    },
    coherence: {
      issues: [],
      verified: [
        { text: 'All required fields completed.' },
        { text: 'Information consistent with other documents.' }
      ]
    },
    integrity: {
      flags: []
    }
  },
  'proof-address': {
    completeness: {
      status: 'missing',
      items: [
        { label: 'Address line', status: 'present' },
        { label: 'City/State', status: 'present' },
        { label: 'Postal code', status: 'missing' },
        { label: 'Date of issue', status: 'present' }
      ]
    },
    coherence: {
      issues: [
        {
          type: 'error',
          text: 'Address does not match the address on application form.'
        }
      ],
      verified: []
    },
    integrity: {
      flags: [
        {
          type: 'warning',
          text: 'Document quality is poor, difficult to read some text.'
        }
      ]
    }
  }
};

// ==============================|| DOCUMENT ASSESSMENT PAGE ||============================== //

export default function DocumentAssessment() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);

  const selectedDocument = documentsData[selectedTab];
  const aiChecks = aiCheckData[selectedDocument.id];

  const handleBack = () => {
    navigate('/process/application');
  };

  const handleProceed = () => {
    // Check if all documents are verified
    const unverifiedDocs = documentsData.filter(doc => doc.status !== 'verified');
    
    if (unverifiedDocs.length > 0) {
      // Build error message
      const docNames = unverifiedDocs.map(doc => `"${doc.name}"`).join(', ');
      const message = `Cannot proceed. The following document${unverifiedDocs.length > 1 ? 's are' : ' is'} not verified: ${docNames}. Please verify all documents before proceeding.`;
      setSnackbarMessage(message);
      setSnackbarOpen(true);
    } else {
      // All documents verified, proceed to next stage
      console.log('All documents verified, proceeding to next stage');
      // Navigate to next stage (e.g., candidate screening)
      navigate(`/process/candidate-screening/${candidateId}`);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setZoom(100);
    setCurrentPdfPage(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'success';
      case 'inprogress':
        return 'warning';
      case 'unable-to-verify':
        return 'error';
      case 'missing':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle style={{ fontSize: '16px' }} />;
      case 'inprogress':
        return <AccessTime style={{ fontSize: '16px' }} />;
      case 'unable-to-verify':
        return <Cancel style={{ fontSize: '16px' }} />;
      case 'missing':
        return <Warning style={{ fontSize: '16px' }} />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'verified':
        return 'Verified';
      case 'inprogress':
        return 'In Progress';
      case 'unable-to-verify':
        return 'Unable to Verify';
      case 'missing':
        return 'Missing';
      default:
        return status;
    }
  };

  // Get status for Completeness Check
  const getCompletenessStatus = () => {
    const hasMissing = aiChecks.completeness.items.some(item => item.status === 'missing');
    if (hasMissing) return 'error';
    return 'success';
  };

  // Get status for Coherence Check
  const getCoherenceStatus = () => {
    const hasError = aiChecks.coherence.issues.some(issue => issue.type === 'error');
    const hasWarning = aiChecks.coherence.issues.some(issue => issue.type === 'warning');
    if (hasError) return 'error';
    if (hasWarning) return 'warning';
    return 'success';
  };

  // Get status for Content Integrity
  const getIntegrityStatus = () => {
    if (aiChecks.integrity.flags.length === 0) return 'success';
    const hasError = aiChecks.integrity.flags.some(flag => flag.type === 'error');
    const hasWarning = aiChecks.integrity.flags.some(flag => flag.type === 'warning');
    if (hasError) return 'error';
    if (hasWarning) return 'warning';
    return 'success';
  };

  // Render status icon for AI checks
  const renderCheckStatusIcon = (status) => {
    switch (status) {
      case 'error':
        return <Cancel sx={{ fontSize: '20px', color: 'error.main', mr: 1 }} />;
      case 'warning':
        return <Warning sx={{ fontSize: '20px', color: 'warning.main', mr: 1 }} />;
      case 'success':
        return <CheckCircle sx={{ fontSize: '20px', color: 'success.main', mr: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header Section */}
      <Box sx={{ mt: 0, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 2, sm: 3 }, py: 2, bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Back to Applications
          </Button>
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <Typography variant="h5">
              Application #{candidateId ? `APP-2024-${candidateId.toString().padStart(4, '0')}` : 'APP-2024-0000'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review and verify documents.
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            endIcon={<ArrowForward />}
            onClick={handleProceed}
          >
            Proceed
          </Button>
        </Box>
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, bgcolor: 'background.paper' }}>
          <ApplicationStepper activeStep={0} />
        </Box>
      </Box>

      <Grid container spacing={2} sx={{ minHeight: '750px', alignItems: 'stretch', flexWrap: 'nowrap' }}>
        {/* Left Section: Document List (Vertical Tabs) */}
        <Grid item xs={3} sx={{ maxWidth: '25%', flexBasis: '25%' }}>
          <MainCard title="Documents" sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
            <Stack spacing={1}>
              {documentsData.map((doc, index) => (
                <Paper
                  key={doc.id}
                  elevation={selectedTab === index ? 4 : 0}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: selectedTab === index ? 2 : 1,
                    borderColor: selectedTab === index ? 'primary.main' : 'divider',
                    bgcolor: selectedTab === index ? 'primary.lighter' : 'background.paper',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: selectedTab === index ? 'primary.lighter' : 'grey.50',
                      borderColor: 'primary.main'
                    }
                  }}
                  onClick={() => handleTabChange(null, index)}
                >
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ fontSize: '20px', color: selectedTab === index ? 'primary.main' : 'text.secondary' }}>
                        {doc.icon}
                      </Box>
                      <Typography 
                        variant="subtitle2" 
                        fontWeight={selectedTab === index ? 600 : 400}
                        sx={{ flex: 1 }}
                      >
                        {doc.name}
                      </Typography>
                    </Box>
                    <Chip 
                      size="small"
                      icon={getStatusIcon(doc.status)}
                      label={getStatusLabel(doc.status)}
                      color={getStatusColor(doc.status)}
                      sx={{ 
                        height: 22,
                        width: 'fit-content',
                        '& .MuiChip-label': { px: 1, fontSize: '0.75rem' }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {doc.category}
                    </Typography>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </MainCard>
        </Grid>

        {/* Document Content - Now takes up more space */}
        <Grid item xs={9} sx={{ maxWidth: '75%', flexBasis: '75%' }}>
          <MainCard 
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">Document Viewer</Typography>
                <Chip 
                  label={selectedDocument.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
              </Box>
            }
            sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <Box>
              {/* Document Toolbar */}
              <Toolbar 
                variant="dense" 
                sx={{ 
                  bgcolor: 'grey.100', 
                  borderRadius: 1, 
                  mb: 2,
                  minHeight: 48,
                  px: 2
                }}
              >
                <Typography variant="subtitle2" sx={{ flex: 1 }}>
                  {selectedDocument.name}
                </Typography>
                <IconButton size="small" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                  <ZoomOut />
                </IconButton>
                <Typography variant="body2" sx={{ mx: 1 }}>
                  {zoom}%
                </Typography>
                <IconButton size="small" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                  <ZoomIn />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                <IconButton size="small">
                  <Download />
                </IconButton>
              </Toolbar>

              {/* Document Viewer */}
              <Paper 
                sx={{ 
                  bgcolor: 'grey.200',
                  p: 2,
                  height: 600,
                  maxHeight: 600,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  overflow: 'auto',
                  flex: 1
                }}
              >
                {selectedDocument.type === 'image' ? (
                  // Image Viewer
                  <Box
                    component="img"
                    src={selectedDocument.fileUrl}
                    alt={selectedDocument.name}
                    sx={{
                      maxWidth: '100%',
                      height: 'auto',
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'top center',
                      boxShadow: 3,
                      bgcolor: 'white'
                    }}
                  />
                ) : (
                  // PDF Viewer Simulation
                  <Box sx={{ width: '100%', maxWidth: 800 }}>
                    {[...Array(selectedDocument.pages)].map((_, pageIndex) => (
                      <Paper
                        key={pageIndex}
                        sx={{
                          p: 4,
                          mb: 2,
                          bgcolor: 'white',
                          minHeight: 400,
                          transform: `scale(${zoom / 100})`,
                          transformOrigin: 'top center',
                          boxShadow: 3
                        }}
                      >
                        <Typography variant="h6" gutterBottom>
                          {selectedDocument.name} - Page {pageIndex + 1}
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Typography variant="body2" color="text.secondary" paragraph>
                          This is a simulated PDF document viewer. In a real implementation, 
                          you would integrate a PDF viewer library like react-pdf or pdf.js.
                        </Typography>
                        {selectedDocument.id === 'bank-statement' && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Account Statement
                            </Typography>
                            <Typography variant="body2" paragraph>
                              Account Holder: John Doe<br />
                              Account Number: ****1234<br />
                              Statement Period: Oct 1-31, 2024
                            </Typography>
                            {pageIndex === 0 && (
                              <Box>
                                <Typography variant="body2" fontWeight="bold">
                                  Recent Transactions:
                                </Typography>
                                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                                  Oct 1 - Deposit - $2,500.00<br />
                                  Oct 5 - Withdrawal - $150.00<br />
                                  Oct 12 - Transfer - $300.00<br />
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}
                        {selectedDocument.id === 'application-form' && (
                          <Box>
                            <Typography variant="subtitle2" gutterBottom>
                              Apprenticeship Application
                            </Typography>
                            <Typography variant="body2" paragraph>
                              Applicant Name: Jonathan Doe<br />
                              Date of Birth: January 15, 1995<br />
                              Email: john.doe@email.com<br />
                              Phone: (555) 123-4567
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    ))}
                    {selectedDocument.pages > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                        {[...Array(selectedDocument.pages)].map((_, idx) => (
                          <Chip
                            key={idx}
                            label={`Page ${idx + 1}`}
                            size="small"
                            color={currentPdfPage === idx + 1 ? 'primary' : 'default'}
                            onClick={() => setCurrentPdfPage(idx + 1)}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                )}
              </Paper>
            </Box>
          </MainCard>
        </Grid>
      </Grid>

      {/* Floating Action Button to Open AI Insights */}
      <Tooltip title="AI Insights & Checks" placement="left">
        <Fab
          color="primary"
          aria-label="ai insights"
          onClick={() => setAiDrawerOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
            color: 'white',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5568d3 0%, #63408b 50%, #1976d2 100%)',
              boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)',
              transform: 'translateY(-2px)'
            },
            transition: 'all 0.2s',
            zIndex: 1000
          }}
        >
          <MuiBadge 
            badgeContent={
              getCompletenessStatus() === 'error' || 
              getCoherenceStatus() === 'error' || 
              getIntegrityStatus() === 'error' ? '!' : 0
            } 
            color="error"
          >
            <AutoAwesome />
          </MuiBadge>
        </Fab>
      </Tooltip>

      {/* AI Insights Drawer */}
      <Drawer
        anchor="right"
        open={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 450, md: 500 },
            p: 3
          }
        }}
      >
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AutoAwesome sx={{ 
              fontSize: '28px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }} />
            <Typography variant="h4">AI Insights & Checks</Typography>
          </Box>
          <IconButton onClick={() => setAiDrawerOpen(false)} size="small">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Tooltip title="Regenerate insights" arrow>
            <Button 
              variant="contained"
              size="small"
              startIcon={<AutoAwesome />}
              onClick={() => console.log('Regenerate AI insights')}
              sx={{
                minWidth: 'auto',
                px: 1.5,
                py: 0.5,
                fontSize: '0.8125rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
                color: 'white',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                border: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5568d3 0%, #63408b 50%, #1976d2 100%)',
                  boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)',
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s'
              }}
            >
              Regenerate
            </Button>
          </Tooltip>
        </Box>

        <Stack spacing={2}>
          {/* Completeness Check */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {renderCheckStatusIcon(getCompletenessStatus())}
                <Typography variant="subtitle1" fontWeight="bold">
                  Completeness Check
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {aiChecks.completeness.items.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {item.status === 'present' ? (
                        <CheckCircle style={{ color: '#52c41a', fontSize: '20px' }} />
                      ) : (
                        <Cancel style={{ color: '#ff4d4f', fontSize: '20px' }} />
                      )}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Coherence Check */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {renderCheckStatusIcon(getCoherenceStatus())}
                <Typography variant="subtitle1" fontWeight="bold">
                  Coherence Check
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1.5}>
                {aiChecks.coherence.issues.map((issue, index) => (
                  <Alert 
                    key={`issue-${index}`}
                    severity={issue.type}
                    icon={<Warning />}
                    sx={{ py: 0.5 }}
                  >
                    <Typography variant="body2">
                      {issue.text}
                    </Typography>
                  </Alert>
                ))}
                {aiChecks.coherence.verified.map((item, index) => (
                  <Alert 
                    key={`verified-${index}`}
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{ py: 0.5 }}
                  >
                    <Typography variant="body2">
                      {item.text}
                    </Typography>
                  </Alert>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Content Integrity Flags */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {renderCheckStatusIcon(getIntegrityStatus())}
                <Typography variant="subtitle1" fontWeight="bold">
                  Content Integrity Flags
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              {aiChecks.integrity.flags.length > 0 ? (
                <Stack spacing={1.5}>
                  {aiChecks.integrity.flags.map((flag, index) => (
                    <Alert 
                      key={index}
                      severity={flag.type}
                      icon={<Warning />}
                      sx={{ py: 0.5 }}
                    >
                      <Typography variant="body2">
                        {flag.text}
                      </Typography>
                    </Alert>
                  ))}
                </Stack>
              ) : (
                <Alert severity="success" sx={{ py: 0.5 }}>
                  <Typography variant="body2">
                    No integrity issues detected.
                  </Typography>
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>

          {/* Action Buttons */}
          <Divider />
          <Stack spacing={1.5}>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<CheckCircle />}
              fullWidth
            >
              Approve Documents
            </Button>
            <Button 
              variant="contained" 
              color="error"
              startIcon={<Email />}
              fullWidth
            >
              Request Information
            </Button>
            <Button 
              variant="outlined" 
              color="warning"
              startIcon={<Edit />}
              fullWidth
            >
              Manual Override
            </Button>
          </Stack>
        </Stack>
      </Drawer>

      {/* Error Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="error" 
          icon={<Error />}
          sx={{ width: '100%', boxShadow: 3 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

