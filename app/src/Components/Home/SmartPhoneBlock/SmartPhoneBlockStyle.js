import { getImage } from '../../../Config/images.js';
const SmartPhoneBlockStyle = (theme) => ({
    root: {
        width: 'calc(100% + 24px)',
        height: 500,
        backgroundColor: 'white',
        position: 'relative',
        bottom: 10,
        right: 12,
        display: 'flex',
        justifyContent: 'center',
    },
    leftSection: {
        width: '35%',
        height: '100%',
        padding: '0 16px',
        position: 'relative',
    },
    rightSection: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        display: 'block',
        padding: '50px 0',
        margin: 'auto',
        position: 'absolute',
        right: 0,
        left: 0,
    },
    notice: {
        position: 'absolute',
        width: 270,
        display: 'block',
        margin: 'auto',
        top: 300,
        right: 10,
        left: 0,
        animation: `$showMsg 5000ms infinite ${theme.transitions.easing.easeInOut}`,
    },
    '@keyframes showMsg': {
        '0%': {
            opacity: 0,
        },
        '50%': {
            opacity: 1,
        },
        '100%': {
            opacity: 0,
        },
    },
});

export default SmartPhoneBlockStyle;
