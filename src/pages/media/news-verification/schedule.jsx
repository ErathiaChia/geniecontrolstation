// react
import { useState, useEffect } from 'react';

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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  ButtonGroup,
  Menu
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
  Schedule as ScheduleIcon,
  CalendarToday,
  AccessTime,
  Public,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  Telegram,
  Language,
  RssFeed,
  Tv,
  ArrowDropDown,
  Undo
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// project imports
import MainCard from 'components/MainCard';

// Sample data - filtered for Schedule status
const scheduleNewsLeads = [
  {
    id: 3,
    title: 'Government Policy Update on Healthcare',
    submissionDate: '2024-11-23',
    currentStatus: 'Schedule',
    statusColor: 'info',
    sources: 'Other Media Outlet',
    assignedTo: 'Mike Johnson',
    // Detailed information
    submitter: {
      fullName: 'David Tan',
      ic: 'S4567890D',
      address: '101 Healthcare Ave, #08-22, Singapore 890123',
      phone: '+65 9012 3456',
      email: 'david.tan@health.sg'
    },
    storyDetails: {
      title: 'Government Announces Major Healthcare Policy Update',
      description: 'The Ministry of Health has announced significant updates to the national healthcare policy, aimed at improving accessibility and affordability for all citizens. The new policy includes expanded coverage for chronic diseases and enhanced subsidies for elderly patients. Implementation is set to begin in the first quarter of next year.',
      category: 'Politics',
      urgency: 'High',
      estimatedImpact: 'Major'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'ministry-announcement.jpg',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
        description: 'Ministry of Health press conference',
        source: 'Own Databank'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://moh.gov.sg/news/policy-update-2024',
        description: 'Official MOH announcement',
        verified: true
      }
    ],
    juniorEditorialNotes: `Junior Editorial Review - 23/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Other Media Outlet (Political News Network)
Source Credibility: High
Source Type: Established political news outlet
Source Verification: Confirmed authentic and reputable
Cross-Reference Status: Verified with 1 independent source (Government press release)
Source Contact: Media outlet contact verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 96/100 (Passed)
Key Facts Verified: 6/6
Claims Substantiated: All policy details confirmed
Policy Details: Verified with government officials
Quotes Verification: All quotes attributed to named officials
Contradictions Found: None
Independent Verification: Confirmed with official government announcement

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 9.5/10
Timeliness: 9/10 (Important policy announcement)
Public Interest: 10/10 (Affects entire population)
Impact Assessment: Major (Significant policy change)
Audience Reach: Very Broad (All citizens)
Uniqueness: High (Major policy shift)
Local Relevance: Very High (National policy)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 1
Images Verified: 1/1 (Official government image, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (Official government portal)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate neutral coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: High (Important government policy)
Suggested Category: Politics
Confidence Level: Very High
Notes: Thoroughly verified story with official government sources. All facts confirmed through official channels. Ready for immediate Senior Editorial review.`,
    seniorEditorialNotes: `Senior Editorial Review - 23/11/2024

PREVIOUS REVIEW STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Junior Editorial Status: Verified and Approved
Junior Editorial Score: 9.5/10
Verification Quality: Excellent
Issues Flagged: None

LANGUAGE & GRAMMAR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grammar Check: Passed (100%)
Spelling: No errors found
Punctuation: Correct throughout
Sentence Structure: Clear and professional
Readability Score: 8.8/10 (Appropriate for general audience)
Language Level: Professional journalism standard

TONE & STYLE ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Tonality Score: 9.5/10
Tone Appropriateness: Excellent (Neutral and informative)
Category Alignment: Perfect fit for Politics category
Brand Voice: Consistent with publication standards
Emotional Balance: Well-balanced and objective
Objectivity: Strictly maintained for political coverage

VISUAL CONTENT REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Quality: High resolution, publication-ready
Image Relevance: Directly related to policy announcement
Image Sources: Official government source, verified
Copyright Clearance: Confirmed
Attribution: Properly cited
Visual Appeal: Professional and appropriate

HEADLINE & STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline Effectiveness: Clear, informative, neutral
SEO Optimization: Good keyword usage for political news
Story Structure: Well-organized with logical progression
Lead Paragraph: Effectively summarizes policy details
Supporting Details: Comprehensive policy explanation

FINAL EDITORIAL DECISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Decision: APPROVED FOR PUBLICATION
Confidence Level: Very High
Quality Rating: 9.5/10
Publication Priority: High
Recommended Timing: Morning news cycle

PUBLICATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All editorial standards met
✓ Content ready for scheduling and publication
✓ Grammar and language: Professional and clear
✓ Tone: Appropriate neutral tone for Politics category
✓ Image citations: Properly attributed with official source
✓ Facts: Cross-verified with official government sources
✓ Legal clearance: No concerns
✓ Ethical standards: Fully compliant

This story meets all publication criteria and is cleared for scheduling. Important government policy announcement requiring prominent placement and timely publication.

Approved by: Senior Editorial Team
Ready for: Publisher scheduling`
  },
  {
    id: 10,
    title: 'Local Business Opens New Location',
    submissionDate: '2024-11-24',
    currentStatus: 'Schedule',
    statusColor: 'info',
    sources: 'Blog News',
    assignedTo: 'Jane Smith',
    submitter: {
      fullName: 'Emily Wong',
      ic: 'S5678901E',
      address: '202 Business Park, #15-30, Singapore 901234',
      phone: '+65 8901 2345',
      email: 'emily.wong@business.sg'
    },
    storyDetails: {
      title: 'Popular Café Chain Opens Fifth Location in Central District',
      description: 'Local café chain "Bean & Brew" has opened its fifth location in the heart of the Central Business District. The new outlet features an expanded menu and a co-working space for professionals. The opening has been met with enthusiasm from the local community.',
      category: 'Business',
      urgency: 'Low',
      estimatedImpact: 'Moderate'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'cafe-exterior.jpg',
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
        description: 'New café location exterior',
        source: 'Own Databank'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://beanandbrewsg.com/new-location',
        description: 'Official café website announcement',
        verified: true
      }
    ],
    juniorEditorialNotes: `Junior Editorial Review - 24/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Blog News (Local Business Blog)
Source Credibility: Moderate
Source Type: Local business news blog
Source Verification: Confirmed authentic
Cross-Reference Status: Verified with 1 independent source (Business website)
Source Contact: Blog contact verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 88/100 (Passed)
Key Facts Verified: 4/4
Claims Substantiated: All business details confirmed
Business Details: Verified with café management
Quotes Verification: All quotes attributed correctly
Contradictions Found: None
Independent Verification: Confirmed with official business website

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 7.0/10
Timeliness: 7/10 (New business opening)
Public Interest: 6/10 (Local business community interest)
Impact Assessment: Moderate (Local business expansion)
Audience Reach: Moderate (Local community, business sector)
Uniqueness: Moderate (Business expansion story)
Local Relevance: High (Popular local café chain)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 1
Images Verified: 1/1 (Café exterior, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (Official café website)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate business coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: Low (Standard business news)
Suggested Category: Business
Confidence Level: High
Notes: Solid local business story with verified details. All facts confirmed through official business channels. Ready for Senior Editorial review.`,
    seniorEditorialNotes: `Senior Editorial Review - 24/11/2024

PREVIOUS REVIEW STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Junior Editorial Status: Verified and Approved
Junior Editorial Score: 7.0/10
Verification Quality: Good and thorough
Issues Flagged: None

LANGUAGE & GRAMMAR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grammar Check: Passed (100%)
Spelling: No errors found
Punctuation: Correct throughout
Sentence Structure: Clear and engaging
Readability Score: 8.2/10 (Appropriate for general audience)
Language Level: Professional journalism standard

TONE & STYLE ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Tonality Score: 8.5/10
Tone Appropriateness: Excellent (Positive and informative)
Category Alignment: Perfect fit for Business category
Brand Voice: Consistent with publication standards
Emotional Balance: Well-balanced enthusiasm
Objectivity: Maintained while highlighting business features

VISUAL CONTENT REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Quality: Good resolution, suitable for publication
Image Relevance: Directly shows new café location
Image Sources: Verified and documented
Copyright Clearance: Confirmed
Attribution: Properly cited
Visual Appeal: Attractive and professional

HEADLINE & STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline Effectiveness: Clear and informative
SEO Optimization: Good keyword usage for local business
Story Structure: Well-organized with logical flow
Lead Paragraph: Effectively summarizes opening details
Supporting Details: Good coverage of features and location

FINAL EDITORIAL DECISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Decision: APPROVED FOR PUBLICATION
Confidence Level: High
Quality Rating: 8.5/10
Publication Priority: Normal
Recommended Timing: Midday business news slot

PUBLICATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All editorial standards met
✓ Content ready for scheduling and publication
✓ Grammar and language: Professional and clear
✓ Tone: Appropriate positive tone for Business category
✓ Image citations: Properly attributed with source documentation
✓ Facts: Cross-verified with official business sources
✓ Legal clearance: No concerns
✓ Ethical standards: Fully compliant

This story meets all publication criteria and is cleared for scheduling. Good local business story suitable for business section placement.

Approved by: Senior Editorial Team
Ready for: Publisher scheduling`
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
    icon: <ScheduleIcon style={{ fontSize: '20px' }} />
  },
  {
    label: 'Published',
    icon: <Newspaper style={{ fontSize: '20px' }} />
  }
];

// AI Publisher Assistant Data
const aiPublisherAssistant = {
  optimalTiming: {
    status: 'success',
    recommendation: {
      dateTime: '2024-11-26 09:00 AM',
      reason: 'Peak engagement time for political news based on historical data',
      engagement: 'High',
      reach: '85%'
    },
    alternatives: [
      { dateTime: '2024-11-26 06:00 PM', reason: 'Evening commute time', engagement: 'Medium', reach: '70%' },
      { dateTime: '2024-11-27 08:00 AM', reason: 'Morning news cycle', engagement: 'High', reach: '80%' }
    ]
  },
  channelRecommendation: {
    status: 'success',
    primary: [
      { channel: 'Website', priority: 'High', reason: 'Official government news - best for website' },
      { channel: 'Facebook', priority: 'High', reason: 'High engagement for policy news' },
      { channel: 'LinkedIn', priority: 'Medium', reason: 'Professional audience interested in policy' }
    ],
    secondary: [
      { channel: 'Twitter', priority: 'Low', reason: 'Quick updates and discussions' },
      { channel: 'Email Newsletter', priority: 'Medium', reason: 'Subscribers interested in policy updates' }
    ]
  },
  audienceInsights: {
    status: 'info',
    demographics: [
      { segment: 'Age 35-55', percentage: 45, interest: 'High' },
      { segment: 'Healthcare Professionals', percentage: 25, interest: 'Very High' },
      { segment: 'Policy Makers', percentage: 15, interest: 'Very High' },
      { segment: 'General Public', percentage: 15, interest: 'Medium' }
    ]
  }
};

// ==============================|| NEWS LEAD DETAIL VIEW COMPONENT ||============================== //

function NewsLeadDetailView({ newsLead, newsId, navigate }) {
  const [selectedSection, setSelectedSection] = useState(5);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [activeStep] = useState(2); // Current step in verification process (Schedule = step 2)
  const [publishDateTime, setPublishDateTime] = useState(new Date());
  const [selectedChannels, setSelectedChannels] = useState({
    website: true,
    facebook: true,
    twitter: false,
    instagram: false,
    linkedin: false,
    youtube: false,
    email: false
  });
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const sections = [
    { id: 5, name: 'Publishing Schedule', icon: <ScheduleIcon />, confirmed: false },
    { id: 0, name: 'Personal Details', icon: <PersonIcon />, confirmed: true },
    { id: 1, name: 'Story Details', icon: <Article />, confirmed: true },
    { id: 2, name: 'Attachments', icon: <AttachFile />, confirmed: true },
    { id: 3, name: 'Links & Proof', icon: <LinkIcon />, confirmed: true },
    { id: 4, name: 'Editorial Notes', icon: <VerifiedUser />, confirmed: true },
    { id: 6, name: 'Channel Display', icon: <Tv />, confirmed: true }
  ];

  const channels = [
    { id: 0, name: 'Telegram', icon: <Telegram /> },
    { id: 1, name: 'Newspaper', icon: <Newspaper /> },
    { id: 2, name: 'Website', icon: <Language /> },
    { id: 3, name: 'RSS Feed', icon: <RssFeed /> }
  ];

  const handleBack = () => {
    navigate('/media/news-verification');
  };

  const handlePublish = () => {
    console.log('Publishing news lead');
    // Navigate to Published stage
    navigate(`/media/news-verification/published/${newsId}`);
  };

  const handleChannelChange = (event) => {
    setSelectedChannels({
      ...selectedChannels,
      [event.target.name]: event.target.checked,
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRejectNews = () => {
    handleMenuClose();
    // TODO: Implement reject news logic
    console.log('Reject News Leads clicked');
  };

  const handleRevertNews = () => {
    handleMenuClose();
    // TODO: Implement revert news logic
    console.log('Revert News Leads clicked');
  };

  const getCheckStatusIcon = (status) => {
    switch (status) {
      case 'error':
        return <Cancel sx={{ fontSize: '20px', color: 'error.main', mr: 1 }} />;
      case 'warning':
        return <Warning sx={{ fontSize: '20px', color: 'warning.main', mr: 1 }} />;
      case 'success':
      case 'verified':
        return <CheckCircle sx={{ fontSize: '20px', color: 'success.main', mr: 1 }} />;
      default:
        return null;
    }
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
                <Typography variant="body1">
                  {newsLead.submitter.address}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Phone fontSize="small" />
                    Phone Number
                  </Box>
                </Typography>
                <Typography variant="body1">
                  {newsLead.submitter.phone}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Email fontSize="small" />
                    Email Address
                  </Box>
                </Typography>
                <Typography variant="body1">
                  {newsLead.submitter.email}
                </Typography>
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
                <Typography variant="h6" fontWeight={500}>
                  {newsLead.storyDetails.title}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {newsLead.storyDetails.description}
                </Typography>
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Category
                </Typography>
                <Chip 
                  label={newsLead.storyDetails.category} 
                  color="primary" 
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Urgency Level
                </Typography>
                <Chip 
                  label={newsLead.storyDetails.urgency} 
                  color={newsLead.storyDetails.urgency === 'Critical' ? 'error' : newsLead.storyDetails.urgency === 'High' ? 'warning' : 'info'}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              <Divider />
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Estimated Impact
                </Typography>
                <Typography variant="body1">
                  {newsLead.storyDetails.estimatedImpact}
                </Typography>
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
                      borderColor: 'success.main',
                      bgcolor: 'success.lighter',
                      '&:hover': {
                        boxShadow: 3
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
                      <Chip 
                        label={attachment.source}
                        size="small"
                        color="success"
                        icon={<CheckCircle style={{ fontSize: '16px' }} />}
                      />
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
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
                    borderColor: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinkIcon fontSize="small" color="success" />
                        <Typography variant="body2" fontWeight={500}>
                          {link.description}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Verified" 
                        size="small" 
                        color="success" 
                        icon={<CheckCircle style={{ fontSize: '16px' }} />}
                      />
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
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Box>
        );

      case 4: // Editorial Notes
        return (
          <Box>
            <Alert severity="info" icon={<VerifiedUser />} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Junior Editorial Notes
              </Typography>
              <Typography variant="body2">
                {newsLead.juniorEditorialNotes}
              </Typography>
            </Alert>
            <Alert severity="success" icon={<Gavel />} sx={{ mb: 2 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Senior Editorial Notes
              </Typography>
              <Typography variant="body2">
                {newsLead.seniorEditorialNotes}
              </Typography>
            </Alert>
          </Box>
        );

      case 5: // Publishing Schedule
        return (
          <Box>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday fontSize="small" />
                    Publication Date & Time
                  </Box>
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    value={publishDateTime}
                    onChange={(newValue) => setPublishDateTime(newValue)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </LocalizationProvider>
              </Box>
              
              <Divider />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Public fontSize="small" />
                    Distribution Channels
                  </Box>
                </Typography>
                <Stack spacing={1}>
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.website} onChange={handleChannelChange} name="website" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Public fontSize="small" />
                        <Typography>Website (Main)</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.facebook} onChange={handleChannelChange} name="facebook" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Facebook fontSize="small" />
                        <Typography>Facebook</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.twitter} onChange={handleChannelChange} name="twitter" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Twitter fontSize="small" />
                        <Typography>Twitter</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.instagram} onChange={handleChannelChange} name="instagram" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Instagram fontSize="small" />
                        <Typography>Instagram</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.linkedin} onChange={handleChannelChange} name="linkedin" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinkedIn fontSize="small" />
                        <Typography>LinkedIn</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.youtube} onChange={handleChannelChange} name="youtube" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <YouTube fontSize="small" />
                        <Typography>YouTube</Typography>
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox checked={selectedChannels.email} onChange={handleChannelChange} name="email" />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Email fontSize="small" />
                        <Typography>Email Newsletter</Typography>
                      </Box>
                    }
                  />
                </Stack>
              </Box>
              
            </Stack>
          </Box>
        );

      case 6: // Channel Display
        return (
          <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={selectedChannel} 
                onChange={(e, newValue) => setSelectedChannel(newValue)}
                variant="fullWidth"
              >
                {channels.map((channel) => (
                  <Tab 
                    key={channel.id}
                    icon={channel.icon}
                    label={channel.name}
                    iconPosition="start"
                  />
                ))}
              </Tabs>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                  variant={isEditingChannel ? 'contained' : 'outlined'}
                  startIcon={<Edit />}
                  size="small"
                  onClick={() => setIsEditingChannel(!isEditingChannel)}
                >
                  {isEditingChannel ? 'Save Changes' : 'Edit Content'}
                </Button>
              </Box>
              {selectedChannel === 0 && (
                <Card sx={{ maxWidth: 500, mx: 'auto', bgcolor: '#0088cc', color: 'white' }}>
                  <CardMedia component="img" height="250" image="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800" alt="News preview" />
                  <CardContent>
                    {isEditingChannel ? (
                      <Stack spacing={2}>
                        <TextField fullWidth label="Title" defaultValue={newsLead.storyDetails.title} variant="filled" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }} />
                        <TextField fullWidth multiline rows={4} label="Description" defaultValue={newsLead.storyDetails.description} variant="filled" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', textarea: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }} />
                      </Stack>
                    ) : (
                      <>
                        <Typography variant="h6" fontWeight={600} gutterBottom>{newsLead.storyDetails.title}</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>{newsLead.storyDetails.description}</Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>📅 {new Date().toLocaleDateString()} • 👁 1.2K views</Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}
              {selectedChannel === 1 && (
                <Paper sx={{ p: 3, maxWidth: 700, mx: 'auto', bgcolor: '#f5f5f0' }}>
                  <Box sx={{ borderBottom: 2, borderColor: 'black', pb: 1, mb: 2 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'serif' }}>THE DAILY NEWS</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={5}><Box component="img" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400" alt="News" sx={{ width: '100%', height: 'auto', border: 1, borderColor: 'grey.300' }} /></Grid>
                    <Grid item xs={7}>
                      {isEditingChannel ? (
                        <Stack spacing={1}>
                          <TextField fullWidth label="Headline" defaultValue={newsLead.storyDetails.title} variant="outlined" size="small" />
                          <TextField fullWidth multiline rows={6} label="Article Content" defaultValue={newsLead.storyDetails.description} variant="outlined" size="small" />
                        </Stack>
                      ) : (
                        <>
                          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontFamily: 'serif' }}>{newsLead.storyDetails.title}</Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'serif', lineHeight: 1.6, textAlign: 'justify' }}>{newsLead.storyDetails.description}</Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              )}
              {selectedChannel === 2 && (
                <Paper sx={{ maxWidth: 800, mx: 'auto' }}>
                  <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}><Typography variant="h5" fontWeight={600}>News Portal</Typography></Box>
                  <Box sx={{ p: 3 }}>
                    <Chip label={newsLead.storyDetails.category} color="primary" size="small" sx={{ mb: 2 }} />
                    {isEditingChannel ? (
                      <Stack spacing={2}>
                        <TextField fullWidth label="Article Title" defaultValue={newsLead.storyDetails.title} variant="outlined" />
                        <Box component="img" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800" alt="News" sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 1 }} />
                        <TextField fullWidth multiline rows={6} label="Article Body" defaultValue={newsLead.storyDetails.description} variant="outlined" />
                      </Stack>
                    ) : (
                      <>
                        <Typography variant="h4" fontWeight={600} gutterBottom>{newsLead.storyDetails.title}</Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>By Staff Writer • {new Date().toLocaleDateString()} • 3 min read</Typography>
                        <Box component="img" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800" alt="News" sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 1, mb: 2 }} />
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>{newsLead.storyDetails.description}</Typography>
                      </>
                    )}
                  </Box>
                </Paper>
              )}
              {selectedChannel === 3 && (
                <Paper sx={{ maxWidth: 600, mx: 'auto', p: 3, bgcolor: '#fff8e1' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <RssFeed color="warning" />
                    <Typography variant="h6" fontWeight={600}>RSS Feed Preview</Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  {isEditingChannel ? (
                    <Stack spacing={2}>
                      <TextField fullWidth label="Feed Title" defaultValue={newsLead.storyDetails.title} variant="outlined" size="small" />
                      <TextField fullWidth multiline rows={4} label="Feed Description" defaultValue={newsLead.storyDetails.description} variant="outlined" size="small" />
                      <TextField fullWidth label="Feed Link" defaultValue="https://newsportal.com/article/123" variant="outlined" size="small" />
                    </Stack>
                  ) : (
                    <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <Typography variant="body2" gutterBottom><strong>&lt;item&gt;</strong></Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2"><strong>&lt;title&gt;</strong>{newsLead.storyDetails.title}<strong>&lt;/title&gt;</strong></Typography>
                        <Typography variant="body2"><strong>&lt;description&gt;</strong>{newsLead.storyDetails.description.substring(0, 100)}...<strong>&lt;/description&gt;</strong></Typography>
                        <Typography variant="body2"><strong>&lt;link&gt;</strong>https://newsportal.com/article/123<strong>&lt;/link&gt;</strong></Typography>
                        <Typography variant="body2"><strong>&lt;pubDate&gt;</strong>{new Date().toUTCString()}<strong>&lt;/pubDate&gt;</strong></Typography>
                        <Typography variant="body2"><strong>&lt;category&gt;</strong>{newsLead.storyDetails.category}<strong>&lt;/category&gt;</strong></Typography>
                      </Box>
                      <Typography variant="body2"><strong>&lt;/item&gt;</strong></Typography>
                    </Box>
                  )}
                </Paper>
              )}
            </Box>
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
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          px: { xs: 2, sm: 3 }, 
          py: 2, 
          bgcolor: 'background.paper', 
          borderBottom: 1, 
          borderColor: 'divider' 
        }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBack}
          >
            Back to News Verification
          </Button>
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
            <Typography variant="h5">
              News Lead #{newsId ? `NL-2024-${newsId.toString().padStart(4, '0')}` : 'NL-2024-0000'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Publisher Scheduling
            </Typography>
          </Box>
          <ButtonGroup variant="contained" color="success">
            <Button
              color="success"
              startIcon={<CheckCircle />}
              onClick={handlePublish}
            >
              Confirm Schedule
            </Button>
            <Button
              color="success"
              size="small"
              onClick={handleMenuClick}
            >
              <ArrowDropDown />
            </Button>
          </ButtonGroup>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleRejectNews}>
              <Cancel sx={{ mr: 1, color: 'error.main' }} />
              <Typography color="error">Reject News Leads</Typography>
            </MenuItem>
            <MenuItem onClick={handleRevertNews}>
              <Undo sx={{ mr: 1, color: 'primary.main' }} />
              <Typography color="primary">Revert News Leads</Typography>
            </MenuItem>
          </Menu>
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
                        backgroundColor: index === activeStep 
                          ? 'primary.main' 
                          : index < activeStep 
                          ? 'success.main' 
                          : 'grey.300',
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
                    borderColor: selectedSection === section.id ? 'primary.main' : section.confirmed ? 'success.main' : 'divider',
                    bgcolor: selectedSection === section.id ? 'primary.lighter' : section.confirmed ? 'success.lighter' : 'background.paper',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: selectedSection === section.id ? 'primary.lighter' : section.confirmed ? 'success.lighter' : 'grey.50',
                      borderColor: selectedSection === section.id ? 'primary.main' : section.confirmed ? 'success.main' : 'primary.main'
                    }
                  }}
                  onClick={() => setSelectedSection(section.id)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Box sx={{ 
                        fontSize: '20px', 
                        color: selectedSection === section.id ? 'primary.main' : section.confirmed ? 'success.main' : 'text.secondary',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        {section.icon}
                      </Box>
                      <Typography 
                        variant="subtitle1" 
                        fontWeight={selectedSection === section.id ? 600 : 400}
                      >
                        {section.name}
                      </Typography>
                    </Box>
                    {section.confirmed && (
                      <CheckCircle sx={{ fontSize: '20px', color: 'success.main' }} />
                    )}
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
                <Typography variant="h5">{sections.find(s => s.id === selectedSection)?.name}</Typography>
              </Box>
            }
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              {renderSectionContent()}
            </Box>
          </MainCard>
        </Grid>
      </Grid>

      {/* Floating Action Button - AI Publisher Assistant */}
      <Tooltip title="AI Publisher Assistant" placement="left">
        <Fab
          color="primary"
          aria-label="ai publisher assistant"
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
          <AutoAwesome />
        </Fab>
      </Tooltip>

      {/* AI Publisher Assistant Drawer */}
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
            <Typography variant="h4">AI Publisher Assistant</Typography>
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

        <Stack spacing={2}>
          {/* Optimal Timing Recommendation */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                {getCheckStatusIcon(aiPublisherAssistant.optimalTiming.status)}
                <AccessTime fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Optimal Publishing Time
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Alert severity="success" icon={<CheckCircle />}>
                  <Typography variant="body2" fontWeight={600} gutterBottom>
                    Recommended: {aiPublisherAssistant.optimalTiming.recommendation.dateTime}
                  </Typography>
                  <Typography variant="caption">
                    {aiPublisherAssistant.optimalTiming.recommendation.reason}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Chip label={`Engagement: ${aiPublisherAssistant.optimalTiming.recommendation.engagement}`} size="small" color="success" />
                    <Chip label={`Reach: ${aiPublisherAssistant.optimalTiming.recommendation.reach}`} size="small" color="info" />
                  </Box>
                </Alert>
                
                <Typography variant="subtitle2" color="text.secondary">
                  Alternative Times:
                </Typography>
                {aiPublisherAssistant.optimalTiming.alternatives.map((alt, index) => (
                  <Paper key={index} sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" fontWeight={500}>
                      {alt.dateTime}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {alt.reason}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                      <Chip label={`Engagement: ${alt.engagement}`} size="small" variant="outlined" />
                      <Chip label={`Reach: ${alt.reach}`} size="small" variant="outlined" />
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Channel Recommendation */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                {getCheckStatusIcon(aiPublisherAssistant.channelRecommendation.status)}
                <Public fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Channel Recommendations
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Primary Channels:
                  </Typography>
                  <Stack spacing={1}>
                    {aiPublisherAssistant.channelRecommendation.primary.map((channel, index) => (
                      <Alert 
                        key={index}
                        severity={channel.priority === 'High' ? 'success' : 'info'}
                        icon={<CheckCircle />}
                        sx={{ py: 0.5 }}
                      >
                        <Typography variant="body2" fontWeight={600}>
                          {channel.channel} - {channel.priority} Priority
                        </Typography>
                        <Typography variant="caption">
                          {channel.reason}
                        </Typography>
                      </Alert>
                    ))}
                  </Stack>
                </Box>
                
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Secondary Channels:
                  </Typography>
                  <Stack spacing={1}>
                    {aiPublisherAssistant.channelRecommendation.secondary.map((channel, index) => (
                      <Paper key={index} sx={{ p: 1.5, bgcolor: 'grey.50' }}>
                        <Typography variant="body2" fontWeight={500}>
                          {channel.channel} - {channel.priority} Priority
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {channel.reason}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Audience Insights */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                <PersonIcon fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Target Audience Insights
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1.5}>
                {aiPublisherAssistant.audienceInsights.demographics.map((demo, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {demo.segment}
                      </Typography>
                      <Typography variant="body2" color="primary" fontWeight={600}>
                        {demo.percentage}%
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        Interest Level:
                      </Typography>
                      <Chip 
                        label={demo.interest} 
                        size="small" 
                        color={demo.interest === 'Very High' ? 'success' : demo.interest === 'High' ? 'primary' : 'default'}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Drawer>
    </>
  );
}

// ==============================|| SCHEDULE NEWS LEADS PAGE ||============================== //

export default function ScheduleNewsLeads() {
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
    const newsLead = scheduleNewsLeads.find(n => n.id === parseInt(newsId));
    
    if (!newsLead) {
      return (
        <Box>
          <MainCard title="News Lead Not Found">
            <Typography variant="body1">
              The requested news lead could not be found.
            </Typography>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/media/news-verification')}
              sx={{ mt: 2 }}
            >
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

