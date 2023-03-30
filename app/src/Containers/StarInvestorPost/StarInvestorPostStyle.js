import { getImage } from '../../Config/images';
const StarInvestorPostStyle = (theme) => ({
    root: {
        width: '100%',
        padding: '12px 16px',
        display: 'flex',
    },
    leftSection: {
        flex: '3 1 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    title: {
        '& div': {
            display: 'inline',
        },
    },
    imgCircle: {
        boxShadow: '0px 0px 10px 0px #8C8C8C;',
        border: `5px solid ${theme.palette.primaryOrange.main}`,
        width: 95,
        height: 95,
        borderRadius: 95,
    },
    starBackground: {
        flex: '1 1 auto',
        display: 'flex',
        '& img': {
            display: 'block',
            margin: 'auto',
            width: 220,
        },
    },
    content: {},
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
    graphWrapper: {
        width: '100%',
        height: 300,
        display: 'flex',
        justifyContent: 'space-between',
        margin: '32px 0px',
    },
    graphWrapper2: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        margin: '32px 0px',
    },
    lineGraph: {
        width: '40%',
        height: '100%',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        '& .MuiTypography-h2': {
            marginBottom: 4,
        },
    },
    barGraph: {
        width: '100%',
        height: '28%',
        margin: 0,
    },
    barGraph2: {
        width: '100%',
        height: '80%',
        margin: 0,
    },
    closeBtn:{
        position: 'absolute',
        right:0,
        top:0
    }
});

export default StarInvestorPostStyle;
