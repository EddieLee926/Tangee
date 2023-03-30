const CustomButtonStyle = (theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    button: {
        color: 'var(--color)',
        backgroundColor: 'var(--background-color)',
        '&:hover': {
            color: 'var(--hover-color)',
            backgroundColor: 'var(--hover-background)',
        },
        border: 'var(--border)',
        padding: '4px 16px',
        letterSpacing: 1,
    },
});

export default CustomButtonStyle;
