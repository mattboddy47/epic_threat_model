import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from 'react-router-dom'


export default function ThreatModelStepper(props) {
  const currentStep = props.step
  const navigate = useNavigate();

  return (
    <Box sx={{
      marginBottom: '50px',
      marginTop: '30px',
      width: '100%'
    }}>
      <Stepper activeStep={currentStep} alternativeLabel
        sx={{
          '& .MuiStepLabel-root .Mui-completed': {
            color: 'secondary.dark', // circle color (COMPLETED)
          },
          '& .MuiStepLabel-root .Mui-active': {
            color: 'secondary.main', // circle color (ACTIVE)
          },
          "&:hover": {
            cursor: 'pointer',
          }
        }}>
        <Step
          onClick={() => navigate("/choose-tech")}
          key="Select Tech Stack"
        >
          <StepLabel>Select tech stack</StepLabel>
        </Step>

        <Step
          onClick={() => navigate("/choose-security")}
          key="Select Security Stack"
        >
          <StepLabel>Select Security Stack</StepLabel>
        </Step>

        <Step
          onClick={() => navigate("/review-developer-threats")}
          key="Review Threats"
        >
          <StepLabel>Review Threats</StepLabel>
        </Step>
      </Stepper>
    </Box>
  )
}
