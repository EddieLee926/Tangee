import PostAnalysisLogic from './PostAnalysisLogic.js';
import React, { useState, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import styles from './PostAnalysisStyle';
import { useTheme } from '@material-ui/styles';
import { getImage } from '../../../Config/images.js';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CallMadeIcon from '@material-ui/icons/CallMade';
import clsx from 'clsx';


const useStyles = makeStyles(styles);

const PostAnalysis = () => {
    const classes = useStyles();
    const theme = useTheme();
    const { userid } = useSelector(userSelector);
    const [analysis, setAnalysis] = useState()
    const style = (backgroundColor) => {
        return { '--background-color': `${backgroundColor}` };
    };
    const ColorBlock = ({ children, className }) => {
        const blockClasses = clsx({
            [classes.colorBlock]: true,
            [className]: className,
        });
        return <div className={blockClasses}>{children}</div>;
    };
    const [users, setUsers] = useState();
    const [users4, setUsers4] = useState();
    const [users5, setUsers5] = useState();
    const [users6, setUsers6] = useState();
    // useEffect(() => {
    //     PostAnalysisLogic(userid).then(result => {
    //         console.log(result.data)
    //         setAnalysis(result.data)
    //     })
    // }, []);
    useEffect(() => {
        PostAnalysisLogic(userid).then((result) => {
            console.log(result.dat, "aaa")
            setUsers(result.data);
        });
        PostAnalysisLogic(userid).then((result) => {
            setUsers4(result.data);
        });
        PostAnalysisLogic(userid).then((result) => {
            setUsers5(result.data);
        });
        PostAnalysisLogic(userid).then((result) => {
            setUsers6(result.data);
        });
    }, []);
    const UsersDiv = ({ users, ...props }) => {
        if (users) {
            return (
                <ColorBlock {...props}>
                    <div className={classes.icon}>
                        <img src={getImage('star_management', 'icon', 'mouse')} />
                    </div>
                    <div className={classes.text}>
                        <Typography variant='h2'>{users.favorites_nums}人</Typography>
                        <Typography variant='h3'>總收藏人數</Typography>
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
                        <Typography variant='h2'>{users4.message}人</Typography>
                        <Typography variant='h3'>總留言數</Typography>
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
                        <img src={getImage('star_management', 'icon', 'arrow_rise')} />
                    </div>
                    <div className={classes.text}>
                        <Typography variant='h2'>{users5.views}次</Typography>
                        <Typography variant='h3'>總觀看次數</Typography>
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
    const UsersDiv6 = ({ users6, ...props }) => {
        if (users6) {
            return (
                <ColorBlock {...props}>
                    <div className={classes.icon}>
                        <img src={getImage('star_management', 'icon', 'user')} />
                    </div>
                    <div className={classes.text}>
                        <Typography variant='h2'>{users6.subs_num}人</Typography>
                        <Typography variant='h3'>訂閱人數</Typography>
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
    return (
        <div className={classes.root}>
            <UsersDiv users={users} className={classes.block3} />
            <UsersDiv4 users4={users4} className={classes.block1} />
            <UsersDiv5 users5={users5} className={classes.block3} />
            <UsersDiv6 users6={users6} className={classes.block1} />
        </div>
    );
    // return <>
    //     <React.Fragment>

    //         <table >
    //             <TableHead className={classes.table}>
    //                 <TableRow >
    //                     <TableCell align="right">總收藏人數</TableCell>
    //                     <TableCell align="right">總留言數</TableCell>
    //                     <TableCell align="right">總觀看次數</TableCell>
    //                     <TableCell align="right">訂閱人數</TableCell>
    //                 </TableRow>
    //             </TableHead>
    //             <TableBody className={classes.table}>
    //                 {
    //                     analysis ?
    //                         analysis.map((data) => (
    //                             <TableRow >
    //                                 <TableCell align="right">{data.favorites_nums}</TableCell>
    //                                 <TableCell align="right">{data.message}</TableCell>
    //                                 <TableCell align="right">{data.views}</TableCell>
    //                                 <TableCell align="right">{data.subs_num}</TableCell>
    //                             </TableRow>
    //                         ))
    //                         :
    //                         <TableRow>
    //                             <TableCell><Skeleton animation="wave" /></TableCell>
    //                             <TableCell align="right"><Skeleton animation="wave" /></TableCell>
    //                             <TableCell align="right"><Skeleton animation="wave" /></TableCell>
    //                             <TableCell align="right"><Skeleton animation="wave" /></TableCell>
    //                             <TableCell align="right"><Skeleton animation="wave" /></TableCell>
    //                         </TableRow>
    //                 }
    //             </TableBody>
    //         </table>
    //     </React.Fragment>
    // </>;


}

export default PostAnalysis;