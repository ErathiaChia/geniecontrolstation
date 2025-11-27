// react
import { useState, useEffect, useRef } from 'react';

// material-ui
import {
  Box,
  Paper,
  Chip,
  Button,
  Typography,
  Grid,
  Stack,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  IconButton,
  Drawer,
  Fab,
  Badge as MuiBadge,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  Link,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Popper,
  MenuItem,
  MenuList,
  CircularProgress
} from '@mui/material';
import {
  Person as PersonIcon,
  ArrowBack,
  ArrowForward,
  CheckCircle,
  Cancel,
  Warning,
  Edit,
  AutoAwesome,
  Close,
  Email,
  Phone,
  LocationOn,
  Article,
  Image as ImageIcon,
  Link as LinkIcon,
  AttachFile,
  ExpandMore,
  VerifiedUser,
  Gavel,
  Newspaper,
  Notes,
  Send,
  ArrowDropDown
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';
import { useNewsFactCheck } from 'hooks/queries/useNewsFactCheck';

// Sample data - filtered for Unverified status
const unverifiedNewsLeads = [
  {
    id: 0,
    title: 'IRS Announces New Direct Deposit Relief Payments - $1,200 Stimulus Checks Coming This Week',
    submissionDate: '2025-11-26',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Blog News',
    assignedTo: 'John Doe',
    submitter: {
      fullName: 'James Anderson',
      ic: 'S9876543B',
      address: '456 Orchard Road, #15-32, Singapore 238877',
      phone: '+65 9876 5432',
      email: 'james.anderson@email.com'
    },
    storyDetails: {
      title: 'IRS Announces New Direct Deposit Relief Payments - $1,200 Stimulus Checks Coming This Week',
      description:
        'The Internal Revenue Service (IRS) has reportedly announced a new round of direct deposit relief payments, with eligible Americans set to receive $1,200 stimulus checks starting this week. According to viral social media posts, the payments are part of a new economic relief program approved by Congress. The posts claim that individuals who filed taxes in 2024 and have direct deposit information on file with the IRS will automatically receive the payment. However, official IRS sources have not confirmed this announcement, and the claims appear to be circulating primarily through unofficial websites and social media platforms.',
      category: 'Finance',
      urgency: 'High',
      estimatedImpact: 'Major'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'confresa-irs-article-screenshot.jpg',
        url: 'https://picsum.photos/800/600?random=1',
        description: 'Screenshot of confresa.org article claiming IRS announced $1,390 direct deposit payment'
      },
      {
        id: 2,
        type: 'image',
        name: 'thurj-irs-payment-screenshot.jpg',
        url: 'https://picsum.photos/800/600?random=2',
        description: 'Screenshot from thurj.org article about IRS $1,390 direct deposit relief payment'
      },
      {
        id: 3,
        type: 'image',
        name: 'nctpc-eligibility-screenshot.jpg',
        url: 'https://picsum.photos/800/600?random=3',
        description: 'Screenshot from nctpc.org article showing alleged IRS eligibility information'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://www.confresa.org/irs-announces-1390-direct-deposit/',
        description: 'Confresa.org article: "IRS Announces $1,390 Direct Deposit Relief Payment for November 2025"',
        verified: false
      },
      {
        id: 2,
        url: 'https://www.thurj.org/irs-to-release-1390-direct-deposit-relief/',
        description: 'Thurj.org article: "IRS to Release $1,390 Direct Deposit Relief Payment in November 2025"',
        verified: false
      },
      {
        id: 3,
        url: 'https://www.nctpc.org/irs-1390-relief-deposit-november-2025/',
        description: 'NCTPC.org article: "IRS Announces $1,390 Direct Deposit Relief Payment For November 2025, Check Eligibility"',
        verified: false
      },
      {
        id: 4,
        url: 'https://startupnews.fyi/2025/11/12/irs-direct-deposit-relief-payments-2025-what-to-know-about-the-latest-stimulus-rumors/',
        description: 'StartupNews.fyi article discussing the circulating IRS relief payment rumors',
        verified: false
      }
    ],
    editorialNotes: []
  },
  {
    id: 1,
    title: 'Breaking news: Singapore birthrate in 2024 exceeds 2.0',
    submissionDate: '2024-11-25',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Social Media',
    assignedTo: 'John Doe',
    // Detailed information
    submitter: {
      fullName: 'Sarah Johnson',
      ic: 'S1234567A',
      address: '123 Main Street, #05-67, Singapore 123456',
      phone: '+65 9123 4567',
      email: 'sarah.johnson@email.com'
    },
    storyDetails: {
      title: 'Breaking news: Singapore birthrate in 2024 exceeds 2.0',
      description:
        "In a surprising demographic shift, Singapore's total fertility rate for 2024 has reportedly surged past 2.0 - a milestone not seen in decades. Early figures suggest a sharp rise in births across multiple age groups, with analysts attributing the trend to enhanced family-support policies and improved economic confidence. Officials say the unexpected spike could reshape long-term population planning, though full verification of the data is still pending.",
      category: 'Demographics',
      urgency: 'High',
      estimatedImpact: 'Major'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'birthrate-statistics.jpg',
        url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
        description: 'Demographic statistics chart'
      },
      {
        id: 2,
        type: 'image',
        name: 'family-policy-announcement.jpg',
        url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        description: 'Government family support policy announcement'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://x.com/user123/status/123456',
        description: 'X (Twitter) post about birthrate statistics',
        verified: false
      },
      {
        id: 2,
        url: 'https://www.facebook.com/user456/posts/789012',
        description: 'Facebook post discussing birthrate trends',
        verified: false
      },
      {
        id: 3,
        url: 'https://www.tiktok.com/@user789/video/345678',
        description: 'TikTok video about Singapore birthrate',
        verified: false
      }
    ],
    editorialNotes: []
  },
  {
    id: 5,
    title: 'Weather Alert: Storm Warning Issued',
    submissionDate: '2024-11-25',
    currentStatus: 'Unverified',
    statusColor: 'error',
    sources: 'Other Media Outlet',
    assignedTo: 'John Doe',
    submitter: {
      fullName: 'Michael Chen',
      ic: 'S7654321B',
      address: '456 East Coast Road, #12-34, Singapore 654321',
      phone: '+65 8765 4321',
      email: 'michael.chen@email.com'
    },
    storyDetails: {
      title: 'Weather Alert: Storm Warning Issued',
      description:
        'Meteorological authorities have issued a severe storm warning for the coastal regions. Heavy rainfall and strong winds are expected over the next 48 hours. Residents are advised to take necessary precautions and stay indoors during the storm.',
      category: 'Weather',
      urgency: 'Critical',
      estimatedImpact: 'High'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'weather-map.jpg',
        url: 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800',
        description: 'Weather radar map'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://weather.gov.sg/alert/123',
        description: 'Official weather alert',
        verified: true
      }
    ],
    editorialNotes: []
  }
];

// News Verification Steps
const verificationSteps = [
  {
    label: 'Unverified',
    icon: <Article style={{ fontSize: '20px' }} />
  },
  {
    label: 'Approval',
    icon: <Gavel style={{ fontSize: '20px' }} />
  },
  {
    label: 'Schedule',
    icon: <VerifiedUser style={{ fontSize: '20px' }} />
  },
  {
    label: 'Published',
    icon: <Newspaper style={{ fontSize: '20px' }} />
  }
];

// AI Newsworthy Checks Data
const aiNewsworthyChecks = {
  credibility: {
    status: 'warning',
    items: [
      { label: 'Source verification', status: 'verified', message: 'Primary sources identified and verified' },
      { label: 'Author credibility', status: 'warning', message: 'Limited history with news submissions' },
      { label: 'Cross-reference check', status: 'verified', message: 'Story corroborated by 2 independent sources' }
    ]
  },
  accuracy: {
    status: 'success',
    issues: [],
    verified: [
      { text: 'Facts cross-checked with official announcements' },
      { text: 'Timeline of events is consistent' },
      { text: 'No contradictory information found' }
    ]
  },
  relevance: {
    status: 'success',
    score: 8.5,
    factors: [
      { label: 'Timeliness', value: 9, description: 'Breaking news, highly time-sensitive' },
      { label: 'Public Interest', value: 8, description: 'High public interest and potential impact' },
      { label: 'Local Relevance', value: 8.5, description: 'Directly relevant to local audience' }
    ]
  },
  integrity: {
    status: 'warning',
    flags: [
      {
        type: 'warning',
        text: 'One attached image has low resolution and may need replacement'
      },
      {
        type: 'info',
        text: 'All links are accessible and active'
      }
    ]
  }
};

// ==============================|| NEWS LEAD DETAIL VIEW COMPONENT ||============================== //

function NewsLeadDetailView({ newsLead, newsId, navigate }) {
  const [selectedSection, setSelectedSection] = useState(0);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeStep] = useState(0); // Current step in verification process
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [editorialNote, setEditorialNote] = useState('');
  const [splitButtonOpen, setSplitButtonOpen] = useState(false);
  const anchorRef = useRef(null);
  const [requestInfoModalOpen, setRequestInfoModalOpen] = useState(false);
  const [requestInfoMessage, setRequestInfoMessage] = useState('');

  const {
    data: factCheckData,
    isLoading: isLoadingFactCheck,
    isError: isErrorFactCheck,
    error: factCheckError,
    refetch: refetchFactCheck,
    isFetching: isFetchingFactCheck
  } = useNewsFactCheck(newsLead.storyDetails?.title, newsLead.storyDetails?.description);

  useEffect(() => {
    console.log('Fact check query status:', {
      isLoading: isLoadingFactCheck,
      isFetching: isFetchingFactCheck,
      isError: isErrorFactCheck,
      hasData: !!factCheckData,
      error: factCheckError,
      title: newsLead.storyDetails?.title,
      description: newsLead.storyDetails?.description
    });
  }, [
    isLoadingFactCheck,
    isFetchingFactCheck,
    isErrorFactCheck,
    factCheckData,
    factCheckError,
    newsLead.storyDetails?.title,
    newsLead.storyDetails?.description
  ]);

  // Editable story details state
  const [editedStoryDetails, setEditedStoryDetails] = useState({
    title: newsLead.storyDetails.title,
    description: newsLead.storyDetails.description,
    category: newsLead.storyDetails.category,
    urgency: newsLead.storyDetails.urgency,
    estimatedImpact: newsLead.storyDetails.estimatedImpact
  });

  // Sync editedStoryDetails when newsLead changes (only when not editing)
  useEffect(() => {
    if (!isEditing) {
      setEditedStoryDetails({
        title: newsLead.storyDetails.title,
        description: newsLead.storyDetails.description,
        category: newsLead.storyDetails.category,
        urgency: newsLead.storyDetails.urgency,
        estimatedImpact: newsLead.storyDetails.estimatedImpact
      });
    }
  }, [newsLead, isEditing]);

  const sections = [
    { id: 0, name: 'Personal Details', icon: <PersonIcon /> },
    { id: 1, name: 'Story Details', icon: <Article /> },
    { id: 2, name: 'Attachments', icon: <AttachFile /> },
    { id: 3, name: 'Links & Proof', icon: <LinkIcon /> },
    { id: 4, name: 'Editorial Notes', icon: <Notes /> }
  ];

  const handleBack = () => {
    navigate('/media/news-verification');
  };

  // Generate AI-suggested editorial note
  const generateAISuggestedNote = () => {
    const credibilityLevel = aiNewsworthyChecks.credibility.status === 'success' ? 'High' : 'Moderate';
    const accuracyStatus = aiNewsworthyChecks.accuracy.status === 'success' ? 'Passed' : 'Needs review';
    const accuracyScore = aiNewsworthyChecks.accuracy.status === 'success' ? '92/100' : '75/100';

    return `Junior Editorial Review - ${new Date().toLocaleDateString()}

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: ${newsLead.sources}
Source Credibility: ${credibilityLevel}
Source Type: ${newsLead.sources === 'Social Media' ? 'Social media post' : newsLead.sources === 'Reporter' ? 'Direct reporter submission' : newsLead.sources === 'Blog News' ? 'News blog' : 'Media outlet'}
Source Verification: Confirmed authentic
Cross-Reference Status: Verified with ${newsLead.links?.length || 0} independent source${newsLead.links?.length > 1 ? 's' : ''}
Source Contact: ${credibilityLevel === 'High' ? 'Verified and documented' : 'Pending verification'}

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: ${accuracyScore} (${accuracyStatus})
Key Facts Verified: ${aiNewsworthyChecks.accuracy.status === 'success' ? '5/5' : '3/5'}
Claims Substantiated: ${aiNewsworthyChecks.accuracy.status === 'success' ? 'All major claims verified' : 'Most claims verified, some pending'}
Quotes Verification: ${aiNewsworthyChecks.accuracy.status === 'success' ? 'All quotes attributed and verified' : 'Quotes pending verification'}
Contradictions Found: None
Independent Verification: Cross-checked with ${newsLead.links?.length || 0} source${newsLead.links?.length > 1 ? 's' : ''}

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: ${aiNewsworthyChecks.relevance.score}/10
Timeliness: ${aiNewsworthyChecks.relevance.factors[0].value}/10 (${aiNewsworthyChecks.relevance.factors[0].label})
Public Interest: ${aiNewsworthyChecks.relevance.factors[1].value}/10 (${aiNewsworthyChecks.relevance.factors[1].label})
Impact Assessment: ${aiNewsworthyChecks.relevance.score >= 8 ? 'High' : aiNewsworthyChecks.relevance.score >= 6 ? 'Moderate' : 'Low'}
Audience Reach: ${aiNewsworthyChecks.relevance.score >= 8 ? 'Broad' : 'Moderate'}
Uniqueness: ${aiNewsworthyChecks.relevance.factors[0].value >= 8 ? 'High' : 'Moderate'}
Local Relevance: ${aiNewsworthyChecks.relevance.factors[1].value >= 8 ? 'Very High' : 'High'}

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: ${newsLead.attachments?.length || 0}
Images Verified: ${newsLead.attachments?.filter((a) => a.type === 'image').length || 0}/${newsLead.attachments?.filter((a) => a.type === 'image').length || 0} (All authentic, properly sourced)
Videos Verified: ${newsLead.attachments?.filter((a) => a.type === 'video').length || 0 > 0 ? `${newsLead.attachments?.filter((a) => a.type === 'video').length}/` + newsLead.attachments?.filter((a) => a.type === 'video').length : 'N/A'}
Documents Verified: ${newsLead.attachments?.filter((a) => a.type === 'document').length || 0 > 0 ? `${newsLead.attachments?.filter((a) => a.type === 'document').length}/` + newsLead.attachments?.filter((a) => a.type === 'document').length : 'N/A'}
Links Provided: ${newsLead.links?.length || 0}
Links Verified: ${newsLead.links?.filter((l) => l.verified).length || 0}/${newsLead.links?.length || 0} (${newsLead.links?.filter((l) => l.verified).length === newsLead.links?.length ? 'All functional and relevant' : 'Some pending verification'})
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: ${aiNewsworthyChecks.relevance.score >= 8 ? 'High' : aiNewsworthyChecks.relevance.score >= 6 ? 'Medium' : 'Low'}
Suggested Category: ${newsLead.storyDetails.category}
Confidence Level: ${aiNewsworthyChecks.credibility.status === 'success' && aiNewsworthyChecks.accuracy.status === 'success' ? 'Very High' : 'High'}
Notes: ${aiNewsworthyChecks.accuracy.status === 'success' ? 'Excellent story with strong verification. All sources credible and facts confirmed.' : 'Good story with most facts verified. Some additional verification recommended.'} Ready for ${aiNewsworthyChecks.relevance.score >= 8 ? 'immediate' : ''} Senior Editorial review.`;
  };

  const handleProceed = () => {
    // Open modal for Junior Editorial to add notes
    const noteContent = factCheckData?.report ?? generateAISuggestedNote();
    setEditorialNote(noteContent);
    setNotesModalOpen(true);
  };

  const handleConfirmProceed = () => {
    console.log('Proceeding to Approval stage with notes:', editorialNote);
    setNotesModalOpen(false);
    // Navigate to Approval stage
    navigate(`/media/news-verification/approval/${newsId}`);
  };

  const handleRejectNewsLead = () => {
    console.log('Rejecting news lead:', newsId);
    // Add rejection logic here
    // For now, navigate back to main page
    navigate('/media/news-verification');
  };

  const handleToggleSplitButton = () => {
    setSplitButtonOpen((prevOpen) => !prevOpen);
  };

  const handleCloseSplitButton = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setSplitButtonOpen(false);
  };

  const generateAIRequestMessage = () => {
    // AI-generated message based on missing or unclear information
    const missingItems = [];

    // Check for missing or incomplete information
    if (!newsLead.attachments || newsLead.attachments.length === 0) {
      missingItems.push('supporting documents or images');
    }
    if (!newsLead.links || newsLead.links.length === 0) {
      missingItems.push('reference links or sources');
    }
    if (aiNewsworthyChecks.credibility.status === 'warning') {
      missingItems.push('additional credibility verification (official sources, documents, or contacts)');
    }
    if (aiNewsworthyChecks.integrity.status === 'warning') {
      missingItems.push('clarification on factual accuracy and timeline');
    }

    const greeting = `Dear ${newsLead.submitter?.fullName || 'Submitter'},\n\n`;
    const intro = `Thank you for submitting your news lead "${newsLead.storyDetails?.title || 'your news lead'}" to our editorial team.\n\n`;

    let body = '';
    if (missingItems.length > 0) {
      body = `After reviewing your submission, we would like to request additional information to help us verify and process your news lead:\n\n`;
      missingItems.forEach((item, index) => {
        body += `${index + 1}. ${item.charAt(0).toUpperCase() + item.slice(1)}\n`;
      });
      body += `\n`;
    } else {
      body = `After reviewing your submission, we would like to request some additional information to help us verify and process your news lead more effectively.\n\n`;
    }

    const closing = `Please provide the requested information at your earliest convenience. You can reply to this email or contact us directly.\n\nThank you for your cooperation.\n\nBest regards,\nEditorial Team`;

    return greeting + intro + body + closing;
  };

  const handleOpenRequestInfo = () => {
    const aiMessage = generateAIRequestMessage();
    setRequestInfoMessage(aiMessage);
    setRequestInfoModalOpen(true);
  };

  const handleSendRequestInfo = () => {
    // Logic to send email request
    console.log('Sending request for more information:', requestInfoMessage);
    // In production, this would call an API to send the email
    setRequestInfoModalOpen(false);
    // Could show a success notification here
  };

  const getCheckStatusIcon = (status) => {
    switch (status) {
      case 'error':
        return <Cancel sx={{ fontSize: '20px', color: 'error.main', mr: 1 }} />;
      case 'warning':
        return <Warning sx={{ fontSize: '20px', color: 'warning.main', mr: 1 }} />;
      case 'success':
      case 'verified':
      case 'ok':
        return <CheckCircle sx={{ fontSize: '20px', color: 'success.main', mr: 1 }} />;
      default:
        return null;
    }
  };

  const getOverallStatus = (items) => {
    if (!items || items.length === 0) return 'success';
    const hasError = items.some((item) => item.status === 'error');
    const hasWarning = items.some((item) => item.status === 'warning');
    if (hasError) return 'error';
    if (hasWarning) return 'warning';
    return 'success';
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 0: // Personal Details
        return (
          <Box>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Full Name (as in IC)
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {newsLead.submitter.fullName}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  IC Number
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {newsLead.submitter.ic}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <LocationOn fontSize="small" />
                    Address
                  </Box>
                </Typography>
                <Typography variant="body1">{newsLead.submitter.address}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Phone fontSize="small" />
                    Phone Number
                  </Box>
                </Typography>
                <Typography variant="body1">{newsLead.submitter.phone}</Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Email fontSize="small" />
                    Email Address
                  </Box>
                </Typography>
                <Typography variant="body1">{newsLead.submitter.email}</Typography>
              </Box>
            </Stack>
          </Box>
        );

      case 1: // Story Details
        return (
          <Box>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Title
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editedStoryDetails.title}
                    onChange={(e) => setEditedStoryDetails({ ...editedStoryDetails, title: e.target.value })}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="h6" fontWeight={500}>
                    {editedStoryDetails.title}
                  </Typography>
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Description
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={editedStoryDetails.description}
                    onChange={(e) => setEditedStoryDetails({ ...editedStoryDetails, description: e.target.value })}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {editedStoryDetails.description}
                  </Typography>
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Category
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    value={editedStoryDetails.category}
                    onChange={(e) => setEditedStoryDetails({ ...editedStoryDetails, category: e.target.value })}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Chip label={editedStoryDetails.category} color="primary" size="small" sx={{ mt: 0.5 }} />
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Urgency Level
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    select
                    value={editedStoryDetails.urgency}
                    onChange={(e) => setEditedStoryDetails({ ...editedStoryDetails, urgency: e.target.value })}
                    variant="outlined"
                    size="small"
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </TextField>
                ) : (
                  <Chip
                    label={editedStoryDetails.urgency}
                    color={editedStoryDetails.urgency === 'Critical' ? 'error' : 'warning'}
                    size="small"
                    sx={{ mt: 0.5 }}
                  />
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Estimated Impact
                </Typography>
                {isEditing ? (
                  <TextField
                    fullWidth
                    select
                    value={editedStoryDetails.estimatedImpact}
                    onChange={(e) => setEditedStoryDetails({ ...editedStoryDetails, estimatedImpact: e.target.value })}
                    variant="outlined"
                    size="small"
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                    <option value="Major">Major</option>
                  </TextField>
                ) : (
                  <Typography variant="body1">{editedStoryDetails.estimatedImpact}</Typography>
                )}
              </Box>
            </Stack>
          </Box>
        );

      case 2: // Attachments
        return (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              Photos & Resources ({newsLead.attachments?.length || 0})
            </Typography>
            <Grid container spacing={2}>
              {newsLead.attachments?.map((attachment) => (
                <Grid item xs={12} sm={6} key={attachment.id}>
                  <Paper
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      '&:hover': {
                        boxShadow: 3,
                        borderColor: 'primary.main'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    {attachment.type === 'image' && (
                      <Box
                        component="img"
                        src={attachment.url}
                        alt={attachment.name}
                        sx={{
                          width: '100%',
                          height: 200,
                          objectFit: 'cover',
                          borderRadius: 1,
                          mb: 1
                        }}
                      />
                    )}
                    <Stack spacing={1}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ImageIcon fontSize="small" color="primary" />
                        <Typography variant="body2" fontWeight={500}>
                          {attachment.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {attachment.description}
                      </Typography>
                      <Button size="small" variant="outlined" fullWidth>
                        View Full Size
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {(!newsLead.attachments || newsLead.attachments.length === 0) && (
              <Alert severity="info">No attachments provided for this news lead.</Alert>
            )}
          </Box>
        );

      case 3: // Links & Proof
        return (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              Reference Links ({newsLead.links?.length || 0})
            </Typography>
            <Stack spacing={2}>
              {newsLead.links?.map((link) => (
                <Paper
                  key={link.id}
                  sx={{
                    p: 2,
                    border: 1,
                    borderColor: link.verified ? 'success.main' : 'divider',
                    bgcolor: link.verified ? 'success.lighter' : 'background.paper'
                  }}
                >
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinkIcon fontSize="small" color={link.verified ? 'success' : 'action'} />
                        <Typography variant="body2" fontWeight={500}>
                          {link.description}
                        </Typography>
                      </Box>
                      {link.verified && (
                        <Chip label="Verified" size="small" color="success" icon={<CheckCircle style={{ fontSize: '16px' }} />} />
                      )}
                    </Box>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: '0.875rem',
                        wordBreak: 'break-all',
                        color: 'primary.main'
                      }}
                    >
                      {link.url}
                    </Link>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button size="small" variant="outlined">
                        Open Link
                      </Button>
                      <Button size="small" variant="outlined" color={link.verified ? 'success' : 'warning'}>
                        {link.verified ? 'Verified' : 'Verify Link'}
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              ))}
            </Stack>
            {(!newsLead.links || newsLead.links.length === 0) && (
              <Alert severity="info">No reference links provided for this news lead.</Alert>
            )}
          </Box>
        );

      case 4: // Editorial Notes
        return (
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
              Editorial Conversation Thread
            </Typography>

            {newsLead.editorialNotes && newsLead.editorialNotes.length > 0 ? (
              <Stack spacing={2}>
                {newsLead.editorialNotes.map((note, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      bgcolor: note.role === 'Junior Editorial' ? 'primary.lighter' : 'warning.lighter'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: note.role === 'Junior Editorial' ? 'primary.main' : 'warning.main',
                          fontSize: '0.875rem'
                        }}
                      >
                        {note.role === 'Junior Editorial' ? 'JE' : 'SE'}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {note.role}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {note.timestamp}
                        </Typography>
                      </Box>
                      <Chip
                        label={note.action}
                        size="small"
                        color={note.action === 'Approved' ? 'success' : note.action === 'Rejected' ? 'error' : 'warning'}
                      />
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {note.content}
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Alert severity="info" icon={<Notes />}>
                No editorial notes yet. Notes will appear here when this news lead is reviewed and moved through the verification stages.
              </Alert>
            )}
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Header Section */}
      <Box sx={{ mt: 0, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: { xs: 2, sm: 3 },
            py: 2,
            bgcolor: 'background.paper',
            borderBottom: 1,
            borderColor: 'divider'
          }}
        >
          <Button startIcon={<ArrowBack />} onClick={handleBack}>
            Back to News Verification
          </Button>
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <Typography variant="h5">
              {newsLead.storyDetails?.title ||
                newsLead.title ||
                (newsId ? `News Lead #NL-2024-${newsId.toString().padStart(4, '0')}` : 'News Lead #NL-2024-0000')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Review and verify news submission
            </Typography>
          </Box>
          <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
            <Button color="primary" endIcon={<ArrowForward />} onClick={handleProceed}>
              Proceed
            </Button>
            <Button
              color="primary"
              size="small"
              aria-controls={splitButtonOpen ? 'split-button-menu' : undefined}
              aria-expanded={splitButtonOpen ? 'true' : undefined}
              aria-label="select action"
              aria-haspopup="menu"
              onClick={handleToggleSplitButton}
            >
              <ArrowDropDown />
            </Button>
          </ButtonGroup>
          <Popper
            sx={{
              zIndex: 1
            }}
            open={splitButtonOpen}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseSplitButton}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      <MenuItem
                        onClick={(event) => {
                          handleCloseSplitButton(event);
                          handleOpenRequestInfo();
                        }}
                        sx={{ color: 'warning.main' }}
                      >
                        <Email sx={{ mr: 1, fontSize: '20px' }} />
                        Request More Information
                      </MenuItem>
                      <MenuItem
                        onClick={(event) => {
                          handleCloseSplitButton(event);
                          handleRejectNewsLead();
                        }}
                        sx={{ color: 'error.main' }}
                      >
                        <Cancel sx={{ mr: 1, fontSize: '20px' }} />
                        Reject News Lead
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>

        {/* Stepper */}
        <Box sx={{ px: { xs: 2, sm: 3 }, py: 2, bgcolor: 'background.paper' }}>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{
              '& .MuiStepConnector-root': {
                top: 20
              }
            }}
          >
            {verificationSteps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: index === activeStep ? 'primary.main' : index < activeStep ? 'success.main' : 'grey.300',
                        color: index <= activeStep ? 'white' : 'grey.600',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {step.icon}
                    </Box>
                  )}
                  sx={{
                    '& .MuiStepLabel-label': {
                      marginTop: 1,
                      fontSize: '0.95rem',
                      fontWeight: 500
                    }
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Grid container spacing={2} sx={{ minHeight: '750px', alignItems: 'stretch', flexWrap: 'nowrap' }}>
        {/* Left Section: Navigation Menu (1/3) */}
        <Grid item xs={4} sx={{ maxWidth: '33.333%', flexBasis: '33.333%' }}>
          <MainCard title="Information Sections" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Stack spacing={1}>
              {sections.map((section) => (
                <Paper
                  key={section.id}
                  elevation={selectedSection === section.id ? 4 : 0}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: selectedSection === section.id ? 2 : 1,
                    borderColor: selectedSection === section.id ? 'primary.main' : 'divider',
                    bgcolor: selectedSection === section.id ? 'primary.lighter' : 'background.paper',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: selectedSection === section.id ? 'primary.lighter' : 'grey.50',
                      borderColor: 'primary.main'
                    }
                  }}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        fontSize: '20px',
                        color: selectedSection === section.id ? 'primary.main' : 'text.secondary',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight={selectedSection === section.id ? 600 : 400}>
                      {section.name}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </MainCard>
        </Grid>

        {/* Right Section: Content Display (2/3) */}
        <Grid item xs={8} sx={{ maxWidth: '66.667%', flexBasis: '66.667%' }}>
          <MainCard
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h5">{sections[selectedSection].name}</Typography>
                {selectedSection === 1 && (
                  <IconButton size="small" color={isEditing ? 'primary' : 'default'} onClick={() => setIsEditing(!isEditing)}>
                    <Edit />
                  </IconButton>
                )}
              </Box>
            }
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={{ flex: 1, overflow: 'auto' }}>{renderSectionContent()}</Box>
          </MainCard>
        </Grid>
      </Grid>

      {/* Floating Action Button - AI Insights */}
      <Tooltip title="AI Newsworthy Insights & Checks" placement="left">
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
              factCheckData
                ? getOverallStatus(factCheckData.factualAccuracy?.items) === 'error' ||
                  getOverallStatus(factCheckData.contentIntegrity?.items) === 'error' ||
                  getOverallStatus(factCheckData.factualAccuracy?.items) === 'warning' ||
                  getOverallStatus(factCheckData.contentIntegrity?.items) === 'warning'
                  ? '!'
                  : 0
                : 0
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
            <AutoAwesome
              sx={{
                fontSize: '28px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            />
            <Typography variant="h4">AI Newsworthy Insights</Typography>
          </Box>
          <IconButton onClick={() => setAiDrawerOpen(false)} size="small">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={isLoadingFactCheck ? <CircularProgress size={16} color="inherit" /> : <AutoAwesome />}
            onClick={() => refetchFactCheck()}
            disabled={isLoadingFactCheck}
            sx={{
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              fontSize: '0.8125rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
              color: 'white',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
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
        </Box>

        {isLoadingFactCheck ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
            <CircularProgress />
          </Box>
        ) : isErrorFactCheck ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="body2" fontWeight={600} gutterBottom>
              Error loading fact-check data
            </Typography>
            <Typography variant="caption">{factCheckError?.message || 'Failed to fetch AI insights'}</Typography>
          </Alert>
        ) : factCheckData ? (
          <Stack spacing={2}>
            {/* Factual Accuracy */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {getCheckStatusIcon(getOverallStatus(factCheckData.factualAccuracy?.items))}
                  <Typography variant="subtitle1" fontWeight="bold">
                    Factual Accuracy
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {factCheckData.factualAccuracy?.items && factCheckData.factualAccuracy.items.length > 0 ? (
                  <Stack spacing={1.5}>
                    {factCheckData.factualAccuracy.items.map((item, index) => {
                      const severity = item.status === 'ok' ? 'success' : item.status === 'warning' ? 'warning' : 'error';
                      return (
                        <Alert key={index} severity={severity} icon={getCheckStatusIcon(item.status)} sx={{ py: 0.5 }}>
                          <Typography variant="body2" fontWeight={500} gutterBottom>
                            {item.key}
                          </Typography>
                          <Typography variant="caption">{item.message}</Typography>
                        </Alert>
                      );
                    })}
                  </Stack>
                ) : (
                  <Alert severity="success" sx={{ py: 0.5 }}>
                    <Typography variant="body2">No accuracy issues detected.</Typography>
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Newsworthy Relevance Score */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {getCheckStatusIcon(
                    factCheckData.newsworthyRelevance?.overallScore >= 7
                      ? 'success'
                      : factCheckData.newsworthyRelevance?.overallScore >= 5
                        ? 'warning'
                        : 'error'
                  )}
                  <Typography variant="subtitle1" fontWeight="bold">
                    Newsworthy Relevance Score: {factCheckData.newsworthyRelevance?.overallScore ?? 0}/10
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {factCheckData.newsworthyRelevance?.items && factCheckData.newsworthyRelevance.items.length > 0 ? (
                  <Stack spacing={2}>
                    {factCheckData.newsworthyRelevance.items.map((item, index) => (
                      <Box key={index}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="body2" fontWeight={500}>
                            {item.key}
                          </Typography>
                          <Typography variant="body2" color="primary" fontWeight={600}>
                            {item.score}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {item.message}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                ) : (
                  <Alert severity="info" sx={{ py: 0.5 }}>
                    <Typography variant="body2">No relevance data available.</Typography>
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>

            {/* Content Integrity */}
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  {getCheckStatusIcon(getOverallStatus(factCheckData.contentIntegrity?.items))}
                  <Typography variant="subtitle1" fontWeight="bold">
                    Content Integrity
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {factCheckData.contentIntegrity?.items && factCheckData.contentIntegrity.items.length > 0 ? (
                  <Stack spacing={1.5}>
                    {factCheckData.contentIntegrity.items.map((item, index) => {
                      const severity = item.status === 'ok' ? 'success' : item.status === 'warning' ? 'warning' : 'error';
                      return (
                        <Alert key={index} severity={severity} icon={getCheckStatusIcon(item.status)} sx={{ py: 0.5 }}>
                          <Typography variant="body2" fontWeight={500} gutterBottom>
                            {item.key}
                          </Typography>
                          <Typography variant="caption">{item.message}</Typography>
                        </Alert>
                      );
                    })}
                  </Stack>
                ) : (
                  <Alert severity="success" sx={{ py: 0.5 }}>
                    <Typography variant="body2">No integrity issues detected.</Typography>
                  </Alert>
                )}
              </AccordionDetails>
            </Accordion>
          </Stack>
        ) : (
          <Alert severity="info">
            <Typography variant="body2">No fact-check data available. Please ensure title and description are provided.</Typography>
          </Alert>
        )}
      </Drawer>

      {/* Editorial Notes Modal */}
      <Dialog open={notesModalOpen} onClose={() => setNotesModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notes color="primary" />
            <Typography variant="h5">Add Junior Editorial Notes</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Document your findings and verification process before sending to Senior Editorial
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Alert severity="info" icon={<AutoAwesome />}>
              The notes below have been pre-filled by AI based on your verification checks. Please review and edit as needed.
            </Alert>
            <TextField
              fullWidth
              multiline
              rows={12}
              label="Editorial Notes"
              value={editorialNote}
              onChange={(e) => setEditorialNote(e.target.value)}
              variant="outlined"
              placeholder="Enter your editorial notes here..."
              helperText="These notes will be visible to the Senior Editorial team and will be part of the editorial conversation thread."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setNotesModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              const { data: refetchedData } = await refetchFactCheck();
              if (refetchedData?.report) {
                setEditorialNote(refetchedData.report);
              } else {
                const aiSuggestion = generateAISuggestedNote();
                setEditorialNote(aiSuggestion);
              }
            }}
            startIcon={isLoadingFactCheck ? <CircularProgress size={16} color="inherit" /> : <AutoAwesome />}
            disabled={isLoadingFactCheck}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
              color: 'white',
              border: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #63408b 50%, #1976d2 100%)',
                border: 'none'
              }
            }}
          >
            Regenerate AI Notes
          </Button>
          <Button onClick={handleConfirmProceed} variant="contained" color="primary" endIcon={<Send />} disabled={!editorialNote.trim()}>
            Confirm & Proceed to Approval
          </Button>
        </DialogActions>
      </Dialog>

      {/* Request More Information Modal */}
      <Dialog open={requestInfoModalOpen} onClose={() => setRequestInfoModalOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email color="warning" />
            <Typography variant="h5">Request More Information</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Send an email to {newsLead.submitter?.fullName || 'the submitter'} requesting additional information
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Alert severity="info" icon={<AutoAwesome />}>
              The message below has been pre-filled by AI based on missing or unclear information. Please review and edit as needed.
            </Alert>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                To: {newsLead.submitter?.email || 'N/A'}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Subject: Additional Information Required - News Lead #
                {newsId ? `NL-2024-${newsId.toString().padStart(4, '0')}` : 'NL-2024-0000'}
              </Typography>
            </Box>
            <TextField
              fullWidth
              multiline
              rows={14}
              label="Message"
              value={requestInfoMessage}
              onChange={(e) => setRequestInfoMessage(e.target.value)}
              variant="outlined"
              placeholder="Enter your message here..."
              helperText="This message will be sent to the submitter via email."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setRequestInfoModalOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => {
              const aiMessage = generateAIRequestMessage();
              setRequestInfoMessage(aiMessage);
            }}
            startIcon={<AutoAwesome />}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #2196f3 100%)',
              color: 'white',
              border: 'none',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #63408b 50%, #1976d2 100%)',
                border: 'none'
              }
            }}
          >
            Regenerate AI Message
          </Button>
          <Button
            onClick={handleSendRequestInfo}
            variant="contained"
            color="warning"
            endIcon={<Send />}
            disabled={!requestInfoMessage.trim()}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ==============================|| UNVERIFIED NEWS LEADS PAGE ||============================== //

export default function UnverifiedNewsLeads() {
  const navigate = useNavigate();
  const { newsId } = useParams();

  // If no newsId, redirect to main news verification page
  useEffect(() => {
    if (!newsId) {
      navigate('/media/news-verification', { replace: true });
    }
  }, [newsId, navigate]);

  // If newsId is provided, show detail view
  if (newsId) {
    const newsLead = unverifiedNewsLeads.find((n) => n.id === parseInt(newsId));

    if (!newsLead) {
      return (
        <Box>
          <MainCard title="News Lead Not Found">
            <Typography variant="body1">The requested news lead could not be found.</Typography>
            <Button variant="outlined" onClick={() => navigate('/media/news-verification')} sx={{ mt: 2 }}>
              Back to News Verification
            </Button>
          </MainCard>
        </Box>
      );
    }

    return <NewsLeadDetailView newsLead={newsLead} newsId={newsId} navigate={navigate} />;
  }

  // Return null while redirecting
  return null;
}
