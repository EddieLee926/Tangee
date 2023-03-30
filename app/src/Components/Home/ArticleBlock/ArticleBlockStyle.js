const ArticleBlockStyle = (theme) => ({
    root: {
        width: 'calc(100% + 24px)',
        height: 550,
        backgroundColor: '#EDF0F5',
        position: 'relative',
        bottom: 10,
        right: 12,
        display: 'flex',
        justifyContent: 'center',
    },
    leftSection: {
        width: '30%',
        height: '100%',
        padding: '0 16px',
        display: 'flex',
        flexDirection: 'column',
    },
    boxText: {
        flexGrow: '1',
    },
    boxContent: {
        height: '70%',
        backgroundColor: 'white',
        overflowY: 'scroll',
        '& .MuiList-padding': {
            padding: '4px 4px 0 4px',
            '& li': {
                backgroundColor: '#DEEFFF',
                borderRadius: 5,
                marginBottom: 4,
            },
        },
    },
    rightSection: {
        width: '35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default ArticleBlockStyle;
