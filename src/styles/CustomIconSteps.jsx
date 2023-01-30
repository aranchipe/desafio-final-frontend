import { styled } from '@mui/material/styles';
import Check from '@mui/icons-material/Check';

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    ...(ownerState.active && {
        backgroundColor: '#0E8750',
        borderRadius: '50%'
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#F0F0F5',
        zIndex: 1,
        fontSize: 18,
        backgroundColor: '#0E8750',
        padding: '8px 8px',
        borderRadius: '50%',
        marginTop: '5px'
    },
    '& .QontoStepIcon-circle': {
        position: 'absolute',
        top: 13,
        left: 13,
        width: 6.4,
        height: 6.4,
        borderRadius: '50%',
        backgroundColor: '#0E8750',
    },
    '& .QontoStepIcon-circle-100': {
        position: 'relative',
        height: '32px',
        width: '32px',
        backgroundColor: '#F0F0F5',
        borderRadius: '50%',
        border: '1px solid #0E8750',
    },
    '& .QontoStepIcon-circle-active': {
        position: 'absolute',
        top: 13,
        left: 13,
        width: 6.4,
        height: 6.4,
        borderRadius: '50%',
        backgroundColor: '#F0F0F5',
    },
    '& .QontoStepIcon-circle-100-active': {
        position: 'relative',
        height: '32px',
        width: '32px',
        backgroundColor: '#0E8750',
        borderRadius: '50%',
        border: '1px solid #0E8750',
        textAlign: 'center'
    }

}));

export function CustomIconSteps(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) :
                active ? (
                    <div className='QontoStepIcon-circle-100-active'>
                        <div className="QontoStepIcon-circle-active" />
                    </div>
                )
                    :
                    <div className='QontoStepIcon-circle-100'>
                        <div className="QontoStepIcon-circle" />
                    </div>
            }
        </QontoStepIconRoot>
    );
}
