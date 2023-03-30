const PersonalStyle = (theme) => ({
    root: {
        width: '100%',
        height: 380,
        display: 'flex',
        justifyContent: 'space-between',
        margin: '32px 0px',
    },
    lineGraph: {
        width: '65%',
        height: '100%',
        padding: '16px 32px',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        '& .MuiTypography-h2': {
            marginBottom: 0,
            paddingBottom: 8,
            borderBottom: '2px solid gray',
        },
        '& .MuiTypography-h3': {},
    },
    personalInfo: {
        width: '30%',
        height: '100%',
        padding: '16px 32px',
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        '& .MuiTypography-h2': {
            marginBottom: 4,
        },
    },
    imageInfo: {
        position: 'relative',
        width: 'fit-content',
        margin: '0 auto',
    },
    contentList: {
        display: 'flex',
        marginBottom: 12,
        '& .MuiTypography-h3': {
            marginBottom: 0,
            alignSelf: 'center',
        },
    },
    contentIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 30,
        marginRight: 12,
    },
    timeText: {
        color: 'gray',
    },
    imgCircle: {
        boxShadow: '0px 0px 10px 0px #8C8C8C;',
        border: `5px solid ${theme.palette.primaryOrange.main}`,
        width: 130,
        height: 130,
        margin: 'auto',
        borderRadius: 95,
    },
    iconn: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    info: {
        position: 'absolute',
        left: 230,
        bottom: 340,
    },
    div1: {
        '& .MuiTypography-body1': {
            marginBottom: 4,
        },
    },
});

export default PersonalStyle;
