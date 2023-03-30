import React, { useEffect, useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PaperBlock from '../../General/PaperBlock/PaperBlock.jsx';
import getDataLogic from './RecentTransaction.js';
import style from './RecentTransactionStyle';

const useStyles = makeStyles(style);

const tableHead = [
    { label: '股票代碼', align: 'left' },
    { label: '交易模式', align: 'center' },
    { label: '股價', align: 'center' },
    { label: '數量', align: 'center' },
];

const RecentTransaction = ({ id }) => {
    const { userid, broScheme } = useSelector(userSelector);

    const classes = useStyles();

    const [recentData, setRecentData] = useState();
    useEffect(() => {
        var data = {
            userid: userid,
            startId: id,
            broScheme: broScheme,
        };
        getDataLogic(data).then((result) => {
            setRecentData(result.data);
        });
    }, []);
    return (
        <PaperBlock className={classes.root}>
            <Typography variant='h2'>近期交易明細</Typography>
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
                    <TableBody>
                        {recentData ? (
                            recentData.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell align='left'>{data.stock_name}</TableCell>
                                    <TableCell align='center'>
                                        {data.explanation}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {data.trade_price ? data.trade_price : '-'}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {data.propertyValue ? data.propertyValue : '-'}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                {[0, 1, 2, 3].map((item) => (
                                    <TableCell align='center' key={item}>
                                        <Skeleton animation='wave' />
                                    </TableCell>
                                ))}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </PaperBlock>
    );
};
export default RecentTransaction;
