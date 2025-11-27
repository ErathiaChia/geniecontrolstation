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
  Alert,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Tabs,
  Tab,
  CardMedia,
  TextField,
  ButtonGroup,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Person as PersonIcon,
  ArrowBack,
  CheckCircle,
  Email,
  Phone,
  LocationOn,
  Article,
  Image as ImageIcon,
  Link as LinkIcon,
  AttachFile,
  VerifiedUser,
  Gavel,
  Newspaper,
  Schedule as ScheduleIcon,
  Visibility,
  ThumbUp,
  Share,
  Comment,
  TrendingUp,
  Public,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  YouTube,
  CalendarToday,
  AccessTime,
  Telegram,
  Language,
  RssFeed,
  Tv,
  Edit,
  ArrowDropDown,
  Cancel,
  Undo
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';

// Sample data - filtered for Published status
const publishedNewsLeads = [
  {
    id: 4,
    title: 'Sports Team Wins Championship',
    submissionDate: '2024-11-22',
    currentStatus: 'Published',
    statusColor: 'success',
    sources: 'Blog News',
    assignedTo: 'Sarah Williams',
    publishedDate: '2024-11-24 10:00 AM',
    // Detailed information
    submitter: {
      fullName: 'James Lim',
      ic: 'S6789012F',
      address: '303 Sports Complex, #20-15, Singapore 012345',
      phone: '+65 9234 5678',
      email: 'james.lim@sports.sg'
    },
    storyDetails: {
      title: 'Local Football Team Clinches National Championship Title',
      description: 'In a thrilling final match, the local football team secured the national championship title with a 3-2 victory. The team demonstrated exceptional skill and determination throughout the season, culminating in this historic win. Fans celebrated across the city as the team lifted the trophy.',
      category: 'Sports',
      urgency: 'High',
      estimatedImpact: 'Major'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'championship-celebration.jpg',
        url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800',
        description: 'Team celebrating championship win',
        source: 'Own Databank'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://sportsleague.sg/championship/2024/final',
        description: 'Official league announcement',
        verified: true
      }
    ],
    juniorEditorialNotes: `Junior Editorial Review - 22/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Blog News
Source Credibility: High
Source Type: Sports Blog
Source Verification: Confirmed authentic
Cross-Reference Status: Verified with 1 independent source
Source Contact: Verified and documented

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 95/100 (Passed)
Key Facts Verified: 5/5
Claims Substantiated: All major claims verified
Statistical Data: Verified with official league records
Quotes Verification: All quotes attributed and verified
Contradictions Found: None
Independent Verification: Cross-checked with official sports league website

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 9.5/10
Timeliness: 10/10 (Breaking news, championship win)
Public Interest: 9/10 (High community interest in local sports)
Impact Assessment: Major (National championship significance)
Audience Reach: Broad (Sports fans, local community)
Uniqueness: High (First championship win in 5 years)
Local Relevance: Very High (Local team achievement)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 1
Images Verified: 1/1 (All authentic, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (All functional and relevant)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate for sports coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: High (Time-sensitive sports news)
Suggested Category: Sports
Confidence Level: Very High
Notes: Excellent story with strong verification. All sources credible and facts confirmed. Ready for immediate Senior Editorial review.`,
    seniorEditorialNotes: `Senior Editorial Review - 22/11/2024

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
Readability Score: 8.5/10 (Appropriate for general audience)
Language Level: Professional journalism standard

TONE & STYLE ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Tonality Score: 9.0/10
Tone Appropriateness: Excellent (Celebratory yet professional)
Category Alignment: Perfect fit for Sports category
Brand Voice: Consistent with publication standards
Emotional Balance: Well-balanced enthusiasm
Objectivity: Maintained while celebrating achievement

VISUAL CONTENT REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Quality: High resolution, publication-ready
Image Relevance: Directly related to story
Image Sources: All verified and documented
Copyright Clearance: Confirmed
Attribution: Properly cited
Visual Appeal: Strong visual impact

HEADLINE & STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline Effectiveness: Strong, clear, engaging
SEO Optimization: Good keyword usage
Story Structure: Well-organized, logical flow
Lead Paragraph: Captures key information effectively
Supporting Details: Comprehensive and relevant

FINAL EDITORIAL DECISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Decision: APPROVED FOR PUBLICATION
Confidence Level: Very High
Quality Rating: 9.0/10
Publication Priority: High
Recommended Timing: Peak sports news hours

PUBLICATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All editorial standards met
✓ Content ready for scheduling and publication
✓ Grammar and language: Professional and clear
✓ Tone: Appropriate and engaging for Sports category
✓ Image citations: Properly attributed with source documentation
✓ Facts: Cross-verified with multiple sources and accurate
✓ Legal clearance: No concerns
✓ Ethical standards: Fully compliant

This story meets all publication criteria and is cleared for immediate scheduling. Recommend publishing during peak sports news consumption hours for maximum engagement.

Approved by: Senior Editorial Team
Ready for: Publisher scheduling`,
    publisherNotes: `Publisher Review & Scheduling Notes - 22/11/2024

PUBLICATION STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Publication Timing: 24/11/2024 at 10:00 AM
Timing Rationale: Peak sports news consumption period
Target Audience: Sports enthusiasts, local community
Expected Reach: High (Major local sports achievement)

CHANNEL DISTRIBUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary: Website (Featured story placement)
Social Media: Facebook, Twitter, Instagram, LinkedIn
Newsletter: Included in daily sports digest
Push Notification: Sent to sports subscribers

ENGAGEMENT STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hashtags: #LocalSports #ChampionshipWin #SportsSG
Social Copy: Celebratory tone with call-to-action
Visual Strategy: Hero image of championship moment
Community Engagement: Encouraging fan reactions and shares

PERFORMANCE EXPECTATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Expected Engagement: Very High
Projected Views: 15,000+ in first 24 hours
Target Engagement Rate: 20%+
Share Potential: High (Community pride factor)

MONITORING PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Real-time Monitoring: First 2 hours post-publication
Comment Moderation: Active monitoring enabled
Performance Tracking: Hourly metrics review
Engagement Response: Community management team on standby

Published successfully during peak sports news time. High engagement expected based on local interest and championship significance. Story performing as anticipated with strong community response.`,
    publishingDetails: {
      publishedDateTime: '2024-11-24 10:00 AM',
      channels: ['Website', 'Facebook', 'Twitter', 'Instagram'],
      priority: 'High',
      publishedBy: 'Sarah Williams'
    },
    performanceMetrics: {
      views: 15420,
      likes: 2340,
      shares: 890,
      comments: 156,
      engagementRate: '23.5%',
      reachPercentage: '92%'
    },
    channelPerformance: [
      { channel: 'Website', views: 8500, engagement: '18%' },
      { channel: 'Facebook', views: 4200, engagement: '28%' },
      { channel: 'Twitter', views: 1820, engagement: '31%' },
      { channel: 'Instagram', views: 900, engagement: '35%' }
    ]
  },
  {
    id: 9,
    title: 'School District Announces New Program',
    submissionDate: '2024-11-22',
    currentStatus: 'Published',
    statusColor: 'success',
    sources: 'Other Media Outlet',
    assignedTo: 'Sarah Williams',
    publishedDate: '2024-11-23 02:00 PM',
    submitter: {
      fullName: 'Rachel Ng',
      ic: 'S7890123G',
      address: '404 Education Lane, #05-18, Singapore 123456',
      phone: '+65 8123 4567',
      email: 'rachel.ng@education.sg'
    },
    storyDetails: {
      title: 'School District Launches Innovative STEM Education Program',
      description: 'The school district has announced the launch of a comprehensive STEM education program aimed at enhancing science and technology learning for students. The program includes hands-on workshops, industry partnerships, and state-of-the-art laboratory facilities. Implementation will begin in the next academic year.',
      category: 'Education',
      urgency: 'Medium',
      estimatedImpact: 'High'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'stem-lab.jpg',
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        description: 'New STEM laboratory',
        source: 'Own Databank'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://education.gov.sg/stem-program-2024',
        description: 'Official MOE announcement',
        verified: true
      }
    ],
    juniorEditorialNotes: `Junior Editorial Review - 22/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Other Media Outlet (Education Times)
Source Credibility: High
Source Type: Established education news outlet
Source Verification: Confirmed authentic and reputable
Cross-Reference Status: Verified with 1 independent source (School district website)
Source Contact: Media outlet contact verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 92/100 (Passed)
Key Facts Verified: 4/4
Claims Substantiated: All program details confirmed
Program Details: Verified with school district officials
Quotes Verification: All quotes attributed to named officials
Contradictions Found: None
Independent Verification: Confirmed with school district press release

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 8.5/10
Timeliness: 8/10 (New program announcement)
Public Interest: 8/10 (Relevant to parents and education community)
Impact Assessment: High (Affects multiple schools)
Audience Reach: Broad (Parents, educators, students)
Uniqueness: Moderate (Innovative program approach)
Local Relevance: High (Local school district initiative)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 1
Images Verified: 1/1 (School facility image, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (School district official announcement)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate coverage of program benefits
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: Medium (Important education news)
Suggested Category: Education
Confidence Level: High
Notes: Well-researched story with credible sources. All facts verified through official channels. Ready for Senior Editorial review.`,
    seniorEditorialNotes: `Senior Editorial Review - 22/11/2024

PREVIOUS REVIEW STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Junior Editorial Status: Verified and Approved
Junior Editorial Score: 8.5/10
Verification Quality: Thorough and comprehensive
Issues Flagged: None

LANGUAGE & GRAMMAR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grammar Check: Passed (100%)
Spelling: No errors found
Punctuation: Correct throughout
Sentence Structure: Clear and accessible
Readability Score: 8.0/10 (Appropriate for general audience)
Language Level: Professional journalism standard

TONE & STYLE ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Tonality Score: 8.8/10
Tone Appropriateness: Excellent (Informative and positive)
Category Alignment: Perfect fit for Education category
Brand Voice: Consistent with publication standards
Emotional Balance: Well-balanced and informative
Objectivity: Maintained while highlighting benefits

VISUAL CONTENT REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Quality: Good resolution, suitable for publication
Image Relevance: Directly related to education story
Image Sources: Verified and documented
Copyright Clearance: Confirmed
Attribution: Properly cited
Visual Appeal: Professional and appropriate

HEADLINE & STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline Effectiveness: Clear and informative
SEO Optimization: Good keyword usage for education sector
Story Structure: Well-organized with logical progression
Lead Paragraph: Effectively summarizes key information
Supporting Details: Comprehensive program details included

FINAL EDITORIAL DECISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Decision: APPROVED FOR PUBLICATION
Confidence Level: High
Quality Rating: 8.8/10
Publication Priority: Medium
Recommended Timing: Afternoon news cycle

PUBLICATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All editorial standards met
✓ Content ready for scheduling and publication
✓ Grammar and language: Professional and clear
✓ Tone: Appropriate and informative for Education category
✓ Image citations: Properly attributed with source documentation
✓ Facts: Cross-verified with official school district sources
✓ Legal clearance: No concerns
✓ Ethical standards: Fully compliant

This story meets all publication criteria and is cleared for scheduling. Recommend publishing during afternoon hours when education community is most active online.

Approved by: Senior Editorial Team
Ready for: Publisher scheduling`,
    publisherNotes: `Publisher Review & Scheduling Notes - 22/11/2024

PUBLICATION STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Publication Timing: 23/11/2024 at 02:00 PM
Timing Rationale: Afternoon cycle when parents/educators check news
Target Audience: Parents, educators, education administrators
Expected Reach: Moderate to High (Education community interest)

CHANNEL DISTRIBUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary: Website (Education section feature)
Social Media: Facebook, LinkedIn (Education-focused platforms)
Newsletter: Included in education news digest
Community Groups: Shared with parent-teacher associations

ENGAGEMENT STRATEGY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hashtags: #Education #SchoolNews #LearningPrograms
Social Copy: Informative tone highlighting program benefits
Visual Strategy: School facility image showcasing learning environment
Community Engagement: Encouraging parent and educator feedback

PERFORMANCE EXPECTATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Expected Engagement: Moderate to High
Projected Views: 8,000+ in first 24 hours
Target Engagement Rate: 15%+
Share Potential: Moderate (Education community sharing)

MONITORING PLAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Real-time Monitoring: First hour post-publication
Comment Moderation: Standard monitoring
Performance Tracking: Daily metrics review
Engagement Response: Education desk monitoring feedback

Published successfully during afternoon education news slot. Good engagement with education community as expected. Story resonating well with parents and educators interested in program details.`,
    publishingDetails: {
      publishedDateTime: '2024-11-23 02:00 PM',
      channels: ['Website', 'Facebook', 'LinkedIn', 'Email Newsletter'],
      priority: 'Normal',
      publishedBy: 'Sarah Williams'
    },
    performanceMetrics: {
      views: 8760,
      likes: 1240,
      shares: 450,
      comments: 89,
      engagementRate: '20.3%',
      reachPercentage: '78%'
    },
    channelPerformance: [
      { channel: 'Website', views: 4200, engagement: '15%' },
      { channel: 'Facebook', views: 2800, engagement: '22%' },
      { channel: 'LinkedIn', views: 1560, engagement: '28%' },
      { channel: 'Email Newsletter', views: 200, engagement: '45%' }
    ]
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

// ==============================|| NEWS LEAD DETAIL VIEW COMPONENT ||============================== //

function NewsLeadDetailView({ newsLead, newsId, navigate }) {
  const [selectedSection, setSelectedSection] = useState(0);
  const [activeStep] = useState(3); // Current step in verification process (Published = step 3)
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [isEditingChannel, setIsEditingChannel] = useState(false);

  const sections = [
    { id: 0, name: 'Performance Metrics', icon: <TrendingUp /> },
    { id: 1, name: 'Personal Details', icon: <PersonIcon /> },
    { id: 2, name: 'Story Details', icon: <Article /> },
    { id: 3, name: 'Attachments', icon: <AttachFile /> },
    { id: 4, name: 'Links & Proof', icon: <LinkIcon /> },
    { id: 5, name: 'Editorial Trail', icon: <VerifiedUser /> },
    { id: 6, name: 'Publishing Details', icon: <ScheduleIcon /> },
    { id: 7, name: 'Channel Display', icon: <Tv /> }
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

  const getChannelIcon = (channel) => {
    switch (channel.toLowerCase()) {
      case 'website':
        return <Public fontSize="small" />;
      case 'facebook':
        return <Facebook fontSize="small" />;
      case 'twitter':
        return <Twitter fontSize="small" />;
      case 'instagram':
        return <Instagram fontSize="small" />;
      case 'linkedin':
        return <LinkedIn fontSize="small" />;
      case 'youtube':
        return <YouTube fontSize="small" />;
      case 'email newsletter':
        return <Email fontSize="small" />;
      default:
        return <Public fontSize="small" />;
    }
  };

  const renderSectionContent = () => {
    switch (selectedSection) {
      case 1: // Personal Details
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

      case 2: // Story Details
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

      case 3: // Attachments
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
                      bgcolor: 'success.lighter'
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

      case 4: // Links & Proof
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

      case 5: // Editorial Trail
        return (
          <Box>
            <Stack spacing={2}>
              <Alert severity="info" icon={<VerifiedUser />}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Junior Editorial Notes
                </Typography>
                <Typography variant="body2">
                  {newsLead.juniorEditorialNotes}
                </Typography>
              </Alert>
              
              <Alert severity="success" icon={<Gavel />}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Senior Editorial Notes
                </Typography>
                <Typography variant="body2">
                  {newsLead.seniorEditorialNotes}
                </Typography>
              </Alert>
              
              <Alert severity="info" icon={<ScheduleIcon />}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Publisher Notes
                </Typography>
                <Typography variant="body2">
                  {newsLead.publisherNotes}
                </Typography>
              </Alert>
            </Stack>
          </Box>
        );

      case 6: // Publishing Details
        return (
          <Box>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CalendarToday fontSize="small" />
                    Published Date & Time
                  </Box>
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {newsLead.publishingDetails.publishedDateTime}
                </Typography>
              </Box>
              
              <Divider />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Public fontSize="small" />
                    Distribution Channels
                  </Box>
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {newsLead.publishingDetails.channels.map((channel, index) => (
                    <Chip 
                      key={index}
                      label={channel}
                      icon={getChannelIcon(channel)}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Box>
              
              <Divider />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Publishing Priority
                </Typography>
                <Chip 
                  label={newsLead.publishingDetails.priority}
                  color={newsLead.publishingDetails.priority === 'High' ? 'error' : 'info'}
                  size="small"
                  sx={{ mt: 0.5 }}
                />
              </Box>
              
              <Divider />
              
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Published By
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {newsLead.publishingDetails.publishedBy}
                </Typography>
              </Box>
            </Stack>
          </Box>
        );

      case 0: // Performance Metrics
        return (
          <Box>
            <Stack spacing={3}>
              {/* Overall Performance */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  Overall Performance
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={3}>
                    <Card sx={{ bgcolor: 'primary.lighter' }}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Visibility sx={{ fontSize: 32, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight={600}>
                          {newsLead.performanceMetrics.views.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Views
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Card sx={{ bgcolor: 'success.lighter' }}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <ThumbUp sx={{ fontSize: 32, color: 'success.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight={600}>
                          {newsLead.performanceMetrics.likes.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Likes
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Card sx={{ bgcolor: 'warning.lighter' }}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Share sx={{ fontSize: 32, color: 'warning.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight={600}>
                          {newsLead.performanceMetrics.shares.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Shares
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Card sx={{ bgcolor: 'info.lighter' }}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Comment sx={{ fontSize: 32, color: 'info.main', mb: 1 }} />
                        <Typography variant="h4" fontWeight={600}>
                          {newsLead.performanceMetrics.comments.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Comments
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
              
              <Divider />
              
              {/* Engagement Metrics */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                  Engagement Metrics
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: 'success.lighter' }}>
                      <Typography variant="caption" color="text.secondary">
                        Engagement Rate
                      </Typography>
                      <Typography variant="h5" fontWeight={600} color="success.main">
                        {newsLead.performanceMetrics.engagementRate}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 2, bgcolor: 'primary.lighter' }}>
                      <Typography variant="caption" color="text.secondary">
                        Reach Percentage
                      </Typography>
                      <Typography variant="h5" fontWeight={600} color="primary.main">
                        {newsLead.performanceMetrics.reachPercentage}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
              
              <Divider />
              
              {/* Channel Performance */}
              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                  Channel Performance Breakdown
                </Typography>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell><strong>Channel</strong></TableCell>
                        <TableCell align="right"><strong>Views</strong></TableCell>
                        <TableCell align="right"><strong>Engagement</strong></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {newsLead.channelPerformance.map((channel, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getChannelIcon(channel.channel)}
                              <Typography variant="body2">{channel.channel}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={500}>
                              {channel.views.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip 
                              label={channel.engagement}
                              size="small"
                              color={parseInt(channel.engagement) > 25 ? 'success' : 'primary'}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Stack>
          </Box>
        );

      case 7: // Channel Display
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
            <Alert severity="info" sx={{ mb: 2 }}>
              This is a read-only view of how the content was published across different channels.
            </Alert>
            <Box sx={{ position: 'relative' }}>
              {selectedChannel === 0 && (
                <Card sx={{ maxWidth: 500, mx: 'auto', bgcolor: '#0088cc', color: 'white' }}>
                  <CardMedia component="img" height="250" image="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800" alt="News preview" />
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} gutterBottom>{newsLead.storyDetails.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>{newsLead.storyDetails.description}</Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>📅 {newsLead.publishedDate} • 👁 {newsLead.performanceMetrics.views.toLocaleString()} views</Typography>
                  </CardContent>
                </Card>
              )}
              {selectedChannel === 1 && (
                <Paper sx={{ p: 3, maxWidth: 700, mx: 'auto', bgcolor: '#f5f5f0' }}>
                  <Box sx={{ borderBottom: 2, borderColor: 'black', pb: 1, mb: 2 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'serif' }}>THE DAILY NEWS</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(newsLead.publishedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={5}><Box component="img" src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400" alt="News" sx={{ width: '100%', height: 'auto', border: 1, borderColor: 'grey.300' }} /></Grid>
                    <Grid item xs={7}>
                      <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontFamily: 'serif' }}>{newsLead.storyDetails.title}</Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'serif', lineHeight: 1.6, textAlign: 'justify' }}>{newsLead.storyDetails.description}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              )}
              {selectedChannel === 2 && (
                <Paper sx={{ maxWidth: 800, mx: 'auto' }}>
                  <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}><Typography variant="h5" fontWeight={600}>News Portal</Typography></Box>
                  <Box sx={{ p: 3 }}>
                    <Chip label={newsLead.storyDetails.category} color="primary" size="small" sx={{ mb: 2 }} />
                    <Typography variant="h4" fontWeight={600} gutterBottom>{newsLead.storyDetails.title}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>By {newsLead.publishingDetails.publishedBy} • {newsLead.publishedDate} • {newsLead.performanceMetrics.views.toLocaleString()} views</Typography>
                    <Box component="img" src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800" alt="News" sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 1, mb: 2 }} />
                    <Typography variant="body1" sx={{ lineHeight: 1.8 }}>{newsLead.storyDetails.description}</Typography>
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
                  <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    <Typography variant="body2" gutterBottom><strong>&lt;item&gt;</strong></Typography>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body2"><strong>&lt;title&gt;</strong>{newsLead.storyDetails.title}<strong>&lt;/title&gt;</strong></Typography>
                      <Typography variant="body2"><strong>&lt;description&gt;</strong>{newsLead.storyDetails.description.substring(0, 100)}...<strong>&lt;/description&gt;</strong></Typography>
                      <Typography variant="body2"><strong>&lt;link&gt;</strong>https://newsportal.com/article/{newsId}<strong>&lt;/link&gt;</strong></Typography>
                      <Typography variant="body2"><strong>&lt;pubDate&gt;</strong>{new Date(newsLead.publishedDate).toUTCString()}<strong>&lt;/pubDate&gt;</strong></Typography>
                      <Typography variant="body2"><strong>&lt;category&gt;</strong>{newsLead.storyDetails.category}<strong>&lt;/category&gt;</strong></Typography>
                    </Box>
                    <Typography variant="body2"><strong>&lt;/item&gt;</strong></Typography>
                  </Box>
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
              Published - Audit View
            </Typography>
          </Box>
          <Chip 
            label="Published" 
            color="success" 
            icon={<CheckCircle />}
            sx={{ fontWeight: 600 }}
          />
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
              <Step key={step.label} completed={true}>
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
                        backgroundColor: 'success.main',
                        color: 'white',
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
                    <Box sx={{ 
                      fontSize: '20px', 
                      color: selectedSection === section.id ? 'primary.main' : 'text.secondary',
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
    </>
  );
}

// ==============================|| PUBLISHED NEWS LEADS PAGE ||============================== //

export default function PublishedNewsLeads() {
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
    const newsLead = publishedNewsLeads.find(n => n.id === parseInt(newsId));
    
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

