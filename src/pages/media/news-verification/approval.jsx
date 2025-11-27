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
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  ButtonGroup,
  Menu,
  MenuItem
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
  Spellcheck,
  Translate,
  PhotoLibrary,
  Telegram,
  Language,
  RssFeed,
  Tv,
  Notes,
  Send,
  Reply,
  ArrowDropDown,
  Undo
} from '@mui/icons-material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

// project imports
import MainCard from 'components/MainCard';
import useNewsVerificationStore from 'store/newsVerificationStore';

// Sample data - filtered for Approval status
const approvalNewsLeads = [
  {
    id: 2,
    title: 'Local Community Event Draws Large Crowd',
    submissionDate: '2024-11-24',
    currentStatus: 'Approval',
    statusColor: 'warning',
    sources: 'Social Media',
    assignedTo: 'Jane Smith',
    // Detailed information
    submitter: {
      fullName: 'Michael Chen',
      ic: 'S2345678B',
      address: '456 East Coast Road, #12-34, Singapore 654321',
      phone: '+65 8765 4321',
      email: 'michael.chen@email.com'
    },
    storyDetails: {
      title: 'Local Community Event Draws Large Crowd',
      description: 'A community event held at the local park attracted over 500 residents last weekend. The event featured food stalls, live performances, and activities for children. Organizers expressed satisfaction with the turnout and plan to make it an annual event.',
      category: 'Community',
      urgency: 'Medium',
      estimatedImpact: 'Moderate'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'event-crowd.jpg',
        url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
        description: 'Crowd at the community event',
        source: 'Own Databank'
      },
      {
        id: 2,
        type: 'image',
        name: 'food-stalls.jpg',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        description: 'Food stalls at the event',
        source: 'External - Unsplash (cited)'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://facebook.com/event/123456',
        description: 'Event Facebook page',
        verified: true
      }
    ],
    juniorEditorialNotes: `Junior Editorial Review - 24/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Social Media (Community Facebook Group)
Source Credibility: Moderate
Source Type: Community social media post
Source Verification: Confirmed authentic user account
Cross-Reference Status: Verified with 1 independent source (Event organizer)
Source Contact: Original poster contacted and verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 90/100 (Passed)
Key Facts Verified: 5/5
Claims Substantiated: All event details confirmed
Event Details: Verified with event organizers
Quotes Verification: All quotes attributed and verified
Contradictions Found: None
Independent Verification: Confirmed with event official website

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 8.5/10
Timeliness: 9/10 (Recent community event)
Public Interest: 8/10 (Strong local community interest)
Impact Assessment: High (Large community participation)
Audience Reach: Broad (Local community members)
Uniqueness: Moderate (Annual event with record attendance)
Local Relevance: Very High (Local community achievement)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 2
Images Verified: 2/2 (Event photos, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (Event official page)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate community coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: Medium (Community interest story)
Suggested Category: Community
Confidence Level: High
Notes: Well-verified community story with multiple sources. Event details confirmed through official channels. Ready for Senior Editorial review.`,
    editorialNotes: [
      {
        role: 'Junior Editorial',
        action: 'Submitted for Approval',
        timestamp: '2024-11-24 10:30 AM',
        content: `Junior Editorial Review - 24/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Social Media (Community Facebook Group)
Source Credibility: Moderate
Source Type: Community social media post
Source Verification: Confirmed authentic user account
Cross-Reference Status: Verified with 1 independent source (Event organizer)
Source Contact: Original poster contacted and verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 90/100 (Passed)
Key Facts Verified: 5/5
Claims Substantiated: All event details confirmed
Event Details: Verified with event organizers
Quotes Verification: All quotes attributed and verified
Contradictions Found: None
Independent Verification: Confirmed with event official website

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 8.5/10
Timeliness: 9/10 (Recent community event)
Public Interest: 8/10 (Strong local community interest)
Impact Assessment: High (Large community participation)
Audience Reach: Broad (Local community members)
Uniqueness: Moderate (Annual event with record attendance)
Local Relevance: Very High (Local community achievement)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 2
Images Verified: 2/2 (Event photos, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (Event official page)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate community coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: Medium (Community interest story)
Suggested Category: Community
Confidence Level: High
Notes: Well-verified community story with multiple sources. Event details confirmed through official channels. Ready for Senior Editorial review.`
      }
    ]
  },
  {
    id: 7,
    title: 'New Study Reveals Health Benefits',
    submissionDate: '2024-11-23',
    currentStatus: 'Approval',
    statusColor: 'warning',
    sources: 'Reporter',
    assignedTo: 'Mike Johnson',
    submitter: {
      fullName: 'Dr. Sarah Lim',
      ic: 'S3456789C',
      address: '789 Medical Drive, #03-12, Singapore 789012',
      phone: '+65 9876 5432',
      email: 'sarah.lim@research.sg'
    },
    storyDetails: {
      title: 'New Study Reveals Health Benefits of Mediterranean Diet',
      description: 'A recent study conducted by local researchers has found significant health benefits associated with the Mediterranean diet. The study, which tracked 1,000 participants over five years, showed improvements in cardiovascular health and reduced risk of chronic diseases.',
      category: 'Health',
      urgency: 'Medium',
      estimatedImpact: 'High'
    },
    attachments: [
      {
        id: 1,
        type: 'image',
        name: 'mediterranean-diet.jpg',
        url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
        description: 'Mediterranean diet foods',
        source: 'Own Databank'
      }
    ],
    links: [
      {
        id: 1,
        url: 'https://journal.healthresearch.sg/study/2024/mediterranean',
        description: 'Published research paper',
        verified: true
      }
    ],
    juniorEditorialNotes: `Junior Editorial Review - 23/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Reporter (Dr. Sarah Lim - Health Researcher)
Source Credibility: High
Source Type: Direct reporter submission with research credentials
Source Verification: Confirmed authentic researcher profile
Cross-Reference Status: Verified with 1 independent source (Research journal)
Source Contact: Direct contact with researcher verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 94/100 (Passed)
Key Facts Verified: 6/6
Claims Substantiated: All research findings confirmed
Research Details: Verified with published study
Quotes Verification: All quotes from lead researcher verified
Contradictions Found: None
Independent Verification: Confirmed with peer-reviewed journal publication

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 9.0/10
Timeliness: 8/10 (Recent research publication)
Public Interest: 9/10 (Health and wellness topic)
Impact Assessment: High (Affects public health awareness)
Audience Reach: Very Broad (Health-conscious population)
Uniqueness: High (Local research with significant findings)
Local Relevance: Very High (Local researchers and study)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 1
Images Verified: 1/1 (Mediterranean diet image, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (Research journal publication)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate scientific coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: Medium-High (Important health research)
Suggested Category: Health
Confidence Level: Very High
Notes: Excellent health story with credible research source. All findings verified through peer-reviewed publication. Ready for Senior Editorial review.`,
    editorialNotes: [
      {
        role: 'Junior Editorial',
        action: 'Submitted for Approval',
        timestamp: '2024-11-23 02:15 PM',
        content: `Junior Editorial Review - 23/11/2024

SOURCES VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Source: Reporter (Dr. Sarah Lim - Health Researcher)
Source Credibility: High
Source Type: Direct reporter submission with research credentials
Source Verification: Confirmed authentic researcher profile
Cross-Reference Status: Verified with 1 independent source (Research journal)
Source Contact: Direct contact with researcher verified

FACT-CHECKING ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Accuracy Score: 94/100 (Passed)
Key Facts Verified: 6/6
Claims Substantiated: All research findings confirmed
Research Details: Verified with published study
Quotes Verification: All quotes from lead researcher verified
Contradictions Found: None
Independent Verification: Confirmed with peer-reviewed journal publication

NEWSWORTHY ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Relevance Score: 9.0/10
Timeliness: 8/10 (Recent research publication)
Public Interest: 9/10 (Health and wellness topic)
Impact Assessment: High (Affects public health awareness)
Audience Reach: Very Broad (Health-conscious population)
Uniqueness: High (Local research with significant findings)
Local Relevance: Very High (Local researchers and study)

CONTENT INTEGRITY CHECK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Attachments: 1
Images Verified: 1/1 (Mediterranean diet image, properly sourced)
Videos Verified: N/A
Documents Verified: N/A
Links Provided: 1
Links Verified: 1/1 (Research journal publication)
Copyright Status: All media cleared for use
Attribution: Properly attributed

EDITORIAL STANDARDS COMPLIANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Objectivity: Maintained throughout
Balance: Appropriate scientific coverage
Sensitivity Check: No sensitive content issues
Legal Review: No legal concerns identified
Ethical Standards: All standards met

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Status: APPROVED for Senior Editorial Review
Priority: Medium-High (Important health research)
Suggested Category: Health
Confidence Level: Very High
Notes: Excellent health story with credible research source. All findings verified through peer-reviewed publication. Ready for Senior Editorial review.`
      }
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
    icon: <VerifiedUser style={{ fontSize: '20px' }} />
  },
  {
    label: 'Published',
    icon: <Newspaper style={{ fontSize: '20px' }} />
  }
];

// AI Senior Editorial Checks Data
const aiSeniorEditorialChecks = {
  verificationProcess: {
    status: 'success',
    items: [
      { label: 'Source verification completed', status: 'verified', message: 'All sources have been properly verified by Junior Editorial' },
      { label: 'Fact-checking performed', status: 'verified', message: 'Facts cross-referenced with multiple sources' },
      { label: 'Credibility assessment done', status: 'verified', message: 'Submitter and source credibility confirmed' }
    ]
  },
  grammar: {
    status: 'warning',
    issues: [
      { text: 'Consider revising: "attracted over 500 residents" → "attracted more than 500 residents"', severity: 'suggestion' },
      { text: 'Passive voice detected: "A community event held at" → Consider active voice', severity: 'suggestion' }
    ],
    verified: [
      { text: 'No spelling errors detected' },
      { text: 'Punctuation is correct' },
      { text: 'Sentence structure is clear' }
    ]
  },
  tonality: {
    status: 'success',
    score: 9.2,
    factors: [
      { label: 'Neutrality', value: 9.5, description: 'Language is objective and unbiased' },
      { label: 'Singapore Standard', value: 9.0, description: 'Adheres to local editorial standards' },
      { label: 'Professionalism', value: 9.0, description: 'Maintains professional tone throughout' }
    ]
  },
  images: {
    status: 'warning',
    flags: [
      {
        type: 'success',
        text: 'Image 1: "event-crowd.jpg" - From own databank, properly sourced'
      },
      {
        type: 'warning',
        text: 'Image 2: "food-stalls.jpg" - External source (Unsplash). Citation needed in caption.'
      }
    ]
  }
};

// ==============================|| NEWS LEAD DETAIL VIEW COMPONENT ||============================== //

function NewsLeadDetailView({ newsLead, newsId, navigate }) {
  const [selectedSection, setSelectedSection] = useState(0);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeStep] = useState(1); // Current step in verification process (Approval = step 1)
  const [selectedChannel, setSelectedChannel] = useState(0);
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('approve'); // 'approve', 'reject', 'pushback', 'revert'
  const [editorialNote, setEditorialNote] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const updateNewsLead = useNewsVerificationStore((state) => state.updateNewsLead);

  const sections = [
    { id: 0, name: 'Personal Details', icon: <PersonIcon /> },
    { id: 1, name: 'Story Details', icon: <Article /> },
    { id: 2, name: 'Attachments', icon: <AttachFile /> },
    { id: 3, name: 'Links & Proof', icon: <LinkIcon /> },
    { id: 4, name: 'Editorial Notes', icon: <Notes /> },
    { id: 5, name: 'Channel Display', icon: <Tv /> }
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

  // Generate AI-suggested editorial note for different actions
  const generateAISuggestedNote = (action) => {
    const grammarStatus = aiSeniorEditorialChecks.grammar.status === 'success' ? 'Passed (100%)' : 'Minor suggestions needed';
    const readabilityScore = aiSeniorEditorialChecks.tonality.score >= 8 ? '8.5/10' : '7.5/10';
    const qualityRating = aiSeniorEditorialChecks.tonality.score >= 8 ? `${aiSeniorEditorialChecks.tonality.score}/10` : '7.5/10';

    const baseInfo = `Senior Editorial Review - ${new Date().toLocaleDateString()}

PREVIOUS REVIEW STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Junior Editorial Status: Verified and Approved
Junior Editorial Score: ${newsLead.juniorEditorialNotes ? '8.5/10' : 'N/A'}
Verification Quality: ${newsLead.juniorEditorialNotes ? 'Thorough and comprehensive' : 'Pending'}
Issues Flagged: None

LANGUAGE & GRAMMAR REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Grammar Check: ${grammarStatus}
Spelling: No errors found
Punctuation: Correct throughout
Sentence Structure: Clear and professional
Readability Score: ${readabilityScore} (Appropriate for general audience)
Language Level: Professional journalism standard

TONE & STYLE ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Overall Tonality Score: ${aiSeniorEditorialChecks.tonality.score}/10
Tone Appropriateness: ${aiSeniorEditorialChecks.tonality.score >= 8 ? 'Excellent' : 'Good'} (${aiSeniorEditorialChecks.tonality.score >= 8 ? 'Professional and engaging' : 'Needs minor adjustments'})
Category Alignment: Perfect fit for ${newsLead.storyDetails.category} category
Brand Voice: Consistent with publication standards
Emotional Balance: Well-balanced
Objectivity: Maintained throughout

VISUAL CONTENT REVIEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image Quality: ${aiSeniorEditorialChecks.images.status === 'success' ? 'High resolution, publication-ready' : 'Needs improvement'}
Image Relevance: Directly related to story
Image Sources: ${aiSeniorEditorialChecks.images.status === 'success' ? 'All verified and documented' : 'Needs verification'}
Copyright Clearance: ${aiSeniorEditorialChecks.images.status === 'success' ? 'Confirmed' : 'Pending'}
Attribution: ${aiSeniorEditorialChecks.images.status === 'success' ? 'Properly cited' : 'Needs attention'}
Visual Appeal: ${aiSeniorEditorialChecks.images.status === 'success' ? 'Strong visual impact' : 'Acceptable'}

HEADLINE & STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Headline Effectiveness: ${aiSeniorEditorialChecks.tonality.score >= 8 ? 'Strong, clear, engaging' : 'Clear and informative'}
SEO Optimization: Good keyword usage
Story Structure: Well-organized, logical flow
Lead Paragraph: ${aiSeniorEditorialChecks.grammar.status === 'success' ? 'Captures key information effectively' : 'Needs refinement'}
Supporting Details: Comprehensive and relevant

FINAL EDITORIAL DECISION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    if (action === 'approve') {
      return baseInfo + `Decision: APPROVED FOR PUBLICATION
Confidence Level: ${aiSeniorEditorialChecks.grammar.status === 'success' && aiSeniorEditorialChecks.tonality.score >= 8 ? 'Very High' : 'High'}
Quality Rating: ${qualityRating}
Publication Priority: ${aiSeniorEditorialChecks.tonality.score >= 8 ? 'High' : 'Medium'}
Recommended Timing: ${newsLead.storyDetails.urgency === 'High' ? 'Immediate publication' : 'Next available slot'}

PUBLICATION NOTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ All editorial standards met
✓ Content ready for scheduling and publication
✓ Grammar and language: Professional and clear
✓ Tone: Appropriate and engaging for ${newsLead.storyDetails.category} category
✓ Image citations: Properly attributed with source documentation
✓ Facts: Cross-verified and accurate
✓ Legal clearance: No concerns
✓ Ethical standards: Fully compliant

This story meets all publication criteria and is cleared for scheduling. ${aiSeniorEditorialChecks.tonality.score >= 8 ? 'Excellent quality content ready for prominent placement.' : 'Good quality content suitable for publication.'}

Approved by: Senior Editorial Team
Ready for: Publisher scheduling`;
    } else if (action === 'reject') {
      return baseInfo + `Decision: REJECTED

REJECTION RATIONALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Reason: [Please specify the main reason for rejection]

SPECIFIC ISSUES IDENTIFIED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Source credibility concerns
□ Factual inaccuracies
□ Insufficient verification
□ Legal/ethical concerns
□ Does not meet publication standards
□ Other: [Specify]

DETAILED EXPLANATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Please provide detailed explanation of why this news lead does not meet our publication standards]

RECOMMENDATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This news lead does not meet our publication standards and is not suitable for publication at this time.`;
    } else if (action === 'pushback') {
      return baseInfo + `Decision: RETURNED TO JUNIOR EDITORIAL

REVISION REQUIREMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Priority: Medium
Expected Turnaround: 24-48 hours

AREAS REQUIRING ATTENTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Additional source verification needed
□ Fact-checking improvements required
□ Content structure needs refinement
□ Image quality/attribution issues
□ Grammar/language improvements needed
□ Other: [Specify]

SPECIFIC REVISION REQUESTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Please specify what needs to be revised in detail]

GUIDANCE FOR JUNIOR EDITORIAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Please address the above concerns and resubmit for review. If you need clarification on any points, please reach out to the Senior Editorial team.`;
    } else if (action === 'revert') {
      return baseInfo + `Decision: REVERTED TO UNVERIFIED

REVERT RATIONALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Primary Reason: [Please specify the main reason for reverting]

VERIFICATION CONCERNS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
□ Source credibility needs re-verification
□ New information contradicts original story
□ Additional fact-checking required
□ Legal concerns identified
□ Ethical issues discovered
□ Other: [Specify]

DETAILED EXPLANATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Please provide detailed explanation of why this news lead requires additional verification]

NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This news lead requires comprehensive re-verification before it can proceed through the editorial process. Junior Editorial team should conduct thorough additional verification and resubmit.`;
    }
  };

  const handleProceed = () => {
    // Open modal for Senior Editorial to add approval notes
    setModalAction('approve');
    const aiSuggestion = generateAISuggestedNote('approve');
    setEditorialNote(aiSuggestion);
    setNotesModalOpen(true);
  };

  const handleReject = () => {
    setModalAction('reject');
    const aiSuggestion = generateAISuggestedNote('reject');
    setEditorialNote(aiSuggestion);
    setNotesModalOpen(true);
  };

  const handlePushBack = () => {
    setModalAction('pushback');
    const aiSuggestion = generateAISuggestedNote('pushback');
    setEditorialNote(aiSuggestion);
    setNotesModalOpen(true);
  };

  const handleRevert = () => {
    setModalAction('revert');
    const aiSuggestion = generateAISuggestedNote('revert');
    setEditorialNote(aiSuggestion);
    setNotesModalOpen(true);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuAction = (action) => {
    handleMenuClose();
    if (action === 'reject') {
      handleReject();
    } else if (action === 'revert') {
      handleRevert();
    }
  };

  const handleConfirmAction = () => {
    if (!editorialNote.trim()) {
      return;
    }

    const timestamp = new Date().toLocaleString('en-SG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const existingNotes = Array.isArray(newsLead.editorialNotes) ? newsLead.editorialNotes : [];
    const seniorNote = {
      role: 'Senior Editorial',
      action:
        modalAction === 'approve'
          ? 'Approved'
          : modalAction === 'pushback'
            ? 'Returned'
            : modalAction === 'revert'
              ? 'Reverted'
              : 'Rejected',
      timestamp,
      content: editorialNote
    };

    let navigationTarget = '/media/news-verification';
    const updates = {
      seniorEditorialNotes: editorialNote,
      editorialNotes: [...existingNotes, seniorNote]
    };

    if (modalAction === 'approve') {
      updates.currentStatus = 'Schedule';
      updates.statusColor = 'info';
      navigationTarget = `/media/news-verification/schedule/${newsId}`;
    } else if (modalAction === 'pushback' || modalAction === 'revert') {
      updates.currentStatus = 'Unverified';
      updates.statusColor = 'error';
      navigationTarget = `/media/news-verification/unverified/${newsId}`;
    } else if (modalAction === 'reject') {
      updates.currentStatus = 'Rejected';
      updates.statusColor = 'default';
    }

    updateNewsLead(newsLead.id, updates);
    setNotesModalOpen(false);
    navigate(navigationTarget, { state: { newsLead: { ...newsLead, ...updates } } });
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
                {isEditing ? (
                  <TextField
                    fullWidth
                    defaultValue={newsLead.storyDetails.title}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="h6" fontWeight={500}>
                    {newsLead.storyDetails.title}
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
                    defaultValue={newsLead.storyDetails.description}
                    variant="outlined"
                    size="small"
                  />
                ) : (
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {newsLead.storyDetails.description}
                  </Typography>
                )}
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
                  color={newsLead.storyDetails.urgency === 'Critical' ? 'error' : 'warning'}
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
                      borderColor: attachment.source?.includes('Own Databank') ? 'success.main' : 'warning.main',
                      bgcolor: attachment.source?.includes('Own Databank') ? 'success.lighter' : 'warning.lighter',
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
                        color={attachment.source?.includes('Own Databank') ? 'success' : 'warning'}
                        icon={<PhotoLibrary style={{ fontSize: '16px' }} />}
                      />
                      <Button size="small" variant="outlined" fullWidth>
                        View Full Size
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {(!newsLead.attachments || newsLead.attachments.length === 0) && (
              <Alert severity="info">
                No attachments provided for this news lead.
              </Alert>
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
                        <Chip
                          label="Verified"
                          size="small"
                          color="success"
                          icon={<CheckCircle style={{ fontSize: '16px' }} />}
                        />
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
                    <Button size="small" variant="outlined">
                      Open Link
                    </Button>
                  </Stack>
                </Paper>
              ))}
            </Stack>
            {(!newsLead.links || newsLead.links.length === 0) && (
              <Alert severity="info">
                No reference links provided for this news lead.
              </Alert>
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
                        color={
                          note.action === 'Approved' || note.action === 'Submitted for Approval' ? 'success' :
                          note.action === 'Rejected' ? 'error' :
                          'warning'
                        }
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
                No editorial notes yet. Notes will appear here when this news lead is reviewed.
              </Alert>
            )}
          </Box>
        );

      case 5: // Channel Display
        return (
          <Box>
            {/* Channel Tabs */}
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

            {/* Channel Content Preview */}
            <Box sx={{ position: 'relative' }}>
              {/* Edit Button */}
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

              {/* Telegram Preview */}
              {selectedChannel === 0 && (
                <Card sx={{ maxWidth: 500, mx: 'auto', bgcolor: '#0088cc', color: 'white' }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                    alt="News preview"
                  />
                  <CardContent>
                    {isEditingChannel ? (
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label="Title"
                          defaultValue={newsLead.storyDetails.title}
                          variant="filled"
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.1)', input: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                        />
                        <TextField
                          fullWidth
                          multiline
                          rows={4}
                          label="Description"
                          defaultValue={newsLead.storyDetails.description}
                          variant="filled"
                          size="small"
                          sx={{ bgcolor: 'rgba(255,255,255,0.1)', textarea: { color: 'white' }, label: { color: 'rgba(255,255,255,0.7)' } }}
                        />
                      </Stack>
                    ) : (
                      <>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {newsLead.storyDetails.title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {newsLead.storyDetails.description}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', mt: 2, opacity: 0.7 }}>
                          📅 {new Date().toLocaleDateString()} • 👁 1.2K views
                        </Typography>
                      </>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Newspaper Preview */}
              {selectedChannel === 1 && (
                <Paper sx={{ p: 3, maxWidth: 700, mx: 'auto', bgcolor: '#f5f5f0' }}>
                  <Box sx={{ borderBottom: 2, borderColor: 'black', pb: 1, mb: 2 }}>
                    <Typography variant="h4" fontWeight={700} sx={{ fontFamily: 'serif' }}>
                      THE DAILY NEWS
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Box
                        component="img"
                        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400"
                        alt="News"
                        sx={{ width: '100%', height: 'auto', border: 1, borderColor: 'grey.300' }}
                      />
                    </Grid>
                    <Grid item xs={7}>
                      {isEditingChannel ? (
                        <Stack spacing={1}>
                          <TextField
                            fullWidth
                            label="Headline"
                            defaultValue={newsLead.storyDetails.title}
                            variant="outlined"
                            size="small"
                          />
                          <TextField
                            fullWidth
                            multiline
                            rows={6}
                            label="Article Content"
                            defaultValue={newsLead.storyDetails.description}
                            variant="outlined"
                            size="small"
                          />
                        </Stack>
                      ) : (
                        <>
                          <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontFamily: 'serif' }}>
                            {newsLead.storyDetails.title}
                          </Typography>
                          <Typography variant="body2" sx={{ fontFamily: 'serif', lineHeight: 1.6, textAlign: 'justify' }}>
                            {newsLead.storyDetails.description}
                          </Typography>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Paper>
              )}

              {/* Website Preview */}
              {selectedChannel === 2 && (
                <Paper sx={{ maxWidth: 800, mx: 'auto' }}>
                  <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
                    <Typography variant="h5" fontWeight={600}>
                      News Portal
                    </Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Chip label={newsLead.storyDetails.category} color="primary" size="small" sx={{ mb: 2 }} />
                    {isEditingChannel ? (
                      <Stack spacing={2}>
                        <TextField
                          fullWidth
                          label="Article Title"
                          defaultValue={newsLead.storyDetails.title}
                          variant="outlined"
                        />
                        <Box
                          component="img"
                          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                          alt="News"
                          sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 1 }}
                        />
                        <TextField
                          fullWidth
                          multiline
                          rows={6}
                          label="Article Body"
                          defaultValue={newsLead.storyDetails.description}
                          variant="outlined"
                        />
                      </Stack>
                    ) : (
                      <>
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                          {newsLead.storyDetails.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                          By Staff Writer • {new Date().toLocaleDateString()} • 3 min read
                        </Typography>
                        <Box
                          component="img"
                          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800"
                          alt="News"
                          sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 1, mb: 2 }}
                        />
                        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                          {newsLead.storyDetails.description}
                        </Typography>
                      </>
                    )}
                  </Box>
                </Paper>
              )}

              {/* RSS Feed Preview */}
              {selectedChannel === 3 && (
                <Paper sx={{ maxWidth: 600, mx: 'auto', p: 3, bgcolor: '#fff8e1' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <RssFeed color="warning" />
                    <Typography variant="h6" fontWeight={600}>
                      RSS Feed Preview
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  {isEditingChannel ? (
                    <Stack spacing={2}>
                      <TextField
                        fullWidth
                        label="Feed Title"
                        defaultValue={newsLead.storyDetails.title}
                        variant="outlined"
                        size="small"
                      />
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Feed Description"
                        defaultValue={newsLead.storyDetails.description}
                        variant="outlined"
                        size="small"
                      />
                      <TextField
                        fullWidth
                        label="Feed Link"
                        defaultValue="https://newsportal.com/article/123"
                        variant="outlined"
                        size="small"
                      />
                    </Stack>
                  ) : (
                    <Box sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                      <Typography variant="body2" gutterBottom>
                        <strong>&lt;item&gt;</strong>
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2">
                          <strong>&lt;title&gt;</strong>{newsLead.storyDetails.title}<strong>&lt;/title&gt;</strong>
                        </Typography>
                        <Typography variant="body2">
                          <strong>&lt;description&gt;</strong>{newsLead.storyDetails.description.substring(0, 100)}...<strong>&lt;/description&gt;</strong>
                        </Typography>
                        <Typography variant="body2">
                          <strong>&lt;link&gt;</strong>https://newsportal.com/article/123<strong>&lt;/link&gt;</strong>
                        </Typography>
                        <Typography variant="body2">
                          <strong>&lt;pubDate&gt;</strong>{new Date().toUTCString()}<strong>&lt;/pubDate&gt;</strong>
                        </Typography>
                        <Typography variant="body2">
                          <strong>&lt;category&gt;</strong>{newsLead.storyDetails.category}<strong>&lt;/category&gt;</strong>
                        </Typography>
                      </Box>
                      <Typography variant="body2">
                        <strong>&lt;/item&gt;</strong>
                      </Typography>
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
              Senior Editorial Review
            </Typography>
          </Box>
          <ButtonGroup variant="contained" color="success">
            <Button
              color="success"
              startIcon={<CheckCircle />}
              onClick={handleProceed}
            >
              Approved
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
            <MenuItem onClick={() => handleMenuAction('reject')}>
              <Cancel sx={{ mr: 1, color: 'error.main' }} />
              <Typography color="error">Reject News Leads</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleMenuAction('revert')}>
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
                {selectedSection === 1 && (
                  <IconButton
                    size="small"
                    color={isEditing ? 'primary' : 'default'}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit />
                  </IconButton>
                )}
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

      {/* Floating Action Button - AI Senior Editorial Assistant */}
      <Tooltip title="AI Senior Editorial Assistant" placement="left">
        <Fab
          color="primary"
          aria-label="ai senior editorial assistant"
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
              aiSeniorEditorialChecks.grammar.status === 'warning' ||
              aiSeniorEditorialChecks.images.status === 'warning' ? '!' : 0
            }
            color="error"
          >
            <AutoAwesome />
          </MuiBadge>
        </Fab>
      </Tooltip>

      {/* AI Senior Editorial Assistant Drawer */}
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
            <Typography variant="h4">AI Editorial Assistant</Typography>
          </Box>
          <IconButton onClick={() => setAiDrawerOpen(false)} size="small">
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button
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
              border: 'none',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5568d3 0%, #63408b 50%, #1976d2 100%)',
                boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)',
                transform: 'translateY(-1px)',
                border: 'none'
              },
              transition: 'all 0.2s'
            }}
          >
            Regenerate AI Notes
          </Button>
        </Box>

        <Stack spacing={2}>
          {/* Verification Process Check */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {getCheckStatusIcon(aiSeniorEditorialChecks.verificationProcess.status)}
                <Typography variant="subtitle1" fontWeight="bold">
                  Previous Verification Steps
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {aiSeniorEditorialChecks.verificationProcess.items.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {getCheckStatusIcon(item.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.message}
                      primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Grammar & Language Check */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                {getCheckStatusIcon(aiSeniorEditorialChecks.grammar.status)}
                <Spellcheck fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Grammar & Language
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1.5}>
                {aiSeniorEditorialChecks.grammar.verified.map((item, index) => (
                  <Alert
                    key={index}
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{ py: 0.5 }}
                  >
                    <Typography variant="body2">
                      {item.text}
                    </Typography>
                  </Alert>
                ))}
                {aiSeniorEditorialChecks.grammar.issues.map((issue, index) => (
                  <Alert
                    key={index}
                    severity="warning"
                    icon={<Warning />}
                    sx={{ py: 0.5 }}
                  >
                    <Typography variant="body2">
                      {issue.text}
                    </Typography>
                  </Alert>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Tonality Check */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                {getCheckStatusIcon(aiSeniorEditorialChecks.tonality.status)}
                <Translate fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Tonality Score: {aiSeniorEditorialChecks.tonality.score}/10
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {aiSeniorEditorialChecks.tonality.factors.map((factor, index) => (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {factor.label}
                      </Typography>
                      <Typography variant="body2" color="primary" fontWeight={600}>
                        {factor.value}/10
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {factor.description}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Image Source Check */}
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1 }}>
                {getCheckStatusIcon(aiSeniorEditorialChecks.images.status)}
                <PhotoLibrary fontSize="small" />
                <Typography variant="subtitle1" fontWeight="bold">
                  Image Sources & Citations
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1.5}>
                {aiSeniorEditorialChecks.images.flags.map((flag, index) => (
                  <Alert
                    key={index}
                    severity={flag.type}
                    icon={flag.type === 'success' ? <CheckCircle /> : <Warning />}
                    sx={{ py: 0.5 }}
                  >
                    <Typography variant="body2">
                      {flag.text}
                    </Typography>
                  </Alert>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>

          {/* Action Buttons */}
          <Divider />
          <Stack spacing={1.5}>
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckCircle />}
              fullWidth
              onClick={() => {
                setAiDrawerOpen(false);
                handleProceed();
              }}
            >
              Approve & Move to Schedule
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<Reply />}
              fullWidth
              onClick={() => {
                setAiDrawerOpen(false);
                handlePushBack();
              }}
            >
              Push Back to Junior Editorial
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Cancel />}
              fullWidth
              onClick={() => {
                setAiDrawerOpen(false);
                handleReject();
              }}
            >
              Reject News Lead
            </Button>
          </Stack>
        </Stack>
      </Drawer>

      {/* Editorial Notes Modal */}
      <Dialog
        open={notesModalOpen}
        onClose={() => setNotesModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Notes
              color={
                modalAction === 'approve' ? 'success' :
                modalAction === 'reject' ? 'error' :
                modalAction === 'revert' ? 'primary' :
                'warning'
              }
            />
            <Typography variant="h5">
              {modalAction === 'approve' ? 'Approve News Lead' :
               modalAction === 'reject' ? 'Reject News Lead' :
               modalAction === 'revert' ? 'Revert News Lead' :
               'Return to Junior Editorial'}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {modalAction === 'approve' ? 'Add approval notes and proceed to scheduling' :
             modalAction === 'reject' ? 'Document the reason for rejection' :
             modalAction === 'revert' ? 'Specify the reason for reverting to unverified status' :
             'Specify what needs to be revised'}
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Alert
              severity={
                modalAction === 'approve' ? 'success' :
                modalAction === 'reject' ? 'error' :
                modalAction === 'revert' ? 'info' :
                'warning'
              }
              icon={<AutoAwesome />}
            >
              The notes below have been pre-filled by AI based on your editorial checks. Please review and edit as needed.
            </Alert>
            <TextField
              fullWidth
              multiline
              rows={14}
              label="Senior Editorial Notes"
              value={editorialNote}
              onChange={(e) => setEditorialNote(e.target.value)}
              variant="outlined"
              placeholder="Enter your editorial notes here..."
              helperText="These notes will be visible in the editorial conversation thread and may be seen by Junior Editorial if pushed back."
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button
            onClick={() => setNotesModalOpen(false)}
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              const aiSuggestion = generateAISuggestedNote(modalAction);
              setEditorialNote(aiSuggestion);
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
            Regenerate AI Notes
          </Button>
          <Button
            onClick={handleConfirmAction}
            variant="contained"
            color={
              modalAction === 'approve' ? 'success' :
              modalAction === 'reject' ? 'error' :
              modalAction === 'revert' ? 'primary' :
              'warning'
            }
            endIcon={<Send />}
            disabled={!editorialNote.trim()}
          >
            {modalAction === 'approve' ? 'Confirm & Approve' :
             modalAction === 'reject' ? 'Confirm Rejection' :
             modalAction === 'revert' ? 'Confirm Revert' :
             'Confirm & Push Back'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

// ==============================|| APPROVAL NEWS LEADS PAGE ||============================== //

export default function ApprovalNewsLeads() {
  const navigate = useNavigate();
  const { newsId } = useParams();
  const location = useLocation();
  const stateLead = location.state?.newsLead;

  // If no newsId, redirect to main news verification page
  useEffect(() => {
    if (!newsId) {
      navigate('/media/news-verification', { replace: true });
    }
  }, [newsId, navigate]);

  // If newsId is provided, show detail view
  if (newsId) {
    const parsedNewsId = Number.parseInt(newsId, 10);
    const newsLeadFromList = Number.isNaN(parsedNewsId)
      ? undefined
      : approvalNewsLeads.find((n) => n.id === parsedNewsId);
    const newsLead = stateLead && stateLead.id === parsedNewsId ? stateLead : newsLeadFromList;

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

