const TagchipStyle = (theme) => ({
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
})

export default TagchipStyle;