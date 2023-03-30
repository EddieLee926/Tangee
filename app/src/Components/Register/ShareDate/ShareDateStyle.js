const ShareDateStyle = (theme) => ({
        root: {
                '& > *': {
                        margin: theme.spacing(1),
                },
        }, firstLine: {
                display: 'flex',
                justifyContent: 'space-between',
                '& .MuiTextField-root': {
                        width: '49%',
                },
        },
        secondLine: {
                display: 'flex',
                justifyContent: 'space-between',
        },
});

export default ShareDateStyle;
