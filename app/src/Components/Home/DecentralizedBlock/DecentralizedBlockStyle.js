import { getImage } from '../../../Config/images.js';
const DecentralizedBlockStyle = () => ({
    root: {
        backgroundImage: `url('${getImage('general', 'background', 'blockchain')}')`,
        backgroundSize: '100%',
        width: 'calc(100% + 24px)',
        padding: '40px 0px',
        position: 'relative',
        bottom: 10,
        right: 12,
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        width: '60%',
        margin: '0 auto 20px',
        '& .MuiTypography-h1': {
            margin: 0,
        },
        '& .MuiDivider-middle': {
            marginRight: 20,
            marginLeft: 20,
        },
    },
    titleDivider: {
        flex: '1 1 auto',
    },
    text: {
        width: '55%',
        margin: '0 auto 20px',
    },
    logoWrapper: {
        width: '55%',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    logo: {
        width: 140,
        height: 140,
        margin: '10px 20px',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
});

export default DecentralizedBlockStyle;
