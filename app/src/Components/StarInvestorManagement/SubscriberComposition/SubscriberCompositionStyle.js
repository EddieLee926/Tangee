const SubscriberCompositionStyle = (theme) => ({
    root: {
        width: 300,
        height: '80%',
        borderRadius: '5px 5px 0 0',
        overflow: 'hidden',
    },
    container: {
        maxHeight: 300,
    },
    tableHeadCell: {
        '& .MuiTableCell-head': {
            backgroundColor: theme.palette.primaryOrange.main,
        },
    },
    tableBody: {
        '& .MuiTableRow-root': {
            borderBottom: `2px solid ${theme.palette.lightOrange.main}`,
        },
    },
});

export default SubscriberCompositionStyle;
