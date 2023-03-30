import React, { useState, useEffect } from 'react';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import PaperBlock from '../../General/PaperBlock/PaperBlock';
import getDataLogic2 from './SubscriberList.js';
import styles from './SubscriberListStyle';
const useStyles = makeStyles(styles);

const tableHead = [
    { label: '訂閱者', align: 'left' },
    { label: '年齡', align: 'center' },
    { label: '性別', align: 'center' },
    { label: '所屬券商', align: 'center' },
    { label: '已訂閱時間', align: 'center' },
];

const SubscriberList = () => {
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    const [users2, setUsers2] = useState();
    useEffect(() => {
        getDataLogic2(userid).then((result) => {
            setUsers2(result.data);
        });
    }, []);

    return (
        <PaperBlock className={classes.root}>
            <Typography variant='h2'>訂閱者清單</Typography>
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
                        {users2 ? (
                            users2.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left'>{data.nick_name}</TableCell>
                                    <TableCell align='center'>{data.age}歲</TableCell>
                                    <TableCell align='center'>{data.gender}</TableCell>
                                    <TableCell align='center'>{data.brokerId}</TableCell>
                                    <TableCell align='center'>{data.timee}天</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                {[0, 1, 2, 3, 4].map((item) => (
                                    <TableCell align='center' key={item}>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div style={{ display: 'flex' }}>
                <React.Fragment>
                    <table>
                        <TableHead className={classes.table2}>
                            <TableRow>
                                <TableCell align='right'>訂閱者</TableCell>
                                <TableCell align='left'>年齡</TableCell>
                                <TableCell align='right'>性別</TableCell>
                                <TableCell align='right'>所屬券商</TableCell>
                                <TableCell align='right'>已訂閱時間</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users2 ? (
                                users2.map((user2) => (
                                    <TableRow>
                                        <TableCell align='right'>
                                            {user2.nick_name}
                                        </TableCell>
                                        <TableCell align='right'>{user2.age}歲</TableCell>
                                        <TableCell align='right'>
                                            {user2.gender}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {user2.brokerId}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {user2.timee}天
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </table>
                </React.Fragment>
            </div> */}
        </PaperBlock>
    );
};

export default SubscriberList;
