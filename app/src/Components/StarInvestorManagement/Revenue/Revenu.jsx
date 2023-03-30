import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import IconButton from '@material-ui/core/IconButton';
import CallMadeIcon from '@material-ui/icons/CallMade';
import getDataLogic from './Revenu.js';
import getDataLogic4 from './Revenu2.js';
import getDataLogic5 from './Revenu3.js';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/styles';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { getImage } from '../../../Config/images.js';
import styles from './RevenuStyle';

const useStyles = makeStyles(styles);

const Revenu = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { userid } = useSelector(userSelector);
    const [users, setUsers] = useState();
    const [users4, setUsers4] = useState();
    const [users5, setUsers5] = useState();
    const style = (backgroundColor) => {
        return { '--background-color': `${backgroundColor}` };
    };

    useEffect(() => {
        getDataLogic(userid).then((result) => {
            setUsers(result.data);
        });
        getDataLogic4(userid).then((result) => {
            setUsers4(result.data[0]);
        });
        getDataLogic5(userid).then((result) => {
            setUsers5(result.data[0]);
        });
    }, []);

    const ColorBlock = ({ children, className }) => {
        const blockClasses = clsx({
            [classes.colorBlock]: true,
            [className]: className,
        });
        return <div className={blockClasses}>{children}</div>;
    };
    const UsersDiv = ({ users, ...props }) => {
        if (users) {
            return (
                <ColorBlock {...props}>
                    <div className={classes.icon}>
                        <img src={getImage('star_management', 'icon', 'arrow_rise')} />
                    </div>
                    <div className={classes.text}>
                        <Typography variant='h2'>${users.sub_price}/月</Typography>
                        <Typography variant='h3'>總收益</Typography>
                    </div>
                    <IconButton
                        className={classes.svgIcon}
                        style={style(theme.palette.primaryOrange.main)}
                    >
                        <CallMadeIcon fontSize='small' />
                    </IconButton>
                </ColorBlock>
            );
        }
        return <Skeleton animation='wave' className={classes.colorBlock} />;
    };
    const UsersDiv4 = ({ users4, ...props }) => {
        if (users4) {
            return (
                <ColorBlock {...props}>
                    <div className={classes.icon}>
                        <img src={getImage('star_management', 'icon', 'user')} />
                    </div>
                    <div className={classes.text}>
                        <Typography variant='h2'>{users4.num}人</Typography>
                        <Typography variant='h3'>總訂閱人數</Typography>
                    </div>
                    <IconButton
                        className={classes.svgIcon}
                        style={style(theme.palette.primaryRed.main)}
                    >
                        <CallMadeIcon fontSize='small' />
                    </IconButton>
                </ColorBlock>
            );
        }
        return <Skeleton animation='wave' className={classes.colorBlock} />;
    };
    const UsersDiv5 = ({ users5, ...props }) => {
        if (users5) {
            return (
                <ColorBlock {...props}>
                    <div className={classes.icon}>
                        <img src={getImage('star_management', 'icon', 'mouse')} />
                    </div>
                    <div className={classes.text}>
                        <Typography variant='h2'>{users5.sum}元</Typography>
                        <Typography variant='h3'>訂閱費用</Typography>
                    </div>
                    <IconButton
                        className={classes.svgIcon}
                        style={style(theme.palette.primaryOrange.main)}
                    >
                        <CallMadeIcon fontSize='small' />
                    </IconButton>
                </ColorBlock>
            );
        }
        return <Skeleton animation='wave' className={classes.colorBlock} />;
    };

    return (
        <div className={classes.root}>
            <UsersDiv4 users4={users4} className={classes.block1} />
            <UsersDiv users={users} className={classes.block2} />
            <UsersDiv5 users5={users5} className={classes.block3} />
        </div>
    );
};

export default Revenu;
