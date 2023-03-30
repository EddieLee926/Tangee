const PostStatisticsStyle = (theme) => ({
        root: {
                margin: '32px 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: 420,
        },
        container: {
                maxHeight: 300,
        },
        tableHeadCell: {
                backgroundColor: '#EBEAE8',
        },
        tableBody: {
                '& tr:nth-child(even)': {
                        backgroundColor: theme.palette.grayBackground.main,
                },
        },
});

export default PostStatisticsStyle;
