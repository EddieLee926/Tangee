const TagStyle = (theme) => ({
    formControl: {
        display: 'block',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    chipSelected: {
        margin: theme.spacing(0.5),
        backgroundColor: theme.palette.primaryOrange.main,
    },
    chipContainer: {
        margin: '12px 0',
    },
});

export default TagStyle;
