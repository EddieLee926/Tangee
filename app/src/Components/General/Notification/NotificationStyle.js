const NotificationStyle = (theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
      },
});

export default NotificationStyle;