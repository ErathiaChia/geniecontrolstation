// material-ui
import { 
  Grid, 
  Typography, 
  Box, 
  Divider, 
  Button, 
  Chip, 
  TextField, 
  Rating,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Alert,
  LinearProgress
} from '@mui/material';
import { 
  ArrowBack,
  CheckCircle,
  Warning,
  Cancel,
  Info,
  TrendingUp,
  School,
  Code,
  WorkOutline,
  Build,
  AutoAwesome,
  ArrowForward
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

// project imports
import MainCard from 'components/MainCard';
import ApplicationStepper from 'components/ApplicationStepper';

// ==============================|| CANDIDATE SCREENING PAGE ||============================== //

export default function CandidateScreening() {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  const handleBack = () => {
    navigate('/process/application');
  };

  const handleProceed = () => {
    // TODO: Add logic to proceed to next stage
    console.log('Proceeding to next stage');
    navigate(`/process/approval/${candidateId}`);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Mock AI Assessment Data
  const aiAssessment = {
    overallMatch: 85,
    discrepancies: 2,
    overview: {
      strengths: [
        'Strong technical background in curriculum design',
        'Demonstrated experience in adult learning',
        'Good alignment with educational technology'
      ],
      weaknesses: [
        'Limited explicit mention of coaching methodologies',
        'Could elaborate more on digital tool proficiency'
      ],
      overallRecommendation: 'Strong candidate with minor gaps that can be addressed through interview verification.'
    },
    domainRelevancy: [
      {
        domain: 'Curriculum Design',
        status: 'aligned',
        evidence: 'Evidence found in "Projects" section.',
        reasoning: 'The candidate has explicitly mentioned curriculum design experience with specific examples of developing educational programs.',
        confidence: 95
      },
      {
        domain: 'Adult Learning Principles',
        status: 'aligned',
        evidence: 'Inferred from "M.Sc in Adult Learning".',
        reasoning: 'Educational background directly aligns with adult learning theory and practice.',
        confidence: 90
      },
      {
        domain: 'Digital Literacy',
        status: 'partial',
        evidence: 'Partial evidence found: "blended learning".',
        reasoning: 'The CV mentions blended learning which indicates familiarity with digital methods, but lacks explicit mention of specific digital tools, platforms, or software proficiency (e.g., LMS, e-authoring tools).',
        confidence: 60
      },
      {
        domain: 'Coaching and Mentoring',
        status: 'mismatch',
        evidence: 'No direct evidence found in the document.',
        reasoning: 'While teaching experience is evident, there is no explicit mention of coaching or mentoring methodologies, frameworks, or certifications.',
        confidence: 30
      }
    ],
    technicalSkills: [
      {
        skill: 'Learning Management Systems (LMS)',
        status: 'partial',
        evidence: 'Implied from blended learning experience',
        proficiencyLevel: 'Intermediate (inferred)',
        yearsOfExperience: 'Not specified',
        tools: ['Generic LMS experience implied'],
        reasoning: 'Blended learning typically requires LMS usage, but no specific platforms mentioned.',
        confidence: 50
      },
      {
        skill: 'Instructional Design Tools',
        status: 'unknown',
        evidence: 'Not mentioned',
        proficiencyLevel: 'Unknown',
        yearsOfExperience: 'Not specified',
        tools: ['Not specified'],
        reasoning: 'No mention of tools like Articulate, Captivate, or similar e-learning authoring tools.',
        confidence: 20
      },
      {
        skill: 'Data Analytics for Education',
        status: 'partial',
        evidence: 'Academic background suggests analytical capability',
        proficiencyLevel: 'Basic (inferred)',
        yearsOfExperience: 'Not specified',
        tools: ['Not specified'],
        reasoning: 'Graduate-level education suggests research and analytical skills, but no explicit mention of data analytics tools or educational data analysis.',
        confidence: 40
      }
    ],
    certifications: [
      {
        certification: 'Teaching Credential',
        status: 'found',
        validity: 'Valid',
        issuingBody: 'State Education Board',
        evidence: 'Listed in Certifications section',
        reasoning: 'Valid teaching certification demonstrates professional qualification in education.',
        confidence: 100
      },
      {
        certification: 'Instructional Design Certificate',
        status: 'not_found',
        validity: 'N/A',
        issuingBody: 'N/A',
        evidence: 'Not mentioned',
        reasoning: 'No professional instructional design certification found. Recommend verifying if equivalent certifications exist.',
        confidence: 0
      },
      {
        certification: 'Digital Pedagogy Certification',
        status: 'not_found',
        validity: 'N/A',
        issuingBody: 'N/A',
        evidence: 'Not mentioned',
        reasoning: 'No specific digital pedagogy or educational technology certifications found.',
        confidence: 0
      }
    ]
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
              Evaluate candidate qualifications.
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
          <ApplicationStepper activeStep={1} />
        </Box>
      </Box>

      {/* Two Column Layout */}
      <Grid container spacing={1} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, minHeight: 600, alignItems: 'stretch' }}>
        {/* Left Column - AI Assessment Tabs (1/3) */}
        <Grid item xs={12} md={3} sx={{ flexShrink: 0, maxWidth: { md: '25%' }, display: 'flex' }}>
          <MainCard sx={{ 
            height: '100%', 
            p: 2, 
            width: '100%',
            border: '1px solid',
            borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderImageSlice: 1
          }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              AI Analysis
            </Typography>

            {/* Overall Match Score */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 2, 
                textAlign: 'center',
                bgcolor: 'primary.lighter',
                border: 1,
                borderColor: 'primary.main',
                borderRadius: 1
              }}
            >
              <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                {aiAssessment.overallMatch}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {aiAssessment.discrepancies} Discrepancies Found
              </Typography>
            </Paper>

            {/* Assessment Items */}
            <Stack spacing={1.5}>
              {/* Overview Assessment */}
              <Paper 
                elevation={activeTab === 0 ? 4 : 0}
                sx={{ 
                  p: 1.5,
                  border: activeTab === 0 ? 2 : 1,
                  borderColor: activeTab === 0 ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  bgcolor: activeTab === 0 ? 'primary.lighter' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: activeTab === 0 ? 'primary.lighter' : 'grey.50', borderColor: 'primary.main' }
                }}
                onClick={() => setActiveTab(0)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <CheckCircle sx={{ fontSize: 20, mr: 1, color: activeTab === 0 ? 'primary.main' : 'text.secondary' }} />
                  <Typography variant="subtitle2" fontWeight={activeTab === 0 ? 600 : 400}>
                    Overview Assessment
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3.5 }}>
                  General match analysis
                </Typography>
                <Box sx={{ ml: 3.5, mt: 0.5 }}>
                  <Chip label="85% Match" size="small" color="success" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Box>
              </Paper>

              {/* Domain Relevancy */}
              <Paper 
                elevation={activeTab === 1 ? 4 : 0}
                sx={{ 
                  p: 1.5,
                  border: activeTab === 1 ? 2 : 1,
                  borderColor: activeTab === 1 ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  bgcolor: activeTab === 1 ? 'primary.lighter' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: activeTab === 1 ? 'primary.lighter' : 'grey.50', borderColor: 'primary.main' }
                }}
                onClick={() => setActiveTab(1)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Build sx={{ fontSize: 20, mr: 1, color: activeTab === 1 ? 'primary.main' : 'text.secondary' }} />
                  <Typography variant="subtitle2" fontWeight={activeTab === 1 ? 600 : 400}>
                    Domain Relevancy
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3.5 }}>
                  2 aligned, 1 partial, 1 mismatch
                </Typography>
                <Box sx={{ ml: 3.5, mt: 0.5 }}>
                  <Chip label="Partial Match" size="small" color="warning" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Box>
              </Paper>

              {/* Technical Skills */}
              <Paper 
                elevation={activeTab === 2 ? 4 : 0}
                sx={{ 
                  p: 1.5,
                  border: activeTab === 2 ? 2 : 1,
                  borderColor: activeTab === 2 ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  bgcolor: activeTab === 2 ? 'primary.lighter' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: activeTab === 2 ? 'primary.lighter' : 'grey.50', borderColor: 'primary.main' }
                }}
                onClick={() => setActiveTab(2)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Code sx={{ fontSize: 20, mr: 1, color: activeTab === 2 ? 'primary.main' : 'text.secondary' }} />
                  <Typography variant="subtitle2" fontWeight={activeTab === 2 ? 600 : 400}>
                    Technical Skills
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3.5 }}>
                  Mixed proficiency levels
                </Typography>
                <Box sx={{ ml: 3.5, mt: 0.5 }}>
                  <Chip label="Needs Review" size="small" color="info" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Box>
              </Paper>

              {/* Certification Relevancy */}
              <Paper 
                elevation={activeTab === 3 ? 4 : 0}
                sx={{ 
                  p: 1.5,
                  border: activeTab === 3 ? 2 : 1,
                  borderColor: activeTab === 3 ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  bgcolor: activeTab === 3 ? 'primary.lighter' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: activeTab === 3 ? 'primary.lighter' : 'grey.50', borderColor: 'primary.main' }
                }}
                onClick={() => setActiveTab(3)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <School sx={{ fontSize: 20, mr: 1, color: activeTab === 3 ? 'primary.main' : 'text.secondary' }} />
                  <Typography variant="subtitle2" fontWeight={activeTab === 3 ? 600 : 400}>
                    Certification Relevancy
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 3.5 }}>
                  1 found, 2 missing
                </Typography>
                <Box sx={{ ml: 3.5, mt: 0.5 }}>
                  <Chip label="Incomplete" size="small" color="error" sx={{ height: 20, fontSize: '0.7rem' }} />
                </Box>
              </Paper>
            </Stack>
          </MainCard>
        </Grid>

        {/* Right Column - AI Justification Details (2/3) */}
        <Grid item xs={12} md={9} sx={{ flexGrow: 1, maxWidth: { md: '75%' }, display: 'flex' }}>
          <MainCard sx={{ 
            height: '100%', 
            p: 3, 
            width: '100%',
            border: '1px solid',
            borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderImageSlice: 1
          }}>
            {/* Overview Tab */}
            {activeTab === 0 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ fontSize: 24, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Overview Assessment
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<AutoAwesome />}
                    onClick={() => console.log('Reassess Overview')}
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
                    Reassessment
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Overall analysis of candidate fit based on document review
                </Typography>

                {/* Strengths */}
                <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'success.lighter', border: 1, borderColor: 'success.main', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <CheckCircle color="success" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle1" color="success.dark" fontWeight={600}>
                      Strengths Identified
                    </Typography>
                  </Box>
                  <List dense disablePadding>
                    {aiAssessment.overview.strengths.map((strength, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ fontSize: 16 }} color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={strength} 
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                {/* Weaknesses */}
                <Paper elevation={0} sx={{ p: 2, mb: 2, bgcolor: 'warning.lighter', border: 1, borderColor: 'warning.main', borderRadius: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Warning color="warning" sx={{ mr: 1, fontSize: 20 }} />
                    <Typography variant="subtitle1" color="warning.dark" fontWeight={600}>
                      Areas of Concern
                    </Typography>
                  </Box>
                  <List dense disablePadding>
                    {aiAssessment.overview.weaknesses.map((weakness, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Warning sx={{ fontSize: 16 }} color="warning" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={weakness}
                          primaryTypographyProps={{ variant: 'body2' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                {/* Overall Recommendation */}
                <Alert severity="info" icon={<Info fontSize="small" />} sx={{ '& .MuiAlert-message': { py: 0.5 } }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    AI Recommendation
                  </Typography>
                  <Typography variant="body2">
                    {aiAssessment.overview.overallRecommendation}
                  </Typography>
                </Alert>
              </Box>
            )}

            {/* Domain Relevancy Tab */}
            {activeTab === 1 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Build sx={{ fontSize: 24, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Domain Relevancy Assessment
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<AutoAwesome />}
                    onClick={() => console.log('Reassess Domain Relevancy')}
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
                    Reassessment
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Analysis of candidate experience against required domains
                </Typography>

                <Stack spacing={2}>
                  {aiAssessment.domainRelevancy.map((domain, index) => (
                    <Paper 
                      key={index}
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: 1,
                        borderRadius: 1,
                        borderColor: 
                          domain.status === 'aligned' ? 'success.main' : 
                          domain.status === 'partial' ? 'warning.main' : 
                          'error.main',
                        bgcolor: 
                          domain.status === 'aligned' ? 'success.lighter' : 
                          domain.status === 'partial' ? 'warning.lighter' : 
                          'error.lighter'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {domain.status === 'aligned' && <CheckCircle color="success" sx={{ mr: 1, fontSize: 20 }} />}
                          {domain.status === 'partial' && <Warning color="warning" sx={{ mr: 1, fontSize: 20 }} />}
                          {domain.status === 'mismatch' && <Cancel color="error" sx={{ mr: 1, fontSize: 20 }} />}
                          <Typography variant="subtitle1" fontWeight={600}>
                            {domain.domain}
                          </Typography>
                        </Box>
                        <Chip 
                          label={domain.status === 'aligned' ? 'TSC Aligned' : domain.status === 'partial' ? 'ITM Aligned' : 'Mismatch'}
                          color={domain.status === 'aligned' ? 'success' : domain.status === 'partial' ? 'warning' : 'error'}
                          size="small"
                          sx={{ height: 24 }}
                        />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Evidence:
                          </Typography>
                          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                            {domain.evidence}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            AI Justification:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {domain.reasoning}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Confidence:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {domain.confidence}%
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>

                        <Grid size={12}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Override Status</InputLabel>
                            <Select defaultValue={domain.status} label="Override Status">
                              <MenuItem value="aligned">Keep Aligned</MenuItem>
                              <MenuItem value="partial">Keep Partial Match</MenuItem>
                              <MenuItem value="mismatch">Keep Mismatch</MenuItem>
                              <MenuItem value="override_aligned">Override to Aligned</MenuItem>
                              <MenuItem value="override_mismatch">Override to Mismatch</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={12}>
                          <TextField
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                            placeholder="Explain your reasoning for the override..."
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" size="medium">
                    Submit Feedback
                  </Button>
                </Box>
              </Box>
            )}

            {/* Technical Skills Tab */}
            {activeTab === 2 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Code sx={{ fontSize: 24, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Technical Skills Assessment
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<AutoAwesome />}
                    onClick={() => console.log('Reassess Technical Skills')}
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
                    Reassessment
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Evaluation of candidate's technical competencies and tool proficiency
                </Typography>

                <Stack spacing={2}>
                  {aiAssessment.technicalSkills.map((skill, index) => (
                    <Paper 
                      key={index}
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: 1,
                        borderRadius: 1,
                        borderColor: 
                          skill.status === 'aligned' ? 'success.main' : 
                          skill.status === 'partial' ? 'warning.main' : 
                          'info.main',
                        bgcolor: 
                          skill.status === 'aligned' ? 'success.lighter' : 
                          skill.status === 'partial' ? 'warning.lighter' : 
                          'info.lighter'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Code sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {skill.skill}
                          </Typography>
                        </Box>
                        <Chip 
                          label={skill.status === 'partial' ? 'Partial Evidence' : skill.status === 'aligned' ? 'Confirmed' : 'Unknown'}
                          color={skill.status === 'partial' ? 'warning' : skill.status === 'aligned' ? 'success' : 'default'}
                          size="small"
                          sx={{ height: 24 }}
                        />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Proficiency Level
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {skill.proficiencyLevel}
                          </Typography>
                        </Grid>
                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Years of Experience
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {skill.yearsOfExperience}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Tools/Platforms:
                          </Typography>
                          <Box sx={{ mt: 0.5 }}>
                            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
                              {skill.tools.map((tool, toolIndex) => (
                                <Chip key={toolIndex} label={tool} size="small" variant="outlined" sx={{ height: 22 }} />
                              ))}
                            </Stack>
                          </Box>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Evidence:
                          </Typography>
                          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                            {skill.evidence}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            AI Reasoning:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {skill.reasoning}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Confidence:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {skill.confidence}%
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>

                        <Grid size={12}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Actual Proficiency</InputLabel>
                            <Select defaultValue="" label="Actual Proficiency">
                              <MenuItem value="expert">Expert</MenuItem>
                              <MenuItem value="advanced">Advanced</MenuItem>
                              <MenuItem value="intermediate">Intermediate</MenuItem>
                              <MenuItem value="beginner">Beginner</MenuItem>
                              <MenuItem value="none">No Experience</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={12}>
                          <TextField
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                            placeholder="Add notes from interview or additional verification..."
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" size="medium">
                    Submit Feedback
                  </Button>
                </Box>
              </Box>
            )}

            {/* Certification Relevancy Tab */}
            {activeTab === 3 && (
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <School sx={{ fontSize: 24, mr: 1, color: 'text.secondary' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Certification Relevancy Assessment
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained"
                    size="small"
                    startIcon={<AutoAwesome />}
                    onClick={() => console.log('Reassess Certifications')}
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
                    Reassessment
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Verification of required certifications and credentials
                </Typography>

                <Stack spacing={2}>
                  {aiAssessment.certifications.map((cert, index) => (
                    <Paper 
                      key={index}
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: 1,
                        borderRadius: 1,
                        borderColor: cert.status === 'found' ? 'success.main' : 'error.main',
                        bgcolor: cert.status === 'found' ? 'success.lighter' : 'error.lighter'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <School sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
                          <Typography variant="subtitle1" fontWeight={600}>
                            {cert.certification}
                          </Typography>
                        </Box>
                        <Chip 
                          label={cert.status === 'found' ? 'Verified' : 'Not Found'}
                          color={cert.status === 'found' ? 'success' : 'error'}
                          size="small"
                          sx={{ height: 24 }}
                        />
                      </Box>

                      <Grid container spacing={2}>
                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Status
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {cert.validity}
                          </Typography>
                        </Grid>
                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Issuing Body
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {cert.issuingBody}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Evidence:
                          </Typography>
                          <Typography variant="body2" sx={{ fontStyle: 'italic', mt: 0.5 }}>
                            {cert.evidence}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            AI Analysis:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {cert.reasoning}
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Typography variant="caption" color="text.secondary" fontWeight={600}>
                            Confidence:
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 0.5 }}>
                            {cert.confidence}%
                          </Typography>
                        </Grid>

                        <Grid size={12}>
                          <Divider sx={{ my: 1 }} />
                        </Grid>

                        <Grid size={12}>
                          <FormControl fullWidth size="small">
                            <InputLabel>Verification Status</InputLabel>
                            <Select defaultValue={cert.status} label="Verification Status">
                              <MenuItem value="found">Verified - Found</MenuItem>
                              <MenuItem value="not_found">Not Found</MenuItem>
                              <MenuItem value="equivalent">Equivalent Found</MenuItem>
                              <MenuItem value="expired">Found but Expired</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid size={12}>
                          <TextField
                            fullWidth
                            size="small"
                            multiline
                            rows={2}
                            placeholder="Add verification notes or equivalent certifications..."
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Paper>
                  ))}
                </Stack>

                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button variant="contained" size="medium">
                    Submit Feedback
                  </Button>
                </Box>
              </Box>
            )}
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}

