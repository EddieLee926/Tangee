import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/styles';
import styles from './CustomButtonStyle';

const useStyles = makeStyles(styles);

const getButtonStyle = (style, theme) => {
    switch (style) {
        case 'normal':
            return {
                '--color': 'black',
                '--background-color': `${theme.palette.primaryOrange.main}`,
                '--hover-color': 'black',
                '--hover-background': `${theme.palette.hoverOrange.main}`,
                '--border': 'none',
            };
        case 'outline':
            return {
                '--color': 'black',
                '--background-color': 'white',
                '--hover-color': 'white',
                '--hover-background': 'gray',
                '--border': '2px solid gray',
            };
        default:
            return {
                '--color': 'black',
                '--background-color': 'transparent',
                '--hover-color': 'none',
                '--hover-background': '#e3e3e3',
                '--border': 'none',
            };
    }
};

// custom general button with react router link
// usage:
// <LinkButton to='/login' category='outline'>Login</LinkButton>
// ---> generate the outline button lead to login page
// this custom button can still accept className props if more customization of css is needed
// category to use: normal, outline

const LinkButton = ({ className, category, ...props }) => {
    const classes = useStyles();
    const theme = useTheme();
    const btnClasses = clsx({
        [classes.button]: true,
        [className]: className,
    });
    const style = getButtonStyle(category, theme);
    return (
        <div className={classes.root}>
            <Button component={Link} className={btnClasses} style={style} {...props} />
        </div>
    );
};

const GeneralButton = ({ className, category, ...props }) => {
    const classes = useStyles();
    const theme = useTheme();
    const btnClasses = clsx({
        [classes.button]: true,
        [className]: className,
    });
    const style = getButtonStyle(category, theme);
    return (
        <div className={classes.root}>
            <Button className={btnClasses} style={style} {...props} />
        </div>
    );
};

export { LinkButton, GeneralButton };
