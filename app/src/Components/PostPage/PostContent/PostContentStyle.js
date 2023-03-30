const PostContentStyle = (theme) => ({
    button: {
        width: 'fit-content',
    },
    title: {
        margin: '16px 0',
    },
    hide: {
        height: 250,
        position: 'relative',
    },
    blur: {
        height: 250,
        filter: 'blur(.5rem)',
        userSelect: 'none',
    },
    text: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        width: 'fit-content',
        height: 'fit-content',
        margin: 'auto',
    },
});

export default PostContentStyle;
