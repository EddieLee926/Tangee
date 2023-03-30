const PaymentStyle = (theme) => ({
    root: {
        width: '50%',
        margin: '40px auto',
        padding: '20px 16px',
        borderRadius: 5,
        backgroundColor: theme.palette.lightOrange.main,
    },
    payment: {
        width: '100%',
        tableLayout: 'fixed',
        margin: '12px',
        textAlign: 'left',
    },
    button: {
        '& div': {
            justifyContent: 'flex-end',
        },
    },
});

export default PaymentStyle;
