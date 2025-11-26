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
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress,
  Badge,
  Snackbar,
  Grow,
  Fade,
  Tooltip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent
} from '@mui/material';
import { 
  ArrowBack, 
  CheckCircle, 
  Cancel, 
  Email, 
  CheckCircleOutline, 
  RadioButtonUnchecked,
  Upload,
  Close,
  CloudUpload,
  InsertDriveFile,
  AccessTime,
  Check,
  Warning,
  Info,
  Build,
  Code,
  School,
  AutoAwesome,
  Work,
  DateRange,
  Assessment,
  ExpandMore,
  Phone,
  EmailOutlined,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

// project imports
import MainCard from 'components/MainCard';
import ApplicationStepper from 'components/ApplicationStepper';

// ==============================|| APPROVAL PAGE ||============================== //

export default function Approval() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  
  // Approval stages state with timestamps
  const [approvalStages, setApprovalStages] = useState({
    letterSent: { completed: false, timestamp: null },
    acknowledgementReceived: { completed: false, timestamp: null },
    documentUploaded: { completed: false, timestamp: null, fileName: null }
  });
  
  // Dialog state for PDF upload
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: null });

  const handleBack = () => {
    navigate('/process/application');
  };
  
  const handleSendLetter = () => {
    setApprovalStages({ 
      ...approvalStages, 
      letterSent: { completed: true, timestamp: new Date().toISOString() }
    });
    setSnackbar({ 
      open: true, 
      message: 'Approval letter sent successfully!', 
      severity: 'success' 
    });
  };
  
  const handleAcknowledgementReceived = () => {
    setApprovalStages({ 
      ...approvalStages, 
      acknowledgementReceived: { completed: true, timestamp: new Date().toISOString() }
    });
    setSnackbar({ 
      open: true, 
      message: 'Acknowledgement marked as received!', 
      severity: 'success' 
    });
  };
  
  const handleOpenUploadDialog = () => {
    setUploadDialogOpen(true);
  };
  
  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
    setSelectedFile(null);
    setIsDragging(false);
  };
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSnackbar({ 
        open: true, 
        message: 'Please select a PDF file', 
        severity: 'error' 
      });
    }
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSnackbar({ 
        open: true, 
        message: 'Please drop a PDF file', 
        severity: 'error' 
      });
    }
  };
  
  const handleUploadDocument = () => {
    if (selectedFile) {
      setApprovalStages({ 
        ...approvalStages, 
        documentUploaded: { 
          completed: true, 
          timestamp: new Date().toISOString(),
          fileName: selectedFile.name
        }
      });
      setUploadDialogOpen(false);
      setSnackbar({ 
        open: true, 
        message: 'Document uploaded successfully!', 
        severity: 'success' 
      });
      setSelectedFile(null);
    }
  };
  
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  const handleApprove = () => {
    setConfirmDialog({ open: true, type: 'approve' });
  };
  
  const handleReject = () => {
    setConfirmDialog({ open: true, type: 'reject' });
  };
  
  const handleConfirmAction = () => {
    if (confirmDialog.type === 'approve') {
      setSnackbar({ 
        open: true, 
        message: 'Application approved successfully!', 
        severity: 'success' 
      });
      // Navigate back after a delay
      setTimeout(() => navigate('/process/application'), 1500);
    } else {
      setSnackbar({ 
        open: true, 
        message: 'Application rejected', 
        severity: 'info' 
      });
      setTimeout(() => navigate('/process/application'), 1500);
    }
    setConfirmDialog({ open: false, type: null });
  };
  
  const handleCancelConfirm = () => {
    setConfirmDialog({ open: false, type: null });
  };
  
  const completedStagesCount = Object.values(approvalStages).filter(stage => stage.completed).length;
  const totalStages = 3;
  const progressPercentage = Math.round((completedStagesCount / totalStages) * 100);
  
  const isApprovalEnabled = approvalStages.letterSent.completed && 
                           approvalStages.acknowledgementReceived.completed && 
                           approvalStages.documentUploaded.completed;
  
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
              Make final approval decision.
            </Typography>
          </Box>
          <Box sx={{ width: 180 }} /> {/* Spacer for balance */}
        </Box>
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, bgcolor: 'background.paper' }}>
          <ApplicationStepper activeStep={2} />
        </Box>
      </Box>

      {/* Compact Candidate Summary Card */}
      <MainCard sx={{ mb: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {candidateInfo.name}
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ mb: 0.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Work sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidateInfo.position}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <DateRange sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidateInfo.submissionDate}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <EmailOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidateInfo.email}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidateInfo.phone}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'primary.lighter', border: 1, borderColor: 'primary.main', borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    OVERALL MATCH SCORE
                  </Typography>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    85%
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Chip label={candidateInfo.documentAssessment} color="success" size="small" sx={{ mb: 0.5 }} />
                  <Typography variant="caption" color="text.secondary" display="block">
                    2 Discrepancies
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </MainCard>

      {/* Main Content Grid */}
      <Grid container spacing={2}>
        {/* Quick Assessment Scores */}
        <Grid item xs={12} md={6}>
          <MainCard title={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assessment color="primary" />
              <Typography variant="h6">Quick Assessment</Typography>
            </Box>
          }>
            <Stack spacing={1.5}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>Technical Skills</Typography>
                  <Typography variant="body2" color="primary" fontWeight={600}>{candidateInfo.technicalSkills}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={100} sx={{ height: 6, borderRadius: 1 }} color="primary" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>Communication Skills</Typography>
                  <Typography variant="body2" color="success" fontWeight={600}>{candidateInfo.communicationSkills}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={80} sx={{ height: 6, borderRadius: 1 }} color="success" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>Cultural Fit</Typography>
                  <Typography variant="body2" color="primary" fontWeight={600}>{candidateInfo.culturalFit}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={100} sx={{ height: 6, borderRadius: 1 }} color="primary" />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="body2" fontWeight={600}>Experience Level</Typography>
                  <Typography variant="body2" color="success" fontWeight={600}>{candidateInfo.experience}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={80} sx={{ height: 6, borderRadius: 1 }} color="success" />
              </Box>
            </Stack>
            
            {/* Expandable Detailed Assessment */}
            <Accordion sx={{ mt: 2, boxShadow: 'none', '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMore />} sx={{ px: 0, minHeight: 40, '& .MuiAccordionSummary-content': { my: 0.5 } }}>
                <Typography variant="caption" color="primary" fontWeight={600}>
                  VIEW DETAILED ASSESSMENT
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 0, pt: 0 }}>

                <Grid item xs={12}>
                  <MainCard title="Assessment Summary">
                    <Alert severity="info" sx={{ mb: 2 }} icon={<Info />}>
                      <Typography variant="body2">
                        This summary consolidates the AI-powered assessments from the Candidate Screening stage.
                      </Typography>
                    </Alert>

                    {/* Overall Match Score */}
                    <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'primary.lighter', border: 1, borderColor: 'primary.main', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h6" fontWeight={600}>
                          Overall AI Match Score
                        </Typography>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                            85%
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            2 Discrepancies Found
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>

                    <Divider sx={{ my: 2 }} />

                    {/* Domain Relevancy Summary */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Build sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Domain Relevancy
                          </Typography>
                        </Box>
                        <Chip label="Partial Match" color="warning" size="small" />
                      </Box>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Stack spacing={1.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'success.main' }} />
                              <Typography variant="body2">Curriculum Design</Typography>
                            </Box>
                            <Chip label="Aligned (95%)" size="small" color="success" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'success.main' }} />
                              <Typography variant="body2">Adult Learning Principles</Typography>
                            </Box>
                            <Chip label="Aligned (90%)" size="small" color="success" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <Warning sx={{ fontSize: 18, mr: 1, color: 'warning.main' }} />
                              <Typography variant="body2">Digital Literacy</Typography>
                            </Box>
                            <Chip label="Partial (60%)" size="small" color="warning" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <Cancel sx={{ fontSize: 18, mr: 1, color: 'error.main' }} />
                              <Typography variant="body2">Coaching and Mentoring</Typography>
                            </Box>
                            <Chip label="Mismatch (30%)" size="small" color="error" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                        </Stack>
                        <Alert severity="warning" sx={{ mt: 2 }}>
                          <Typography variant="caption" fontWeight={600}>
                            Critical Gap: No explicit evidence of coaching/mentoring methodologies found.
                          </Typography>
                        </Alert>
                      </Paper>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Technical Skills Summary */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Code sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Technical Skills
                          </Typography>
                        </Box>
                        <Chip label="Mixed Proficiency" color="info" size="small" />
                      </Box>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Stack spacing={1.5}>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight={500}>Learning Management Systems (LMS)</Typography>
                              <Chip label="Partial" size="small" color="warning" variant="outlined" sx={{ height: 20 }} />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Proficiency: Intermediate (inferred) | Confidence: 50%
                            </Typography>
                          </Box>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight={500}>Instructional Design Tools</Typography>
                              <Chip label="Unknown" size="small" color="default" variant="outlined" sx={{ height: 20 }} />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Proficiency: Unknown | Confidence: 20%
                            </Typography>
                          </Box>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight={500}>Data Analytics for Education</Typography>
                              <Chip label="Partial" size="small" color="warning" variant="outlined" sx={{ height: 20 }} />
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              Proficiency: Basic (inferred) | Confidence: 40%
                            </Typography>
                          </Box>
                        </Stack>
                        <Alert severity="info" sx={{ mt: 2 }}>
                          <Typography variant="caption" fontWeight={600}>
                            Note: Most technical skills are inferred. Interview verification recommended.
                          </Typography>
                        </Alert>
                      </Paper>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Certification Relevancy Summary */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <School sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            Certification Relevancy
                          </Typography>
                        </Box>
                        <Chip label="Incomplete" color="error" size="small" />
                      </Box>
                      <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                        <Stack spacing={1.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <CheckCircle sx={{ fontSize: 18, mr: 1, color: 'success.main' }} />
                              <Box>
                                <Typography variant="body2" fontWeight={500}>Teaching Credential</Typography>
                                <Typography variant="caption" color="text.secondary">
                                  Issuing Body: State Education Board
                                </Typography>
                              </Box>
                            </Box>
                            <Chip label="Valid" size="small" color="success" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <Cancel sx={{ fontSize: 18, mr: 1, color: 'error.main' }} />
                              <Typography variant="body2" fontWeight={500}>Instructional Design Certificate</Typography>
                            </Box>
                            <Chip label="Not Found" size="small" color="error" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                              <Cancel sx={{ fontSize: 18, mr: 1, color: 'error.main' }} />
                              <Typography variant="body2" fontWeight={500}>Digital Pedagogy Certification</Typography>
                            </Box>
                            <Chip label="Not Found" size="small" color="error" variant="outlined" sx={{ height: 22 }} />
                          </Box>
                        </Stack>
                        <Alert severity="error" sx={{ mt: 2 }}>
                          <Typography variant="caption" fontWeight={600}>
                            Missing: 2 of 3 required certifications not found. Verify equivalent certifications.
                          </Typography>
                        </Alert>
                      </Paper>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* AI Recommendation */}
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1.5 }}>
                        AI Recommendation
                      </Typography>
                      <Alert severity="success" icon={<AutoAwesome />}>
                        <Typography variant="body2" fontWeight={600} gutterBottom>
                          Strong Candidate with Minor Gaps
                        </Typography>
                        <Typography variant="body2">
                          The candidate demonstrates strong technical background in curriculum design and adult learning. 
                          Minor gaps in coaching methodologies and digital tool proficiency can be addressed through 
                          interview verification and onboarding training.
                        </Typography>
                      </Alert>
                    </Box>

                    {/* Link to Detailed Screening */}
                    <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        fullWidth
                        onClick={() => navigate(`/process/candidate-screening/${candidateId}`)}
                      >
                        View Detailed Screening Report
                      </Button>
                    </Box>
                  </MainCard>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </MainCard>
        </Grid>

        {/* Compact Approval Stages */}
        <Grid item xs={12} md={6}>
          <MainCard title={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Approval Process</Typography>
              <Chip 
                label={`${completedStagesCount}/${totalStages}`}
                size="small"
                color={completedStagesCount === totalStages ? "success" : "default"}
                sx={{ fontWeight: 600 }}
              />
            </Box>
          }>
            {/* Compact Progress Bar */}
            <LinearProgress 
              variant="determinate" 
              value={progressPercentage} 
              sx={{ 
                height: 8, 
                borderRadius: 1,
                mb: 2,
                bgcolor: 'background.default',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                  bgcolor: completedStagesCount === totalStages ? 'success.main' : 'primary.main'
                }
              }}
            />

            {/* Compact Stages */}
            <Stack spacing={1.5}>
              {/* Stage 1 - Compact */}
              <Box 
                sx={{ 
                  p: 1.5, 
                  bgcolor: approvalStages.letterSent.completed ? 'success.lighter' : 'background.default',
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: approvalStages.letterSent.completed ? 'success.main' : 'divider',
                  transition: 'all 0.2s'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Badge
                    badgeContent={approvalStages.letterSent.completed ? <Check sx={{ fontSize: 10 }} /> : "1"}
                    color={approvalStages.letterSent.completed ? "success" : "default"}
                    sx={{ '& .MuiBadge-badge': { width: 24, height: 24, fontSize: '0.75rem' } }}
                  >
                    <Box sx={{ width: 24, height: 24 }} />
                  </Badge>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Send Letter of Approval
                    </Typography>
                    {approvalStages.letterSent.timestamp && (
                      <Typography variant="caption" color="success.main">
                        ✓ {formatTimestamp(approvalStages.letterSent.timestamp)}
                      </Typography>
                    )}
                  </Box>
                  <Button 
                    variant={approvalStages.letterSent.completed ? "outlined" : "contained"}
                    size="small"
                    color={approvalStages.letterSent.completed ? "success" : "primary"}
                    startIcon={<Email sx={{ fontSize: 16 }} />}
                    onClick={handleSendLetter}
                    disabled={approvalStages.letterSent.completed}
                    sx={{ minWidth: 100 }}
                  >
                    {approvalStages.letterSent.completed ? 'Sent' : 'Send'}
                  </Button>
                </Box>
              </Box>

              {/* Stage 2 - Compact */}
              <Box 
                sx={{ 
                  p: 1.5, 
                  bgcolor: approvalStages.acknowledgementReceived.completed ? 'success.lighter' : 'background.default',
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: approvalStages.acknowledgementReceived.completed ? 'success.main' : 'divider',
                  opacity: !approvalStages.letterSent.completed ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Badge
                    badgeContent={approvalStages.acknowledgementReceived.completed ? <Check sx={{ fontSize: 10 }} /> : "2"}
                    color={approvalStages.acknowledgementReceived.completed ? "success" : "default"}
                    sx={{ '& .MuiBadge-badge': { width: 24, height: 24, fontSize: '0.75rem' } }}
                  >
                    <Box sx={{ width: 24, height: 24 }} />
                  </Badge>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Acknowledgement Received
                    </Typography>
                    {approvalStages.acknowledgementReceived.timestamp && (
                      <Typography variant="caption" color="success.main">
                        ✓ {formatTimestamp(approvalStages.acknowledgementReceived.timestamp)}
                      </Typography>
                    )}
                  </Box>
                  <Button 
                    variant={approvalStages.acknowledgementReceived.completed ? "outlined" : "contained"}
                    size="small"
                    color={approvalStages.acknowledgementReceived.completed ? "success" : "primary"}
                    startIcon={<CheckCircleOutline sx={{ fontSize: 16 }} />}
                    onClick={handleAcknowledgementReceived}
                    disabled={!approvalStages.letterSent.completed || approvalStages.acknowledgementReceived.completed}
                    sx={{ minWidth: 100 }}
                  >
                    {approvalStages.acknowledgementReceived.completed ? 'Done' : 'Confirm'}
                  </Button>
                </Box>
              </Box>

              {/* Stage 3 - Compact */}
              <Box 
                sx={{ 
                  p: 1.5, 
                  bgcolor: approvalStages.documentUploaded.completed ? 'success.lighter' : 'background.default',
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: approvalStages.documentUploaded.completed ? 'success.main' : 'divider',
                  opacity: !approvalStages.acknowledgementReceived.completed ? 0.6 : 1,
                  transition: 'all 0.2s'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Badge
                    badgeContent={approvalStages.documentUploaded.completed ? <Check sx={{ fontSize: 10 }} /> : "3"}
                    color={approvalStages.documentUploaded.completed ? "success" : "default"}
                    sx={{ '& .MuiBadge-badge': { width: 24, height: 24, fontSize: '0.75rem' } }}
                  >
                    <Box sx={{ width: 24, height: 24 }} />
                  </Badge>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={600}>
                      Upload Acknowledgement Letter
                    </Typography>
                    {approvalStages.documentUploaded.timestamp && (
                      <Typography variant="caption" color="success.main">
                        ✓ {formatTimestamp(approvalStages.documentUploaded.timestamp)}
                      </Typography>
                    )}
                  </Box>
                  <Button 
                    variant={approvalStages.documentUploaded.completed ? "outlined" : "contained"}
                    size="small"
                    color={approvalStages.documentUploaded.completed ? "success" : "primary"}
                    startIcon={<Upload sx={{ fontSize: 16 }} />}
                    onClick={handleOpenUploadDialog}
                    disabled={!approvalStages.acknowledgementReceived.completed || approvalStages.documentUploaded.completed}
                    sx={{ minWidth: 100 }}
                  >
                    {approvalStages.documentUploaded.completed ? 'Done' : 'Upload'}
                  </Button>
                </Box>
                {approvalStages.documentUploaded.fileName && (
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 5, display: 'block' }}>
                    📄 {approvalStages.documentUploaded.fileName}
                  </Typography>
                )}
              </Box>
            </Stack>

            {/* Compact Final Decision */}
            {isApprovalEnabled && (
              <Alert severity="success" sx={{ mt: 2, py: 1 }} icon={<CheckCircle />}>
                All stages complete! Ready to approve.
              </Alert>
            )}

            <Divider sx={{ my: 2 }} />

            {!isApprovalEnabled && (
              <Alert severity="warning" sx={{ mb: 2, py: 1 }}>
                Complete all stages to enable approval.
              </Alert>
            )}

            <Stack direction="row" spacing={1.5}>
              <Button
                variant="contained"
                color="success"
                size="medium"
                startIcon={<CheckCircle />}
                fullWidth
                disabled={!isApprovalEnabled}
                onClick={handleApprove}
                sx={{
                  py: 1.25,
                  fontWeight: 600,
                  '&:not(:disabled):hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: 3
                  },
                  transition: 'all 0.2s'
                }}
              >
                Approve
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="medium"
                startIcon={<Cancel />}
                fullWidth
                onClick={handleReject}
                sx={{
                  py: 1.25,
                  fontWeight: 600,
                  '&:hover': {
                    transform: 'translateY(-1px)'
                  },
                  transition: 'all 0.2s'
                }}
              >
                Reject
              </Button>
            </Stack>
          </MainCard>
        </Grid>
      </Grid>

    {/* Upload Dialog with Drag & Drop */}
    <Dialog open={uploadDialogOpen} onClose={handleCloseUploadDialog} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CloudUpload color="primary" />
          <Typography variant="h6" component="span">
            Upload Acknowledgement Letter
          </Typography>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleCloseUploadDialog}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 3 }}>
          Please upload the acknowledgement letter from the Training Institution as a PDF file (max 10MB).
        </Alert>
        
        {/* Drag and Drop Area */}
        <Box 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{ 
            mt: 2, 
            p: 4, 
            border: '2px dashed', 
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 2, 
            textAlign: 'center',
            bgcolor: isDragging ? 'action.hover' : 'background.default',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover'
            }
          }}
        >
          <input
            accept="application/pdf"
            style={{ display: 'none' }}
            id="pdf-upload-input"
            type="file"
            onChange={handleFileSelect}
          />
          
          {!selectedFile ? (
            <>
              <CloudUpload 
                sx={{ 
                  fontSize: 64, 
                  color: isDragging ? 'primary.main' : 'action.disabled',
                  mb: 2 
                }} 
              />
              <Typography variant="h6" gutterBottom>
                {isDragging ? 'Drop file here' : 'Drag & drop your PDF here'}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                or
              </Typography>
              <label htmlFor="pdf-upload-input">
                <Button 
                  variant="contained" 
                  component="span" 
                  startIcon={<Upload />}
                  size="large"
                >
                  Browse Files
                </Button>
              </label>
              <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                Supported format: PDF (max 10MB)
              </Typography>
            </>
          ) : (
            <Grow in timeout={300}>
              <Box>
                <InsertDriveFile 
                  sx={{ 
                    fontSize: 64, 
                    color: 'success.main',
                    mb: 2 
                  }} 
                />
                <Typography variant="h6" gutterBottom>
                  File Selected
                </Typography>
                <Chip 
                  label={selectedFile.name} 
                  onDelete={() => setSelectedFile(null)} 
                  color="primary"
                  sx={{ 
                    mt: 1,
                    maxWidth: '100%',
                    '& .MuiChip-label': {
                      display: 'block',
                      maxWidth: 300,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }
                  }}
                />
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </Typography>
                <label htmlFor="pdf-upload-input">
                  <Button 
                    variant="outlined" 
                    component="span" 
                    size="small"
                    sx={{ mt: 2 }}
                  >
                    Choose Different File
                  </Button>
                </label>
              </Box>
            </Grow>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCloseUploadDialog} size="large">
          Cancel
        </Button>
        <Button 
          onClick={handleUploadDocument} 
          variant="contained" 
          disabled={!selectedFile}
          startIcon={<Upload />}
          size="large"
        >
          Upload Document
        </Button>
      </DialogActions>
    </Dialog>

    {/* Confirmation Dialog */}
    <Dialog 
      open={confirmDialog.open} 
      onClose={handleCancelConfirm}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {confirmDialog.type === 'approve' ? (
            <CheckCircle color="success" />
          ) : (
            <Cancel color="error" />
          )}
          <Typography variant="h6" component="span">
            {confirmDialog.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to {confirmDialog.type === 'approve' ? 'approve' : 'reject'} this application for <strong>{candidateInfo.name}</strong>?
        </Typography>
        {confirmDialog.type === 'approve' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            This will finalize the approval process and notify the Training Institution.
          </Alert>
        )}
        {confirmDialog.type === 'reject' && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            This action will reject the application and notify the Training .
          </Alert>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleCancelConfirm} size="large">
          Cancel
        </Button>
        <Button 
          onClick={handleConfirmAction}
          variant="contained"
          color={confirmDialog.type === 'approve' ? 'success' : 'error'}
          size="large"
          startIcon={confirmDialog.type === 'approve' ? <CheckCircle /> : <Cancel />}
        >
          {confirmDialog.type === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
        </Button>
      </DialogActions>
    </Dialog>

    {/* Snackbar for notifications */}
    <Snackbar 
      open={snackbar.open} 
      autoHideDuration={4000} 
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert 
        onClose={handleCloseSnackbar} 
        severity={snackbar.severity} 
        variant="filled"
        sx={{ width: '100%' }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
    </>
  );
}

