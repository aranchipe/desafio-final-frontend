import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { CustomIconSteps } from '../../styles/CustomIconSteps';

const QontoConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.vertical}`]: {

        [`& .${stepConnectorClasses.line}`]: {
            borderLeft: '3px solid #0E8750',
            minHeight: '4rem'
        },
    }
}));

const steps = [
    {
        label: 'Cadastre-se',
        description: `Por favor, escreva seu nome e e-mail`,
    },
    {
        label: 'Escolha uma senha',
        description:
            'Escolha uma senha segura',
    },
    {
        label: 'Cadastro realizado com sucesso',
        description: `E-mail e senha cadastrados com sucesso`,
    },
];

function CustomSteps({ activeStep }) {
    return (
        <Box sx={{ maxWidth: 600, marginLeft: '3rem' }}>
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                connector={<QontoConnector />}
            >
                {steps.map((step, index) => (
                    <Step key={step.label}
                        sx={{
                            margin: '-2rem 0 -2rem -0.2rem'
                        }}
                    >
                        <StepLabel
                            StepIconComponent={CustomIconSteps}
                        >
                            <Typography
                                sx={{
                                    margin: '1.5rem 0 0 2rem',
                                    color: '#0E8750',
                                    fontWeight: '700',
                                    fontSize: '1.8rem'
                                }}
                            >{step.label}</Typography>

                            <Typography
                                sx={{
                                    marginLeft: '2rem',
                                    color: '#3F3F55',
                                    fontWeight: '600',
                                    fontSize: '1.8rem'
                                }}
                            >{step.description}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}

export default CustomSteps;