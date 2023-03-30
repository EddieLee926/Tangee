import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import { getImage } from '../../../Config/images';
import styles from './FooterStyle';
const useStyles = makeStyles(styles);

const links = [
    { label: 'Home', link: '' },
    { label: 'About', link: '' },
    { label: 'Categories', link: '' },
    { label: 'Join', link: '' },
    { label: 'MyAccount', link: '' },
    { label: 'FAQ', link: '' },
    { label: 'Contact Us', link: '' },
];

const followLinks = [
    { icon: <FacebookIcon />, link: '' },
    { icon: <InstagramIcon />, link: '' },
    { icon: <LinkedInIcon />, link: '' },
    { icon: <TwitterIcon />, link: '' },
];

const Footer = () => {
    const classes = useStyles();

    const Links = links.map((link, index) => (
        <Link
            key={index}
            className={classes.link}
            underline='none'
            component={RouterLink}
            to='#'
        >
            {link.label}
        </Link>
    ));

    const FollowLinks = followLinks.map((link, index) => (
        <IconButton key={index} className={classes.followlink}>
            {link.icon}
        </IconButton>
    ));
    return (
        <footer className={classes.root}>
            <Container maxWidth='lg' className={classes.container}>
                <Hidden xsDown>
                    <Grid container justifyContent='space-between'>
                        <Grid item xs={4}>
                            <img
                                src={getImage('general', 'logo', 'type1')}
                                className={classes.footerLogo}
                            />
                            <Typography variant='body1' display='block'>
                                我們是一群對於股票學習充滿熱情的大學生，但在進入市場後才發現很難有一個真實且實用的學習管道，因此，我們創造了Tangee，希望能讓所有對股票知識充滿學習和教學熱忱的人一起來到此平台學習、探大吉!
                            </Typography>
                        </Grid>
                        <Grid item xs={2} className={classes.linkList}>
                            <Typography variant='h2' display='block'>
                                Links
                            </Typography>
                            <Typography variant='button' className={classes.linkWrapper}>
                                {Links}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h2' display='block'>
                                Subscribe Now
                            </Typography>
                            <Typography variant='body1' display='block'>
                                透過以下社群平台來關注我們的最新活動訊息!
                            </Typography>
                            <form className={classes.emailinput}>
                                <InputBase
                                    placeholder='Enter your email'
                                    inputProps={{ 'aria-label': 'naked' }}
                                    style={{ flexGrow: 1 }}
                                />
                                <IconButton edge='end' size='small'>
                                    <EmailIcon />
                                </IconButton>
                            </form>
                            <Typography variant='h2' display='block'>
                                Follow us
                            </Typography>
                            <div>{FollowLinks}</div>
                        </Grid>
                    </Grid>
                </Hidden>
                <Hidden smUp>
                    <Typography variant='h1' display='block'>
                        Tangee
                    </Typography>
                    <Typography
                        variant='body2'
                        display='block'
                        className={classes.discription}
                    >
                        It is a long established fact that a reader will be distracted by
                        the readable
                    </Typography>
                    <Typography variant='h1' display='block'>
                        Subscribe Now
                    </Typography>
                    <form className={classes.emailinput}>
                        <InputBase
                            placeholder='Enter your email'
                            inputProps={{ 'aria-label': 'naked' }}
                            style={{ flexGrow: 1 }}
                        />
                        <IconButton edge='end' size='small'>
                            <EmailIcon />
                        </IconButton>
                    </form>
                    <Typography variant='h1' display='block'>
                        Links
                    </Typography>
                    <Grid container>
                        <Grid item xs={6} className={classes.linkList}>
                            <Typography variant='button' className={classes.linkWrapper}>
                                {links.map((link, index) => {
                                    if (index % 2 === 0) {
                                        return (
                                            <Link
                                                key={index}
                                                className={classes.link}
                                                underline='none'
                                                component={RouterLink}
                                                to='#'
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    }
                                })}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.linkList}>
                            <Typography variant='button' className={classes.linkWrapper}>
                                {links.map((link, index) => {
                                    if (index % 2 === 1) {
                                        return (
                                            <Link
                                                key={index}
                                                className={classes.link}
                                                underline='none'
                                                component={RouterLink}
                                                to='#'
                                            >
                                                {link.label}
                                            </Link>
                                        );
                                    }
                                })}
                            </Typography>
                        </Grid>
                    </Grid>
                </Hidden>
            </Container>
            <Divider />
            <Container maxWidth='lg' className={classes.bottomLine}>
                <Hidden smUp>
                    <div style={{ paddingBottom: '12px' }}>{FollowLinks}</div>
                </Hidden>
                <Typography variant='body2'>
                    Privacy Policy Terms &amp; Conditions of Use
                </Typography>
                <Typography variant='body2'>
                    Copyright © Tangee. All Rights Reserved
                </Typography>
            </Container>
        </footer>
    );
};

export default Footer;
