import { getImage } from '../../../Config/images';

const KeyVisualStyle = (theme) => ({
    root: {
        width: '100%',
        height: 400,
        position: 'relative',
        borderRadius: 5,
        backgroundColor: theme.palette.grayBackground.main,
        display: 'flex',
        flexDirection: 'column',
    },
    imgCircle: {
        boxShadow: '0px 0px 10px 0px #8C8C8C;',
        border: `5px solid ${theme.palette.primaryOrange.main}`,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: '10%',
        width: 170,
        height: 170,
        margin: 'auto',
        borderRadius: 85,
    },
    starBackground: {
        backgroundImage: `url(${getImage(
            'star_home',
            'background',
            'happen_background'
        )})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        width: '100%',
        height: '50%',
        filter: 'contrast(0.5)',
        borderRadius: 5,
    },
    content: {
        flexGrow: 1,
        paddingLeft: '8%',
        display: 'flex',
    },
    popularity: {
        width: 225,
        textAlign: 'center',
        display: 'flex',
        alignSelf: 'flex-end',
        justifyContent: 'space-evenly',
        flex: '0 0 auto',
    },
    details: {
        padding: theme.spacing(3, 1),
        flex: '0 5 auto',
    },
    links: {
        padding: theme.spacing(3),
        flex: '0 3 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    popularityItem: {
        width: 'fit-content',
        display: 'inline-block',
        marginBottom: '15%',
        '& .MuiTypography-h2': {
            marginBottom: theme.spacing(2),
        },
    },
    buttonsWrap: {
        display: 'flex',
        '& :nth-child(n)': {
            marginRight: theme.spacing(1),
        },
        paddingBottom: theme.spacing(2),
    },
    linksWrap: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
});

export default KeyVisualStyle;
