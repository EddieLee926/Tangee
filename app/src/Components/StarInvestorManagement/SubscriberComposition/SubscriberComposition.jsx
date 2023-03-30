import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { userSelector } from '../../../Reducer/User/UserSlice.js';
import { useSelector } from 'react-redux';
import getApi from '../../../Utils/Api/getApi';
import styles from './SubscriberCompositionStyle';
const useStyles = makeStyles(styles);

const SubscriberComposition = (props) => {
    const classes = useStyles();
    const { userid } = useSelector(userSelector);
    //明星投資者ID
    const { id } = props;
    const [users2, setUsers2] = useState();
    useEffect(() => {
        var data = {
            userid: userid,
            shareID: id,
        };
        const getTagPieChart = async () => {
            const response = await getApi.post('/table_tagData', data);
            setUsers2(response.data);
            // console.log(response.data, "tag表~~");
        };
        getTagPieChart();
    }, []);
    return (
        <>
            <React.Fragment>
                <Table className={classes.root}>
                    <TableHead className={classes.tableHeadCell}>
                        <TableRow>
                            <TableCell align='center'>tag名稱</TableCell>
                            <TableCell align='center'>追蹤人數</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes.tableBody}>
                        {users2 ? (
                            users2.map((user2, index) => (
                                <TableRow key={index}>
                                    <TableCell align='center'>{user2.tagname}</TableCell>
                                    <TableCell align='center'>{user2.count}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell align='center'>
                                    <Skeleton animation='wave' />
                                </TableCell>
                                <TableCell align='center'>
                                    <Skeleton animation='wave' />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </React.Fragment>
        </>
    );
};

export default SubscriberComposition;
