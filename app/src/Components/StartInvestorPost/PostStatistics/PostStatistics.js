import PostStatisticsLogic from './PostStatisticsLogic.js';
import React, { useState, useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import CreateIcon from '@material-ui/icons/Create';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import PaperBlock from '../../General/PaperBlock/PaperBlock';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Editor from '../../StarInvestorWritePost/Editor/Editor.jsx';
import styles from './PostStatisticsStyle';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    GeneralButton,
    LinkButton,
} from '../../General/CustomButton/CustomButton.jsx';
import SetPostSingleAmount from '../SetPostSubscribedAmount/SetPostSingleAmount.js';
const useStyles = makeStyles(styles);

const tableHead = [
    { label: '文章名稱', align: 'left' },
    { label: '收藏人數', align: 'center' },
    { label: '留言數', align: 'center' },
    { label: '觀看次數', align: 'center' },
    { label: '付費訂閱人數', align: 'center' },
    { label: '單篇費用', align: 'center' },
    { label: 'ACTIONS', align: 'center' },
];
const PostStatistics = () => {

    const { userid } = useSelector(userSelector);
    const classes = useStyles();
    const [statistics, setStatistics] = useState()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);

    };
    const handleOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        PostStatisticsLogic(userid).then(result => {
            console.log(result.data)
            setStatistics(result.data)
        })
    }, []);

    return <>
        {/* <PaperBlock className={classes.root}> */}
        {/* <Typography variant='h2'>綜合數據分析~~~~~</Typography> */}
        <TableContainer className={classes.container}>
            <Table stickyHeader>
                <TableHead className={classes.table}>
                    <TableRow>
                        {tableHead.map(({ label, align }, index) => (
                            <TableCell
                                key={index}
                                align={align}
                                className={classes.tableHeadCell}
                            >
                                {label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {statistics ? (
                        statistics.map((data, index) => (
                            <TableRow key={index}>
                                <TableCell align='left'>{data.title}</TableCell>
                                <TableCell align='center'>{data.favorites_num}</TableCell>
                                <TableCell align='center'>{data.message}</TableCell>
                                <TableCell align='center'>{data.views}</TableCell>
                                <TableCell align='center'>{data.subs_num}</TableCell>
                                <TableCell align='center'>{data.price}</TableCell>
                                <TableCell align='center'>
                                    <Button startIcon={<CreateIcon />} component={Link} to={`/star/write-post/${data.post_id}`}>
                                        編輯
                                    </Button>
                                    <Button startIcon={<VisibilityIcon />} component={Link} to={`/post-page/${data.post_id}`}>
                                        預覽
                                    </Button>
                                    {/* <Button startIcon={<MonetizationOnIcon />} onClick={handleOpen}>
                                        修改費用
                                    </Button> */}
                                    {/* <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby='alert-dialog-title'
                                        aria-describedby='alert-dialog-description'
                                    >
                                        <DialogActions>
                                            <GeneralButton
                                                category='normal'
                                                onClick={handleClose}
                                            >
                                                X
                                            </GeneralButton>
                                        </DialogActions>
                                        <DialogTitle id='alert-dialog-title'>
                                            修改單篇費用
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id='alert-dialog-description'>
                                                <SetPostSingleAmount id={`${data.post_id}`} />
                                            
                                            </DialogContentText>
                                        </DialogContent>
                                    </Dialog> */}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                                <TableCell align='center' key={item}>
                                    <Skeleton animation='wave' />
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        {/* </PaperBlock> */}
        {/* <React.Fragment>
            <table >
                <TableHead className={classes.table2}>
                    <TableRow >
                        <TableCell align="right">文章名稱</TableCell>
                        <TableCell align="right">收藏人數</TableCell>
                        <TableCell align="right">留言數</TableCell>
                        <TableCell align="right">觀看次數</TableCell>
                        <TableCell align="right">付費訂閱人數</TableCell>
                        <TableCell align="right">單篇費用</TableCell>
                        <TableCell align="right">ACTIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {
                        statistics ?
                            statistics.map((stat) => (
                                <TableRow >
                                    <TableCell align="right">{stat.title}</TableCell>
                                    <TableCell align="right">{stat.favorites_num}</TableCell>
                                    <TableCell align="right">{stat.message}</TableCell>
                                    <TableCell align="right">{stat.views}</TableCell>
                                    <TableCell align="right">{stat.subs_num}</TableCell>
                                    <TableCell align="right">{stat.post_price}</TableCell>
                                    <TableCell align="right">
                                        <Button startIcon={<CreateIcon />} component={Link} to={`/star/write-post/${stat.post_id}`}>
                                            編輯!!
                                        </Button>
                                        <Button startIcon={<VisibilityIcon />} component={Link} to={`/post-page/${stat.post_id}`}>
                                            預覽~~
                                        </Button>
                                    </TableCell>

                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell><Skeleton animation="wave" /></TableCell>
                                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                                <TableCell align="right"><Skeleton animation="wave" /></TableCell>
                            </TableRow>
                    }


                </TableBody>

            </table>
        </React.Fragment> */}
    </>;


}

export default PostStatistics;