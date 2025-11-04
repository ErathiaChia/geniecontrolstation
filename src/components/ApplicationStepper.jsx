// material-ui
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { FileTextOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';

// ==============================|| APPLICATION PROCESS STEPPER ||============================== //

const steps = [
  {
    label: 'Document Assessment',
    icon: <FileTextOutlined style={{ fontSize: '20px' }} />
  },
  {
    label: 'Candidate Screening',
    icon: <SearchOutlined style={{ fontSize: '20px' }} />
  },
  {
    label: 'Final Approval',
    icon: <CheckCircleOutlined style={{ fontSize: '20px' }} />
  }
];

export default function ApplicationStepper({ activeStep = 0 }) {
  return (
    <Box sx={{ width: '100%', px: 2 }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        sx={{
          '& .MuiStepConnector-root': {
            top: 20
          }
        }}
      >
        {steps.map((step, index) => (
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
  );
}

