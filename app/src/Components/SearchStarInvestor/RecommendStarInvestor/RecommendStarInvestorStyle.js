const PopularStarInvestorStyle = (theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        paddingBottom: 16,
        position: 'relative',
    },
    description: {
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    notice: {
        position: 'absolute',
        margin: 'auto',
        height: 'fit-content',
        width: 'fit-content',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center',
    },
    carousel: {
        minWidth: '70%',
    },
    carouselWrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    fakeBlockWrapper: {
        width: '70%',
        height: 350,
        display: 'flex',
        justifyContent: 'space-evenly',
        filter: 'blur(4px)',
    },
    fakeBlock: {
        width: '30%',
    },
});

export default PopularStarInvestorStyle;
