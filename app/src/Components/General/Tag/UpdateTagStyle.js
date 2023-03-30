const UpdateTagStyle = (theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
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
        background: `${theme.palette.primaryOrange.main}`,
    },
    selectedTag:{
        marginBottom: 12
    },
    title:{
        marginBottom: 8
    },
    closeBtn:{
        position: 'absolute',
        right:0,
        top:0
    }
})

export default UpdateTagStyle;