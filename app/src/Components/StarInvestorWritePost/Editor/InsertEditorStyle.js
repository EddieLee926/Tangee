const InsertEditorStyle = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    root: {
        padding: '0 52px',
    },
    fakeBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    chip: {
        margin: theme.spacing(0.5),
    },
    chipSelected: {
        margin: theme.spacing(0.5),
        background: `${theme.palette.primaryOrange.main}`,
    },
    inputSection: {
        borderLeft: `2px solid gray`,
        padding: '0px 0 0 16px',
        marginBottom: 16,
        position: 'relative',
        zIndex: 5,
    },
    selectedInputSection: {
        borderLeft: `2px solid ${theme.palette.primaryOrange.main}`,
    },
    button: {
        marginBottom: 16,
    },
});

export default InsertEditorStyle;
