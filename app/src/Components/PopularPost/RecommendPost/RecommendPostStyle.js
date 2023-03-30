const RecommendPostStyle = (theme) => ({
    root: {
        width: '100%',
        paddingBottom: '16px',
    },
    carousel: {
        minWidth: '100%',
    },
    carouselWrapper: {
        display: 'grid',
        gridGap: 12,
        gridAutoRows: 100,
        gridTemplateColumns: 'repeat(2,1fr)',
        '& :nth-child(1)': {
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 1,
            gridRowEnd: 5,
        },
        '& :nth-child(2)': {
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 3,
        },
        '& :nth-child(3)': {
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 3,
            gridRowEnd: 5,
        },
    },
    fakeRoot: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        padding: '0 0 32px 0',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        padding: '0',
        filter: 'blur(4px)',
        position: 'relative',
    },
    content: {
        width: '80%',
        height: '60%',
        maxHeight: 160,
        position: 'absolute',
        bottom: 0,
        backgroundColor: `${theme.palette.grayBackground.main}`,
    },
    description: {
        position: 'absolute',
        margin: 'auto',
        width: 'fit-content',
        height: 'fit-content',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        textAlign: 'center',
    },
});

export default RecommendPostStyle;
