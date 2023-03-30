const ArticleStyle = () => ({
    root: {
        width: '95%',
        height: 'auto',
        margin: '0 auto',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
    },
    postWrapper: {
        display: 'grid',
        gridGap: '24px',
        gridTemplateColumns: 'repeat(3,1fr)',
    },
    result: {
        padding: '16px 0',
    },
});

export default ArticleStyle;
