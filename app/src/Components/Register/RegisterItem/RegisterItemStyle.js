const RegisterItemStyle = (theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    firstLine: {
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
    inputField: {
        minWidth: 250,
        '& .MuiInputLabel-outlined': {
            transform: 'translate(14px, 12px) scale(1)',
        },
        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '& .MuiOutlinedInput-input': {
            padding: '10.5px 14px;',
        },
    },
});

export default RegisterItemStyle;
